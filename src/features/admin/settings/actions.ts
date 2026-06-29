"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/supabase/auth";

const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(100)
});

function withMessage(key: "error" | "message", message: string) {
  return `/admin/settings?${key}=${encodeURIComponent(message)}`;
}

function isoDate(daysFromToday: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromToday);
  return date.toISOString().slice(0, 10);
}

function isoDateTime(daysFromToday: number, hours = 12) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromToday);
  date.setUTCHours(hours, 0, 0, 0);
  return date.toISOString();
}

export async function updateAdminProfileAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin", "team_member"]);
  const parsed = profileSchema.safeParse({
    fullName: String(formData.get("fullName") ?? "")
  });

  if (!parsed.success) {
    redirect(withMessage("error", "Enter a valid display name."));
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: parsed.data.fullName })
    .eq("id", viewer.userId);

  if (error) redirect(withMessage("error", error.message));

  revalidatePath("/admin", "layout");
  redirect(withMessage("message", "Profile settings saved."));
}

export async function createPortalDemoWorkspaceAction() {
  const viewer = await requireStaff(["owner", "admin"]);
  const admin = createAdminClient();
  const suffix = viewer.userId.replaceAll("-", "").slice(0, 8).toLowerCase();
  const organizationSlug = `gridspell-demo-${suffix}`;
  const projectSlug = `client-portal-demo-${suffix}`;

  const { data: existingOrganization, error: organizationLookupError } = await admin
    .from("organizations")
    .select("id")
    .eq("slug", organizationSlug)
    .maybeSingle();

  if (organizationLookupError) {
    redirect(withMessage("error", organizationLookupError.message));
  }

  let organizationId = existingOrganization?.id ?? null;

  if (!organizationId) {
    const { data: organization, error } = await admin
      .from("organizations")
      .insert({
        name: "GridSpell Portal Demo",
        slug: organizationSlug,
        website: "https://example.com"
      })
      .select("id")
      .single();

    if (error || !organization) {
      redirect(withMessage("error", error?.message ?? "Could not create demo organization."));
    }

    organizationId = organization.id;
  }

  const { data: existingProject, error: projectLookupError } = await admin
    .from("projects")
    .select("id")
    .eq("slug", projectSlug)
    .maybeSingle();

  if (projectLookupError) redirect(withMessage("error", projectLookupError.message));

  let projectId = existingProject?.id ?? null;
  let created = false;

  if (!projectId) {
    const { data: project, error } = await admin
      .from("projects")
      .insert({
        organization_id: organizationId,
        name: "Northstar Website Rebuild",
        slug: projectSlug,
        description:
          "A complete demonstration workspace for testing the GridSpell client portal.",
        status: "active",
        progress: 64,
        budget: 12500,
        start_date: isoDate(-21),
        target_launch_date: isoDate(42),
        created_by: viewer.userId
      })
      .select("id")
      .single();

    if (error || !project) {
      redirect(withMessage("error", error?.message ?? "Could not create demo project."));
    }

    projectId = project.id;
    created = true;
  } else {
    const { error } = await admin
      .from("projects")
      .update({
        status: "active",
        progress: 64,
        description:
          "A complete demonstration workspace for testing the GridSpell client portal.",
        target_launch_date: isoDate(42),
        updated_at: new Date().toISOString()
      })
      .eq("id", projectId);

    if (error) redirect(withMessage("error", error.message));
  }

  await admin.from("project_members").upsert(
    {
      project_id: projectId,
      user_id: viewer.userId,
      role: viewer.staffRole ?? "admin"
    },
    { onConflict: "project_id,user_id" }
  );

  if (created) {
    const phaseRows = [
      {
        id: randomUUID(),
        project_id: projectId,
        name: "Discovery",
        description: "Goals, audience, content requirements, and success criteria.",
        status: "completed",
        position: 1,
        start_date: isoDate(-21),
        due_date: isoDate(-15)
      },
      {
        id: randomUUID(),
        project_id: projectId,
        name: "Strategy",
        description: "Sitemap, content hierarchy, and conversion planning.",
        status: "completed",
        position: 2,
        start_date: isoDate(-14),
        due_date: isoDate(-8)
      },
      {
        id: randomUUID(),
        project_id: projectId,
        name: "Design",
        description: "Responsive visual direction and page design review.",
        status: "in_progress",
        position: 3,
        start_date: isoDate(-7),
        due_date: isoDate(10)
      },
      {
        id: randomUUID(),
        project_id: projectId,
        name: "Development",
        description: "Production implementation, integrations, and content setup.",
        status: "not_started",
        position: 4,
        start_date: isoDate(11),
        due_date: isoDate(28)
      },
      {
        id: randomUUID(),
        project_id: projectId,
        name: "Launch",
        description: "Quality assurance, release, monitoring, and handoff.",
        status: "not_started",
        position: 5,
        start_date: isoDate(29),
        due_date: isoDate(42)
      }
    ];

    const { error: phasesError } = await admin.from("project_phases").insert(phaseRows);
    if (phasesError) redirect(withMessage("error", phasesError.message));

    const designPhaseId = phaseRows[2].id;
    const milestoneRows = [
      {
        id: randomUUID(),
        project_id: projectId,
        phase_id: designPhaseId,
        title: "Homepage design direction",
        description: "Review typography, layout, motion, and visual hierarchy.",
        status: "in_review",
        due_date: isoDate(3),
        requires_approval: true
      },
      {
        id: randomUUID(),
        project_id: projectId,
        phase_id: designPhaseId,
        title: "Core page designs",
        description: "Services, work, process, pricing, and contact page delivery.",
        status: "in_progress",
        due_date: isoDate(10),
        requires_approval: true
      }
    ];

    const { error: milestoneError } = await admin.from("milestones").insert(milestoneRows);
    if (milestoneError) redirect(withMessage("error", milestoneError.message));

    const { error: tasksError } = await admin.from("tasks").insert([
      {
        project_id: projectId,
        milestone_id: milestoneRows[0].id,
        title: "Review homepage design direction",
        description: "Open Approvals and approve the direction or request changes.",
        status: "in_review",
        due_date: isoDate(3),
        client_visible: true
      },
      {
        project_id: projectId,
        milestone_id: milestoneRows[1].id,
        title: "Upload final service-page copy",
        description: "Use Files to provide the remaining approved copy.",
        status: "in_progress",
        due_date: isoDate(6),
        client_visible: true
      },
      {
        project_id: projectId,
        milestone_id: milestoneRows[1].id,
        title: "Confirm domain access",
        description: "Confirm where the production domain is currently managed.",
        status: "not_started",
        due_date: isoDate(12),
        client_visible: true
      }
    ]);
    if (tasksError) redirect(withMessage("error", tasksError.message));

    const { error: approvalError } = await admin.from("approvals").insert({
      project_id: projectId,
      milestone_id: milestoneRows[0].id,
      title: "Homepage design direction",
      description:
        "Review the proposed typography, gradient system, responsive layout, and motion direction.",
      status: "in_review",
      requested_by: viewer.userId
    });
    if (approvalError) redirect(withMessage("error", approvalError.message));

    const { error: messageError } = await admin.from("messages").insert([
      {
        project_id: projectId,
        sender_id: viewer.userId,
        body: "Welcome to the demo project workspace. Use this thread to test client and admin communication.",
        created_at: isoDateTime(-2, 14)
      },
      {
        project_id: projectId,
        sender_id: viewer.userId,
        body: "The homepage approval is ready. Review it from the Approvals section when you are ready.",
        created_at: isoDateTime(-1, 16)
      }
    ]);
    if (messageError) redirect(withMessage("error", messageError.message));

    const invoiceNumber = `DEMO-${suffix.toUpperCase()}`;
    const { error: invoiceError } = await admin.from("invoices").insert({
      organization_id: organizationId,
      project_id: projectId,
      invoice_number: invoiceNumber,
      status: "open",
      amount_due: 6250,
      amount_paid: 3125,
      currency: "CAD",
      issued_at: isoDateTime(-10, 12),
      due_at: isoDateTime(7, 12)
    });
    if (invoiceError) redirect(withMessage("error", invoiceError.message));

    const { error: supportError } = await admin.from("support_tickets").insert({
      organization_id: organizationId,
      project_id: projectId,
      created_by: viewer.userId,
      subject: "Demo content update request",
      body: "This sample request verifies that client support tickets appear in the admin communications inbox.",
      priority: "normal"
    });
    if (supportError) redirect(withMessage("error", supportError.message));
  }

  await admin.from("activity_logs").insert({
    actor_id: viewer.userId,
    organization_id: organizationId,
    project_id: projectId,
    action: created ? "demo_workspace_created" : "demo_workspace_refreshed",
    entity_type: "project",
    entity_id: projectId,
    metadata: { projectSlug }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  revalidatePath("/admin/projects");
  revalidatePath("/portal", "layout");
  redirect(
    `/admin/settings?message=${encodeURIComponent(
      created ? "Demo workspace created." : "Demo workspace refreshed."
    )}&demo=${encodeURIComponent(projectSlug)}`
  );
}
