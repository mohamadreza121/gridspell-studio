import "server-only";

import { requireStaff } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

function throwQueryError(error: { message: string } | null, context: string) {
  if (error) throw new Error(`${context}: ${error.message}`);
}

export async function getAdminCommunications(selectedProjectId?: string) {
  await requireStaff(["owner", "admin", "team_member"]);
  const supabase = await createClient();

  const projectsResult = await supabase
    .from("projects")
    .select("id, name, slug, organization_id, organizations(name)")
    .order("updated_at", { ascending: false });
  throwQueryError(projectsResult.error, "Unable to load projects");

  const projects = projectsResult.data ?? [];
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0] ?? null;

  let messages: Array<{
    id: string;
    project_id: string;
    sender_id: string | null;
    body: string;
    created_at: string;
    edited_at: string | null;
  }> = [];

  if (selectedProject) {
    const messageResult = await supabase
      .from("messages")
      .select("id, project_id, sender_id, body, created_at, edited_at")
      .eq("project_id", selectedProject.id)
      .order("created_at", { ascending: true });
    throwQueryError(messageResult.error, "Unable to load project messages");
    messages = messageResult.data ?? [];
  }

  const ticketResult = await supabase
    .from("support_tickets")
    .select(
      "id, organization_id, project_id, created_by, subject, body, priority, status, created_at, updated_at, projects(name, slug), organizations(name)"
    )
    .order("status", { ascending: true })
    .order("updated_at", { ascending: false });
  throwQueryError(ticketResult.error, "Unable to load support requests");

  const profileIds = [
    ...new Set([
      ...messages.map((message) => message.sender_id),
      ...(ticketResult.data ?? []).map((ticket) => ticket.created_by)
    ].filter(Boolean))
  ] as string[];

  let profileNames: Record<string, string> = {};
  if (profileIds.length) {
    const profileResult = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", profileIds);
    throwQueryError(profileResult.error, "Unable to load communication profiles");
    profileNames = Object.fromEntries(
      (profileResult.data ?? []).map((profile) => [
        profile.id,
        profile.full_name || "Workspace member"
      ])
    );
  }

  return {
    projects,
    selectedProject,
    messages,
    tickets: ticketResult.data ?? [],
    profileNames
  };
}
