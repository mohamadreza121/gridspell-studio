import {
  EmptyState,
  PortalPageHeader,
  PortalPanel,
  StatusBadge,
  formatCurrency,
  formatDate
} from "@/components/portal/PortalUi";
import { getPortalBilling } from "@/features/portal/data";

export default async function PortalBillingPage() {
  const data = await getPortalBilling();
  const totalDue = data.invoices.reduce(
    (total, invoice) => total + Math.max(0, Number(invoice.amount_due) - Number(invoice.amount_paid)),
    0
  );
  const totalPaid = data.invoices.reduce((total, invoice) => total + Number(invoice.amount_paid), 0);

  return (
    <>
      <PortalPageHeader
        eyebrow="Client portal"
        title="Billing"
        description="Review invoice status, balances, due dates, and recorded payments for your projects."
      />

      <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <PortalPanel>
          <p className="text-[0.65rem] uppercase tracking-[.24em] text-white/28">Outstanding balance</p>
          <p className="mt-6 font-display text-4xl font-semibold">{formatCurrency(totalDue)}</p>
          <p className="mt-2 text-sm text-white/34">Across all open invoices</p>
        </PortalPanel>
        <PortalPanel>
          <p className="text-[0.65rem] uppercase tracking-[.24em] text-white/28">Recorded payments</p>
          <p className="mt-6 font-display text-4xl font-semibold">{formatCurrency(totalPaid)}</p>
          <p className="mt-2 text-sm text-white/34">Paid toward current engagements</p>
        </PortalPanel>
        <PortalPanel>
          <p className="text-[0.65rem] uppercase tracking-[.24em] text-white/28">Invoices</p>
          <p className="mt-6 font-display text-4xl font-semibold">{data.invoices.length}</p>
          <p className="mt-2 text-sm text-white/34">Visible to your organization</p>
        </PortalPanel>
      </div>

      <div className="mt-5">
        {data.invoices.length === 0 ? (
          <EmptyState title="No invoices yet" text="Invoices will appear here when GridSpell issues them to your organization." />
        ) : (
          <PortalPanel>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/[.08] text-[0.62rem] uppercase tracking-[.22em] text-white/25">
                    <th className="pb-4 font-medium">Invoice</th>
                    <th className="pb-4 font-medium">Project</th>
                    <th className="pb-4 font-medium">Issued</th>
                    <th className="pb-4 font-medium">Due</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Paid</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.invoices.map((invoice) => {
                    const project = data.projects.find((item) => item.id === invoice.project_id);
                    return (
                      <tr key={invoice.id} className="border-b border-white/[.055] text-sm text-white/54">
                        <td className="py-4 font-medium text-white/72">{invoice.invoice_number}</td>
                        <td className="py-4">{project?.name ?? "Project"}</td>
                        <td className="py-4">{formatDate(invoice.issued_at)}</td>
                        <td className="py-4">{formatDate(invoice.due_at)}</td>
                        <td className="py-4">{formatCurrency(invoice.amount_due, invoice.currency)}</td>
                        <td className="py-4">{formatCurrency(invoice.amount_paid, invoice.currency)}</td>
                        <td className="py-4"><StatusBadge status={invoice.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </PortalPanel>
        )}
      </div>

      {data.payments.length > 0 ? (
        <PortalPanel className="mt-5">
          <p className="text-[0.65rem] uppercase tracking-[.24em] text-white/28">Payment history</p>
          <div className="mt-5 grid gap-3">
            {data.payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/[.07] p-4">
                <div>
                  <p className="text-sm text-white/64">{formatCurrency(payment.amount, payment.currency)}</p>
                  <p className="mt-1 text-xs text-white/26">Recorded {formatDate(payment.paid_at ?? payment.created_at)}</p>
                </div>
                <StatusBadge status={payment.status} />
              </div>
            ))}
          </div>
        </PortalPanel>
      ) : null}
    </>
  );
}
