import Link from "next/link";
import { Send } from "lucide-react";

import {
  AdminHeader,
  AdminNotice,
  AdminPanel,
  EmptyState,
  StatusBadge,
  formatDate
} from "@/components/admin/AdminUi";
import { ActionButton } from "@/components/ui/ActionControl";
import {
  sendAdminProjectMessageAction,
  updateSupportTicketStatusAction
} from "@/features/admin/communications/actions";
import { getAdminCommunications } from "@/features/admin/communications/data";

const ticketStatuses = ["open", "in_progress", "waiting_on_client", "resolved", "closed"] as const;

type Props = {
  searchParams: Promise<{ project?: string; error?: string; message?: string }>;
};

export default async function CommunicationsPage({ searchParams }: Props) {
  const query = await searchParams;
  const data = await getAdminCommunications(query.project);

  return (
    <section>
      <AdminHeader
        title="Client communications."
        text="Reply to project messages and manage support requests from the admin workspace."
      />
      <AdminNotice error={query.error} message={query.message} />

      <div className="mt-8 grid gap-6 2xl:grid-cols-[1.05fr_.95fr]">
        <AdminPanel eyebrow="Messages" title="Project conversation">
          <div className="mt-6 flex flex-wrap gap-2">
            {data.projects.map((project) => (
              <Link
                key={project.id}
                href={`/admin/communications?project=${project.id}`}
                className={`rounded-full border px-4 py-2 text-xs ${
                  data.selectedProject?.id === project.id
                    ? "border-[#8be9ff]/45 bg-[#8be9ff]/9 text-[#8be9ff]"
                    : "border-white/10 text-white/38"
                }`}
              >
                {project.name}
              </Link>
            ))}
          </div>

          {data.selectedProject ? (
            <>
              <div className="mt-6 max-h-[32rem] space-y-3 overflow-y-auto">
                {data.messages.length ? data.messages.map((message) => (
                  <article key={message.id} className="rounded-2xl border border-white/[.07] bg-black/10 p-4">
                    <div className="flex justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8be9ff]">
                        {message.sender_id ? data.profileNames[message.sender_id] || "Workspace member" : "System"}
                      </p>
                      <p className="text-xs text-white/22">{formatDate(message.created_at)}</p>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/52">{message.body}</p>
                  </article>
                )) : <EmptyState>No messages for this project.</EmptyState>}
              </div>

              <form action={sendAdminProjectMessageAction} className="mt-6 grid gap-3 border-t border-white/[.08] pt-6">
                <input type="hidden" name="projectId" value={data.selectedProject.id} />
                <textarea name="message" required maxLength={4000} rows={5} className="form-field resize-y" placeholder="Write a project update or reply." />
                <ActionButton type="submit" className="justify-self-end">
                  Send message <Send className="h-4 w-4" />
                </ActionButton>
              </form>
            </>
          ) : <div className="mt-6"><EmptyState>Create a project before using messages.</EmptyState></div>}
        </AdminPanel>

        <AdminPanel eyebrow="Support" title="Tracked requests">
          <div className="mt-6 grid gap-4">
            {data.tickets.length ? data.tickets.map((ticket) => {
              const project = Array.isArray(ticket.projects) ? ticket.projects[0] : ticket.projects;
              const organization = Array.isArray(ticket.organizations) ? ticket.organizations[0] : ticket.organizations;
              return (
                <article key={ticket.id} className="rounded-2xl border border-white/[.07] bg-black/10 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-white/72">{ticket.subject}</p>
                      <p className="mt-1 text-xs text-white/26">
                        {organization?.name ?? "Client"}{project?.name ? ` · ${project.name}` : ""} · {formatDate(ticket.created_at)}
                      </p>
                    </div>
                    <StatusBadge value={ticket.status} />
                  </div>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-white/42">{ticket.body}</p>
                  <p className="mt-3 text-xs uppercase tracking-[.18em] text-white/24">Priority: {ticket.priority}</p>
                  <form action={updateSupportTicketStatusAction} className="mt-5 flex gap-3 border-t border-white/[.07] pt-5">
                    <input type="hidden" name="ticketId" value={ticket.id} />
                    <select name="status" defaultValue={ticket.status} className="form-field min-h-11 flex-1">
                      {ticketStatuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}
                    </select>
                    <button type="submit" className="rounded-full border border-white/10 px-5 text-xs text-white/55">Update</button>
                  </form>
                </article>
              );
            }) : <EmptyState>No support requests yet.</EmptyState>}
          </div>
        </AdminPanel>
      </div>
    </section>
  );
}
