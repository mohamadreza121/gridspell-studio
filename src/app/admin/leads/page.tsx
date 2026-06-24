import Link from "next/link";
import { ActionButton } from "@/components/ui/ActionControl";
import { AdminHeader, AdminNotice, AdminPanel, EmptyState, StatusBadge, formatDate, formatMoney } from "@/components/admin/AdminUi";
import { addLeadActivityAction, updateLeadAction } from "@/features/admin/actions";
import { getAdminLeads } from "@/features/admin/data";

const statuses = ["all", "new", "qualified", "discovery_booked", "proposal_sent", "negotiating", "won", "lost"] as const;

type Props = { searchParams: Promise<{ status?: string; error?: string; message?: string }> };

export default async function LeadsPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedStatus = statuses.includes((params.status ?? "all") as (typeof statuses)[number]) ? params.status ?? "all" : "all";
  const { leads, staff, activities } = await getAdminLeads(selectedStatus);
  const activityByLead = new Map<string, typeof activities>();
  for (const item of activities) {
    const current = activityByLead.get(item.lead_id) ?? [];
    current.push(item);
    activityByLead.set(item.lead_id, current);
  }

  return (
    <section>
      <AdminHeader title="Lead management." text="Qualify inquiries, set follow-ups, record internal notes, and move opportunities through the sales pipeline." />
      <AdminNotice error={params.error} message={params.message} />
      <div className="mt-7 flex flex-wrap gap-2">
        {statuses.map((status) => (
          <Link key={status} href={status === "all" ? "/admin/leads" : `/admin/leads?status=${status}`} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[.16em] transition ${selectedStatus === status ? "border-[#8be9ff]/50 bg-[#8be9ff]/10 text-[#8be9ff]" : "border-white/10 text-white/36 hover:border-white/25 hover:text-white"}`}>{status.replaceAll("_", " ")}</Link>
        ))}
      </div>

      <div className="mt-7 grid gap-5">
        {leads.length ? leads.map((lead) => {
          const assigned = Array.isArray(lead.profiles) ? lead.profiles[0] : lead.profiles;
          const leadActivities = activityByLead.get(lead.id) ?? [];
          return (
            <AdminPanel key={lead.id}>
              <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-display text-2xl font-semibold text-white">{lead.name}</h2><p className="mt-1 text-sm text-white/36">{lead.company || "Independent client"} · {lead.email}</p></div><StatusBadge value={lead.status} /></div>
                  <div className="mt-5 grid gap-3 text-sm text-white/50 sm:grid-cols-2"><p><span className="text-white/25">Project:</span> {lead.project_type}</p><p><span className="text-white/25">Budget:</span> {lead.budget_range}</p><p><span className="text-white/25">Timeline:</span> {lead.timeline || "Not stated"}</p><p><span className="text-white/25">Estimate:</span> {formatMoney(lead.estimated_value)}</p><p><span className="text-white/25">Assigned:</span> {assigned?.full_name || "Unassigned"}</p><p><span className="text-white/25">Created:</span> {formatDate(lead.created_at)}</p></div>
                  <p className="mt-5 rounded-2xl border border-white/[.07] bg-black/10 p-4 text-sm leading-7 text-white/45">{lead.message}</p>
                  <div className="mt-5 grid gap-2">
                    {leadActivities.slice(0, 4).map((activity) => {
                      const actor = Array.isArray(activity.profiles) ? activity.profiles[0] : activity.profiles;
                      return <div key={activity.id} className="border-l border-[#7c5cff]/35 pl-4 text-sm"><p className="text-white/48">{activity.body || activity.activity_type.replaceAll("_", " ")}</p><p className="mt-1 text-xs text-white/22">{actor?.full_name || "System"} · {formatDate(activity.created_at)}</p></div>;
                    })}
                  </div>
                </div>

                <div className="grid gap-4">
                  <form action={updateLeadAction} className="grid gap-4 rounded-2xl border border-white/[.07] bg-black/10 p-4">
                    <input type="hidden" name="leadId" value={lead.id} /><input type="hidden" name="returnTo" value={selectedStatus === "all" ? "/admin/leads" : `/admin/leads?status=${selectedStatus}`} />
                    <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm text-white/55">Status<select name="status" defaultValue={lead.status} className="form-field">{statuses.filter((item) => item !== "all").map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select></label><label className="grid gap-2 text-sm text-white/55">Assigned to<select name="assignedTo" defaultValue={lead.assigned_to ?? ""} className="form-field"><option value="">Unassigned</option>{staff.map((person) => <option key={person.id} value={person.id}>{person.full_name || "Staff member"}</option>)}</select></label></div>
                    <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm text-white/55">Estimated value<input name="estimatedValue" type="number" step="0.01" defaultValue={lead.estimated_value ?? ""} className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">Next follow-up<input name="nextFollowUpAt" type="datetime-local" defaultValue={lead.next_follow_up_at ? lead.next_follow_up_at.slice(0,16) : ""} className="form-field" /></label></div>
                    <label className="grid gap-2 text-sm text-white/55">Internal notes<textarea name="internalNotes" defaultValue={lead.internal_notes ?? ""} rows={4} className="form-field resize-y" /></label>
                    <ActionButton type="submit">Save lead</ActionButton>
                  </form>
                  <form action={addLeadActivityAction} className="grid gap-3 rounded-2xl border border-white/[.07] bg-black/10 p-4"><input type="hidden" name="leadId" value={lead.id} /><input type="hidden" name="returnTo" value={selectedStatus === "all" ? "/admin/leads" : `/admin/leads?status=${selectedStatus}`} /><label className="grid gap-2 text-sm text-white/55">Add activity note<textarea name="body" required rows={3} className="form-field resize-y" /></label><button className="justify-self-start text-sm font-medium text-[#8be9ff] hover:text-white" type="submit">Add note →</button></form>
                </div>
              </div>
            </AdminPanel>
          );
        }) : <EmptyState>No leads match this filter.</EmptyState>}
      </div>
    </section>
  );
}
