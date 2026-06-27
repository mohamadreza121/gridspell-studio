"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSiteUrl } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { requirePortalUser } from "@/lib/supabase/auth";
import { ensureStripeCustomer } from "@/lib/stripe/customers";
import { getStripe } from "@/lib/stripe/server";

const uuidSchema = z.string().uuid();

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function billingError(message: string): never {
  redirect(`/portal/billing?error=${encodeURIComponent(message)}`);
}

function canAccessOrganization(
  viewer: Awaited<ReturnType<typeof requirePortalUser>>,
  organizationId: string
) {
  return Boolean(
    viewer.staffRole ||
      viewer.organizationMemberships.some(
        (membership) => membership.organizationId === organizationId
      )
  );
}

export async function createStripeCheckoutAction(formData: FormData) {
  const invoiceId = uuidSchema.safeParse(formString(formData, "invoiceId"));
  if (!invoiceId.success) billingError("The invoice is invalid.");

  const viewer = await requirePortalUser();
  const admin = createAdminClient();
  const { data: invoice, error } = await admin
    .from("invoices")
    .select(
      "id, organization_id, project_id, invoice_number, status, amount_due, amount_paid, currency, payment_description, organizations(id, name, stripe_customer_id), projects(name)"
    )
    .eq("id", invoiceId.data)
    .maybeSingle();

  if (error || !invoice?.organization_id) {
    billingError(error?.message ?? "Invoice not found.");
  }
  if (!canAccessOrganization(viewer, invoice.organization_id)) {
    billingError("You do not have access to this invoice.");
  }
  if (!["open", "overdue"].includes(invoice.status)) {
    billingError("This invoice is not currently payable.");
  }

  const outstanding = Math.max(
    0,
    Number(invoice.amount_due) - Number(invoice.amount_paid)
  );
  if (outstanding <= 0) billingError("This invoice has already been paid.");

  const organization = Array.isArray(invoice.organizations)
    ? invoice.organizations[0]
    : invoice.organizations;
  const project = Array.isArray(invoice.projects)
    ? invoice.projects[0]
    : invoice.projects;
  if (!organization) billingError("The invoice organization is unavailable.");

  const customerId = await ensureStripeCustomer(admin, {
    organizationId: organization.id,
    organizationName: organization.name,
    existingCustomerId: organization.stripe_customer_id,
    email: viewer.email,
    userId: viewer.userId
  });

  const stripe = getStripe();
  const siteUrl = getSiteUrl();
  const amountInMinorUnits = Math.round(outstanding * 100);
  const description =
    invoice.payment_description ||
    (project?.name ? `Project payment for ${project.name}` : "GridSpell project payment");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: customerId,
    client_reference_id: invoice.id,
    billing_address_collection: "auto",
    customer_update: { address: "auto", name: "auto" },
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description,
        metadata: {
          gridspell_invoice_id: invoice.id,
          gridspell_organization_id: invoice.organization_id,
          gridspell_project_id: invoice.project_id ?? ""
        }
      }
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: invoice.currency.toLowerCase(),
          unit_amount: amountInMinorUnits,
          product_data: {
            name: `${invoice.invoice_number} — ${description}`,
            description: project?.name || undefined,
            metadata: { gridspell_invoice_id: invoice.id }
          }
        }
      }
    ],
    payment_intent_data: {
      metadata: {
        gridspell_invoice_id: invoice.id,
        gridspell_organization_id: invoice.organization_id,
        gridspell_project_id: invoice.project_id ?? ""
      }
    },
    metadata: {
      gridspell_invoice_id: invoice.id,
      gridspell_organization_id: invoice.organization_id,
      gridspell_project_id: invoice.project_id ?? ""
    },
    success_url: `${siteUrl}/portal/billing?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/portal/billing?payment=cancelled`
  });

  if (!session.url) billingError("Stripe did not return a checkout URL.");

  const { error: updateError } = await admin
    .from("invoices")
    .update({
      stripe_checkout_session_id: session.id,
      checkout_url: session.url,
      checkout_expires_at: session.expires_at
        ? new Date(session.expires_at * 1000).toISOString()
        : null,
      last_payment_error: null
    })
    .eq("id", invoice.id);

  if (updateError) billingError(updateError.message);
  redirect(session.url);
}

export async function createStripeBillingPortalAction(formData: FormData) {
  const organizationId = uuidSchema.safeParse(
    formString(formData, "organizationId")
  );
  if (!organizationId.success) billingError("The organization is invalid.");

  const viewer = await requirePortalUser();
  if (!canAccessOrganization(viewer, organizationId.data)) {
    billingError("You do not have access to this billing account.");
  }

  const admin = createAdminClient();
  const { data: organization, error } = await admin
    .from("organizations")
    .select("id, name, stripe_customer_id")
    .eq("id", organizationId.data)
    .maybeSingle();
  if (error || !organization) {
    billingError(error?.message ?? "Organization not found.");
  }

  const customerId = await ensureStripeCustomer(admin, {
    organizationId: organization.id,
    organizationName: organization.name,
    existingCustomerId: organization.stripe_customer_id,
    email: viewer.email,
    userId: viewer.userId
  });

  const stripe = getStripe();
  const configuration = process.env.STRIPE_BILLING_PORTAL_CONFIGURATION_ID;
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${getSiteUrl()}/portal/billing`,
    ...(configuration ? { configuration } : {})
  });

  redirect(session.url);
}
