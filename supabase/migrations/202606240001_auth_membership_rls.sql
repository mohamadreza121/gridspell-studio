begin;

create schema if not exists private;

create type public.client_invitation_status as enum (
  'pending',
  'accepted',
  'revoked',
  'expired'
);

create table public.app_user_roles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint app_user_roles_staff_only check (role in ('owner', 'admin', 'team_member'))
);

insert into public.app_user_roles (user_id, role)
select id, role
from public.profiles
where role in ('owner', 'admin', 'team_member')
on conflict (user_id) do update set role = excluded.role;

alter table public.profiles
  add column if not exists onboarding_completed_at timestamptz;

alter table public.organization_members
  add constraint organization_members_client_roles_only
  check (role in ('client', 'client_viewer')) not valid;

alter table public.organization_members
  validate constraint organization_members_client_roles_only;

create table public.client_invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role public.app_role not null default 'client',
  status public.client_invitation_status not null default 'pending',
  invited_by uuid references public.profiles(id) on delete set null,
  auth_user_id uuid references auth.users(id) on delete set null,
  expires_at timestamptz not null default (now() + interval '7 days'),
  accepted_at timestamptz,
  accepted_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint client_invitations_client_roles_only check (role in ('client', 'client_viewer'))
);

create unique index client_invitations_one_pending_email
  on public.client_invitations (lower(email))
  where status = 'pending';

create index client_invitations_organization_idx
  on public.client_invitations (organization_id, status);

create trigger app_user_roles_set_updated_at
before update on public.app_user_roles
for each row execute function public.set_updated_at();

create trigger client_invitations_set_updated_at
before update on public.client_invitations
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do update
  set full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name);

  return new;
end;
$$;

create or replace function private.has_staff_role(
  target_user_id uuid,
  allowed_roles public.app_role[]
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_user_roles
    where user_id = target_user_id
      and role = any (allowed_roles)
  );
$$;

create or replace function public.is_staff_member()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select private.has_staff_role(
    (select auth.uid()),
    array['owner', 'admin', 'team_member']::public.app_role[]
  );
$$;

create or replace function public.is_app_admin()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select private.has_staff_role(
    (select auth.uid()),
    array['owner', 'admin']::public.app_role[]
  );
$$;

create or replace function public.is_org_member(target uuid)
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
    );
$$;

create or replace function public.is_project_member(target uuid)
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
    )
    or exists (
      select 1
      from public.projects p
      join public.organization_members om
        on om.organization_id = p.organization_id
      where p.id = target
        and om.user_id = (select auth.uid())
    );
$$;

create or replace function private.storage_project_id(object_name text)
returns uuid
language plpgsql
immutable
as $$
begin
  return nullif(split_part(object_name, '/', 1), '')::uuid;
exception
  when invalid_text_representation then
    return null;
end;
$$;

create or replace function public.accept_client_invitation(
  invitation_id uuid,
  profile_full_name text
)
returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  invitation public.client_invitations%rowtype;
  current_email text;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication is required';
  end if;

  current_email := lower(coalesce((select auth.jwt() ->> 'email'), ''));

  select *
  into invitation
  from public.client_invitations
  where id = invitation_id
  for update;

  if invitation.id is null then
    raise exception 'Invitation not found';
  end if;

  if invitation.status <> 'pending' then
    raise exception 'Invitation is no longer active';
  end if;

  if invitation.expires_at <= now() then
    update public.client_invitations
    set status = 'expired'
    where id = invitation.id;

    raise exception 'Invitation has expired';
  end if;

  if lower(invitation.email) <> current_email then
    raise exception 'Invitation email does not match the signed-in account';
  end if;

  if invitation.auth_user_id is not null
     and invitation.auth_user_id <> (select auth.uid()) then
    raise exception 'Invitation belongs to a different account';
  end if;

  update public.profiles
  set full_name = nullif(trim(profile_full_name), ''),
      onboarding_completed_at = now()
  where id = (select auth.uid());

  insert into public.organization_members (organization_id, user_id, role)
  values (invitation.organization_id, (select auth.uid()), invitation.role)
  on conflict (organization_id, user_id)
  do update set role = excluded.role;

  update public.client_invitations
  set status = 'accepted',
      accepted_at = now(),
      accepted_by = (select auth.uid()),
      auth_user_id = (select auth.uid())
  where id = invitation.id;

  return invitation.organization_id;
