import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteUrl } from "@/lib/env";
import { getOrganizationRecipients } from "@/lib/email/recipients";
import { sendTransactionalEmail } from "@/lib/email/send";
import { paymentConfirmationTemplate } from "@/lib/email/templates";
import { getStripe, getStripeWebhookSecret } from "@/lib/stripe/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AdminClient = ReturnType<typeof createAdminClient>;

function stripeId(value: string | Stripe.PaymentIntent | Stripe.Invoice | Stripe.Charge | null) {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency.toUpperCase()
  }).format(amount);
}

async function syncInvoiceFromPayments(admin: AdminClient, invoiceId: string) {
  const [{ data: invoice, error: invoiceError }, { data: payments, error: paymentError }] =
    await Promise.all([
      admin
        .from("invoices")
        .select("id, amount_due, status")
        .eq("id", invoiceId)
        .single(),
      admin
        .from("payments")
        .select("amount, amount_refunded, status")
        .eq("invoice_id", invoiceId)
    ]);

  if (invoiceError || !invoice) throw invoiceError ?? new Error("Invoice not found.");
  if (paymentError) throw paymentError;

  const amountPaid = (payments ?? []).reduce((total, payment) => {
    if (!["paid", "succeeded", "partially_refunded", "refunded"].includes(payment.status)) {
      return total;
    }
    return total + Math.max(0, Number(payment.amount) - Number(payment.amount_refunded ?? 0));
  }, 0);
  const fullyPaid = amountPaid + 0.005 >= Number(invoice.amount_due);

  const { error } = await admin
    .from("invoices")
    .update({
      amount_paid: amountPaid,
      status: fullyPaid ? "paid" : invoice.status === "void" ? "void" : "open",
      paid_at: fullyPaid ? new Date().toISOString() : null,
      last_payment_error: null
    })
    .eq("id", invoiceId);

  if (error) throw error;
  return { amountPaid, fullyPaid };
}

async function upsertPayment(
  admin: AdminClient,
  input: {
    invoiceId: string;
    projectId?: string | null;
    amount: number;
    currency: string;
    status: string;
    checkoutSessionId?: string | null;
    paymentIntentId?: string | null;
    chargeId?: string | null;
    failureMessage?: string | null;
    paidAt?: string | null;
  }
) {
  let existingId: string | null = null;

  if (input.paymentIntentId) {
    const { data } = await admin
      .from("payments")
      .select("id")
      .eq("stripe_payment_intent_id", input.paymentIntentId)
      .maybeSingle();
    existingId = data?.id ?? null;
  }

  if (!existingId && input.checkoutSessionId) {
    const { data } = await admin
      .from("payments")
      .select("id")
      .eq("stripe_checkout_session_id", input.checkoutSessionId)
      .maybeSingle();
    existingId = data?.id ?? null;
  }

  const payload = {
    invoice_id: input.invoiceId,
    project_id: input.projectId ?? null,
    amount: input.amount,
    currency: input.currency.toUpperCase(),
    provider: "stripe",
    provider_payment_id:
      input.paymentIntentId ?? input.checkoutSessionId ?? crypto.randomUUID(),
    status: input.status,
    paid_at: input.paidAt ?? null,
    stripe_checkout_session_id: input.checkoutSessionId ?? null,
    stripe_payment_intent_id: input.paymentIntentId ?? null,
    stripe_charge_id: input.chargeId ?? null,
    failure_message: input.failureMessage ?? null
  };

  const query = existingId
    ? admin.from("payments").update(payload).eq("id", existingId)
    : admin.from("payments").insert(payload);
  const { error } = await query;
  if (error) throw error;
}

