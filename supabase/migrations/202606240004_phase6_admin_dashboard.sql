begin;

-- Phase 6 keeps owner/admin in control of sales, finance, clients, and content.
-- Team members receive project-delivery write access without financial or account privileges.

drop policy if exists projects_staff_write on public.projects;
create policy projects_staff_write
  on public.projects for insert to authenticated
  with check (public.is_staff_member());

drop policy if exists projects_staff_update on public.projects;
create policy projects_staff_update
  on public.projects for update to authenticated
  using (public.is_staff_member())
  with check (public.is_staff_member());

drop policy if exists project_members_staff_write on public.project_members;
create policy project_members_staff_write
  on public.project_members for all to authenticated
  using (public.is_staff_member())
  with check (public.is_staff_member());

drop policy if exists phases_staff_write on public.project_phases;
create policy phases_staff_write
  on public.project_phases for all to authenticated
  using (public.is_staff_member())
  with check (public.is_staff_member());

drop policy if exists milestones_staff_write on public.milestones;
create policy milestones_staff_write
  on public.milestones for all to authenticated
  using (public.is_staff_member())
  with check (public.is_staff_member());

drop policy if exists tasks_staff_write on public.tasks;
create policy tasks_staff_write
  on public.tasks for all to authenticated
  using (public.is_staff_member())
  with check (public.is_staff_member());

drop policy if exists files_staff_update on public.files;
create policy files_staff_update
  on public.files for update to authenticated
  using (public.is_staff_member())
  with check (public.is_staff_member());

drop policy if exists approvals_staff_delete on public.approvals;
create policy approvals_staff_delete
  on public.approvals for delete to authenticated
  using (public.is_staff_member());

alter table public.invoices
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists notes text;

drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at
before update on public.invoices
for each row execute function public.set_updated_at();

alter table public.proposals
  drop constraint if exists proposals_status_check;
alter table public.proposals
  add constraint proposals_status_check
  check (status in ('draft', 'sent', 'accepted', 'declined', 'expired'));

create or replace function public.recalculate_proposal_totals(target_proposal_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  next_subtotal numeric(12,2);
begin
  if not public.is_app_admin() then
    raise exception using errcode = '42501', message = 'Owner or admin access is required.';
  end if;

  select coalesce(sum(quantity * unit_price) filter (where selected), 0)
  into next_subtotal
  from public.proposal_items
  where proposal_id = target_proposal_id;

  update public.proposals
  set subtotal = next_subtotal,
      total = next_subtotal + tax,
      updated_at = now()
  where id = target_proposal_id;
end;
$$;

create or replace function private.refresh_proposal_totals_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_proposal_id uuid;
begin
  target_proposal_id := case when tg_op = 'DELETE' then old.proposal_id else new.proposal_id end;

  update public.proposals p
  set subtotal = totals.subtotal,
      total = totals.subtotal + p.tax,
      updated_at = now()
  from (
    select coalesce(sum(quantity * unit_price) filter (where selected), 0)::numeric(12,2) as subtotal
    from public.proposal_items
    where proposal_id = target_proposal_id
  ) totals
  where p.id = target_proposal_id;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

drop trigger if exists proposal_items_refresh_totals on public.proposal_items;
create trigger proposal_items_refresh_totals
after insert or update or delete on public.proposal_items
for each row execute function private.refresh_proposal_totals_trigger();

grant execute on function public.recalculate_proposal_totals(uuid) to authenticated, service_role;

commit;
