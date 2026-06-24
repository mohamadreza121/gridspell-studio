import "server-only";

import { createClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/supabase/auth";

function throwQueryError(error: { message: string } | null, context: string) {
  if (error) throw new Error(`${context}: ${error.message}`);
}

export async function getAdminDashboard() {
  await requireStaff();
  const supabase = await createClient();
  const [
    leadsResult,
    projectsResult,
    invoicesResult,
    proposalsResult,
    activitiesResult
  ] = await Promise.all([
    supabase.from("leads").select("id, status, estimated_value, created_at, name, company").order("created_at", { ascending: false }).limit(12),
    supabase.from("projects").select("id, name, slug, status, progress, budget, updated_at, organizations(name)").order("updated_at", { ascending: false }).limit(8),
    supabase.from("invoices").select("id, status, amount_due, amount_paid, currency"),
    supabase.from("proposals").select("id, status, total, currency"),
    supabase.from("activity_logs").select("id, action, entity_type, metadata, created_at, profiles(full_name), projects(name), organizations(name)").order("created_at", { ascending: false }).limit(12)
  ]);

  throwQueryError(leadsResult.error, "Unable to load leads");
  throwQueryError(projectsResult.error, "Unable to load projects");
  throwQueryError(invoicesResult.error, "Unable to load invoices");
  throwQueryError(proposalsResult.error, "Unable to load proposals");
  throwQueryError(activitiesResult.error, "Unable to load activity");

  const leads = leadsResult.data ?? [];
  const projects = projectsResult.data ?? [];
  const invoices = invoicesResult.data ?? [];
  const proposals = proposalsResult.data ?? [];
  const pipelineValue = leads
    .filter((lead) => !["won", "lost"].includes(lead.status))
    .reduce((sum, lead) => sum + Number(lead.estimated_value ?? 0), 0);
  const outstanding = invoices.reduce(
    (sum, invoice) => sum + Math.max(0, Number(invoice.amount_due ?? 0) - Number(invoice.amount_paid ?? 0)),
    0
  );

  return {
    leads,
    projects,
    activities: activitiesResult.data ?? [],
    metrics: {
      pipelineValue,
      activeProjects: projects.filter((project) => ["planning", "active", "review"].includes(project.status)).length,
      newLeads: leads.filter((lead) => lead.status === "new").length,
      outstanding,
      proposalsOpen: proposals.filter((proposal) => ["draft", "sent"].includes(proposal.status)).length
    }
  };
}

export async function getAdminLeads(status?: string) {
  await requireStaff(["owner", "admin"]);
  const supabase = await createClient();
  let query = supabase
    .from("leads")
    .select("id, name, email, company, phone, project_type, budget_range, timeline, message, source, status, estimated_value, assigned_to, next_follow_up_at, internal_notes, created_at, profiles(full_name)")
    .order("created_at", { ascending: false });
  if (status && status !== "all") query = query.eq("status", status);

  const [leadsResult, staffResult, activityResult] = await Promise.all([
    query,
    supabase.from("profiles").select("id, full_name, app_user_roles!inner(role)").in("app_user_roles.role", ["owner", "admin", "team_member"]).order("full_name"),
    supabase.from("lead_activities").select("id, lead_id, activity_type, body, created_at, profiles(full_name)").order("created_at", { ascending: false }).limit(100)
  ]);
  throwQueryError(leadsResult.error, "Unable to load leads");
  throwQueryError(staffResult.error, "Unable to load staff");
  throwQueryError(activityResult.error, "Unable to load lead activity");

  return { leads: leadsResult.data ?? [], staff: staffResult.data ?? [], activities: activityResult.data ?? [] };
}

export async function getAdminProjects() {
  await requireStaff();
  const supabase = await createClient();
  const [projectsResult, organizationsResult] = await Promise.all([
    supabase.from("projects").select("id, organization_id, name, slug, description, status, progress, budget, start_date, target_launch_date, updated_at, organizations(name)").order("updated_at", { ascending: false }),
    supabase.from("organizations").select("id, name, slug").order("name")
  ]);
  throwQueryError(projectsResult.error, "Unable to load projects");
  throwQueryError(organizationsResult.error, "Unable to load organizations");
  return { projects: projectsResult.data ?? [], organizations: organizationsResult.data ?? [] };
}

export async function getAdminProject(slug: string) {
  await requireStaff();
  const supabase = await createClient();
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, organization_id, name, slug, description, status, progress, budget, start_date, target_launch_date, updated_at, organizations(name)")
    .eq("slug", slug)
    .maybeSingle();
  throwQueryError(projectError, "Unable to load project");
  if (!project) return null;

  const [phasesResult, milestonesResult, tasksResult, membersResult, filesResult] = await Promise.all([
    supabase.from("project_phases").select("id, name, description, status, position, start_date, due_date").eq("project_id", project.id).order("position"),
    supabase.from("milestones").select("id, phase_id, title, description, status, due_date, requires_approval, approved_at").eq("project_id", project.id).order("due_date", { ascending: true }),
    supabase.from("tasks").select("id, milestone_id, title, description, status, assigned_to, due_date, client_visible, completed_at, profiles(full_name)").eq("project_id", project.id).order("due_date", { ascending: true }),
    supabase.from("project_members").select("user_id, role, profiles(full_name)").eq("project_id", project.id),
    supabase.from("files").select("id, file_name, folder, size_bytes, client_visible, created_at").eq("project_id", project.id).order("created_at", { ascending: false }).limit(10)
  ]);
  throwQueryError(phasesResult.error, "Unable to load phases");
  throwQueryError(milestonesResult.error, "Unable to load milestones");
  throwQueryError(tasksResult.error, "Unable to load tasks");
  throwQueryError(membersResult.error, "Unable to load members");
  throwQueryError(filesResult.error, "Unable to load files");
  return {
    project,
    phases: phasesResult.data ?? [],
    milestones: milestonesResult.data ?? [],
    tasks: tasksResult.data ?? [],
    members: membersResult.data ?? [],
    files: filesResult.data ?? []
  };
}

export async function getAdminFiles(projectId?: string) {
  await requireStaff();
  const supabase = await createClient();
  let query = supabase
    .from("files")
    .select("id, organization_id, project_id, bucket, storage_path, file_name, mime_type, size_bytes, folder, client_visible, created_at, projects(name, slug), organizations(name), profiles(full_name)")
    .order("created_at", { ascending: false });
  if (projectId) query = query.eq("project_id", projectId);

  const [filesResult, projectsResult] = await Promise.all([
    query,
    supabase.from("projects").select("id, name, slug").order("name")
  ]);
  throwQueryError(filesResult.error, "Unable to load files");
  throwQueryError(projectsResult.error, "Unable to load projects");

  const files = await Promise.all(
    (filesResult.data ?? []).map(async (file) => {
      const { data } = await supabase.storage.from(file.bucket).createSignedUrl(file.storage_path, 600);
      return { ...file, downloadUrl: data?.signedUrl ?? null };
    })
  );
  return { files, projects: projectsResult.data ?? [] };
}

export async function getAdminProposals() {
  await requireStaff(["owner", "admin"]);
  const supabase = await createClient();
  const [proposalsResult, organizationsResult, leadsResult, projectsResult] = await Promise.all([
    supabase.from("proposals").select("id, organization_id, lead_id, project_id, title, status, subtotal, tax, total, currency, expires_at, accepted_at, created_at, organizations(name), projects(name), leads(name, company)").order("created_at", { ascending: false }),
    supabase.from("organizations").select("id, name").order("name"),
    supabase.from("leads").select("id, name, company").order("created_at", { ascending: false }).limit(100),
    supabase.from("projects").select("id, name").order("name")
  ]);
  throwQueryError(proposalsResult.error, "Unable to load proposals");
  return {
    proposals: proposalsResult.data ?? [],
    organizations: organizationsResult.data ?? [],
    leads: leadsResult.data ?? [],
    projects: projectsResult.data ?? []
  };
}

export async function getAdminProposal(id: string) {
  await requireStaff(["owner", "admin"]);
  const parsed = /^[0-9a-f-]{36}$/i.test(id);
  if (!parsed) return null;
  const supabase = await createClient();
  const [proposalResult, itemsResult] = await Promise.all([
    supabase.from("proposals").select("id, organization_id, lead_id, project_id, title, status, subtotal, tax, total, currency, public_token, expires_at, accepted_at, created_at, organizations(name), projects(name), leads(name, company)").eq("id", id).maybeSingle(),
    supabase.from("proposal_items").select("id, title, description, quantity, unit_price, optional, selected, position").eq("proposal_id", id).order("position")
  ]);
  throwQueryError(proposalResult.error, "Unable to load proposal");
  throwQueryError(itemsResult.error, "Unable to load proposal items");
  if (!proposalResult.data) return null;
  return { proposal: proposalResult.data, items: itemsResult.data ?? [] };
}

export async function getAdminInvoices() {
  await requireStaff(["owner", "admin"]);
  const supabase = await createClient();
  const [invoicesResult, organizationsResult, projectsResult, proposalsResult] = await Promise.all([
    supabase.from("invoices").select("id, organization_id, project_id, proposal_id, invoice_number, status, amount_due, amount_paid, currency, issued_at, due_at, paid_at, notes, created_at, organizations(name), projects(name)").order("created_at", { ascending: false }),
    supabase.from("organizations").select("id, name").order("name"),
    supabase.from("projects").select("id, name, organization_id").order("name"),
    supabase.from("proposals").select("id, title, organization_id, project_id, total, currency").order("created_at", { ascending: false })
  ]);
  throwQueryError(invoicesResult.error, "Unable to load invoices");
  return {
    invoices: invoicesResult.data ?? [],
    organizations: organizationsResult.data ?? [],
    projects: projectsResult.data ?? [],
    proposals: proposalsResult.data ?? []
  };
}

export async function getAdminContent() {
  await requireStaff(["owner", "admin"]);
  const supabase = await createClient();
  const [services, cases, testimonials, posts, projects] = await Promise.all([
    supabase.from("services").select("id, slug, title, summary, position, published, updated_at").order("position"),
    supabase.from("case_studies").select("id, slug, title, category, summary, challenge, approach, outcome, cover_image, featured, published, updated_at").order("updated_at", { ascending: false }),
    supabase.from("testimonials").select("id, client_name, company, quote, project_id, published, position, created_at").order("position"),
    supabase.from("blog_posts").select("id, slug, title, excerpt, cover_image, published, published_at, updated_at").order("updated_at", { ascending: false }),
    supabase.from("projects").select("id, name").order("name")
  ]);
  throwQueryError(services.error, "Unable to load services");
  throwQueryError(cases.error, "Unable to load case studies");
  throwQueryError(testimonials.error, "Unable to load testimonials");
  throwQueryError(posts.error, "Unable to load posts");
  return {
    services: services.data ?? [],
    cases: cases.data ?? [],
    testimonials: testimonials.data ?? [],
    posts: posts.data ?? [],
    projects: projects.data ?? []
  };
}

export async function getAdminActivity() {
  await requireStaff();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activity_logs")
    .select("id, action, entity_type, entity_id, metadata, created_at, profiles(full_name), organizations(name), projects(name)")
    .order("created_at", { ascending: false })
    .limit(200);
  throwQueryError(error, "Unable to load activity logs");
  return data ?? [];
}
