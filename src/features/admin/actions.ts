"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/supabase/auth";

const uuidSchema = z.string().uuid();
const slugSchema = z
  .string()
  .trim()
  .min(2)
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const leadStatuses = [
  "new",
  "qualified",
  "discovery_booked",
  "proposal_sent",
  "negotiating",
  "won",
  "lost"
] as const;

const projectStatuses = [
  "planning",
  "active",
  "paused",
  "review",
  "launched",
  "archived"
] as const;

const invoiceStatuses = ["draft", "open", "paid", "overdue", "void"] as const;
const proposalStatuses = ["draft", "sent", "accepted", "declined", "expired"] as const;

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalString(formData: FormData, key: string) {
  const value = formString(formData, key);
  return value || null;
}

function optionalNumber(formData: FormData, key: string) {
  const value = formString(formData, key);
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function checkbox(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function withMessage(path: string, key: "error" | "message", message: string) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${key}=${encodeURIComponent(message)}`;
}

function safeAdminPath(value: string, fallback: string) {
  return value.startsWith("/admin") && !value.startsWith("//") ? value : fallback;
}

function safeFileName(name: string) {
  return (
    name
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "project-file"
  );
}

async function logActivity({
  actorId,
  action,
  entityType,
  entityId,
  organizationId,
  projectId,
  metadata = {}
}: {
  actorId: string;
  action: string;
  entityType?: string;
  entityId?: string;
  organizationId?: string | null;
  projectId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("activity_logs").insert({
    actor_id: actorId,
    action,
    entity_type: entityType ?? null,
    entity_id: entityId ?? null,
    organization_id: organizationId ?? null,
    project_id: projectId ?? null,
    metadata
  });

  if (error) console.error("Unable to record activity:", error.message);
}

export async function updateLeadAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const leadId = uuidSchema.safeParse(formString(formData, "leadId"));
  const status = z.enum(leadStatuses).safeParse(formString(formData, "status"));
  const returnTo = safeAdminPath(formString(formData, "returnTo"), "/admin/leads");

  if (!leadId.success || !status.success) {
    redirect(withMessage(returnTo, "error", "The lead update was invalid."));
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({
      status: status.data,
      estimated_value: optionalNumber(formData, "estimatedValue"),
      next_follow_up_at: optionalString(formData, "nextFollowUpAt"),
      internal_notes: optionalString(formData, "internalNotes"),
      assigned_to: optionalString(formData, "assignedTo")
    })
    .eq("id", leadId.data);

  if (error) redirect(withMessage(returnTo, "error", error.message));

  await supabase.from("lead_activities").insert({
    lead_id: leadId.data,
    actor_id: viewer.userId,
    activity_type: "lead_updated",
    body: `Lead status changed to ${status.data.replaceAll("_", " ")}.`
  });
  await logActivity({
    actorId: viewer.userId,
    action: "lead_updated",
    entityType: "lead",
    entityId: leadId.data,
    metadata: { status: status.data }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  redirect(withMessage(returnTo, "message", "Lead updated."));
}

export async function addLeadActivityAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const leadId = uuidSchema.safeParse(formString(formData, "leadId"));
  const body = z.string().trim().min(2).max(2000).safeParse(formString(formData, "body"));
  const returnTo = safeAdminPath(formString(formData, "returnTo"), "/admin/leads");

  if (!leadId.success || !body.success) {
    redirect(withMessage(returnTo, "error", "Enter a valid lead note."));
  }

  const supabase = await createClient();
  const { error } = await supabase.from("lead_activities").insert({
    lead_id: leadId.data,
    actor_id: viewer.userId,
    activity_type: "note",
    body: body.data
  });

  if (error) redirect(withMessage(returnTo, "error", error.message));
  revalidatePath("/admin/leads");
  redirect(withMessage(returnTo, "message", "Lead note added."));
}

export async function createProjectAction(formData: FormData) {
  const viewer = await requireStaff();
  const organizationId = uuidSchema.safeParse(formString(formData, "organizationId"));
  const name = z.string().trim().min(2).max(160).safeParse(formString(formData, "name"));
  const slug = slugSchema.safeParse(formString(formData, "slug"));

  if (!organizationId.success || !name.success || !slug.success) {
    redirect(withMessage("/admin/projects", "error", "Complete the project fields."));
  }

  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      organization_id: organizationId.data,
      name: name.data,
      slug: slug.data,
      description: optionalString(formData, "description"),
      status: "planning",
      progress: 0,
      budget: optionalNumber(formData, "budget"),
      start_date: optionalString(formData, "startDate"),
      target_launch_date: optionalString(formData, "targetLaunchDate"),
      created_by: viewer.userId
    })
    .select("id, slug")
    .single();

  if (error || !project) {
    redirect(withMessage("/admin/projects", "error", error?.message ?? "Unable to create project."));
  }

  const { data: organizationMembers } = await supabase
    .from("organization_members")
    .select("user_id, role")
    .eq("organization_id", organizationId.data);

  if (organizationMembers?.length) {
    await supabase.from("project_members").upsert(
      organizationMembers.map((member) => ({
        project_id: project.id,
        user_id: member.user_id,
        role: member.role
      })),
      { onConflict: "project_id,user_id" }
    );
  }

  await logActivity({
    actorId: viewer.userId,
    action: "project_created",
    entityType: "project",
    entityId: project.id,
    organizationId: organizationId.data,
    projectId: project.id,
    metadata: { name: name.data }
  });

  revalidatePath("/admin/projects");
  redirect(withMessage(`/admin/projects/${project.slug}`, "message", "Project created."));
}

export async function updateProjectAction(formData: FormData) {
  const viewer = await requireStaff();
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const status = z.enum(projectStatuses).safeParse(formString(formData, "status"));
  const progress = z.coerce.number().int().min(0).max(100).safeParse(formString(formData, "progress"));
  const slug = formString(formData, "slug");
  const returnTo = `/admin/projects/${slug}`;

  if (!projectId.success || !status.success || !progress.success) {
    redirect(withMessage(returnTo, "error", "The project update was invalid."));
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({
      description: optionalString(formData, "description"),
      status: status.data,
      progress: progress.data,
      budget: optionalNumber(formData, "budget"),
      start_date: optionalString(formData, "startDate"),
      target_launch_date: optionalString(formData, "targetLaunchDate"),
      launched_at: status.data === "launched" ? new Date().toISOString() : null
    })
    .eq("id", projectId.data);

  if (error) redirect(withMessage(returnTo, "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: "project_updated",
    entityType: "project",
    entityId: projectId.data,
    projectId: projectId.data,
    metadata: { status: status.data, progress: progress.data }
  });

  revalidatePath(returnTo);
  revalidatePath("/admin/projects");
  redirect(withMessage(returnTo, "message", "Project updated."));
}

export async function addProjectPhaseAction(formData: FormData) {
  const viewer = await requireStaff();
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const slug = formString(formData, "slug");
  const name = z.string().trim().min(2).max(120).safeParse(formString(formData, "name"));
  const returnTo = `/admin/projects/${slug}`;

  if (!projectId.success || !name.success) {
    redirect(withMessage(returnTo, "error", "Enter a phase name."));
  }

  const supabase = await createClient();
  const { count } = await supabase
    .from("project_phases")
    .select("id", { count: "exact", head: true })
    .eq("project_id", projectId.data);
  const { data, error } = await supabase
    .from("project_phases")
    .insert({
      project_id: projectId.data,
      name: name.data,
      description: optionalString(formData, "description"),
      status: "not_started",
      position: count ?? 0,
      start_date: optionalString(formData, "startDate"),
      due_date: optionalString(formData, "dueDate")
    })
    .select("id")
    .single();

  if (error) redirect(withMessage(returnTo, "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: "phase_created",
    entityType: "project_phase",
    entityId: data?.id,
    projectId: projectId.data,
    metadata: { name: name.data }
  });
  revalidatePath(returnTo);
  redirect(withMessage(returnTo, "message", "Project phase added."));
}

export async function addMilestoneAction(formData: FormData) {
  const viewer = await requireStaff();
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const phaseValue = optionalString(formData, "phaseId");
  const phaseId = phaseValue ? uuidSchema.safeParse(phaseValue) : null;
  const title = z.string().trim().min(2).max(160).safeParse(formString(formData, "title"));
  const slug = formString(formData, "slug");
  const returnTo = `/admin/projects/${slug}`;

  if (!projectId.success || !title.success || (phaseId && !phaseId.success)) {
    redirect(withMessage(returnTo, "error", "Complete the milestone fields."));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("milestones")
    .insert({
      project_id: projectId.data,
      phase_id: phaseId?.success ? phaseId.data : null,
      title: title.data,
      description: optionalString(formData, "description"),
      status: "not_started",
      due_date: optionalString(formData, "dueDate"),
      requires_approval: checkbox(formData, "requiresApproval")
    })
    .select("id")
    .single();

  if (error) redirect(withMessage(returnTo, "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: "milestone_created",
    entityType: "milestone",
    entityId: data?.id,
    projectId: projectId.data,
    metadata: { title: title.data }
  });
  revalidatePath(returnTo);
  redirect(withMessage(returnTo, "message", "Milestone added."));
}

export async function addTaskAction(formData: FormData) {
  const viewer = await requireStaff();
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const milestoneValue = optionalString(formData, "milestoneId");
  const milestoneId = milestoneValue ? uuidSchema.safeParse(milestoneValue) : null;
  const title = z.string().trim().min(2).max(160).safeParse(formString(formData, "title"));
  const slug = formString(formData, "slug");
  const returnTo = `/admin/projects/${slug}`;

  if (!projectId.success || !title.success || (milestoneId && !milestoneId.success)) {
    redirect(withMessage(returnTo, "error", "Complete the task fields."));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      project_id: projectId.data,
      milestone_id: milestoneId?.success ? milestoneId.data : null,
      title: title.data,
      description: optionalString(formData, "description"),
      status: "not_started",
      due_date: optionalString(formData, "dueDate"),
      assigned_to: optionalString(formData, "assignedTo"),
      client_visible: checkbox(formData, "clientVisible")
    })
    .select("id")
    .single();

  if (error) redirect(withMessage(returnTo, "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: "task_created",
    entityType: "task",
    entityId: data?.id,
    projectId: projectId.data,
    metadata: { title: title.data }
  });
  revalidatePath(returnTo);
  revalidatePath("/portal/tasks");
  redirect(withMessage(returnTo, "message", "Task added."));
}

export async function uploadAdminFileAction(formData: FormData) {
  const viewer = await requireStaff();
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const file = formData.get("file");
  const returnTo = safeAdminPath(formString(formData, "returnTo"), "/admin/files");

  if (!projectId.success || !(file instanceof File) || file.size === 0) {
    redirect(withMessage(returnTo, "error", "Choose a project and file."));
  }
  if (file.size > 25 * 1024 * 1024) {
    redirect(withMessage(returnTo, "error", "Files must be 25 MB or smaller."));
  }

  const supabase = await createClient();
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, organization_id")
    .eq("id", projectId.data)
    .single();

  if (projectError || !project) {
    redirect(withMessage(returnTo, "error", "Project not found."));
  }

  const storagePath = `${project.id}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from("project-files")
    .upload(storagePath, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false
    });

  if (uploadError) redirect(withMessage(returnTo, "error", uploadError.message));

  const { data: metadata, error: metadataError } = await supabase
    .from("files")
    .insert({
      organization_id: project.organization_id,
      project_id: project.id,
      uploaded_by: viewer.userId,
      bucket: "project-files",
      storage_path: storagePath,
      file_name: file.name,
      mime_type: file.type || null,
      size_bytes: file.size,
      folder: optionalString(formData, "folder") || "Shared",
      client_visible: checkbox(formData, "clientVisible")
    })
    .select("id")
    .single();

  if (metadataError) {
    await supabase.storage.from("project-files").remove([storagePath]);
    redirect(withMessage(returnTo, "error", metadataError.message));
  }

  await logActivity({
    actorId: viewer.userId,
    action: "file_uploaded",
    entityType: "file",
    entityId: metadata?.id,
    organizationId: project.organization_id,
    projectId: project.id,
    metadata: { fileName: file.name }
  });
  revalidatePath("/admin/files");
  revalidatePath(returnTo);
  redirect(withMessage(returnTo, "message", "File uploaded."));
}