end;
$$;

-- Authorization is no longer stored in the user-editable profile row.
drop trigger if exists profiles_protect_role on public.profiles;
drop function if exists public.protect_profile_role();
alter table public.profiles drop column if exists role;

alter table public.app_user_roles enable row level security;
alter table public.client_invitations enable row level security;

-- Replace the Phase 1 policies with the Phase 4 role and membership model.
drop policy if exists profiles_read on public.profiles;
drop policy if exists profiles_update on public.profiles;
create policy profiles_read_self_or_staff
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_staff_member());
create policy profiles_update_self_or_admin
  on public.profiles for update to authenticated
  using (id = (select auth.uid()) or public.is_app_admin())
  with check (id = (select auth.uid()) or public.is_app_admin());

create policy app_user_roles_read_self_or_staff
  on public.app_user_roles for select to authenticated
  using (user_id = (select auth.uid()) or public.is_staff_member());

create policy invitations_read_own_or_staff
  on public.client_invitations for select to authenticated
  using (
    public.is_staff_member()
    or lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
  );

-- Staff can inspect all operational data; only owner/admin receives broad write access.
drop policy if exists org_read on public.organizations;
create policy organizations_read_member_or_staff
  on public.organizations for select to authenticated
  using (public.is_org_member(id));

drop policy if exists org_members_read on public.organization_members;
create policy organization_members_read_member_or_staff
  on public.organization_members for select to authenticated
  using (public.is_org_member(organization_id));

drop policy if exists projects_read on public.projects;
create policy projects_read_member_or_staff
  on public.projects for select to authenticated
  using (public.is_project_member(id));

drop policy if exists project_members_read on public.project_members;
create policy project_members_read_member_or_staff
  on public.project_members for select to authenticated
  using (public.is_project_member(project_id));

drop policy if exists tasks_read on public.tasks;
create policy tasks_read_member_or_staff
  on public.tasks for select to authenticated
  using (
    public.is_project_member(project_id)
    and (client_visible or public.is_staff_member())
  );

drop policy if exists approvals_insert on public.approvals;
create policy approvals_insert_staff
  on public.approvals for insert to authenticated
  with check (public.is_staff_member());

drop policy if exists services_public on public.services;
create policy services_public_or_staff
  on public.services for select to anon, authenticated
  using (published or public.is_staff_member());

drop policy if exists cases_public on public.case_studies;
create policy cases_public_or_staff
  on public.case_studies for select to anon, authenticated
  using (published or public.is_staff_member());

drop policy if exists testimonials_public on public.testimonials;
create policy testimonials_public_or_staff
  on public.testimonials for select to anon, authenticated
  using (published or public.is_staff_member());

drop policy if exists posts_public on public.blog_posts;
create policy posts_public_or_staff
  on public.blog_posts for select to anon, authenticated
  using (published or public.is_staff_member());

-- Private project-files bucket. Object names must start with <project-uuid>/.
drop policy if exists project_files_select on storage.objects;
drop policy if exists project_files_insert on storage.objects;
drop policy if exists project_files_update on storage.objects;
drop policy if exists project_files_delete on storage.objects;

create policy project_files_select
  on storage.objects for select to authenticated
  using (
    bucket_id = 'project-files'
    and public.is_project_member(private.storage_project_id(name))
  );

create policy project_files_insert
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'project-files'
    and public.is_project_member(private.storage_project_id(name))
  );

create policy project_files_update
  on storage.objects for update to authenticated
  using (
    bucket_id = 'project-files'
    and public.is_project_member(private.storage_project_id(name))
  )
  with check (
    bucket_id = 'project-files'
    and public.is_project_member(private.storage_project_id(name))
  );

create policy project_files_delete
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'project-files'
    and public.is_project_member(private.storage_project_id(name))
  );

revoke all on function public.accept_client_invitation(uuid, text) from public;
grant execute on function public.accept_client_invitation(uuid, text) to authenticated;

grant usage on schema private to authenticated, service_role;
grant execute on function private.has_staff_role(uuid, public.app_role[]) to authenticated, service_role;
grant execute on function private.storage_project_id(text) to authenticated, service_role;

grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on public.services, public.case_studies, public.testimonials, public.blog_posts to anon;
grant usage, select on all sequences in schema public to authenticated, service_role;
grant all on all tables in schema public to service_role;

commit;