async function handleCheckoutCompleted(
  admin: AdminClient,
  session: Stripe.Checkout.Session
) {
  const invoiceId = session.metadata?.gridspell_invoice_id;
  if (!invoiceId) return;

  const paymentIntentId = stripeId(session.payment_intent);
  const stripeInvoiceId = stripeId(session.invoice);
  const amount = Number(session.amount_total ?? 0) / 100;
  const currency = session.currency ?? "cad";

  const { data: invoice, error } = await admin
    .from("invoices")
    .select("project_id")
    .eq("id", invoiceId)
    .maybeSingle();
  if (error) throw error;

  await upsertPayment(admin, {
    invoiceId,
    projectId: invoice?.project_id,
    amount,
    currency,
    status: session.payment_status === "paid" ? "paid" : "pending",
    checkoutSessionId: session.id,
    paymentIntentId,
    paidAt: session.payment_status === "paid" ? new Date().toISOString() : null
  });

  const { error: invoiceUpdateError } = await admin
    .from("invoices")
    .update({
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: paymentIntentId,
      stripe_invoice_id: stripeInvoiceId,
      checkout_url: null,
      checkout_expires_at: null
    })
    .eq("id", invoiceId);
  if (invoiceUpdateError) throw invoiceUpdateError;

  if (session.payment_status === "paid") {
    await syncInvoiceFromPayments(admin, invoiceId);
  }
}


async function handleCheckoutUnavailable(
  admin: AdminClient,
  session: Stripe.Checkout.Session,
  message: string
) {
  const invoiceId = session.metadata?.gridspell_invoice_id;
  if (!invoiceId) return;
  const { error } = await admin
    .from("invoices")
    .update({
      checkout_url: null,
      checkout_expires_at: null,
      last_payment_error: message
    })
    .eq("id", invoiceId);
  if (error) throw error;
}

async function handlePaymentSucceeded(
  admin: AdminClient,
  paymentIntent: Stripe.PaymentIntent
) {
  const invoiceId = paymentIntent.metadata.gridspell_invoice_id;
  if (!invoiceId) return;

  const { data: invoice, error } = await admin
    .from("invoices")
    .select(
      "id, organization_id, project_id, invoice_number, currency, projects(name)"
    )
    .eq("id", invoiceId)
    .maybeSingle();
  if (error || !invoice?.organization_id) {
    throw error ?? new Error("Invoice organization not found.");
  }

  const chargeId = stripeId(paymentIntent.latest_charge);
  const amount = Number(paymentIntent.amount_received || paymentIntent.amount) / 100;
  await upsertPayment(admin, {
    invoiceId,
    projectId: invoice.project_id,
    amount,
    currency: paymentIntent.currency,
    status: "paid",
    paymentIntentId: paymentIntent.id,
    chargeId,
    paidAt: new Date().toISOString()
  });
  await admin
    .from("invoices")
    .update({ stripe_payment_intent_id: paymentIntent.id, last_payment_error: null })
    .eq("id", invoiceId);
  await syncInvoiceFromPayments(admin, invoiceId);

  const recipients = await getOrganizationRecipients(admin, invoice.organization_id);
  const project = Array.isArray(invoice.projects)
    ? invoice.projects[0]
    : invoice.projects;
  const billingUrl = `${getSiteUrl()}/portal/billing`;

  await Promise.allSettled(
    recipients.map((recipient) =>
      sendTransactionalEmail({
        to: recipient.email,
        template: paymentConfirmationTemplate({
          clientName: recipient.fullName,
          invoiceNumber: invoice.invoice_number,
          amount: formatCurrency(amount, invoice.currency),
          projectName: project?.name ?? null,
          billingUrl
        }),
        metadata: {
          invoiceId,
          organizationId: invoice.organization_id,
          paymentIntentId: paymentIntent.id
        }
      })
    )
  );

  if (recipients.length) {
    await admin.from("notifications").insert(
      recipients.map((recipient) => ({
        user_id: recipient.userId,
        title: "Payment received",
        body: `${invoice.invoice_number} was updated after a successful payment.`,
        href: "/portal/billing"
      }))
    );
  }
}

