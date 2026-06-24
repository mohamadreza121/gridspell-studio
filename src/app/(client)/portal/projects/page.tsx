import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  EmptyState,
  PortalPageHeader,
  PortalPanel,
  StatusBadge,
  formatCurrency,
  formatDate
} from "@/components/portal/PortalUi";
import { getPortalProjects } from "@/features/portal/data";

export default async function PortalProjectsPage() {
  const data = await getPortalProjects();

  return (
    <>
      <PortalPageHeader
        eyebrow="Client portal"
        title="Projects"
        description="See status, progress, dates, and the work GridSpell has shared with your organization."
      />

      <div className="mt-10">
        {data.projects.length === 0 ? (
          <EmptyState
            title="No projects assigned"
            text="Projects connected to your organization will appear here automatically."
            href="/portal/support"
            linkLabel="Contact support"
          />
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {data.projects.map((project) => (
              <PortalPanel key={project.id} className="relative overflow-hidden">
                <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[#7c5cff]/12 blur-[80px]" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[.25em] text-white/28">
                        {data.organizations.find((org) => org.id === project.organization_id)?.name ??
                          "Client project"}
                      </p>
                      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.045em]">
                        {project.name}
                      </h2>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  <p className="mt-4 min-h-12 text-sm leading-7 text-white/38">
                    {project.description || "A secure GridSpell project workspace."}
                  </p>

                  <div className="mt-7">
                    <div className="flex items-center justify-between text-xs text-white/34">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/[.07] bg-black/10 p-4">
                      <p className="text-[0.6rem] uppercase tracking-[.2em] text-white/24">Started</p>
                      <p className="mt-2 text-sm text-white/58">{formatDate(project.start_date)}</p>
                    </div>
                    <div className="rounded-2xl border border-white/[.07] bg-black/10 p-4">
                      <p className="text-[0.6rem] uppercase tracking-[.2em] text-white/24">Target</p>
                      <p className="mt-2 text-sm text-white/58">{formatDate(project.target_launch_date)}</p>
                    </div>
                    <div className="rounded-2xl border border-white/[.07] bg-black/10 p-4">
                      <p className="text-[0.6rem] uppercase tracking-[.2em] text-white/24">Budget</p>
                      <p className="mt-2 text-sm text-white/58">
                        {project.budget ? formatCurrency(project.budget) : "Private"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/portal/projects/${project.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm text-[#8be9ff] transition hover:text-white"
                  >
                    Open project workspace <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </PortalPanel>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
