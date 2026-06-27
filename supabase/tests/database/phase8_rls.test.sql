begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(14);

select has_table('public', 'request_rate_limits', 'rate-limit table exists');

select ok(
  (select relrowsecurity from pg_class where oid = 'public.request_rate_limits'::regclass),
  'rate-limit table has RLS enabled'
);

select ok(
  not has_table_privilege('anon', 'public.request_rate_limits', 'select'),
  'anonymous users cannot read rate-limit fingerprints'
);

select ok(
  not has_table_privilege('authenticated', 'public.request_rate_limits', 'select'),
  'authenticated users cannot read rate-limit fingerprints'
);

select ok(
  has_table_privilege('service_role', 'public.request_rate_limits', 'select'),
  'service role can manage rate limits'
);

select ok(
  exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'consume_request_rate_limit'
      and p.prosecdef
  ),
  'rate-limit function is security definer'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.leads'::regclass),
  'leads table has RLS enabled'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.invoices'::regclass),
  'invoices table has RLS enabled'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.payments'::regclass),
  'payments table has RLS enabled'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.webhook_events'::regclass),
  'webhook event ledger has RLS enabled'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.email_deliveries'::regclass),
  'email delivery ledger has RLS enabled'
);

select ok(
  not has_table_privilege('anon', 'public.webhook_events', 'select'),
  'anonymous users cannot inspect webhook payloads'
);

select ok(
  not has_table_privilege('anon', 'public.email_deliveries', 'select'),
  'anonymous users cannot inspect email delivery logs'
);

select ok(
  exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'invoices'
      and policyname = 'invoices_read'
  ),
  'invoice membership policy exists'
);

select * from finish();
rollback;