export async function toggleAdminFileVisibilityAction(formData: FormData) {
  const viewer = await requireStaff();
  const fileId = uuidSchema.safeParse(formString(formData, "fileId"));
  const visible = formString(formData, "visible") === "true";
  const returnTo = safeAdminPath(formString(formData, "returnTo"), "/admin/files");
  if (!fileId.success) redirect(withMessage(returnTo, "error", "Invalid file."));

  const supabase = await createClient();
  const { data: file, error } = await supabase
    .from("files")
    .update({ client_visible: visible })
    .eq("id", fileId.data)
    .select("project_id, organization_id")
    .single();
  if (error) redirect(withMessage(returnTo, "error", error.message));

  await logActivity({
    actorId: viewer.userId,
    action: "file_visibility_changed",
    entityType: "file",
    entityId: fileId.data,
    organizationId: file?.organization_id,
    projectId: file?.project_id,
    metadata: { clientVisible: visible }
  });
  revalidatePath("/admin/files");
  revalidatePath(returnTo);
  redirect(withMessage(returnTo, "message", "File visibility updated."));
}

export async function deleteAdminFileAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const fileId = uuidSchema.safeParse(formString(formData, "fileId"));
  const returnTo = safeAdminPath(formString(formData, "returnTo"), "/admin/files");
  if (!fileId.success) redirect(withMessage(returnTo, "error", "Invalid file."));

  const supabase = await createClient();
  const { data: file, error } = await supabase
    .from("files")
    .select("bucket, storage_path, project_id, organization_id, file_name")
    .eq("id", fileId.data)
    .single();
  if (error || !file) redirect(withMessage(returnTo, "error", "File not found."));

  const { error: storageError } = await supabase.storage
    .from(file.bucket)
    .remove([file.storage_path]);
  if (storageError) redirect(withMessage(returnTo, "error", storageError.message));

  const { error: deleteError } = await supabase.from("files").delete().eq("id", fileId.data);
  if (deleteError) redirect(withMessage(returnTo, "error", deleteError.message));

  await logActivity({
    actorId: viewer.userId,
    action: "file_deleted",
    entityType: "file",
    entityId: fileId.data,
    organizationId: file.organization_id,
    projectId: file.project_id,
    metadata: { fileName: file.file_name }
  });
  revalidatePath("/admin/files");
  revalidatePath(returnTo);
  redirect(withMessage(returnTo, "message", "File deleted."));
}

