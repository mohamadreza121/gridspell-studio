import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { adminNavigation } from "@/config/navigation";
import { requireStaff } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";

function initials(fullName: string | null, email: string | null) {
  const source = fullName?.trim() || email?.split("@")[0] || "GS";
  const words = source.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words.at(-1)?.[0] ?? ""}`.toUpperCase();
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const viewer = await requireStaff(["owner", "admin", "team_member"]);

  const navigation = viewer.staffRole === "team_member"
    ? adminNavigation.filter((item) =>
        ["/admin", "/admin/projects", "/admin/files", "/admin/activity"].includes(item.href)
      )
    : adminNavigation;

  return (
    <DashboardShell
      title="GridSpell Admin"
      navigation={navigation}
      homeHref="/admin"
      viewer={{
        fullName: viewer.fullName,
        email: viewer.email,
        initials: initials(viewer.fullName, viewer.email),
        workspaceLabel: viewer.staffRole ? viewer.staffRole.replaceAll("_", " ") : "Staff"
      }}
    >
      {children}
    </DashboardShell>
  );
}
