# Phase 7 audit — payments and communications

Audit date: June 26, 2026

## Status

Phase 7 is implemented in the application and database schema.

### Stripe

- Deposit/payment checkout: implemented through payable invoice records. Create an invoice with the deposit amount and a payment description such as `40% project deposit`, then the client can pay the outstanding balance from the portal.
- Stripe webhook: implemented at `/api/stripe/webhook` with signature verification, event logging, duplicate-delivery protection, failure logging, payment synchronization, invoice synchronization, and refund synchronization.
- Customer billing portal: implemented from the client billing page.
- Payment status synchronization: implemented for checkout completion, asynchronous checkout success/failure, PaymentIntent success/failure, expired checkout sessions, and refunds.
- Checkout-session reuse: active checkout URLs are reused until they are close to expiry so repeated clicks do not create unnecessary sessions.

### Resend email

The sender records delivery attempts in `email_deliveries` and the following templates are implemented and connected:

- Lead confirmation
- Admin lead notification
- Client invitation
- Milestone ready
- Approval request
- Payment confirmation
- Launch complete

## Operational setup still required

Application code being complete does not replace dashboard configuration. Before production launch:

1. Configure the production Stripe webhook for `/api/stripe/webhook`.
2. Subscribe it to the event types listed in the Phase 8 launch guide.
3. Configure the Stripe customer portal and save the configuration ID.
4. Verify the Resend sending domain and production sender address.
5. Apply all Supabase migrations, including the Phase 7 grants migration.
6. Run an end-to-end test with a real Stripe test-mode invoice and a real test email recipient.

## Design note

The checkout is invoice-driven rather than proposal-percentage-driven. A deposit is currently created by issuing a deposit invoice for the required amount. This is intentional and production-ready, but an automatic `accepted proposal -> percentage deposit invoice` workflow would be a separate enhancement rather than a missing Phase 7 requirement.
