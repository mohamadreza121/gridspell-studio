import Link from "next/link";
import { ActionButton } from "@/components/ui/ActionControl";
import { AdminHeader, AdminNotice, AdminPanel, EmptyState, StatusBadge, formatDate, formatMoney } from "@/components/admin/AdminUi";
import { createProjectAction } from "@/features/admin/actions";
import { getAdminProjects } from "@/features/admin/data";

type Props = { searchParams: Promise<{ error?: string; message?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { projects, organizations } = await getAdminProjects();
  return (
    <section>
      <AdminHeader title="Project operations." text="Create projects, connect them to client organizations, and manage the delivery plan from one workspace." />
      <AdminNotice error={params.error} message={params.message} />
      <div className="mt-8 grid gap-6 xl:grid-cols-[.76fr_1.24fr]">
        <AdminPanel eyebrow="New project" title="Create a client workspace">
          <form action={createProjectAction} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-white/55">Organization<select name="organizationId" required className="form-field"><option value="">Select organization</option>{organizations.map((organization) => <option key={organization.id} value={organization.id}>{organization.name}</option>)}</select></label>
            <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm text-white/55">Project name<input name="name" required className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">URL slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="acme-website" className="form-field" /></label></div>
            <label className="grid gap-2 text-sm text-white/55">Description<textarea name="description" rows={4} className="form-field resize-y" /></label>
            <div className="grid gap-4 sm:grid-cols-3"><label className="grid gap-2 text-sm text-white/55">Budget<input name="budget" type="number" step="0.01" className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">Start date<input name="startDate" type="date" className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">Target launch<input name="targetLaunchDate" type="date" className="form-field" /></label></div>
            <ActionButton type="submit">Create project</ActionButton>
          </form>
        </AdminPanel>

        <AdminPanel eyebrow="Delivery" title="Projects">
          <div className="mt-6 grid gap-3">
            {projects.length ? projects.map((project) => {
              const organization = Array.isArray(project.organizations) ? project.organizations[0] : project.organizations;
              return <Link key={project.id} href={`/admin/projects/${project.slug}`} className="rounded-2xl border border-white/[.07] bg-black/10 p-4 transition hover:border-[#7c5cff]/35 hover:bg-white/[.035]"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-medium text-white">{project.name}</p><p className="mt-1 text-sm text-white/35">{organization?.name ?? "No organization"} · Updated {formatDate(project.updated_at)}</p></div><div className="flex items-center gap-3"><StatusBadge value={project.status} /><span className="text-sm text-white/46">{formatMoney(project.budget)}</span></div></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[.06]"><div className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#29d6ff]" style={{ width: `${project.progress}%` }} /></div><p className="mt-2 text-xs text-white/28">{project.progress}% complete · Target {formatDate(project.target_launch_date)}</p></Link>;
            }) : <EmptyState>No projects yet.</EmptyState>}
          </div>
        </AdminPanel>
      </div>
    </section>
  );
}