export async function createProposalAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const title = z.string().trim().min(2).max(180).safeParse(formString(formData, "title"));
  const organizationValue = optionalString(formData, "organizationId");
  const leadValue = optionalString(formData, "leadId");
  const projectValue = optionalString(formData, "projectId");

  if (!title.success) redirect(withMessage("/admin/proposals", "error", "Enter a proposal title."));
  for (const value of [organizationValue, leadValue, projectValue]) {
    if (value && !uuidSchema.safeParse(value).success) {
      redirect(withMessage("/admin/proposals", "error", "The proposal relationship was invalid."));
    }
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposals")
    .insert({
      organization_id: organizationValue,
      lead_id: leadValue,
      project_id: projectValue,
      title: title.data,
      status: "draft",
      currency: formString(formData, "currency") || "CAD",
      tax: optionalNumber(formData, "tax") ?? 0,
      expires_at: optionalString(formData, "expiresAt")
    })
    .select("id")
    .single();

  if (error || !data) redirect(withMessage("/admin/proposals", "error", error?.message ?? "Unable to create proposal."));
  await logActivity({
    actorId: viewer.userId,
    action: "proposal_created",
    entityType: "proposal",
    entityId: data.id,
    organizationId: organizationValue,
    projectId: projectValue,
    metadata: { title: title.data }
  });
  revalidatePath("/admin/proposals");
  redirect(withMessage(`/admin/proposals/${data.id}`, "message", "Proposal created."));
}

