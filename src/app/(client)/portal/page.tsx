import Link from "next/link";
import { CheckCircle2, CircleDot, RotateCcw } from "lucide-react";
import {
  EmptyState,
  FlashMessage,
  PortalPageHeader,
  PortalPanel,
  StatusBadge,
  formatDate
} from "@/components/portal/PortalUi";
import { setClientTaskStatusAction } from "@/features/portal/actions";
import { getPortalTasks } from "@/features/portal/data";

type Props = {
  searchParams: Promise<{ error?: string; message?: string; status?: string }>;
};

const FILTERS = [
  ["all", "All"],
  ["open", "Open"],
  ["completed", "Completed"]
] as const;

export default async function PortalTasksPage({ searchParams }: Props) {
  const [data, query] = await Promise.all([getPortalTasks(), searchParams]);
  const filter = ["open", "completed"].includes(query.status ?? "")
    ? query.status
    : "all";
  const tasks = data.tasks.filter((task) => {
    if (filter === "open") return task.status !== "completed";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  return (
    <>
      <PortalPageHeader
        eyebrow="Client portal"
        title="Tasks"
        description="Track the items GridSpell needs from your team and mark client actions complete as work moves forward."
      />
      <FlashMessage error={query.error} message={query.message} />

      <div className="mt-7 flex flex-wrap gap-2">
        {FILTERS.map(([value, label]) => (
          <Link
            key={value}
            href={value === "all" ? "/portal/tasks" : `/portal/tasks?status=${value}`}
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
        {tasks.map((task) => (
          <PortalPanel key={task.id}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={task.status} />
                  {task.project ? (
                    <Link
                      href={`/portal/projects/${task.project.slug}`}
                      className="text-xs text-[#8be9ff] transition hover:text-white"
                    >
                      {task.project.name}
                    </Link>
                  ) : null}
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold text-white">
                  {task.title}
                </h2>
                {task.description ? (
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-white/38">
                    {task.description}
                  </p>
                ) : null}
                <p className="mt-4 text-xs text-white/26">
                  Due {formatDate(task.due_date)}
                </p>
              </div>

              {task.canContribute ? (
                <div className="flex shrink-0 flex-wrap gap-2">
                  {task.status === "not_started" ? (
                    <form action={setClientTaskStatusAction}>
                      <input type="hidden" name="taskId" value={task.id} />
                      <input
                        type="hidden"
                        name="projectSlug"
                        value={task.project?.slug ?? ""}
                      />
                      <input type="hidden" name="returnTo" value="/portal/tasks" />
                      <button
                        type="submit"
                        name="status"
                        value="in_progress"
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.035] px-4 py-2.5 text-sm text-white/62 transition hover:bg-white/[.07] hover:text-white"
                      >
                        <CircleDot className="h-4 w-4" /> Start task
                      </button>
                    </form>
                  ) : null}

                  {task.status !== "completed" ? (
                    <form action={setClientTaskStatusAction}>
                      <input type="hidden" name="taskId" value={task.id} />
                      <input
                        type="hidden"
                        name="projectSlug"
                        value={task.project?.slug ?? ""}
                      />
                      <input type="hidden" name="returnTo" value="/portal/tasks" />
                      <button
                        type="submit"
                        name="status"
                        value="completed"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff] px-4 py-2.5 text-sm font-medium text-white"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Mark complete
                      </button>
                    </form>
                  ) : (
                    <form action={setClientTaskStatusAction}>
                      <input type="hidden" name="taskId" value={task.id} />
                      <input
                        type="hidden"
                        name="projectSlug"
                        value={task.project?.slug ?? ""}
                      />
                      <input type="hidden" name="returnTo" value="/portal/tasks" />
                      <button
                        type="submit"
                        name="status"
                        value="not_started"
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.035] px-4 py-2.5 text-sm text-white/56 transition hover:bg-white/[.07] hover:text-white"
                      >
                        <RotateCcw className="h-4 w-4" /> Reopen
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <p className="shrink-0 text-xs text-white/28">Read-only access</p>
              )}
            </div>
          </PortalPanel>
        ))}

        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks in this view"
            text="There are no client-visible tasks matching the selected filter."
            href="/portal/projects"
            linkLabel="View projects"
          />
        ) : null}
      </div>
    </>
  );
}
