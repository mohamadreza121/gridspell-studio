import "server-only";

import { createClient } from "@/lib/supabase/server";
import { requirePortalUser } from "@/lib/supabase/auth";

export type PortalProject = {
  id: string;
  organization_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  progress: number;
  budget: number | null;
  start_date: string | null;
  target_launch_date: string | null;
  updated_at: string;
};

export type PortalOrganization = {
  id: string;
  name: string;
  slug: string;
  website: string | null;
};

export type PortalContext = {
  viewer: Awaited<ReturnType<typeof requirePortalUser>>;
  organizations: PortalOrganization[];
  workspaceLabel: string | null;
  initials: string;
};

function makeInitials(fullName: string | null, email: string | null) {
  const source = fullName?.trim() || email?.split("@")[0] || "GS";
  const words = source.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words.at(-1)?.[0] ?? ""}`.toUpperCase();
}

function throwQueryError(error: { message: string } | null, label: string) {
  if (error) throw new Error(`${label}: ${error.message}`);
}

export async function getPortalContext(): Promise<PortalContext> {
  const viewer = await requirePortalUser();
  const supabase = await createClient();
  const organizationIds = viewer.organizationMemberships.map(
    (item) => item.organizationId
  );

  let organizations: PortalOrganization[] = [];
  if (organizationIds.length > 0) {
    const { data, error } = await supabase
      .from("organizations")
      .select("id, name, slug, website")
      .in("id", organizationIds)
      .order("name");

    throwQueryError(error, "Unable to load organizations");
    organizations = (data ?? []) as PortalOrganization[];
  }

  return {
    viewer,
    organizations,
    workspaceLabel:
      organizations[0]?.name ?? (viewer.staffRole ? "GridSpell operations" : null),
    initials: makeInitials(viewer.fullName, viewer.email)
  };
}

export function canContributeToProject(context: PortalContext, project: PortalProject) {
  if (context.viewer.staffRole) return true;
  if (!project.organization_id) return false;
  return context.viewer.organizationMemberships.some(
    (membership) =>
      membership.organizationId === project.organization_id &&
      membership.role !== "client_viewer"
  );
}

export async function getPortalProjects() {
  const context = await getPortalContext();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, organization_id, name, slug, description, status, progress, budget, start_date, target_launch_date, updated_at"
    )
    .order("updated_at", { ascending: false });

  throwQueryError(error, "Unable to load projects");
  const projects = (data ?? []) as PortalProject[];

  return {
    ...context,
    projects: projects.map((project) => ({
      ...project,
      canContribute: canContributeToProject(context, project)
    }))
  };
}

export async function getPortalOverview() {
  const projectData = await getPortalProjects();
  const project =
    projectData.projects.find((item) => item.status === "active") ??
    projectData.projects[0] ??
    null;

  if (!project) {
    return {
      ...projectData,
      project: null,
      phases: [],
      milestones: [],
      tasks: [],
      approvals: [],
      messages: [],
      invoices: []
    };
  }

  const supabase = await createClient();
  const [
    phasesResult,
    milestonesResult,
    tasksResult,
    approvalsResult,
    messagesResult,
    invoicesResult
  ] = await Promise.all([
    supabase
      .from("project_phases")
      .select("id, name, description, status, position, start_date, due_date")
      .eq("project_id", project.id)
      .order("position"),
    supabase
      .from("milestones")
      .select("id, title, description, status, due_date, requires_approval, approved_at")
      .eq("project_id", project.id)
      .order("due_date", { ascending: true }),
    supabase
      .from("tasks")
      .select(
        "id, title, description, status, due_date, assigned_to, completed_at, completed_by"
      )
      .eq("project_id", project.id)
      .order("due_date", { ascending: true }),
    supabase
      .from("approvals")
      .select("id, title, description, status, decision_note, decided_at, created_at")
      .eq("project_id", project.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("messages")
      .select("id, sender_id, body, created_at")
      .eq("project_id", project.id)
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("invoices")
      .select(
        "id, invoice_number, status, amount_due, amount_paid, currency, issued_at, due_at"
      )
      .eq("project_id", project.id)
      .order("created_at", { ascending: false })
      .limit(3)
  ]);

  throwQueryError(phasesResult.error, "Unable to load phases");
  throwQueryError(milestonesResult.error, "Unable to load milestones");
  throwQueryError(tasksResult.error, "Unable to load tasks");
  throwQueryError(approvalsResult.error, "Unable to load approvals");
  throwQueryError(messagesResult.error, "Unable to load messages");
  throwQueryError(invoicesResult.error, "Unable to load invoices");

  return {
    ...projectData,
    project,
    phases: phasesResult.data ?? [],
    milestones: milestonesResult.data ?? [],
    tasks: tasksResult.data ?? [],
    approvals: approvalsResult.data ?? [],
    messages: messagesResult.data ?? [],
    invoices: invoicesResult.data ?? []
  };
}

export async function getPortalProject(slug: string) {
  const projectData = await getPortalProjects();
  const project = projectData.projects.find((item) => item.slug === slug) ?? null;
  if (!project) return { ...projectData, project: null };

  const supabase = await createClient();
  const [phasesResult, milestonesResult, tasksResult, approvalsResult] =
    await Promise.all([
      supabase
        .from("project_phases")
        .select("id, name, description, status, position, start_date, due_date")
        .eq("project_id", project.id)
        .order("position"),
      supabase
        .from("milestones")
        .select(
          "id, phase_id, title, description, status, due_date, requires_approval, approved_at"
        )
        .eq("project_id", project.id)
        .order("due_date", { ascending: true }),
      supabase
        .from("tasks")
        .select(
          "id, milestone_id, title, description, status, due_date, assigned_to, completed_at, completed_by"
        )
        .eq("project_id", project.id)
        .order("due_date", { ascending: true }),
      supabase
        .from("approvals")
        .select(
          "id, milestone_id, title, description, status, decision_note, decided_at, created_at"
        )
        .eq("project_id", project.id)
        .order("created_at", { ascending: false })
    ]);

  throwQueryError(phasesResult.error, "Unable to load phases");
  throwQueryError(milestonesResult.error, "Unable to load milestones");
  throwQueryError(tasksResult.error, "Unable to load tasks");
  throwQueryError(approvalsResult.error, "Unable to load approvals");

  return {
    ...projectData,
    project,
    phases: phasesResult.data ?? [],
    milestones: milestonesResult.data ?? [],
    tasks: tasksResult.data ?? [],
    approvals: approvalsResult.data ?? []
  };
}

export async function getPortalFiles() {
  const projectData = await getPortalProjects();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("files")
    .select(
      "id, organization_id, project_id, uploaded_by, bucket, storage_path, file_name, mime_type, size_bytes, folder, created_at"
    )
    .order("created_at", { ascending: false });

  throwQueryError(error, "Unable to load files");

  const files = await Promise.all(
    (data ?? []).map(
      async (file: {
        id: string;
        organization_id: string | null;
        project_id: string | null;
        uploaded_by: string | null;
        bucket: string;
        storage_path: string;
        file_name: string;
        mime_type: string | null;
        size_bytes: number | null;
        folder: string | null;
        created_at: string;
      }) => {
        const { data: signed } = await supabase.storage
          .from(file.bucket)
          .createSignedUrl(file.storage_path, 60 * 10);
        return { ...file, downloadUrl: signed?.signedUrl ?? null };
      }
    )
  );

  return { ...projectData, files };
}

export async function getPortalMessages(selectedProjectId?: string) {
  const projectData = await getPortalProjects();
  const selectedProject =
    projectData.projects.find((item) => item.id === selectedProjectId) ??
    projectData.projects[0] ??
    null;

  if (!selectedProject) {
    return {
      ...projectData,
      selectedProject: null,
      messages: [],
      profileNames: {} as Record<string, string>
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("id, project_id, sender_id, body, parent_id, created_at, edited_at")
    .eq("project_id", selectedProject.id)
    .order("created_at", { ascending: true });

  throwQueryError(error, "Unable to load messages");
  const messages = data ?? [];
  const senderIds = [
    ...new Set(messages.map((item) => item.sender_id).filter(Boolean))
  ] as string[];
  let profileNames: Record<string, string> = {};

  if (senderIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", senderIds);

    profileNames = Object.fromEntries(
      (profiles ?? []).map((profile: { id: string; full_name: string | null }) => [
        profile.id,
        profile.full_name || "Workspace member"
      ])
    );
  }

  return { ...projectData, selectedProject, messages, profileNames };
}

export async function getPortalBilling() {
  const projectData = await getPortalProjects();
  const supabase = await createClient();
  const { data: invoices, error } = await supabase
    .from("invoices")
    .select(
      "id, project_id, proposal_id, invoice_number, status, amount_due, amount_paid, currency, issued_at, due_at, paid_at, created_at"
    )
    .order("created_at", { ascending: false });

  throwQueryError(error, "Unable to load invoices");
  const invoiceIds = (invoices ?? []).map((invoice) => invoice.id);
  let payments: Array<{
    id: string;
    invoice_id: string | null;
    project_id: string | null;
    amount: number;
    currency: string;
    status: string;
    paid_at: string | null;
    created_at: string;
  }> = [];

  if (invoiceIds.length > 0) {
    const { data, error: paymentError } = await supabase
      .from("payments")
      .select("id, invoice_id, project_id, amount, currency, status, paid_at, created_at")
      .in("invoice_id", invoiceIds)
      .order("created_at", { ascending: false });
    throwQueryError(paymentError, "Unable to load payments");
    payments = data ?? [];
  }

  return { ...projectData, invoices: invoices ?? [], payments };
}

export async function getPortalSupport() {
  const projectData = await getPortalProjects();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("support_tickets")
    .select(
      "id, organization_id, project_id, subject, body, priority, status, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  throwQueryError(error, "Unable to load support tickets");
  return { ...projectData, tickets: data ?? [] };
}

export async function getPortalTasks() {
  const projectData = await getPortalProjects();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select(
      "id, project_id, milestone_id, title, description, status, due_date, assigned_to, completed_at, completed_by, updated_at"
    )
    .order("status", { ascending: true })
    .order("due_date", { ascending: true, nullsFirst: false });

  throwQueryError(error, "Unable to load tasks");
  const projectsById = Object.fromEntries(
    projectData.projects.map((project) => [project.id, project])
  );

  return {
    ...projectData,
    tasks: (data ?? []).map((task) => ({
      ...task,
      project: projectsById[task.project_id] ?? null,
      canContribute: Boolean(projectsById[task.project_id]?.canContribute)
    }))
  };
}

export async function getPortalApprovals() {
  const projectData = await getPortalProjects();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("approvals")
    .select(
      "id, project_id, milestone_id, title, description, status, decision_note, decided_at, created_at"
    )
    .order("created_at", { ascending: false });

  throwQueryError(error, "Unable to load approvals");
  const projectsById = Object.fromEntries(
    projectData.projects.map((project) => [project.id, project])
  );

  return {
    ...projectData,
    approvals: (data ?? []).map((approval) => ({
      ...approval,
      project: projectsById[approval.project_id] ?? null,
      canContribute: Boolean(projectsById[approval.project_id]?.canContribute)
    }))
  };
}
