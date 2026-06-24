"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getPortalContext, getPortalProjects } from "@/features/portal/data";

const uuidSchema = z.string().uuid();
const messageSchema = z.string().trim().min(1).max(4000);
const noteSchema = z.string().trim().max(2000);

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function withMessage(path: string, key: "error" | "message", message: string) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${key}=${encodeURIComponent(message)}`;
}

function safePortalReturnPath(value: string, fallback: string) {
  return value.startsWith("/portal") && !value.startsWith("//") ? value : fallback;
}

function safeFileName(name: string) {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return cleaned || "project-file";
}

async function requireContributingProject(projectId: string) {
  const projectData = await getPortalProjects();
  const project = projectData.projects.find((item) => item.id === projectId);

  if (!project) throw new Error("Project not found or access was denied.");
  if (!project.canContribute) throw new Error("This workspace role is read-only.");

  return { projectData, project };
}

export async function sendProjectMessageAction(formData: FormData) {
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const message = messageSchema.safeParse(formString(formData, "message"));

  if (!projectId.success || !message.success) {
    redirect(withMessage("/portal/messages", "error", "Enter a message before sending."));
  }

  try {
    const { projectData } = await requireContributingProject(projectId.data);
    const supabase = await createClient();
    const { error } = await supabase.from("messages").insert({
      project_id: projectId.data,
      sender_id: projectData.viewer.userId,
      body: message.data
    });

    if (error) throw error;
  } catch (error) {
    const messageText =
      error instanceof Error ? error.message : "Unable to send the message.";
    redirect(
      withMessage(`/portal/messages?project=${projectId.data}`, "error", messageText)
    );
  }

  revalidatePath("/portal/messages");
  revalidatePath("/portal");
  redirect(
    withMessage(`/portal/messages?project=${projectId.data}`, "message", "Message sent.")
  );
}

export async function uploadProjectFileAction(formData: FormData) {
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const folder = formString(formData, "folder").slice(0, 80) || "Shared";
  const file = formData.get("file");

  if (!projectId.success || !(file instanceof File) || file.size === 0) {
    redirect(withMessage("/portal/files", "error", "Choose a project and a file."));
  }

  if (file.size > 10 * 1024 * 1024) {
    redirect(withMessage("/portal/files", "error", "Files must be 10 MB or smaller."));
  }

  const allowedMimeTypes = new Set([
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/webp",
    "text/plain",
    "application/zip",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ]);

  if (file.type && !allowedMimeTypes.has(file.type)) {
    redirect(withMessage("/portal/files", "error", "That file type is not allowed."));
  }

  const { projectData, project } = await requireContributingProject(projectId.data);
  const supabase = await createClient();
  const fileName = safeFileName(file.name);
  const storagePath = `${project.id}/${crypto.randomUUID()}-${fileName}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("project-files")
    .upload(storagePath, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false
    });

  if (uploadError) {
    redirect(withMessage("/portal/files", "error", uploadError.message));
  }

  const { error: metadataError } = await supabase.from("files").insert({
    organization_id: project.organization_id,
    project_id: project.id,
    uploaded_by: projectData.viewer.userId,
    bucket: "project-files",
    storage_path: storagePath,
    file_name: file.name,
    mime_type: file.type || null,
    size_bytes: file.size,
    folder,
    client_visible: true
  });

  if (metadataError) {
    await supabase.storage.from("project-files").remove([storagePath]);
    redirect(withMessage("/portal/files", "error", metadataError.message));
  }

  revalidatePath("/portal/files");
  redirect(withMessage("/portal/files", "message", "File uploaded successfully."));
}

export async function decideApprovalAction(formData: FormData) {
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const approvalId = uuidSchema.safeParse(formString(formData, "approvalId"));
  const decision = formString(formData, "decision");
  const note = noteSchema.safeParse(formString(formData, "note"));
  const returnTo = safePortalReturnPath(
    formString(formData, "returnTo"),
    "/portal/approvals"
  );

  if (
    !projectId.success ||
    !approvalId.success ||
    !note.success ||
    !["approve", "changes"].includes(decision)
  ) {
    redirect(withMessage(returnTo, "error", "The approval response was invalid."));
  }

  const { projectData, project } = await requireContributingProject(projectId.data);
  const supabase = await createClient();
  const { error } = await supabase
    .from("approvals")
    .update({
      status: decision === "approve" ? "approved" : "blocked",
      decided_by: projectData.viewer.userId,
      decision_note:
        note.data ||
        (decision === "approve" ? "Approved by client" : "Changes requested"),
      decided_at: new Date().toISOString()
    })
    .eq("id", approvalId.data)
    .eq("project_id", project.id);

  if (error) {
    redirect(withMessage(returnTo, "error", error.message));
  }

  revalidatePath(`/portal/projects/${project.slug}`);
  revalidatePath("/portal/approvals");
  revalidatePath("/portal");
  redirect(
    withMessage(
      returnTo,
      "message",
      decision === "approve" ? "Approval recorded." : "Your change request was sent."
    )
  );
}

export async function setClientTaskStatusAction(formData: FormData) {
  const taskId = uuidSchema.safeParse(formString(formData, "taskId"));
  const projectSlug = formString(formData, "projectSlug");
  const requestedStatus = formString(formData, "status");
  const returnTo = safePortalReturnPath(
    formString(formData, "returnTo"),
    projectSlug ? `/portal/projects/${projectSlug}` : "/portal/tasks"
  );

  if (
    !taskId.success ||
    !["not_started", "in_progress", "completed"].includes(requestedStatus)
  ) {
    redirect(withMessage(returnTo, "error", "The task update was invalid."));
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("set_client_task_status", {
    target_task_id: taskId.data,
    target_status: requestedStatus
  });

  if (error) {
    redirect(withMessage(returnTo, "error", error.message));
  }

  revalidatePath("/portal/tasks");
  revalidatePath("/portal");
  if (projectSlug) revalidatePath(`/portal/projects/${projectSlug}`);

  const message =
    requestedStatus === "completed"
      ? "Task marked complete."
      : requestedStatus === "in_progress"
        ? "Task marked in progress."
        : "Task reopened.";

  redirect(withMessage(returnTo, "message", message));
}

export async function createSupportTicketAction(formData: FormData) {
  const context = await getPortalContext();
  const projectIdValue = formString(formData, "projectId");
  const projectId = projectIdValue ? uuidSchema.safeParse(projectIdValue) : null;
  const subject = z
    .string()
    .trim()
    .min(4)
    .max(160)
    .safeParse(formString(formData, "subject"));
  const body = z
    .string()
    .trim()
    .min(10)
    .max(5000)
    .safeParse(formString(formData, "body"));
  const priorityValue = formString(formData, "priority");
  const priority = priorityValue === "urgent" ? "urgent" : "normal";

  if ((projectId && !projectId.success) || !subject.success || !body.success) {
    redirect(
      withMessage("/portal/support", "error", "Complete the support request fields.")
    );
  }

  let organizationId: string | null = context.organizations[0]?.id ?? null;
  if (projectId?.success) {
    const { project } = await requireContributingProject(projectId.data);
    organizationId = project.organization_id;
  }

  if (!organizationId) {
    redirect(
      withMessage("/portal/support", "error", "No client organization is available.")
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("support_tickets").insert({
    organization_id: organizationId,
    project_id: projectId?.success ? projectId.data : null,
    created_by: context.viewer.userId,
    subject: subject.data,
    body: body.data,
    priority
  });

  if (error) redirect(withMessage("/portal/support", "error", error.message));

  revalidatePath("/portal/support");
  redirect(withMessage("/portal/support", "message", "Support request created."));
}
