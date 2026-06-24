begin;

create extension if not exists pgtap with schema extensions;
select plan(16);

select has_column('public', 'organizations', 'stripe_customer_id', 'organizations store Stripe customer IDs');
select has_column('public', 'organizations', 'billing_email', 'organizations store billing email');
select has_column('public', 'invoices', 'stripe_checkout_session_id', 'invoices store Checkout Session IDs');
select has_column('public', 'invoices', 'stripe_payment_intent_id', 'invoices store PaymentIntent IDs');
select has_column('public', 'invoices', 'last_payment_error', 'invoices store payment errors');
select has_column('public', 'payments', 'stripe_payment_intent_id', 'payments store PaymentIntent IDs');
select has_column('public', 'payments', 'amount_refunded', 'payments track refunds');
select has_table('public', 'webhook_events', 'webhook event ledger exists');
select has_table('public', 'email_deliveries', 'email delivery ledger exists');

select ok(
  (select relrowsecurity from pg_class where oid = 'public.webhook_events'::regclass),
  'webhook_events has RLS enabled'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.email_deliveries'::regclass),
  'email_deliveries has RLS enabled'
);

insert into auth.users (id, email, raw_user_meta_data)
values
  ('90000000-0000-0000-0000-000000000001', 'phase7-owner@gridspell.test', '{"full_name":"Phase 7 Owner"}'),
  ('90000000-0000-0000-0000-000000000002', 'phase7-client@gridspell.test', '{"full_name":"Phase 7 Client"}');

insert into public.app_user_roles (user_id, role)
values ('90000000-0000-0000-0000-000000000001', 'owner');

insert into public.organizations (id, name, slug)
values ('91000000-0000-0000-0000-000000000001', 'Phase 7 Company', 'phase-7-company');

insert into public.organization_members (organization_id, user_id, role)
values ('91000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000002', 'client');

insert into public.webhook_events (provider, event_id, event_type, status)
values ('stripe', 'evt_phase7_test', 'payment_intent.succeeded', 'processed');

insert into public.email_deliveries (template, recipient, subject, status)
values ('payment_confirmation', 'client@phase7.test', 'Payment received', 'sent');

set local role authenticated;
select set_config('request.jwt.claim.sub', '90000000-0000-0000-0000-000000000001', true);
select set_config('request.jwt.claims', '{"sub":"90000000-0000-0000-0000-000000000001","email":"phase7-owner@gridspell.test","role":"authenticated"}', true);

select results_eq(
  $$select count(*)::integer from public.webhook_events where event_id = 'evt_phase7_test'$$,
  $$values (1)$$,
  'owner can inspect Stripe webhook events'
);
select results_eq(
  $$select count(*)::integer from public.email_deliveries where recipient = 'client@phase7.test'$$,
  $$values (1)$$,
  'owner can inspect email deliveries'
);

reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '90000000-0000-0000-0000-000000000002', true);
select set_config('request.jwt.claims', '{"sub":"90000000-0000-0000-0000-000000000002","email":"phase7-client@gridspell.test","role":"authenticated"}', true);

select results_eq(
  $$select count(*)::integer from public.webhook_events$$,
  $$values (0)$$,
  'clients cannot read webhook events'
);
select results_eq(
  $$select count(*)::integer from public.email_deliveries$$,
  $$values (0)$$,
  'clients cannot read email delivery logs'
);
select throws_ok(
  $$insert into public.webhook_events (provider,event_id,event_type) values ('stripe','evt_forbidden','test')$$,
  '42501', null,
  'clients cannot write webhook events'
);

select * from finish();
rollback;
