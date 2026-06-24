export const staffRoles = ["owner", "admin", "team_member"] as const;
export const clientRoles = ["client", "client_viewer"] as const;

export type StaffRole = (typeof staffRoles)[number];
export type ClientRole = (typeof clientRoles)[number];
export type AppRole = StaffRole | ClientRole;

export type ViewerContext = {
  userId: string;
  email: string | null;
  fullName: string | null;
  staffRole: StaffRole | null;
  organizationMemberships: Array<{
    organizationId: string;
    role: ClientRole;
  }>;
};
