begin;

create table if not exists public.request_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0 check (request_count >= 0),
  blocked_until timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.request_rate_limits enable row level security;

-- This table is intentionally service-role only. Public clients must never be
-- able to enumerate request fingerprints or modify throttling state.
revoke all privileges on table public.request_rate_limits from anon, authenticated;
grant all privileges on table public.request_rate_limits to service_role;

create index if not exists request_rate_limits_updated_idx
  on public.request_rate_limits(updated_at);

create or replace function public.consume_request_rate_limit(
  p_key_hash text,
  p_limit integer,
  p_window_seconds integer,
  p_block_seconds integer default 3600
)
returns table (
  allowed boolean,
  remaining integer,
  retry_after_seconds integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_row public.request_rate_limits%rowtype;
  current_time timestamptz := clock_timestamp();
  window_interval interval;
  block_interval interval;
begin
  if p_key_hash is null or length(p_key_hash) < 16 then
    raise exception 'Invalid rate-limit key';
  end if;

  if p_limit < 1 or p_window_seconds < 1 or p_block_seconds < 1 then
    raise exception 'Invalid rate-limit configuration';
  end if;

  window_interval := make_interval(secs => p_window_seconds);
  block_interval := make_interval(secs => p_block_seconds);

  insert into public.request_rate_limits (
    key_hash,
    window_started_at,
    request_count,
    blocked_until,
    updated_at
  )
  values (
    p_key_hash,
    current_time,
    0,
    null,
    current_time
  )
  on conflict (key_hash) do nothing;

  select *
  into current_row
  from public.request_rate_limits
  where key_hash = p_key_hash
  for update;

  if current_row.blocked_until is not null
     and current_row.blocked_until > current_time then
    return query select
      false,
      0,
      greatest(
        1,
        ceil(extract(epoch from current_row.blocked_until - current_time))::integer
      );
    return;
  end if;

  if current_row.window_started_at <= current_time - window_interval then
    update public.request_rate_limits
    set
      window_started_at = current_time,
      request_count = 1,
      blocked_until = null,
      updated_at = current_time
    where key_hash = p_key_hash;

    return query select true, greatest(0, p_limit - 1), 0;
    return;
  end if;

  if current_row.request_count >= p_limit then
    update public.request_rate_limits
    set
      blocked_until = current_time + block_interval,
      updated_at = current_time
    where key_hash = p_key_hash;

    return query select false, 0, p_block_seconds;
    return;
  end if;

  update public.request_rate_limits
  set
    request_count = request_count + 1,
    blocked_until = null,
    updated_at = current_time
  where key_hash = p_key_hash;

  return query select
    true,
    greatest(0, p_limit - current_row.request_count - 1),
    0;
end;
$$;

revoke all on function public.consume_request_rate_limit(text, integer, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_request_rate_limit(text, integer, integer, integer)
  to service_role;

-- Keep the operational table from growing forever. This is safe to run from a
-- scheduled job or manually during maintenance.
create or replace function public.prune_request_rate_limits(
  p_older_than interval default interval '7 days'
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_count integer;
begin
  delete from public.request_rate_limits
  where updated_at < clock_timestamp() - p_older_than
    and (blocked_until is null or blocked_until < clock_timestamp());

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

revoke all on function public.prune_request_rate_limits(interval)
  from public, anon, authenticated;
grant execute on function public.prune_request_rate_limits(interval)
  to service_role;

commit;
