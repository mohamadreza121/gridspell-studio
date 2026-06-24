import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { clientNavigation } from "@/config/navigation";
import { requireUser } from "@/lib/supabase/auth";
export default async function Layout({children}:{children:ReactNode}){await requireUser();return <DashboardShell title="Client Portal" navigation={clientNavigation}>{children}</DashboardShell>}
