"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSiteUrl } from "@/lib/env";
import { sendTransactionalEmail } from "@/lib/email/send";
import { clientInvitationTemplate } from "@/lib/email/templates";
import { requireStaff } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const invitationSchema = z.object({
  email: z.string().trim().email(),
  fullName: z.string().trim().min(2).max(100),
  organizationName: z.string().trim().min(2).max(120),
  role: z.enum(["client", "client_viewer"])
});

function slugify(value: string) {
  const base = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 52);

  return `${base || "client"}-${randomUUID().slice(0, 8)}`;
}

function redirectWith(key: "error" | "message", message: string): never {
  redirect(`/admin/clients?${key}=${encodeURIComponent(message)}`);
}

export async function inviteClientAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const parsed = invitationSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    fullName: String(formData.get("fullName") ?? ""),
    organizationName: String(formData.get("organizationName") ?? ""),
    role: String(formData.get("role") ?? "client")
  });

  if (!parsed.success) {
    redirectWith("error", parsed.error.issues[0].message);
  }

  const admin = createAdminClient();
  const email = parsed.data.email.toLowerCase();

  const { data: existingInvite } = await admin
    .from("client_invitations")
    .select("id")
    .ilike("email", email)
    .eq("status", "pending")
    .maybeSingle();

  if (existingInvite) {
    redirectWith("error", "A pending invitation already exists for this email address.");
  }

  const { data: organization, error: organizationError } = await admin
    .from("organizations")
    .insert({ name: parsed.data.organizationName, slug: slugify(parsed.data.organizationName) })
    .select("id")
    .single();

  if (organizationError || !organization) {
    redirectWith("error", organizationError?.message ?? "Could not create the organization.");
  }

  const { data: invitation, error: invitationError } = await admin
    .from("client_invitations")
    .insert({
      email,
      full_name: parsed.data.fullName,
      organization_id: organization.id,
      role: parsed.data.role,
      invited_by: viewer.userId
    })
    .select("id")
    .single();

  if (invitationError || !invitation) {
    await admin.from("organizations").delete().eq("id", organization.id);
    redirectWith("error", invitationError?.message ?? "Could not create the invitation.");
  }

  const redirectTo = `${getSiteUrl()}/auth/callback?next=/accept-invite`;
  const { data: inviteLink, error: authError } = await admin.auth.admin.generateLink({
    type: "invite",
    email,
    options: {
      redirectTo,
      data: {
        full_name: parsed.data.fullName,
        invitation_id: invitation.id
      }
    }
  });

  const invitedUser = inviteLink.user;
  const actionLink = inviteLink.properties?.action_link;

  if (authError || !invitedUser || !actionLink) {
    await admin.from("client_invitations").delete().eq("id", invitation.id);
    await admin.from("organizations").delete().eq("id", organization.id);
    redirectWith("error", authError?.message ?? "Supabase could not create the invitation link.");
  }

  try {
    await sendTransactionalEmail({
      to: email,
      template: clientInvitationTemplate({
        fullName: parsed.data.fullName,
        organizationName: parsed.data.organizationName,
        invitedByName: viewer.fullName,
        inviteUrl: actionLink
      }),
      metadata: {
        invitationId: invitation.id,
        organizationId: organization.id,
        authUserId: invitedUser.id
      }
    });
  } catch (emailError) {
    await admin.auth.admin.deleteUser(invitedUser.id).catch(() => undefined);
    await admin.from("client_invitations").delete().eq("id", invitation.id);
    await admin.from("organizations").delete().eq("id", organization.id);
    redirectWith(
      "error",
      emailError instanceof Error ? emailError.message : "Could not send the invitation email."
    );
  }

  await admin
    .from("client_invitations")
    .update({ auth_user_id: invitedUser.id })
    .eq("id", invitation.id);

  await admin.from("activity_logs").insert({
    actor_id: viewer.userId,
    organization_id: organization.id,
    action: "client_invitation_sent",
    entity_type: "client_invitation",
    entity_id: invitation.id,
    metadata: { email, role: parsed.data.role }
  });

  redirectWith("message", `Invitation sent to ${email}.`);
}

export async function revokeInvitationAction(formData: FormData) {
  const viewer = await requireStaff(["owner", "admin"]);
  const invitationId = String(formData.get("invitationId") ?? "");

  if (!invitationId) redirectWith("error", "Missing invitation ID.");

  const admin = createAdminClient();
  const { error } = await admin
    .from("client_invitations")
    .update({ status: "revoked" })
    .eq("id", invitationId)
    .eq("status", "pending");

  if (error) redirectWith("error", error.message);

  await admin.from("activity_logs").insert({
    actor_id: viewer.userId,
    action: "client_invitation_revoked",
    entity_type: "client_invitation",
    entity_id: invitationId
  });

  redirectWith("message", "Invitation revoked.");
}
