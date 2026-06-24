import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  staffRoles,
  type ClientRole,
  type StaffRole,
  type ViewerContext
} from "@/types/auth";

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) return null;
  return user;
});

export const getViewerContext = cache(async (): Promise<ViewerContext | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const [{ data: profile }, { data: staffMembership }, { data: organizationMemberships }] =
    await Promise.all([
      supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
      supabase.from("app_user_roles").select("role").eq("user_id", user.id).maybeSingle(),
      supabase
        .from("organization_members")
        .select("organization_id, role")
        .eq("user_id", user.id)
    ]);

  return {
    userId: user.id,
    email: user.email ?? null,
    fullName: profile?.full_name ?? null,
    staffRole: (staffMembership?.role as StaffRole | undefined) ?? null,
    organizationMemberships: (organizationMemberships ?? []).map((membership) => ({
      organizationId: membership.organization_id,
      role: membership.role as ClientRole
    }))
  };
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireStaff(allowedRoles: readonly StaffRole[] = staffRoles) {
  const viewer = await getViewerContext();

  if (!viewer) redirect("/login");
  if (!viewer.staffRole || !allowedRoles.includes(viewer.staffRole)) {
    redirect("/portal?error=You%20do%20not%20have%20staff%20access");
  }

  return viewer;
}

export async function requirePortalUser() {
  const viewer = await getViewerContext();
  if (!viewer) redirect("/login");

  if (viewer.staffRole || viewer.organizationMemberships.length > 0) {
    return viewer;
  }

  redirect("/accept-invite");
}
