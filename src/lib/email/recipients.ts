import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

type AdminClient = SupabaseClient;

export type OrganizationRecipient = {
  userId: string;
  email: string;
  fullName: string | null;
};

export async function getOrganizationRecipients(
  admin: AdminClient,
  organizationId: string
): Promise<OrganizationRecipient[]> {
  const { data: memberships, error } = await admin
    .from("organization_members")
    .select("user_id, role, profiles(full_name)")
    .eq("organization_id", organizationId)
    .in("role", ["client", "client_viewer"]);

  if (error) throw error;

  const recipients = await Promise.all(
    (memberships ?? []).map(async (membership) => {
      const { data } = await admin.auth.admin.getUserById(membership.user_id);
      const profile = Array.isArray(membership.profiles)
        ? membership.profiles[0]
        : membership.profiles;
      const email = data.user?.email?.trim().toLowerCase();
      if (!email) return null;
      return {
        userId: membership.user_id,
        email,
        fullName: profile?.full_name ?? null
      };
    })
  );

  return recipients.filter((item): item is OrganizationRecipient => Boolean(item));
}
