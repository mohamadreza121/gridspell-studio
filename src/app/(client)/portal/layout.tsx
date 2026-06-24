import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { clientNavigation } from "@/config/navigation";
import { getPortalContext } from "@/features/portal/data";

export const dynamic = "force-dynamic";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const context = await getPortalContext();

  return (
    <DashboardShell
      title="Client Portal"
      navigation={clientNavigation}
      viewer={{
        fullName: context.viewer.fullName,
        email: context.viewer.email,
        initials: context.initials,
        workspaceLabel: context.workspaceLabel
      }}
    >
      {children}
    </DashboardShell>
  );
}
