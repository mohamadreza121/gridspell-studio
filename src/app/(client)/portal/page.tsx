import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FolderOpen,
  MessageSquareText
} from "lucide-react";
import {
  EmptyState,
  PortalPageHeader,
  PortalPanel,
  StatusBadge,
  formatCurrency,
  formatDate,
  formatDateTime
} from "@/components/portal/PortalUi";
import { getPortalOverview } from "@/features/portal/data";

export default async function PortalOverviewPage() {
  const data = await getPortalOverview();

  if (!data.project) {
    return (
      <>
        <PortalPageHeader
          eyebrow="Overview"
          title="Your workspace is ready."
          description="Your GridSpell project will appear here as soon as it is assigned to your organization."
        />
        <div className="mt-10">
          <EmptyState
            title="No active project yet"
            text="Your account and organization are connected, but no project has been assigned. GridSpell will add it when the engagement begins."
            href="/portal/support"
            linkLabel="Contact support"
          />
        </div>
      </>
    );
  }

  const currentPhase =
    data.phases.find((phase) => phase.status === "in_progress") ??
    data.phases.find((phase) => phase.status === "not_started") ??
    data.phases.at(-1);
  const nextMilestone = data.milestones.find(
    (milestone) => !["approved", "completed"].includes(milestone.status)
  );
  const outstandingTasks = data.tasks.filter((task) => task.status !== "completed");
  const openApprovals = data.approvals.filter(
    (approval) => approval.status === "in_review"
  );
  const openInvoiceTotal = data.invoices
    .filter((invoice) => ["open", "overdue"].includes(invoice.status))
    .reduce(
      (total, invoice) =>
        total + Number(invoice.amount_due) - Number(invoice.amount_paid),
      0
    );

  return (
    <>
      <PortalPageHeader
        eyebrow="Overview"
        title={`Welcome back${data.viewer.fullName ? `, ${data.viewer.fullName.split(" ")[0]}` : ""}.`}
        description={`${data.project.name} is currently ${data.project.status.replaceAll("_", " ")}. Everything below is loaded from your protected Supabase workspace.`}
        action={
          <Link
            href={`/portal/projects/${data.project.slug}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-5 text-sm text-white/64 transition hover:bg-white/[.08] hover:text-white"
          >
            Open project <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          [
            "Project progress",
            `${data.project.progress}%`,
            data.project.status,
            CheckCircle2
          ],
          [
            "Current phase",
            currentPhase?.name ?? "Planning",
            currentPhase?.status ?? "not_started",
            Clock3
          ],
          [
            "Next milestone",
            nextMilestone?.title ?? "No milestone scheduled",
            formatDate(nextMilestone?.due_date),
            FolderOpen
          ],
          [
            "Outstanding",
            `${outstandingTasks.length} items`,
            `${openApprovals.length} approval${openApprovals.length === 1 ? "" : "s"} pending`,
            MessageSquareText
          ]
        ].map(([label, value, detail, Icon]) => {
          const CardIcon = Icon as typeof CheckCircle2;
          return (
            <PortalPanel key={String(label)} className="min-h-[180px]">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
                  {String(label)}
                </p>
                <CardIcon className="h-4 w-4 text-[#8be9ff]" />
              </div>
              <p className="mt-8 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
                {String(value)}
              </p>
              <p className="mt-3 text-sm text-white/36">{String(detail)}</p>
            </PortalPanel>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <PortalPanel>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
                Project timeline
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold">
                From discovery to launch
              </h2>
            </div>
            <StatusBadge status={data.project.status} />
          </div>

          <div className="mt-7 grid gap-3">
            {data.phases.length > 0 ? (
              data.phases.map((phase) => (
                <div
                  key={phase.id}
                  className="grid gap-3 rounded-2xl border border-white/[.07] bg-black/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                        phase.status === "completed"
                          ? "bg-[#35d07f]"
                          : phase.status === "in_progress"
                            ? "bg-[#8be9ff] shadow-[0_0_18px_rgba(139,233,255,.6)]"
                            : "bg-white/12"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-white/72">{phase.name}</p>
                      {phase.description ? (
                        <p className="mt-1 text-xs leading-5 text-white/30">
                          {phase.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:justify-end">
                    <StatusBadge status={phase.status} />
                    <span className="text-xs text-white/28">
                      {formatDate(phase.due_date)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-white/34">
                The detailed project timeline has not been published yet.
              </p>
            )}
          </div>
        </PortalPanel>

        <div className="grid gap-5">
          <PortalPanel>
            <div className="flex items-center justify-between">
              <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
                Approvals
              </p>
              <Link href="/portal/approvals" className="text-xs text-[#8be9ff]">
                Review
              </Link>
            </div>
            <p className="mt-5 font-display text-3xl font-semibold">
              {openApprovals.length}
            </p>
            <p className="mt-2 text-sm text-white/36">Items awaiting your decision</p>
          </PortalPanel>

          <PortalPanel>
            <div className="flex items-center justify-between">
              <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
                Open balance
              </p>
              <Link href="/portal/billing" className="text-xs text-[#8be9ff]">
                Billing
              </Link>
            </div>
            <p className="mt-5 font-display text-3xl font-semibold">
              {formatCurrency(openInvoiceTotal)}
            </p>
            <p className="mt-2 text-sm text-white/36">Across open and overdue invoices</p>
          </PortalPanel>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <PortalPanel>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
                Recent messages
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold">
                Project conversation
              </h2>
            </div>
            <Link
              href={`/portal/messages?project=${data.project.id}`}
              className="text-xs text-[#8be9ff]"
            >
              Open thread
            </Link>
          </div>
          <div className="mt-6 grid gap-3">
            {data.messages.length > 0 ? (
              data.messages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-2xl border border-white/[.07] bg-black/10 p-4"
                >
                  <p className="line-clamp-2 text-sm leading-6 text-white/58">
                    {message.body}
                  </p>
                  <p className="mt-2 text-xs text-white/24">
                    {formatDateTime(message.created_at)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/34">No project messages yet.</p>
            )}
          </div>
        </PortalPanel>

        <PortalPanel>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[.26em] text-white/28">
                Next actions
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold">
                What GridSpell needs
              </h2>
            </div>
            <Link href="/portal/tasks" className="text-xs text-[#8be9ff]">
              View tasks
            </Link>
          </div>
          <div className="mt-6 grid gap-3">
            {outstandingTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/[.07] p-4"
              >
                <div>
                  <p className="text-sm text-white/64">{task.title}</p>
                  <p className="mt-1 text-xs text-white/28">
                    Due {formatDate(task.due_date)}
                  </p>
                </div>
                <StatusBadge status={task.status} />
              </div>
            ))}
            {outstandingTasks.length === 0 ? (
              <p className="text-sm text-white/34">Nothing is currently outstanding.</p>
            ) : null}
          </div>
        </PortalPanel>
      </div>
    </>
  );
}
