import { notFound } from "next/navigation";
import { ActionButton } from "@/components/ui/ActionControl";
import {
  AdminHeader,
  AdminNotice,
  AdminPanel,
  EmptyState,
  StatusBadge,
  formatDate,
  formatMoney
} from "@/components/admin/AdminUi";
import {
  addMilestoneAction,
  addProjectPhaseAction,
  addTaskAction,
  markMilestoneReadyAction,
  requestApprovalAction,
  updateProjectAction,
  uploadAdminFileAction
} from "@/features/admin/actions";
import { getAdminProject } from "@/features/admin/data";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function ProjectDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;
  const data = await getAdminProject(slug);
  if (!data) notFound();

  const { project, phases, milestones, tasks, members, files } = data;
  const organization = Array.isArray(project.organizations)
    ? project.organizations[0]
    : project.organizations;

  return (
    <section>
      <AdminHeader
        eyebrow="Project workspace"
        title={project.name}
        text={`${organization?.name ?? "No organization"} · ${project.progress}% complete · ${formatMoney(project.budget)}`}
      />
      <AdminNotice error={query.error} message={query.message} />

      <AdminPanel className="mt-8" eyebrow="Project record" title="Status and schedule">
        <form action={updateProjectAction} className="mt-6 grid gap-4">
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="slug" value={project.slug} />
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm text-white/55">
              Status
              <select name="status" defaultValue={project.status} className="form-field">
                {["planning", "active", "paused", "review", "launched", "archived"].map(
                  (status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  )
                )}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-white/55">
              Progress
              <input
                name="progress"
                type="number"
                min="0"
                max="100"
                defaultValue={project.progress}
                className="form-field"
              />
            </label>
            <label className="grid gap-2 text-sm text-white/55">
              Budget
              <input
                name="budget"
                type="number"
                step="0.01"
                defaultValue={project.budget ?? ""}
                className="form-field"
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm text-white/55">
            Description
            <textarea
              name="description"
              rows={3}
              defaultValue={project.description ?? ""}
              className="form-field resize-y"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-white/55">
              Start date
              <input
                name="startDate"
                type="date"
                defaultValue={project.start_date ?? ""}
                className="form-field"
              />
            </label>
            <label className="grid gap-2 text-sm text-white/55">
              Target launch
              <input
                name="targetLaunchDate"
                type="date"
                defaultValue={project.target_launch_date ?? ""}
                className="form-field"
              />
            </label>
          </div>
          <ActionButton type="submit" className="justify-self-start">
            Save project
          </ActionButton>
        </form>
      </AdminPanel>

      <div className="mt-6 grid gap-6 2xl:grid-cols-3">
        <AdminPanel eyebrow="Plan" title="Phases">
          <div className="mt-5 grid gap-3">
            {phases.length ? (
              phases.map((phase) => (
                <article
                  key={phase.id}
                  className="rounded-2xl border border-white/[.07] bg-black/10 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{phase.name}</p>
                    <StatusBadge value={phase.status} />
                  </div>
                  <p className="mt-2 text-sm text-white/35">
                    {phase.description || "No description"}
                  </p>
                  <p className="mt-3 text-xs text-white/24">
                    {formatDate(phase.start_date)} → {formatDate(phase.due_date)}
                  </p>
                </article>
              ))
            ) : (
              <EmptyState>No phases yet.</EmptyState>
            )}
          </div>
          <form
            action={addProjectPhaseAction}
            className="mt-5 grid gap-3 border-t border-white/[.07] pt-5"
          >
            <input type="hidden" name="projectId" value={project.id} />
            <input type="hidden" name="slug" value={project.slug} />
            <input name="name" required placeholder="Phase name" className="form-field" />
            <textarea
              name="description"
              rows={2}
              placeholder="Description"
              className="form-field resize-y"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="startDate" type="date" className="form-field" />
              <input name="dueDate" type="date" className="form-field" />
            </div>
            <button
              type="submit"
              className="justify-self-start text-sm font-medium text-[#8be9ff] hover:text-white"
            >
              Add phase →
            </button>
          </form>
        </AdminPanel>

        <AdminPanel eyebrow="Delivery" title="Milestones">
          <div className="mt-5 grid gap-3">
            {milestones.length ? (
              milestones.map((milestone) => (
                <article
                  key={milestone.id}
                  className="rounded-2xl border border-white/[.07] bg-black/10 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{milestone.title}</p>
                    <StatusBadge value={milestone.status} />
                  </div>
                  <p className="mt-2 text-sm text-white/35">
                    {milestone.description || "No description"}
                  </p>
                  <p className="mt-3 text-xs text-white/24">
                    Due {formatDate(milestone.due_date)}
                    {milestone.requires_approval ? " · Approval required" : ""}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 border-t border-white/[.06] pt-4">
                    <form action={markMilestoneReadyAction}>
                      <input type="hidden" name="projectId" value={project.id} />
                      <input type="hidden" name="milestoneId" value={milestone.id} />
                      <input type="hidden" name="slug" value={project.slug} />
                      <button
                        type="submit"
                        className="text-xs font-semibold text-[#8be9ff] hover:text-white"
                      >
                        Mark ready + email client →
                      </button>
                    </form>
                    {milestone.requires_approval ? (
                      <form action={requestApprovalAction}>
                        <input type="hidden" name="projectId" value={project.id} />
                        <input type="hidden" name="milestoneId" value={milestone.id} />
                        <input type="hidden" name="slug" value={project.slug} />
                        <button
                          type="submit"
                          className="text-xs font-semibold text-[#a99aff] hover:text-white"
                        >
                          Request approval →
                        </button>
                      </form>
                    ) : null}
                  </div>
                </article>
              ))
            ) : (
              <EmptyState>No milestones yet.</EmptyState>
            )}
          </div>
          <form
            action={addMilestoneAction}
            className="mt-5 grid gap-3 border-t border-white/[.07] pt-5"
          >
            <input type="hidden" name="projectId" value={project.id} />
            <input type="hidden" name="slug" value={project.slug} />
            <input
              name="title"
              required
              placeholder="Milestone title"
              className="form-field"
            />
            <select name="phaseId" className="form-field">
              <option value="">No phase</option>
              {phases.map((phase) => (
                <option key={phase.id} value={phase.id}>
                  {phase.name}
                </option>
              ))}
            </select>
            <textarea
              name="description"
              rows={2}
              placeholder="Description"
              className="form-field resize-y"
            />
            <input name="dueDate" type="date" className="form-field" />
            <label className="flex items-center gap-3 text-sm text-white/48">
              <input name="requiresApproval" type="checkbox" /> Requires client approval
            </label>
            <button
              type="submit"
              className="justify-self-start text-sm font-medium text-[#8be9ff] hover:text-white"
            >
              Add milestone →
            </button>
          </form>
        </AdminPanel>

        <AdminPanel eyebrow="Execution" title="Tasks">
          <div className="mt-5 grid gap-3">
            {tasks.length ? (
              tasks.map((task) => {
                const profile = Array.isArray(task.profiles)
                  ? task.profiles[0]
                  : task.profiles;
                return (
                  <article
                    key={task.id}
                    className="rounded-2xl border border-white/[.07] bg-black/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">{task.title}</p>
                      <StatusBadge value={task.status} />
                    </div>
                    <p className="mt-2 text-sm text-white/35">
                      {profile?.full_name || "Unassigned"} · Due {formatDate(task.due_date)}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[.16em] text-white/22">
                      {task.client_visible ? "Client visible" : "Internal"}
                    </p>
                  </article>
                );
              })
            ) : (
              <EmptyState>No tasks yet.</EmptyState>
            )}
          </div>
          <form
            action={addTaskAction}
            className="mt-5 grid gap-3 border-t border-white/[.07] pt-5"
          >
            <input type="hidden" name="projectId" value={project.id} />
            <input type="hidden" name="slug" value={project.slug} />
            <input name="title" required placeholder="Task title" className="form-field" />
            <select name="milestoneId" className="form-field">
              <option value="">No milestone</option>
              {milestones.map((milestone) => (
                <option key={milestone.id} value={milestone.id}>
                  {milestone.title}
                </option>
              ))}
            </select>
            <select name="assignedTo" className="form-field">
              <option value="">Unassigned</option>
              {members.map((member) => {
                const profile = Array.isArray(member.profiles)
                  ? member.profiles[0]
                  : member.profiles;
                return (
                  <option key={member.user_id} value={member.user_id}>
                    {profile?.full_name || member.role}
                  </option>
                );
              })}
            </select>
            <input name="dueDate" type="date" className="form-field" />
            <label className="flex items-center gap-3 text-sm text-white/48">
              <input name="clientVisible" type="checkbox" defaultChecked /> Visible to client
            </label>
            <button
              type="submit"
              className="justify-self-start text-sm font-medium text-[#8be9ff] hover:text-white"
            >
              Add task →
            </button>
          </form>
        </AdminPanel>
      </div>

      <AdminPanel className="mt-6" eyebrow="Files" title="Project documents">
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {files.length ? (
            files.map((file) => (
              <article
                key={file.id}
                className="rounded-2xl border border-white/[.07] bg-black/10 p-4"
              >
                <p className="font-medium text-white">{file.file_name}</p>
                <p className="mt-2 text-xs text-white/28">
                  {file.folder || "Shared"} · {file.client_visible ? "Client visible" : "Internal"} · {formatDate(file.created_at)}
                </p>
              </article>
            ))
          ) : (
            <EmptyState>No files uploaded.</EmptyState>
          )}
        </div>
        <form
          action={uploadAdminFileAction}
          className="mt-5 grid gap-3 border-t border-white/[.07] pt-5 sm:grid-cols-[1fr_180px_auto] sm:items-end"
          encType="multipart/form-data"
        >
          <input type="hidden" name="projectId" value={project.id} />
          <input type="hidden" name="returnTo" value={`/admin/projects/${project.slug}`} />
          <label className="grid gap-2 text-sm text-white/55">
            File
            <input name="file" type="file" required className="form-field" />
          </label>
          <label className="grid gap-2 text-sm text-white/55">
            Folder
            <input name="folder" defaultValue="Shared" className="form-field" />
          </label>
          <div className="grid gap-3">
            <label className="flex items-center gap-2 text-xs text-white/45">
              <input name="clientVisible" type="checkbox" defaultChecked /> Client visible
            </label>
            <ActionButton type="submit">Upload</ActionButton>
          </div>
        </form>
      </AdminPanel>
    </section>
  );
}