export async function updateProposalAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const proposalId = uuidSchema.safeParse(formString(formData, "proposalId"));
  const status = z.enum(proposalStatuses).safeParse(formString(formData, "status"));
  const returnTo = proposalId.success ? `/admin/proposals/${proposalId.data}` : "/admin/proposals";
  if (!proposalId.success || !status.success) {
    redirect(withMessage(returnTo, "error", "The proposal update was invalid."));
  }

  const supabase = await createClient();
  const tax = optionalNumber(formData, "tax") ?? 0;
  const { error } = await supabase
    .from("proposals")
    .update({
      title: formString(formData, "title"),
      status: status.data,
      tax,
      expires_at: optionalString(formData, "expiresAt"),
      accepted_at: status.data === "accepted" ? new Date().toISOString() : null
    })
    .eq("id", proposalId.data);
  if (error) redirect(withMessage(returnTo, "error", error.message));
  await supabase.rpc("recalculate_proposal_totals", { target_proposal_id: proposalId.data });
  await logActivity({
    actorId: viewer.userId,
    action: "proposal_updated",
    entityType: "proposal",
    entityId: proposalId.data,
    metadata: { status: status.data }
  });
  revalidatePath(returnTo);
  revalidatePath("/admin/proposals");
  redirect(withMessage(returnTo, "message", "Proposal updated."));
}

