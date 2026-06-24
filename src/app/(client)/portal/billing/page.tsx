import { CreditCard, ExternalLink } from "lucide-react";
import {
  EmptyState,
  PortalPageHeader,
  PortalPanel,
  StatusBadge,
  formatCurrency,
  formatDate
} from "@/components/portal/PortalUi";
import { ActionButton } from "@/components/ui/ActionControl";
import {
  createStripeBillingPortalAction,
  createStripeCheckoutAction
} from "@/features/billing/actions";
import { getPortalBilling } from "@/features/portal/data";

type Props = {
  searchParams: Promise<{
    payment?: string;
    error?: string;
  }>;
};

export default async function PortalBillingPage({ searchParams }: Props) {
  const query = await searchParams;
  const data = await getPortalBilling();
  const totalDue = data.invoices.reduce(
    (total, invoice) =>
      total + Math.max(0, Number(invoice.amount_due) - Number(invoice.amount_paid)),
    0
  );
  const totalPaid = data.invoices.reduce(
    (total, invoice) => total + Number(invoice.amount_paid),
    0
  );
  const primaryOrganization = data.organizations[0] ?? null;

  return (
    <>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <PortalPageHeader
          eyebrow="Client portal"
          title="Billing"
          description="Review invoices, pay securely with Stripe, and access your Stripe billing account."
        />
        {primaryOrganization ? (
          <form action={createStripeBillingPortalAction}>
            <input
              type="hidden"
              name="organizationId"
              value={primaryOrganization.id}
            />
            <ActionButton type="submit" className="min-h-11 px-5">
              Manage billing <ExternalLink className="h-4 w-4" />
            </ActionButton>
          </form>
        ) : null}
      </div>

      {query.payment === "success" ? (
        <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/[.07] px-5 py-4 text-sm text-emerald-100">
          Payment completed. Stripe is synchronizing the final status with your invoice.
        </div>
      ) : null}
      {query.payment === "cancelled" ? (
        <div className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/[.06] px-5 py-4 text-sm text-amber-100">
          Checkout was cancelled. No payment was recorded.
        </div>
      ) : null}
      {query.error ? (
        <div className="mt-7 rounded-2xl border border-red-400/20 bg-red-400/[.07] px-5 py-4 text-sm text-red-100">
          {query.error}
        </div>
      ) : null}

      <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <PortalPanel>
          <p className="text-[0.65rem] uppercase tracking-[.24em] text-white/28">
            Outstanding balance
          </p>
          <p className="mt-6 font-display text-4xl font-semibold">
            {formatCurrency(totalDue)}
          </p>
          <p className="mt-2 text-sm text-white/34">Across all open invoices</p>
        </PortalPanel>
        <PortalPanel>
          <p className="text-[0.65rem] uppercase tracking-[.24em] text-white/28">
            Recorded payments
          </p>
          <p className="mt-6 font-display text-4xl font-semibold">
            {formatCurrency(totalPaid)}
          </p>
          <p className="mt-2 text-sm text-white/34">Synchronized from Stripe</p>
        </PortalPanel>
        <PortalPanel>
          <p className="text-[0.65rem] uppercase tracking-[.24em] text-white/28">
            Invoices
          </p>
          <p className="mt-6 font-display text-4xl font-semibold">
            {data.invoices.length}
          </p>
          <p className="mt-2 text-sm text-white/34">Visible to your organization</p>
        </PortalPanel>
      </div>

      <div className="mt-5">
        {data.invoices.length === 0 ? (
          <EmptyState
            title="No invoices yet"
            text="Invoices will appear here when GridSpell issues them to your organization."
          />
        ) : (
          <div className="grid gap-4">
            {data.invoices.map((invoice) => {
              const project = data.projects.find(
                (item) => item.id === invoice.project_id
              );
              const outstanding = Math.max(
                0,
                Number(invoice.amount_due) - Number(invoice.amount_paid)
              );
              const canPay =
                outstanding > 0 && ["open", "overdue"].includes(invoice.status);

              return (
                <PortalPanel key={invoice.id}>
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-display text-xl font-semibold text-white">
                          {invoice.invoice_number}
                        </p>
                        <StatusBadge status={invoice.status} />
                      </div>
                      <p className="mt-2 text-sm text-white/38">
                        {project?.name ?? "GridSpell project"}
                        {invoice.payment_description
                          ? ` · ${invoice.payment_description}`
                          : ""}
                      </p>
                      <p className="mt-3 text-xs text-white/25">
                        Issued {formatDate(invoice.issued_at)} · Due {formatDate(invoice.due_at)}
                      </p>
                      {invoice.last_payment_error ? (
                        <p className="mt-3 text-sm text-red-200/80">
                          Last payment attempt: {invoice.last_payment_error}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                      <div className="min-w-40 text-left sm:text-right">
                        <p className="text-xs uppercase tracking-[.18em] text-white/25">
                          Balance
                        </p>
                        <p className="mt-1 font-display text-2xl font-semibold text-white">
                          {formatCurrency(outstanding, invoice.currency)}
                        </p>
                        <p className="mt-1 text-xs text-white/25">
                          {formatCurrency(invoice.amount_paid, invoice.currency)} paid
                        </p>
                      </div>
                      {canPay ? (
                        <form action={createStripeCheckoutAction}>
                          <input type="hidden" name="invoiceId" value={invoice.id} />
                          <ActionButton type="submit" className="min-h-11 px-5">
                            <CreditCard className="h-4 w-4" /> Pay securely
                          </ActionButton>
                        </form>
                      ) : null}
                    </div>
                  </div>
                </PortalPanel>
              );
            })}
          </div>
        )}
      </div>

      {data.payments.length > 0 ? (
        <PortalPanel className="mt-5">
          <p className="text-[0.65rem] uppercase tracking-[.24em] text-white/28">
            Payment history
          </p>
          <div className="mt-5 grid gap-3">
            {data.payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/[.07] p-4"
              >
                <div>
                  <p className="text-sm text-white/64">
                    {formatCurrency(payment.amount, payment.currency)}
                  </p>
                  <p className="mt-1 text-xs text-white/26">
                    Recorded {formatDate(payment.paid_at ?? payment.created_at)}
                  </p>
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
