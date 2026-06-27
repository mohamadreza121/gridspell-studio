import Stripe from "stripe";

const baseUrl = (process.env.STRIPE_WEBHOOK_TEST_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  ""
);
const secret = process.env.STRIPE_WEBHOOK_SECRET;

if (!secret) {
  throw new Error("STRIPE_WEBHOOK_SECRET is required.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");
const eventId = `evt_gridspell_phase8_${Date.now()}`;
const payload = JSON.stringify({
  id: eventId,
  object: "event",
  api_version: "2026-05-28.basil",
  created: Math.floor(Date.now() / 1000),
  livemode: false,
  pending_webhooks: 1,
  request: { id: null, idempotency_key: null },
  type: "payment_intent.succeeded",
  data: {
    object: {
      id: `pi_gridspell_phase8_${Date.now()}`,
      object: "payment_intent",
      amount: 100,
      amount_received: 100,
      currency: "cad",
      metadata: {}
    }
  }
});

const signature = stripe.webhooks.generateTestHeaderString({
  payload,
  secret
});

async function post(headers = {}) {
  const response = await fetch(`${baseUrl}/api/stripe/webhook`, {
    method: "POST",
    headers,
    body: payload
  });
  return { status: response.status, body: await response.json() };
}

const unsigned = await post({ "content-type": "application/json" });
if (unsigned.status !== 400) {
  throw new Error(`Unsigned webhook should return 400, received ${unsigned.status}.`);
}

const first = await post({
  "content-type": "application/json",
  "stripe-signature": signature
});
if (first.status !== 200 || !first.body.received) {
  throw new Error(`Signed webhook failed: ${JSON.stringify(first)}`);
}

const duplicate = await post({
  "content-type": "application/json",
  "stripe-signature": signature
});
if (duplicate.status !== 200 || !duplicate.body.duplicate) {
  throw new Error(`Webhook idempotency failed: ${JSON.stringify(duplicate)}`);
}

console.log("Stripe webhook signature and duplicate-delivery checks passed.");
