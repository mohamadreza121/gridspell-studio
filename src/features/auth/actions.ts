"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSiteUrl } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const INVITE_COOKIE = "gridspell_invite_token";

export async function confirmInvitationLinkAction() {
  const cookieStore = await cookies();
  const tokenHash = cookieStore.get(INVITE_COOKIE)?.value;

  if (!tokenHash) {
    redirect(
      withMessage(
        "/login",
        "error",
        "The invitation link is invalid or has expired."
      )
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    type: "invite",
    token_hash: tokenHash
  });

  cookieStore.delete(INVITE_COOKIE);

  if (error) {
    redirect(
      withMessage(
        "/login",
        "error",
        "The invitation link is invalid or has expired."
      )
    );
  }

  redirect("/accept-invite");
}

const emailSchema = z.string().trim().email("Enter a valid email address.");
const passwordSchema = z
  .string()
  .min(12, "Password must contain at least 12 characters.")
  .max(128, "Password is too long.");

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function withMessage(path: string, key: "error" | "message", message: string) {
  return `${path}?${key}=${encodeURIComponent(message)}`;
}

export async function signInAction(formData: FormData) {
  const emailResult = emailSchema.safeParse(formString(formData, "email"));
  const password = String(formData.get("password") ?? "");

  if (!emailResult.success || !password) {
    redirect(withMessage("/login", "error", "Enter your email address and password."));
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailResult.data,
    password
  });

  if (error || !data.user) {
    redirect(withMessage("/login", "error", "The email or password is incorrect."));
  }

  const [{ data: staffRole }, { data: organizationMembership }, { data: invitation }] =
    await Promise.all([
      supabase
        .from("app_user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .maybeSingle(),
      supabase
        .from("organization_members")
        .select("organization_id")
        .eq("user_id", data.user.id)
        .limit(1)
        .maybeSingle(),
      supabase
        .from("client_invitations")
        .select("id")
        .eq("status", "pending")
        .ilike("email", emailResult.data)
        .limit(1)
        .maybeSingle()
    ]);

  if (staffRole) redirect("/admin");
  if (organizationMembership) redirect("/portal");
  if (invitation) redirect("/accept-invite");

  await supabase.auth.signOut();
  redirect(
    withMessage(
      "/login",
      "error",
      "This account does not have an active GridSpell workspace invitation."
    )
  );
}

export async function forgotPasswordAction(formData: FormData) {
  const emailResult = emailSchema.safeParse(formString(formData, "email"));

  if (!emailResult.success) {
    redirect(withMessage("/forgot-password", "error", "Enter a valid email address."));
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(emailResult.data, {
    redirectTo: `${getSiteUrl()}/auth/callback?next=/update-password`
  });

  redirect(
    withMessage(
      "/forgot-password",
      "message",
      "If that account exists, a password reset link has been sent."
    )
  );
}

export async function updatePasswordAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const passwordResult = passwordSchema.safeParse(password);

  if (!passwordResult.success) {
    redirect(withMessage("/update-password", "error", passwordResult.error.issues[0].message));
  }

  if (password !== confirmPassword) {
    redirect(withMessage("/update-password", "error", "The passwords do not match."));
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(withMessage("/login", "error", "Open the reset link from your email again."));
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect(withMessage("/update-password", "error", error.message));

  redirect(withMessage("/login", "message", "Password updated. Sign in with your new password."));
}

export async function acceptInvitationAction(formData: FormData) {
  const invitationId = formString(formData, "invitationId");
  const fullName = formString(formData, "fullName");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const passwordResult = passwordSchema.safeParse(password);

  if (!invitationId || !fullName) {
    redirect(withMessage("/accept-invite", "error", "Complete every required field."));
  }

  if (!passwordResult.success) {
    redirect(withMessage("/accept-invite", "error", passwordResult.error.issues[0].message));
  }

  if (password !== confirmPassword) {
    redirect(withMessage("/accept-invite", "error", "The passwords do not match."));
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { error: passwordError } = await supabase.auth.updateUser({
    password,
    data: { full_name: fullName }
  });

  if (passwordError) {
    redirect(withMessage("/accept-invite", "error", passwordError.message));
  }

  const { error: invitationError } = await supabase.rpc("accept_client_invitation", {
    invitation_id: invitationId,
    profile_full_name: fullName
  });

  if (invitationError) {
    redirect(withMessage("/accept-invite", "error", invitationError.message));
  }

  redirect("/portal?message=Your%20GridSpell%20workspace%20is%20ready");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