export async function addProposalItemAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const proposalId = uuidSchema.safeParse(formString(formData, "proposalId"));
  const title = z.string().trim().min(2).max(180).safeParse(formString(formData, "title"));
  const returnTo = proposalId.success ? `/admin/proposals/${proposalId.data}` : "/admin/proposals";
  if (!proposalId.success || !title.success) {
    redirect(withMessage(returnTo, "error", "Complete the proposal item."));
  }

  const supabase = await createClient();
  const { count } = await supabase
    .from("proposal_items")
    .select("id", { count: "exact", head: true })
    .eq("proposal_id", proposalId.data);
  const { data, error } = await supabase
    .from("proposal_items")
    .insert({
      proposal_id: proposalId.data,
      title: title.data,
      description: optionalString(formData, "description"),
      quantity: optionalNumber(formData, "quantity") ?? 1,
      unit_price: optionalNumber(formData, "unitPrice") ?? 0,
      optional: checkbox(formData, "optional"),
      selected: true,
      position: count ?? 0
    })
    .select("id")
    .single();
  if (error) redirect(withMessage(returnTo, "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: "proposal_item_added",
    entityType: "proposal_item",
    entityId: data?.id,
    metadata: { proposalId: proposalId.data, title: title.data }
  });
  revalidatePath(returnTo);
  redirect(withMessage(returnTo, "message", "Proposal item added."));
}

export async function deleteProposalItemAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const proposalId = uuidSchema.safeParse(formString(formData, "proposalId"));
  const itemId = uuidSchema.safeParse(formString(formData, "itemId"));
  const returnTo = proposalId.success ? `/admin/proposals/${proposalId.data}` : "/admin/proposals";
  if (!proposalId.success || !itemId.success) redirect(withMessage(returnTo, "error", "Invalid proposal item."));
  const supabase = await createClient();
  const { error } = await supabase.from("proposal_items").delete().eq("id", itemId.data);
  if (error) redirect(withMessage(returnTo, "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: "proposal_item_deleted",
    entityType: "proposal_item",
    entityId: itemId.data,
    metadata: { proposalId: proposalId.data }
  });
  revalidatePath(returnTo);
  redirect(withMessage(returnTo, "message", "Proposal item removed."));
}

