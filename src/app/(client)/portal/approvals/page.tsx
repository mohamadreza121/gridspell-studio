import Link from "next/link";
import {
  EmptyState,
  FlashMessage,
  PortalPageHeader,
  PortalPanel,
  StatusBadge,
  formatDateTime
} from "@/components/portal/PortalUi";
import { decideApprovalAction } from "@/features/portal/actions";
import { getPortalApprovals } from "@/features/portal/data";

type Props = {
  searchParams: Promise<{ error?: string; message?: string; status?: string }>;
};

const FILTERS = [
  ["all", "All"],
  ["pending", "Pending"],
  ["decided", "Decided"]
] as const;

export default async function PortalApprovalsPage({ searchParams }: Props) {
  const [data, query] = await Promise.all([getPortalApprovals(), searchParams]);
  const filter = ["pending", "decided"].includes(query.status ?? "")
    ? query.status
    : "all";
  const approvals = data.approvals.filter((approval) => {
    if (filter === "pending") return approval.status === "in_review";
    if (filter === "decided") return approval.status !== "in_review";
    return true;
  });

  return (
    <>
      <PortalPageHeader
        eyebrow="Client portal"
        title="Approvals"
        description="Review work that needs a formal decision, approve it, or send a clear change request back to GridSpell."
      />
      <FlashMessage error={query.error} message={query.message} />

      <div className="mt-7 flex flex-wrap gap-2">
        {FILTERS.map(([value, label]) => (
          <Link
            key={value}
            href={
              value === "all" ? "/portal/approvals" : `/portal/approvals?status=${value}`
            }
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[.16em] transition ${
              filter === value
                ? "border-[#8be9ff]/35 bg-[#8be9ff]/10 text-[#8be9ff]"
                : "border-white/10 bg-white/[.025] text-white/38 hover:bg-white/[.06] hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-7 grid gap-4">
        {approvals.map((approval) => (
          <PortalPanel key={approval.id}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={approval.status} />
                  {approval.project ? (
                    <Link
                      href={`/portal/projects/${approval.project.slug}`}
                      className="text-xs text-[#8be9ff] transition hover:text-white"
                    >
                      {approval.project.name}
                    </Link>
                  ) : null}
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold text-white">
                  {approval.title}
                </h2>
                {approval.description ? (
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-white/38">
                    {approval.description}
                  </p>
                ) : null}
                <p className="mt-4 text-xs text-white/24">
                  Requested {formatDateTime(approval.created_at)}
                </p>
              </div>
              {approval.status !== "in_review" ? (
                <div className="shrink-0 text-right">
                  <p className="text-xs uppercase tracking-[.16em] text-white/24">
                    Decision
                  </p>
                  <p className="mt-2 text-xs text-white/38">
                    {formatDateTime(approval.decided_at)}
                  </p>
                </div>
              ) : null}
            </div>

            {approval.decision_note ? (
              <p className="mt-5 rounded-xl border border-white/[.06] bg-white/[.025] px-4 py-3 text-sm leading-6 text-white/42">
                {approval.decision_note}
              </p>
            ) : null}

            {approval.status === "in_review" && approval.canContribute ? (
              <form action={decideApprovalAction} className="mt-6 grid gap-3">
                <input type="hidden" name="projectId" value={approval.project_id} />
                <input type="hidden" name="approvalId" value={approval.id} />
                <input type="hidden" name="returnTo" value="/portal/approvals" />
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
            ) : approval.status === "in_review" ? (
              <p className="mt-5 text-xs text-white/28">Read-only access</p>
            ) : null}
          </PortalPanel>
        ))}

        {approvals.length === 0 ? (
          <EmptyState
            title="No approvals in this view"
            text="There are no approval requests matching the selected filter."
            href="/portal/projects"
            linkLabel="View projects"
          />
        ) : null}
      </div>
    </>
  );
}
