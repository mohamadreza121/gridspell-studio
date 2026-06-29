"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireStaff } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

const uuidSchema = z.string().uuid();
const messageSchema = z.string().trim().min(1).max(4000);
const ticketStatuses = [
  "open",
  "in_progress",
  "waiting_on_client",
  "resolved",
  "closed"
] as const;

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function communicationsPath(projectId?: string, key?: "error" | "message", value?: string) {
  const params = new URLSearchParams();
  if (projectId) params.set("project", projectId);
  if (key && value) params.set(key, value);
  const query = params.toString();
  return query ? `/admin/communications?${query}` : "/admin/communications";
}

export async function sendAdminProjectMessageAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin", "team_member"]);
  const projectId = uuidSchema.safeParse(formString(formData, "projectId"));
  const message = messageSchema.safeParse(formString(formData, "message"));

  if (!projectId.success || !message.success) {
    redirect(
      communicationsPath(
        projectId.success ? projectId.data : undefined,
        "error",
        "Choose a project and enter a message."
      )
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({
    project_id: projectId.data,
    sender_id: viewer.userId,
    body: message.data
  });

  if (error) {
    redirect(communicationsPath(projectId.data, "error", error.message));
  }

  await supabase.from("activity_logs").insert({
    actor_id: viewer.userId,
    project_id: projectId.data,
    action: "project_message_sent",
    entity_type: "message",
    metadata: { source: "admin_communications" }
  });

  revalidatePath("/admin/communications");
  revalidatePath("/portal/messages");
  revalidatePath("/portal");
  redirect(communicationsPath(projectId.data, "message", "Message sent."));
}

export async function updateSupportTicketStatusAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin", "team_member"]);
  const ticketId = uuidSchema.safeParse(formString(formData, "ticketId"));
  const status = z.enum(ticketStatuses).safeParse(formString(formData, "status"));

  if (!ticketId.success || !status.success) {
    redirect(communicationsPath(undefined, "error", "The support update was invalid."));
  }

  const supabase = await createClient();
  const { data: ticket, error: lookupError } = await supabase
    .from("support_tickets")
    .select("id, project_id, organization_id, subject")
    .eq("id", ticketId.data)
    .maybeSingle();

  if (lookupError || !ticket) {
    redirect(
      communicationsPath(undefined, "error", lookupError?.message ?? "Support request not found.")
    );
  }

  const { error } = await supabase
    .from("support_tickets")
    .update({ status: status.data })
    .eq("id", ticketId.data);

  if (error) redirect(communicationsPath(ticket.project_id ?? undefined, "error", error.message));

  await supabase.from("activity_logs").insert({
    actor_id: viewer.userId,
    project_id: ticket.project_id,
    organization_id: ticket.organization_id,
    action: "support_ticket_updated",
    entity_type: "support_ticket",
    entity_id: ticket.id,
    metadata: { status: status.data, subject: ticket.subject }
  });

  revalidatePath("/admin/communications");
  revalidatePath("/portal/support");
  redirect(
    communicationsPath(ticket.project_id ?? undefined, "message", "Support request updated.")
  );
}
