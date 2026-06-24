import { AdminHeader, AdminPanel, EmptyState, formatDate } from "@/components/admin/AdminUi";
import { getAdminActivity } from "@/features/admin/data";

export default async function ActivityPage() {
  const activities = await getAdminActivity();
  return (
    <section>
      <AdminHeader title="Activity logs." text="A chronological audit trail of important sales, project, file, proposal, invoice, and content changes." />
      <AdminPanel className="mt-8" eyebrow="Audit trail" title="Recent events">
        <div className="mt-6 grid gap-2">
          {activities.length ? activities.map((activity) => {
            const actor = Array.isArray(activity.profiles) ? activity.profiles[0] : activity.profiles;
            const organization = Array.isArray(activity.organizations) ? activity.organizations[0] : activity.organizations;
            const project = Array.isArray(activity.projects) ? activity.projects[0] : activity.projects;
            return <article key={activity.id} className="grid gap-2 border-b border-white/[.06] py-4 md:grid-cols-[170px_1fr_170px]"><div className="text-xs text-white/28">{formatDate(activity.created_at)}</div><div><p className="text-sm text-white/64"><span className="font-medium text-white">{actor?.full_name || "System"}</span> · {activity.action.replaceAll("_", " ")}</p><p className="mt-1 text-xs text-white/28">{project?.name || organization?.name || activity.entity_type || "GridSpell record"}</p></div><div className="text-xs uppercase tracking-[.18em] text-white/22 md:text-right">{activity.entity_type || "record"}</div></article>;
          }) : <EmptyState>No activity has been recorded yet.</EmptyState>}
        </div>
      </AdminPanel>
    </section>
  );
}
