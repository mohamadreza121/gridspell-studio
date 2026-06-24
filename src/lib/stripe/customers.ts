import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { getStripe } from "@/lib/stripe/server";

type AdminClient = SupabaseClient;

type EnsureCustomerInput = {
  organizationId: string;
  organizationName: string;
  existingCustomerId?: string | null;
  email?: string | null;
  userId?: string | null;
};

export async function ensureStripeCustomer(
  admin: AdminClient,
  input: EnsureCustomerInput
) {
  if (input.existingCustomerId) return input.existingCustomerId;

  const stripe = getStripe();
  const customer = await stripe.customers.create({
    name: input.organizationName,
    email: input.email || undefined,
    metadata: {
      organization_id: input.organizationId,
      created_by_user_id: input.userId ?? "system"
    }
  });

  const { error } = await admin
    .from("organizations")
    .update({
      stripe_customer_id: customer.id,
      billing_email: input.email || null
    })
    .eq("id", input.organizationId);

  if (error) {
    await stripe.customers.del(customer.id).catch(() => undefined);
    throw error;
  }

  return customer.id;
}
