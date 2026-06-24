import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { adminNavigation } from "@/config/navigation";
import { requireAdmin } from "@/lib/supabase/auth";
export default async function Layout({children}:{children:ReactNode}){await requireAdmin();return <DashboardShell title="GridSpell Admin" navigation={adminNavigation}>{children}</DashboardShell>}
