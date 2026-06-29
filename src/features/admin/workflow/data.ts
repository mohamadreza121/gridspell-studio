import "server-only";

import { requireStaff } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

function throwQueryError(error: { message: string } | null, context: string) {
  if (error) throw new Error(`${context}: ${error.message}`);
}

export async function getAdminWorkflow(projectId?: string) {
  await requireStaff(["owner", "admin", "team_member"]);
  const supabase = await createClient();

  const projectsResult = await supabase
    .from("projects")
    .select("id, name, slug, status, progress, organizations(name)")
    .order("updated_at", { ascending: false });
  throwQueryError(projectsResult.error, "Unable to load workflow projects");

  const projects = projectsResult.data ?? [];
  const selectedProject =
    projects.find((project) => project.id === projectId) ?? projects[0] ?? null;

  if (!selectedProject) {
    return { projects, selectedProject: null, phases: [], milestones: [], tasks: [] };
  }

  const [phasesResult, milestonesResult, tasksResult] = await Promise.all([
    supabase
      .from("project_phases")
      .select("id, project_id, name, description, status, position, start_date, due_date")
      .eq("project_id", selectedProject.id)
      .order("position"),
    supabase
      .from("milestones")
      .select("id, project_id, phase_id, title, description, status, due_date, requires_approval")
      .eq("project_id", selectedProject.id)
      .order("due_date", { ascending: true }),
    supabase
      .from("tasks")
      .select("id, project_id, milestone_id, title, description, status, due_date, client_visible")
      .eq("project_id", selectedProject.id)
      .order("due_date", { ascending: true })
  ]);

  throwQueryError(phasesResult.error, "Unable to load phases");
  throwQueryError(milestonesResult.error, "Unable to load milestones");
  throwQueryError(tasksResult.error, "Unable to load tasks");

  return {
    projects,
    selectedProject,
    phases: phasesResult.data ?? [],
    milestones: milestonesResult.data ?? [],
    tasks: tasksResult.data ?? []
  };
}
