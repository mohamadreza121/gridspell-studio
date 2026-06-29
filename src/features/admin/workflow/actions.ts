"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireStaff } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

const uuidSchema = z.string().uuid();
const itemStatuses = [
  "not_started",
  "in_progress",
  "blocked",
  "in_review",
  "approved",
  "completed"
] as const;

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function returnPath(projectId: string, key?: "error" | "message", value?: string) {
  const params = new URLSearchParams({ project: projectId });
  if (key && value) params.set(key, value);
  return `/admin/workflow?${params.toString()}`;
}

async function updateWorkflowItem(
  formData: FormData,
  table: "project_phases" | "milestones" | "tasks",
  idField: "phaseId" | "milestoneId" | "taskId",
  activityAction: string
) {
  const viewer = await requireStaff(["owner", "admin", "team_member"]);
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const itemId = uuidSchema.safeParse(formString(formData, idField));
  const status = z.enum(itemStatuses).safeParse(formString(formData, "status"));

  if (!projectId.success || !itemId.success || !status.success) {
    redirect("/admin/workflow?error=The%20workflow%20update%20was%20invalid.");
  }

  const supabase = await createClient();
  const update: Record<string, unknown> = { status: status.data };

  if (table === "tasks") {
    update.completed_at = status.data === "completed" ? new Date().toISOString() : null;
    update.completed_by = status.data === "completed" ? viewer.userId : null;
  }

  if (table === "milestones" && status.data === "approved") {
    update.approved_at = new Date().toISOString();
    update.approved_by = viewer.userId;
  }

  const { error } = await supabase
    .from(table)
    .update(update)
    .eq("id", itemId.data)
    .eq("project_id", projectId.data);

  if (error) redirect(returnPath(projectId.data, "error", error.message));

  await supabase.from("activity_logs").insert({
    actor_id: viewer.userId,
    project_id: projectId.data,
    action: activityAction,
    entity_type: table,
    entity_id: itemId.data,
    metadata: { status: status.data }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/workflow");
  revalidatePath("/portal", "layout");
  redirect(returnPath(projectId.data, "message", "Workflow status updated."));
}

export async function updatePhaseStatusAction(formData: FormData) {
  return updateWorkflowItem(formData, "project_phases", "phaseId", "phase_status_updated");
}

export async function updateMilestoneStatusAction(formData: FormData) {
  return updateWorkflowItem(
    formData,
    "milestones",
    "milestoneId",
    "milestone_status_updated"
  );
}

export async function updateTaskStatusAction(formData: FormData) {
  return updateWorkflowItem(formData, "tasks", "taskId", "task_status_updated");
}