export async function createInvoiceAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const invoiceNumber = z.string().trim().min(2).max(80).safeParse(formString(formData, "invoiceNumber"));
  const organizationValue = optionalString(formData, "organizationId");
  const projectValue = optionalString(formData, "projectId");
  const proposalValue = optionalString(formData, "proposalId");
  if (!invoiceNumber.success || !organizationValue || !uuidSchema.safeParse(organizationValue).success) {
    redirect(withMessage("/admin/invoices", "error", "Complete the invoice fields."));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .insert({
      organization_id: organizationValue,
      project_id: projectValue,
      proposal_id: proposalValue,
      invoice_number: invoiceNumber.data,
      status: "draft",
      amount_due: optionalNumber(formData, "amountDue") ?? 0,
      amount_paid: 0,
      currency: formString(formData, "currency") || "CAD",
      issued_at: optionalString(formData, "issuedAt"),
      due_at: optionalString(formData, "dueAt"),
      notes: optionalString(formData, "notes")
    })
    .select("id")
    .single();
  if (error || !data) redirect(withMessage("/admin/invoices", "error", error?.message ?? "Unable to create invoice."));
  await logActivity({
    actorId: viewer.userId,
    action: "invoice_created",
    entityType: "invoice",
    entityId: data.id,
    organizationId: organizationValue,
    projectId: projectValue,
    metadata: { invoiceNumber: invoiceNumber.data }
  });
  revalidatePath("/admin/invoices");
  redirect(withMessage("/admin/invoices", "message", "Invoice created."));
}

export async function updateInvoiceAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const invoiceId = uuidSchema.safeParse(formString(formData, "invoiceId"));
  const status = z.enum(invoiceStatuses).safeParse(formString(formData, "status"));
  if (!invoiceId.success || !status.success) {
    redirect(withMessage("/admin/invoices", "error", "Invalid invoice update."));
  }
  const amountPaid = optionalNumber(formData, "amountPaid") ?? 0;
  const supabase = await createClient();
  const { error } = await supabase
    .from("invoices")
    .update({
      status: status.data,
      amount_paid: amountPaid,
      paid_at: status.data === "paid" ? new Date().toISOString() : null,
      notes: optionalString(formData, "notes")
    })
    .eq("id", invoiceId.data);
  if (error) redirect(withMessage("/admin/invoices", "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: "invoice_updated",
    entityType: "invoice",
    entityId: invoiceId.data,
    metadata: { status: status.data, amountPaid }
  });
  revalidatePath("/admin/invoices");
  redirect(withMessage("/admin/invoices", "message", "Invoice updated."));
}

export async function upsertServiceContentAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const idValue = optionalString(formData, "id");
  const slug = slugSchema.safeParse(formString(formData, "slug"));
  const title = z.string().trim().min(2).max(160).safeParse(formString(formData, "title"));
  const summary = z.string().trim().min(10).max(1000).safeParse(formString(formData, "summary"));
  if (!slug.success || !title.success || !summary.success) {
    redirect(withMessage("/admin/content?tab=services", "error", "Complete the service fields."));
  }
  const supabase = await createClient();
  const payload = {
    slug: slug.data,
    title: title.data,
    summary: summary.data,
    position: optionalNumber(formData, "position") ?? 0,
    published: checkbox(formData, "published")
  };
  const query = idValue
    ? supabase.from("services").update(payload).eq("id", idValue).select("id").single()
    : supabase.from("services").insert(payload).select("id").single();
  const { data, error } = await query;
  if (error) redirect(withMessage("/admin/content?tab=services", "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: idValue ? "service_updated" : "service_created",
    entityType: "service",
    entityId: data?.id,
    metadata: { slug: slug.data }
  });
  revalidatePath("/admin/content");
  revalidatePath("/services");
  redirect(withMessage("/admin/content?tab=services", "message", "Service saved."));
}

