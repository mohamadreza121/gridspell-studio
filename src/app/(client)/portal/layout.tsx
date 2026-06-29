import Link from "next/link";
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
      {context.viewer.staffRole ? (
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#8be9ff]/18 bg-[#8be9ff]/6 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#8be9ff]">
              Staff portal preview
            </p>
            <p className="mt-2 text-sm leading-6 text-white/42">
              You are viewing the real client interface with staff access. Use a client
              invitation in a separate browser session to verify client-only permissions.
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="shrink-0 text-sm font-medium text-[#8be9ff] transition hover:text-white"
          >
            Testing settings →
          </Link>
        </div>
      ) : null}
      {children}
    </DashboardShell>
  );
}
