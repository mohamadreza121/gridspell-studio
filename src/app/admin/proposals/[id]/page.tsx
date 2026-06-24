import { notFound } from "next/navigation";
import { ActionButton } from "@/components/ui/ActionControl";
import { AdminHeader, AdminNotice, AdminPanel, EmptyState, StatusBadge, formatDate, formatMoney } from "@/components/admin/AdminUi";
import { addProposalItemAction, deleteProposalItemAction, updateProposalAction } from "@/features/admin/actions";
import { getAdminProposal } from "@/features/admin/data";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string; message?: string }> };

export default async function ProposalDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const query = await searchParams;
  const data = await getAdminProposal(id);
  if (!data) notFound();
  const { proposal, items } = data;
  const organization = Array.isArray(proposal.organizations) ? proposal.organizations[0] : proposal.organizations;
  const lead = Array.isArray(proposal.leads) ? proposal.leads[0] : proposal.leads;
  return (
    <section>
      <AdminHeader eyebrow="Proposal" title={proposal.title} text={`${organization?.name || lead?.company || lead?.name || "Unassigned prospect"} · ${formatMoney(proposal.total, proposal.currency)}`} action={<StatusBadge value={proposal.status} />} />
      <AdminNotice error={query.error} message={query.message} />
      <div className="mt-8 grid gap-6 xl:grid-cols-[.78fr_1.22fr]">
        <AdminPanel eyebrow="Settings" title="Proposal details">
          <form action={updateProposalAction} className="mt-6 grid gap-4"><input type="hidden" name="proposalId" value={proposal.id} /><label className="grid gap-2 text-sm text-white/55">Title<input name="title" defaultValue={proposal.title} required className="form-field" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm text-white/55">Status<select name="status" defaultValue={proposal.status} className="form-field">{["draft","sent","accepted","declined","expired"].map((status) => <option key={status} value={status}>{status}</option>)}</select></label><label className="grid gap-2 text-sm text-white/55">Tax<input name="tax" type="number" step="0.01" defaultValue={proposal.tax} className="form-field" /></label></div><label className="grid gap-2 text-sm text-white/55">Expires<input name="expiresAt" type="datetime-local" defaultValue={proposal.expires_at ? proposal.expires_at.slice(0,16) : ""} className="form-field" /></label><ActionButton type="submit">Save proposal</ActionButton></form>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/[.07] pt-5 text-center"><div><p className="text-xs text-white/25">Subtotal</p><p className="mt-2 font-display text-xl text-white">{formatMoney(proposal.subtotal, proposal.currency)}</p></div><div><p className="text-xs text-white/25">Tax</p><p className="mt-2 font-display text-xl text-white">{formatMoney(proposal.tax, proposal.currency)}</p></div><div><p className="text-xs text-white/25">Total</p><p className="mt-2 font-display text-xl text-white">{formatMoney(proposal.total, proposal.currency)}</p></div></div>
          <p className="mt-5 text-xs text-white/24">Public token: {proposal.public_token}</p>
        </AdminPanel>

        <AdminPanel eyebrow="Scope" title="Line items">
          <div className="mt-6 grid gap-3">{items.length ? items.map((item) => <article key={item.id} className="grid gap-4 rounded-2xl border border-white/[.07] bg-black/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="font-medium text-white">{item.title}{item.optional ? " · Optional" : ""}</p><p className="mt-1 text-sm text-white/35">{item.description || "No description"}</p><p className="mt-2 text-xs text-white/24">{item.quantity} × {formatMoney(item.unit_price, proposal.currency)}</p></div><div className="flex items-center gap-3"><span className="font-medium text-white">{formatMoney(Number(item.quantity) * Number(item.unit_price), proposal.currency)}</span><form action={deleteProposalItemAction}><input type="hidden" name="proposalId" value={proposal.id} /><input type="hidden" name="itemId" value={item.id} /><button type="submit" className="text-xs text-[#ff9aa3] hover:text-white">Remove</button></form></div></article>) : <EmptyState>No line items yet.</EmptyState>}</div>
          <form action={addProposalItemAction} className="mt-6 grid gap-4 border-t border-white/[.07] pt-6"><input type="hidden" name="proposalId" value={proposal.id} /><label className="grid gap-2 text-sm text-white/55">Item title<input name="title" required className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">Description<textarea name="description" rows={3} className="form-field resize-y" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm text-white/55">Quantity<input name="quantity" type="number" min="0.01" step="0.01" defaultValue="1" className="form-field" /></label><label className="grid gap-2 text-sm text-white/55">Unit price<input name="unitPrice" type="number" min="0" step="0.01" defaultValue="0" className="form-field" /></label></div><label className="flex items-center gap-3 text-sm text-white/48"><input name="optional" type="checkbox" /> Optional item</label><ActionButton type="submit">Add line item</ActionButton></form>
        </AdminPanel>
      </div>
      <p className="mt-6 text-xs text-white/22">Created {formatDate(proposal.created_at)}{proposal.accepted_at ? ` · Accepted ${formatDate(proposal.accepted_at)}` : ""}</p>
    </section>
  );
}
