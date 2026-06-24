begin;

alter table public.organizations
  add column if not exists stripe_customer_id text unique,
  add column if not exists billing_email text;

alter table public.invoices
  add column if not exists payment_description text,
  add column if not exists stripe_checkout_session_id text unique,
  add column if not exists stripe_payment_intent_id text unique,
  add column if not exists checkout_url text,
  add column if not exists checkout_expires_at timestamptz,
  add column if not exists last_payment_error text;

alter table public.payments
  add column if not exists stripe_checkout_session_id text unique,
  add column if not exists stripe_payment_intent_id text unique,
  add column if not exists stripe_charge_id text unique,
  add column if not exists amount_refunded numeric(12,2) not null default 0 check (amount_refunded >= 0),
  add column if not exists failure_message text,
  add column if not exists updated_at timestamptz not null default now();

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text not null,
  event_type text not null,
  status text not null default 'processing' check (status in ('processing', 'processed', 'failed', 'ignored')),
  payload jsonb not null default '{}'::jsonb,
  error_message text,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (provider, event_id)
);

create table if not exists public.email_deliveries (
  id uuid primary key default gen_random_uuid(),
  template text not null,
  recipient text not null,
  subject text not null,
  provider_message_id text,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed', 'skipped')),
  metadata jsonb not null default '{}'::jsonb,
  error_message text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.webhook_events enable row level security;
alter table public.email_deliveries enable row level security;

drop policy if exists webhook_events_admin_select on public.webhook_events;
create policy webhook_events_admin_select
  on public.webhook_events for select to authenticated
  using (public.is_app_admin());

drop policy if exists email_deliveries_admin_select on public.email_deliveries;
create policy email_deliveries_admin_select
  on public.email_deliveries for select to authenticated
  using (public.is_app_admin());

create index if not exists webhook_events_created_idx
  on public.webhook_events(created_at desc);
create index if not exists email_deliveries_created_idx
  on public.email_deliveries(created_at desc);
create index if not exists payments_invoice_status_idx
  on public.payments(invoice_id, status);

commit;
