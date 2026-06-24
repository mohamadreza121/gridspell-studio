import { Headphones, LifeBuoy } from "lucide-react";
import {
  EmptyState,
  FlashMessage,
  PortalPageHeader,
  PortalPanel,
  StatusBadge,
  formatDateTime
} from "@/components/portal/PortalUi";
import { createSupportTicketAction } from "@/features/portal/actions";
import { getPortalSupport } from "@/features/portal/data";

type Props = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function PortalSupportPage({ searchParams }: Props) {
  const [data, query] = await Promise.all([getPortalSupport(), searchParams]);
  const writableProjects = data.projects.filter((project) => project.canContribute);
  const canCreate = Boolean(data.viewer.staffRole) || data.viewer.organizationMemberships.some(
    (membership) => membership.role !== "client_viewer"
  );

  return (
    <>
      <PortalPageHeader
        eyebrow="Client portal"
        title="Support"
        description="Create a tracked request for project questions, access issues, content updates, or urgent production concerns."
      />
      <FlashMessage error={query.error} message={query.message} />

      {canCreate ? (
        <PortalPanel className="mt-9">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/[.08] bg-white/[.035] text-[#8be9ff]">
              <LifeBuoy className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold">Create a support request</h2>
              <p className="mt-1 text-sm text-white/34">GridSpell will see this inside the protected operations workspace.</p>
            </div>
          </div>

          <form action={createSupportTicketAction} className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/52">
                Related project
                <select name="projectId" className="form-field" defaultValue="">
                  <option value="" className="bg-[#0b0d13]">General account support</option>
                  {writableProjects.map((project) => (
                    <option key={project.id} value={project.id} className="bg-[#0b0d13]">
                      {project.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-white/52">
                Priority
                <select name="priority" className="form-field" defaultValue="normal">
                  <option value="normal" className="bg-[#0b0d13]">Normal</option>
                  <option value="urgent" className="bg-[#0b0d13]">Urgent</option>
                </select>
              </label>
            </div>
            <label className="grid gap-2 text-sm text-white/52">
              Subject
              <input name="subject" required minLength={4} maxLength={160} className="form-field" placeholder="What do you need help with?" />
            </label>
            <label className="grid gap-2 text-sm text-white/52">
              Details
              <textarea name="body" required minLength={10} maxLength={5000} rows={6} className="form-field resize-none" placeholder="Add enough detail for the GridSpell team to respond." />
            </label>
            <button type="submit" className="ml-auto min-h-12 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-7 text-sm font-medium text-white">
              Create request
            </button>
          </form>
        </PortalPanel>
      ) : (
        <PortalPanel className="mt-9">
          <p className="text-sm text-white/38">Your client-viewer role can review support history but cannot create requests.</p>
        </PortalPanel>
      )}

      <div className="mt-5">
        {data.tickets.length === 0 ? (
          <EmptyState title="No support requests" text="Your organization has no open or previous support tickets." />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {data.tickets.map((ticket) => {
              const project = data.projects.find((item) => item.id === ticket.project_id);
              return (
                <PortalPanel key={ticket.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[.08] bg-white/[.035] text-[#8be9ff]">
                        <Headphones className="h-5 w-5" />
                      </span>
                      <div>
                        <h2 className="font-medium text-white/72">{ticket.subject}</h2>
                        <p className="mt-1 text-xs text-white/26">{project?.name ?? "General support"} · {formatDateTime(ticket.created_at)}</p>
                      </div>
                    </div>
                    <StatusBadge status={ticket.status} />
                  </div>
                  <p className="mt-5 line-clamp-4 whitespace-pre-wrap text-sm leading-7 text-white/40">{ticket.body}</p>
                  <p className="mt-4 text-xs uppercase tracking-[.2em] text-white/24">Priority: {ticket.priority}</p>
                </PortalPanel>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