async function handlePaymentFailed(
  admin: AdminClient,
  paymentIntent: Stripe.PaymentIntent
) {
  const invoiceId = paymentIntent.metadata.gridspell_invoice_id;
  if (!invoiceId) return;
  const message = paymentIntent.last_payment_error?.message ?? "Payment failed.";

  const { data: invoice, error } = await admin
    .from("invoices")
    .select("project_id")
    .eq("id", invoiceId)
    .maybeSingle();
  if (error) throw error;

  await upsertPayment(admin, {
    invoiceId,
    projectId: invoice?.project_id,
    amount: Number(paymentIntent.amount) / 100,
    currency: paymentIntent.currency,
    status: "failed",
    paymentIntentId: paymentIntent.id,
    failureMessage: message
  });

  const { error: updateError } = await admin
    .from("invoices")
    .update({ last_payment_error: message })
    .eq("id", invoiceId);
  if (updateError) throw updateError;
}

async function handleChargeRefunded(admin: AdminClient, charge: Stripe.Charge) {
  const paymentIntentId = stripeId(charge.payment_intent);
  if (!paymentIntentId) return;

  const { data: payment, error } = await admin
    .from("payments")
    .select("id, invoice_id, amount")
    .eq("stripe_payment_intent_id", paymentIntentId)
    .maybeSingle();
  if (error || !payment?.invoice_id) return;

  const refunded = Number(charge.amount_refunded) / 100;
  const { error: updateError } = await admin
    .from("payments")
    .update({
      amount_refunded: refunded,
      status: refunded + 0.005 >= Number(payment.amount) ? "refunded" : "partially_refunded",
      stripe_charge_id: charge.id
    })
    .eq("id", payment.id);
  if (updateError) throw updateError;
  await syncInvoiceFromPayments(admin, payment.invoice_id);
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      getStripeWebhookSecret()
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("webhook_events")
    .select("id, status")
    .eq("provider", "stripe")
    .eq("event_id", event.id)
    .maybeSingle();

  if (existing?.status === "processed" || existing?.status === "ignored") {
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (existing) {
    await admin
      .from("webhook_events")
      .update({ status: "processing", error_message: null })
      .eq("id", existing.id);
  } else {
    const { error } = await admin.from("webhook_events").insert({
      provider: "stripe",
      event_id: event.id,
      event_type: event.type,
      status: "processing",
      payload: event as unknown as Record<string, unknown>
    });
    if (error?.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handleCheckoutCompleted(
          admin,
          event.data.object as Stripe.Checkout.Session
        );
        break;
      case "checkout.session.expired":
        await handleCheckoutUnavailable(
          admin,
          event.data.object as Stripe.Checkout.Session,
          "Checkout session expired."
        );
        break;
      case "checkout.session.async_payment_failed":
        await handleCheckoutUnavailable(
          admin,
          event.data.object as Stripe.Checkout.Session,
          "The asynchronous payment failed."
        );
        break;
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(
          admin,
          event.data.object as Stripe.PaymentIntent
        );
        break;
      case "payment_intent.payment_failed":
        await handlePaymentFailed(
          admin,
          event.data.object as Stripe.PaymentIntent
        );
        break;
      case "charge.refunded":
        await handleChargeRefunded(admin, event.data.object as Stripe.Charge);
        break;
      default:
        await admin
          .from("webhook_events")
          .update({ status: "ignored", processed_at: new Date().toISOString() })
          .eq("provider", "stripe")
          .eq("event_id", event.id);
        return NextResponse.json({ received: true, ignored: true });
    }

    await admin
      .from("webhook_events")
      .update({ status: "processed", processed_at: new Date().toISOString() })
      .eq("provider", "stripe")
      .eq("event_id", event.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed.";
    await admin
      .from("webhook_events")
      .update({ status: "failed", error_message: message })
      .eq("provider", "stripe")
      .eq("event_id", event.id);
    console.error("Stripe webhook failed:", event.type, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
