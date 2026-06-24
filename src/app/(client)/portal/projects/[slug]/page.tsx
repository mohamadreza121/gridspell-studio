import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-react";
import {
  FlashMessage,
  PortalPageHeader,
  PortalPanel,
  StatusBadge,
  formatDate
} from "@/components/portal/PortalUi";
import {
  decideApprovalAction,
  setClientTaskStatusAction
} from "@/features/portal/actions";
import { getPortalProject } from "@/features/portal/data";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function PortalProjectDetailPage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const data = await getPortalProject(slug);
  if (!data.project) notFound();

  const project = data.project;
  return (
    <>
      <Link
        href="/portal/projects"
        className="mb-7 inline-flex items-center gap-2 text-sm text-white/38 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <PortalPageHeader
        eyebrow="Project workspace"
        title={project.name}
        description={project.description || "Your protected GridSpell project workspace."}
        action={<StatusBadge status={project.status} />}
      />
      <FlashMessage error={query.error} message={query.message} />

      <div className="mt-9 grid gap-5 lg:grid-cols-[1fr_320px]">
        <PortalPanel>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
                Project progress
              </p>
              <p className="mt-3 font-display text-4xl font-semibold">
                {project.progress}%
              </p>
            </div>
            <div className="text-right text-sm text-white/34">
              <p>Started {formatDate(project.start_date)}</p>
              <p className="mt-1">Target {formatDate(project.target_launch_date)}</p>
            </div>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/[.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </PortalPanel>

        <PortalPanel>
          <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
            Client access
          </p>
          <p className="mt-5 text-sm leading-7 text-white/46">
            {project.canContribute
              ? "You can upload files, send messages, and respond to approvals."
              : "Your client-viewer role has read-only access."}
          </p>
        </PortalPanel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
        <PortalPanel>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
                Phases
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold">
                Project timeline
              </h2>
            </div>
            <CalendarDays className="h-5 w-5 text-[#8be9ff]" />
          </div>
          <div className="mt-7 grid gap-3">
            {data.phases.map((phase) => (
              <div
                key={phase.id}
                className="rounded-2xl border border-white/[.07] bg-black/10 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-white/72">{phase.name}</p>
                  <StatusBadge status={phase.status} />
                </div>
                {phase.description ? (
                  <p className="mt-2 text-sm leading-6 text-white/34">
                    {phase.description}
                  </p>
                ) : null}
                <p className="mt-3 text-xs text-white/24">
                  Due {formatDate(phase.due_date)}
                </p>
              </div>
            ))}
            {data.phases.length === 0 ? (
              <p className="text-sm text-white/34">
                No project phases have been published.
              </p>
            ) : null}
          </div>
        </PortalPanel>

        <PortalPanel>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
                Milestones
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold">Upcoming work</h2>
            </div>
            <CheckCircle2 className="h-5 w-5 text-[#8be9ff]" />
          </div>
          <div className="mt-7 grid gap-3">
            {data.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="rounded-2xl border border-white/[.07] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-white/68">{milestone.title}</p>
                  <StatusBadge status={milestone.status} />
                </div>
                <p className="mt-2 text-xs text-white/26">
                  Due {formatDate(milestone.due_date)}
                </p>
              </div>
            ))}
            {data.milestones.length === 0 ? (
              <p className="text-sm text-white/34">No milestones have been published.</p>
            ) : null}
          </div>
        </PortalPanel>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <PortalPanel>
          <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
            Client-visible tasks
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold">Outstanding items</h2>
          <div className="mt-7 grid gap-3">
            {data.tasks.map((task) => (
              <div key={task.id} className="rounded-2xl border border-white/[.07] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/64">{task.title}</p>
                    {task.description ? (
                      <p className="mt-1 text-xs leading-5 text-white/28">
                        {task.description}
                      </p>
                    ) : null}
                  </div>
                  <StatusBadge status={task.status} />
                </div>

                {project.canContribute ? (
                  <form
                    action={setClientTaskStatusAction}
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    <input type="hidden" name="taskId" value={task.id} />
                    <input type="hidden" name="projectSlug" value={project.slug} />
                    <input
                      type="hidden"
                      name="returnTo"
                      value={`/portal/projects/${project.slug}`}
                    />
                    {task.status !== "completed" ? (
                      <button
                        type="submit"
                        name="status"
                        value="completed"
                        className="rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 py-2 text-xs font-medium text-white"
                      >
                        Mark complete
                      </button>
                    ) : (
                      <button
                        type="submit"
                        name="status"
                        value="not_started"
                        className="rounded-full border border-white/12 bg-white/[.035] px-4 py-2 text-xs text-white/56 transition hover:bg-white/[.07] hover:text-white"
                      >
                        Reopen
                      </button>
                    )}
                  </form>
                ) : null}
              </div>
            ))}
            {data.tasks.length === 0 ? (
              <p className="text-sm text-white/34">No open client tasks.</p>
            ) : null}
          </div>
        </PortalPanel>

        <PortalPanel>
          <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
            Approvals
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold">Review and decide</h2>
          <div className="mt-7 grid gap-4">
            {data.approvals.map((approval) => (
              <article
                key={approval.id}
                className="rounded-2xl border border-white/[.08] bg-black/10 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-white/76">{approval.title}</h3>
                    {approval.description ? (
                      <p className="mt-2 text-sm leading-6 text-white/34">
                        {approval.description}
                      </p>
                    ) : null}
                  </div>
                  <StatusBadge status={approval.status} />
                </div>

                {approval.decision_note ? (
                  <p className="mt-4 rounded-xl border border-white/[.06] bg-white/[.025] px-3 py-2 text-xs leading-5 text-white/38">
                    {approval.decision_note}
                  </p>
                ) : null}

                {approval.status === "in_review" && project.canContribute ? (
                  <form action={decideApprovalAction} className="mt-5 grid gap-3">
                    <input type="hidden" name="projectId" value={project.id} />
                    <input type="hidden" name="approvalId" value={approval.id} />
                    <input
                      type="hidden"
                      name="returnTo"
                      value={`/portal/projects/${project.slug}`}
                    />
                    <textarea
                      name="note"
                      rows={3}
                      className="form-field resize-none"
                      placeholder="Optional note or requested change"
                    />
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        name="decision"
                        value="approve"
                        className="rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-5 py-2.5 text-sm font-medium text-white"
                      >
                        Approve
                      </button>
                      <button
                        type="submit"
                        name="decision"
                        value="changes"
                        className="rounded-full border border-white/12 bg-white/[.035] px-5 py-2.5 text-sm text-white/62 transition hover:bg-white/[.07] hover:text-white"
                      >
                        Request changes
                      </button>
                    </div>
                  </form>
                ) : null}
              </article>
            ))}
            {data.approvals.length === 0 ? (
              <p className="text-sm text-white/34">There are no approval requests yet.</p>
            ) : null}
          </div>
        </PortalPanel>
      </div>
    </>
  );
}
