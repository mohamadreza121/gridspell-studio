import "server-only";

import Stripe from "stripe";

let stripeClient: Stripe | null = null;

function required(value: string | undefined, name: string) {
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(required(process.env.STRIPE_SECRET_KEY, "STRIPE_SECRET_KEY"), {
      maxNetworkRetries: 2,
      typescript: true
    });
  }

  return stripeClient;
}

export function getStripeWebhookSecret() {
  return required(process.env.STRIPE_WEBHOOK_SECRET, "STRIPE_WEBHOOK_SECRET");
}
