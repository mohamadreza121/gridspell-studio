begin;

-- RLS policies are evaluated only after PostgreSQL table privileges permit the
-- requested operation. Phase 7 intentionally exposes these ledgers read-only
-- to authenticated users, while the policies limit those reads to app admins.
grant select on table public.webhook_events to authenticated;
grant select on table public.email_deliveries to authenticated;

-- Server-side Stripe and Resend integrations use the Supabase secret/service
-- role and need to create and update ledger rows.
grant all privileges on table public.webhook_events to service_role;
grant all privileges on table public.email_deliveries to service_role;

-- Anonymous visitors must never be able to inspect or mutate operational logs.
revoke all privileges on table public.webhook_events from anon;
revoke all privileges on table public.email_deliveries from anon;

commit;
