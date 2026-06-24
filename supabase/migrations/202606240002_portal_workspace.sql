begin;

create type public.support_ticket_status as enum (
  'open',
  'in_progress',
  'waiting_on_client',
  'resolved',
  'closed'
);

create type public.support_ticket_priority as enum ('normal', 'urgent');

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  created_by uuid not null references public.profiles(id) on delete restrict,
  subject text not null check (char_length(subject) between 4 and 160),
  body text not null check (char_length(body) between 10 and 5000),
  priority public.support_ticket_priority not null default 'normal',
  status public.support_ticket_status not null default 'open',
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index support_tickets_org_status_idx
  on public.support_tickets (organization_id, status, created_at desc);
create index support_tickets_project_idx
  on public.support_tickets (project_id, created_at desc)
  where project_id is not null;

create trigger support_tickets_set_updated_at
before update on public.support_tickets
for each row execute function public.set_updated_at();

create or replace function public.can_contribute_to_org(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_staff_member()
    or exists (
      select 1
      from public.organization_members
      where organization_id = target
        and user_id = (select auth.uid())
        and role <> 'client_viewer'
    );
$$;

create or replace function public.can_contribute_to_project(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_staff_member()
    or exists (
      select 1
      from public.project_members
      where project_id = target
        and user_id = (select auth.uid())
        and role <> 'client_viewer'
    )
    or exists (
      select 1
      from public.projects p
      join public.organization_members om
        on om.organization_id = p.organization_id
      where p.id = target
        and om.user_id = (select auth.uid())
        and om.role <> 'client_viewer'
    );
$$;

create or replace function private.shares_workspace(
  viewer_user_id uuid,
  target_user_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select viewer_user_id = target_user_id
    or private.has_staff_role(
      viewer_user_id,
      array['owner', 'admin', 'team_member']::public.app_role[]
    )
    or exists (
      select 1
      from public.organization_members viewer_membership
      join public.organization_members target_membership
        on target_membership.organization_id = viewer_membership.organization_id
      where viewer_membership.user_id = viewer_user_id
        and target_membership.user_id = target_user_id
    )
    or exists (
      select 1
      from public.project_members viewer_membership
      join public.project_members target_membership
        on target_membership.project_id = viewer_membership.project_id
      where viewer_membership.user_id = viewer_user_id
        and target_membership.user_id = target_user_id
    );
$$;

-- Workspace members can see the names of people participating in the same client workspace.
drop policy if exists profiles_read_self_or_staff on public.profiles;
create policy profiles_read_workspace_members
  on public.profiles for select to authenticated
  using (private.shares_workspace((select auth.uid()), id));

-- Client viewers remain read-only even if they can see the project.
drop policy if exists messages_insert on public.messages;
create policy messages_insert_contributors
  on public.messages for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and public.can_contribute_to_project(project_id)
  );

drop policy if exists messages_update on public.messages;
create policy messages_update_own_contributor_or_staff
  on public.messages for update to authenticated
  using (
    public.is_staff_member()
    or (
      sender_id = (select auth.uid())
      and public.can_contribute_to_project(project_id)
    )
  )
  with check (
    public.is_staff_member()
    or (
      sender_id = (select auth.uid())
      and public.can_contribute_to_project(project_id)
    )
  );

drop policy if exists files_insert on public.files;
create policy files_insert_contributors
  on public.files for insert to authenticated
  with check (
    uploaded_by = (select auth.uid())
    and (
      (project_id is not null and public.can_contribute_to_project(project_id))
      or (
        project_id is null
        and organization_id is not null
        and public.can_contribute_to_org(organization_id)
      )
    )
  );

drop policy if exists files_delete on public.files;
create policy files_delete_owner_or_staff
  on public.files for delete to authenticated
  using (
    public.is_staff_member()
    or (
      uploaded_by = (select auth.uid())
      and (
        (project_id is not null and public.can_contribute_to_project(project_id))
        or (
          project_id is null
          and organization_id is not null
          and public.can_contribute_to_org(organization_id)
        )
      )
    )
  );

drop policy if exists approvals_update on public.approvals;
create policy approvals_update_contributors
  on public.approvals for update to authenticated
  using (public.can_contribute_to_project(project_id))
  with check (public.can_contribute_to_project(project_id));

alter table public.support_tickets enable row level security;

create policy support_tickets_read_workspace
  on public.support_tickets for select to authenticated
  using (public.is_org_member(organization_id));

create policy support_tickets_create_contributors
  on public.support_tickets for insert to authenticated
  with check (
    created_by = (select auth.uid())
    and public.can_contribute_to_org(organization_id)
    and (
      project_id is null
      or public.can_contribute_to_project(project_id)
    )
  );

create policy support_tickets_update_staff
  on public.support_tickets for update to authenticated
  using (public.is_staff_member())
  with check (public.is_staff_member());

create policy support_tickets_delete_admin
  on public.support_tickets for delete to authenticated
  using (public.is_app_admin());

-- Storage follows the same contributor/read-only distinction as metadata rows.
drop policy if exists project_files_insert on storage.objects;
drop policy if exists project_files_update on storage.objects;
drop policy if exists project_files_delete on storage.objects;

create policy project_files_insert
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'project-files'
    and public.can_contribute_to_project(private.storage_project_id(name))
  );

create policy project_files_update
  on storage.objects for update to authenticated
  using (
    bucket_id = 'project-files'
    and public.can_contribute_to_project(private.storage_project_id(name))
  )
  with check (
    bucket_id = 'project-files'
    and public.can_contribute_to_project(private.storage_project_id(name))
  );

create policy project_files_delete
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'project-files'
    and public.can_contribute_to_project(private.storage_project_id(name))
  );

grant execute on function public.can_contribute_to_org(uuid) to authenticated, service_role;
grant execute on function public.can_contribute_to_project(uuid) to authenticated, service_role;
grant execute on function private.shares_workspace(uuid, uuid) to authenticated, service_role;
grant select, insert, update, delete on public.support_tickets to authenticated;
grant all on public.support_tickets to service_role;

commit;
