import Link from "next/link";
import { ActionButton } from "@/components/ui/ActionControl";
import { AdminHeader, AdminNotice, AdminPanel, EmptyState, StatusBadge, formatDate, formatMoney } from "@/components/admin/AdminUi";
import { createProposalAction } from "@/features/admin/actions";
import { getAdminProposals } from "@/features/admin/data";

type Props = { searchParams: Promise<{ error?: string; message?: string }> };

export default async function ProposalsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { proposals, organizations, leads, projects } = await getAdminProposals();
  return (
    <section>
      <AdminHeader title="Proposal builder." text="Create scoped proposals, add line items, track status, and convert accepted work into projects and invoices." />
      <AdminNotice error={params.error} message={params.message} />
      <div className="mt-8 grid gap-6 xl:grid-cols-[.72fr_1.28fr]">
        <AdminPanel eyebrow="New proposal" title="Create a draft">
          <form action={createProposalAction} className="mt-6 grid gap-4"><label className="grid gap-2 text-sm text-white/55">Title<input name="title" required className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">Organization<select name="organizationId" className="form-field"><option value="">No organization yet</option>{organizations.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="grid gap-2 text-sm text-white/55">Lead<select name="leadId" className="form-field"><option value="">No lead</option>{leads.map((lead) => <option key={lead.id} value={lead.id}>{lead.company ? `${lead.company} — ${lead.name}` : lead.name}</option>)}</select></label><label className="grid gap-2 text-sm text-white/55">Project<select name="projectId" className="form-field"><option value="">No project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label><div className="grid gap-4 sm:grid-cols-3"><label className="grid gap-2 text-sm text-white/55">Currency<input name="currency" defaultValue="CAD" className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">Tax<input name="tax" type="number" step="0.01" defaultValue="0" className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">Expires<input name="expiresAt" type="datetime-local" className="form-field" /></label></div><ActionButton type="submit">Create proposal</ActionButton></form>
        </AdminPanel>
        <AdminPanel eyebrow="Sales documents" title="Proposals">
          <div className="mt-6 grid gap-3">{proposals.length ? proposals.map((proposal) => { const organization = Array.isArray(proposal.organizations) ? proposal.organizations[0] : proposal.organizations; const lead = Array.isArray(proposal.leads) ? proposal.leads[0] : proposal.leads; return <Link key={proposal.id} href={`/admin/proposals/${proposal.id}`} className="rounded-2xl border border-white/[.07] bg-black/10 p-4 transition hover:border-[#7c5cff]/35 hover:bg-white/[.035]"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-medium text-white">{proposal.title}</p><p className="mt-1 text-sm text-white/35">{organization?.name || lead?.company || lead?.name || "Unassigned prospect"} · Created {formatDate(proposal.created_at)}</p></div><div className="flex items-center gap-3"><StatusBadge value={proposal.status} /><span className="text-sm text-white/50">{formatMoney(proposal.total, proposal.currency)}</span></div></div></Link>; }) : <EmptyState>No proposals yet.</EmptyState>}</div>
        </AdminPanel>
      </div>
    </section>
  );
}