export async function upsertCaseStudyAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const idValue = optionalString(formData, "id");
  const slug = slugSchema.safeParse(formString(formData, "slug"));
  const title = z.string().trim().min(2).max(160).safeParse(formString(formData, "title"));
  const summary = z.string().trim().min(10).max(1200).safeParse(formString(formData, "summary"));
  if (!slug.success || !title.success || !summary.success) {
    redirect(withMessage("/admin/content?tab=cases", "error", "Complete the case study fields."));
  }
  const supabase = await createClient();
  const payload = {
    slug: slug.data,
    title: title.data,
    category: optionalString(formData, "category"),
    summary: summary.data,
    challenge: optionalString(formData, "challenge"),
    approach: optionalString(formData, "approach"),
    outcome: optionalString(formData, "outcome"),
    cover_image: optionalString(formData, "coverImage"),
    featured: checkbox(formData, "featured"),
    published: checkbox(formData, "published"),
    published_at: checkbox(formData, "published") ? new Date().toISOString() : null
  };
  const query = idValue
    ? supabase.from("case_studies").update(payload).eq("id", idValue).select("id").single()
    : supabase.from("case_studies").insert(payload).select("id").single();
  const { data, error } = await query;
  if (error) redirect(withMessage("/admin/content?tab=cases", "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: idValue ? "case_study_updated" : "case_study_created",
    entityType: "case_study",
    entityId: data?.id,
    metadata: { slug: slug.data }
  });
  revalidatePath("/admin/content");
  revalidatePath("/work");
  redirect(withMessage("/admin/content?tab=cases", "message", "Case study saved."));
}

export async function upsertTestimonialAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const idValue = optionalString(formData, "id");
  const clientName = z.string().trim().min(2).max(120).safeParse(formString(formData, "clientName"));
  const quote = z.string().trim().min(10).max(2000).safeParse(formString(formData, "quote"));
  if (!clientName.success || !quote.success) {
    redirect(withMessage("/admin/content?tab=testimonials", "error", "Complete the testimonial fields."));
  }
  const supabase = await createClient();
  const payload = {
    client_name: clientName.data,
    company: optionalString(formData, "company"),
    quote: quote.data,
    project_id: optionalString(formData, "projectId"),
    published: checkbox(formData, "published"),
    position: optionalNumber(formData, "position") ?? 0
  };
  const query = idValue
    ? supabase.from("testimonials").update(payload).eq("id", idValue).select("id").single()
    : supabase.from("testimonials").insert(payload).select("id").single();
  const { data, error } = await query;
  if (error) redirect(withMessage("/admin/content?tab=testimonials", "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: idValue ? "testimonial_updated" : "testimonial_created",
    entityType: "testimonial",
    entityId: data?.id
  });
  revalidatePath("/admin/content");
  redirect(withMessage("/admin/content?tab=testimonials", "message", "Testimonial saved."));
}

export async function upsertBlogPostAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const idValue = optionalString(formData, "id");
  const slug = slugSchema.safeParse(formString(formData, "slug"));
  const title = z.string().trim().min(2).max(180).safeParse(formString(formData, "title"));
  if (!slug.success || !title.success) {
    redirect(withMessage("/admin/content?tab=posts", "error", "Complete the article fields."));
  }
  const supabase = await createClient();
  const published = checkbox(formData, "published");
  const payload = {
    slug: slug.data,
    title: title.data,
    excerpt: optionalString(formData, "excerpt"),
    cover_image: optionalString(formData, "coverImage"),
    author_id: viewer.userId,
    published,
    published_at: published ? new Date().toISOString() : null
  };
  const query = idValue
    ? supabase.from("blog_posts").update(payload).eq("id", idValue).select("id").single()
    : supabase.from("blog_posts").insert(payload).select("id").single();
  const { data, error } = await query;
  if (error) redirect(withMessage("/admin/content?tab=posts", "error", error.message));
  await logActivity({
    actorId: viewer.userId,
    action: idValue ? "blog_post_updated" : "blog_post_created",
    entityType: "blog_post",
    entityId: data?.id,
    metadata: { slug: slug.data }
  });
  revalidatePath("/admin/content");
  revalidatePath("/insights");
  redirect(withMessage("/admin/content?tab=posts", "message", "Article saved."));
}
