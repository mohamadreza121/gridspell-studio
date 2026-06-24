import Link from "next/link";
import { MessageCircleMore, Send } from "lucide-react";
import {
  EmptyState,
  FlashMessage,
  PortalPageHeader,
  PortalPanel,
  formatDateTime
} from "@/components/portal/PortalUi";
import { sendProjectMessageAction } from "@/features/portal/actions";
import { getPortalMessages } from "@/features/portal/data";

type Props = {
  searchParams: Promise<{ project?: string; error?: string; message?: string }>;
};

export default async function PortalMessagesPage({ searchParams }: Props) {
  const query = await searchParams;
  const data = await getPortalMessages(query.project);

  return (
    <>
      <PortalPageHeader
        eyebrow="Client portal"
        title="Messages"
        description="Keep project communication attached to the correct workspace instead of scattered across email threads."
      />
      <FlashMessage error={query.error} message={query.message} />

      {data.projects.length === 0 || !data.selectedProject ? (
        <div className="mt-10">
          <EmptyState title="No project conversation yet" text="A message thread becomes available when a project is assigned." />
        </div>
      ) : (
        <div className="mt-9 grid gap-5 xl:grid-cols-[280px_1fr]">
          <PortalPanel className="h-fit">
            <p className="text-[0.65rem] uppercase tracking-[.24em] text-white/28">Projects</p>
            <div className="mt-4 grid gap-2">
              {data.projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portal/messages?project=${project.id}`}
                  className={`rounded-2xl border px-4 py-3 text-sm transition ${
                    project.id === data.selectedProject?.id
                      ? "border-[#8be9ff]/25 bg-[#8be9ff]/8 text-white"
                      : "border-white/[.06] text-white/44 hover:bg-white/[.04] hover:text-white"
                  }`}
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </PortalPanel>

          <PortalPanel className="overflow-hidden p-0 sm:p-0">
            <div className="border-b border-white/[.08] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[.08] bg-white/[.035] text-[#8be9ff]">
                  <MessageCircleMore className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold">{data.selectedProject.name}</h2>
                  <p className="mt-1 text-xs text-white/28">Project conversation</p>
                </div>
              </div>
            </div>

            <div className="max-h-[540px] min-h-[360px] overflow-y-auto px-5 py-6 sm:px-6">
              <div className="grid gap-4">
                {data.messages.length > 0 ? (
                  data.messages.map((message) => {
                    const ownMessage = message.sender_id === data.viewer.userId;
                    return (
                      <div
                        key={message.id}
                        className={`max-w-[82%] rounded-2xl border px-4 py-3 ${
                          ownMessage
                            ? "ml-auto border-[#7c5cff]/25 bg-[#7c5cff]/10"
                            : "border-white/[.07] bg-white/[.025]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-xs font-medium text-white/46">
                            {ownMessage
                              ? "You"
                              : message.sender_id
                                ? data.profileNames[message.sender_id] ?? "GridSpell team"
                                : "GridSpell team"}
                          </p>
                          <p className="text-[0.65rem] text-white/22">{formatDateTime(message.created_at)}</p>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/64">{message.body}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="grid min-h-[280px] place-items-center text-center">
                    <div>
                      <MessageCircleMore className="mx-auto h-8 w-8 text-white/18" />
                      <p className="mt-4 text-sm text-white/34">Start the project conversation below.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-white/[.08] p-5 sm:p-6">
              {data.selectedProject.canContribute ? (
                <form action={sendProjectMessageAction} className="grid gap-3">
                  <input type="hidden" name="projectId" value={data.selectedProject.id} />
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={4000}
                    className="form-field resize-none"
                    placeholder="Write a message to the GridSpell team"
                  />
                  <button
                    type="submit"
                    className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-6 text-sm font-medium text-white"
                  >
                    Send message <Send className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <p className="text-sm text-white/34">Your client-viewer role has read-only message access.</p>
              )}
            </div>
          </PortalPanel>
        </div>
      )}
    </>
  );
}
