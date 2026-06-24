begin;

create extension if not exists pgtap with schema extensions;
select plan(41);

-- Stable IDs keep failures readable.
insert into auth.users (id, email, raw_user_meta_data)
values
  ('00000000-0000-0000-0000-000000000001', 'owner@gridspell.test', '{"full_name":"Owner"}'),
  ('00000000-0000-0000-0000-000000000002', 'admin@gridspell.test', '{"full_name":"Admin"}'),
  ('00000000-0000-0000-0000-000000000003', 'team@gridspell.test', '{"full_name":"Team"}'),
  ('00000000-0000-0000-0000-000000000004', 'client@alpha.test', '{"full_name":"Alpha Client"}'),
  ('00000000-0000-0000-0000-000000000005', 'viewer@alpha.test', '{"full_name":"Alpha Viewer"}'),
  ('00000000-0000-0000-0000-000000000006', 'outsider@test.dev', '{"full_name":"Outsider"}'),
  ('00000000-0000-0000-0000-000000000007', 'invitee@beta.test', '{"full_name":"Beta Invitee"}');

insert into public.app_user_roles (user_id, role)
values
  ('00000000-0000-0000-0000-000000000001', 'owner'),
  ('00000000-0000-0000-0000-000000000002', 'admin'),
  ('00000000-0000-0000-0000-000000000003', 'team_member');

insert into public.organizations (id, name, slug)
values
  ('10000000-0000-0000-0000-000000000001', 'Alpha Company', 'alpha-company'),
  ('10000000-0000-0000-0000-000000000002', 'Beta Company', 'beta-company');

insert into public.organization_members (organization_id, user_id, role)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000004', 'client'),
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000005', 'client_viewer');

insert into public.projects (id, organization_id, name, slug)
values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Alpha Website', 'alpha-website'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Beta Portal', 'beta-portal');

insert into public.tasks (id, project_id, title, client_visible)
values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Visible task', true),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Internal task', false);

insert into public.client_invitations (
  id,
  email,
  full_name,
  organization_id,
  role,
  auth_user_id
)
values (
  '40000000-0000-0000-0000-000000000001',
  'invitee@beta.test',
  'Beta Invitee',
  '10000000-0000-0000-0000-000000000002',
  'client',
  '00000000-0000-0000-0000-000000000007'
);

insert into public.notifications (user_id, title)
values
  ('00000000-0000-0000-0000-000000000004', 'Client notification'),
  ('00000000-0000-0000-0000-000000000006', 'Outsider notification');

insert into public.services (slug, title, summary, published)
values
  ('published-service', 'Published service', 'Visible to everyone', true),
  ('draft-service', 'Draft service', 'Staff only', false);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.profiles'::regclass),
  'profiles has RLS enabled'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.app_user_roles'::regclass),
  'app_user_roles has RLS enabled'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.organizations'::regclass),
  'organizations has RLS enabled'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.organization_members'::regclass),
  'organization_members has RLS enabled'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.client_invitations'::regclass),
  'client_invitations has RLS enabled'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.projects'::regclass),
  'projects has RLS enabled'
);
select ok(
  (select relrowsecurity from pg_class where oid = 'public.tasks'::regclass),
  'tasks has RLS enabled'
);
select policies_are(
  'storage',
  'objects',
  array[
    'project_files_delete',
    'project_files_insert',
    'project_files_select',
    'project_files_update'
  ],
  'project-files storage policies are installed'
);

-- Client context.
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000004', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"00000000-0000-0000-0000-000000000004","email":"client@alpha.test","role":"authenticated"}',
  true
);

select results_eq(
  $$select count(*)::bigint from public.profiles where id in (
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000005'
  )$$,
  $$values (2::bigint)$$,
  'client can read profile names for members of their workspace'
);
select results_eq(
  $$select count(*)::bigint from public.app_user_roles$$,
  $$values (0::bigint)$$,
  'client cannot read staff role rows'
);
select results_eq(
  $$select count(*)::bigint from public.organizations$$,
  $$values (1::bigint)$$,
  'client can read their organization'
);
select results_eq(
  $$select count(*)::bigint from public.organization_members$$,
  $$values (2::bigint)$$,
  'client can read memberships in their organization'
);
select results_eq(
  $$select count(*)::bigint from public.projects$$,
  $$values (1::bigint)$$,
  'client can read projects owned by their organization'
);
select results_eq(
  $$select count(*)::bigint from public.tasks$$,
  $$values (1::bigint)$$,
  'client sees only client-visible tasks'
);
select results_eq(
  $$select count(*)::bigint from public.client_invitations$$,
  $$values (0::bigint)$$,
  'client cannot read another email invitation'
);
select lives_ok(
  $$update public.profiles set full_name = 'Updated Client' where id = '00000000-0000-0000-0000-000000000004'$$,
  'client can update their own profile'
);
select is_empty(
  $$update public.profiles set full_name = 'Not Allowed' where id = '00000000-0000-0000-0000-000000000006' returning id$$,
  'client cannot update another profile'
);
select lives_ok(
  $$insert into public.messages (project_id, sender_id, body) values ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000004', 'Hello')$$,
  'client can post a message to their project'
);
select throws_ok(
  $$insert into public.organizations (name, slug) values ('Forbidden', 'forbidden-client-org')$$,
  '42501',
  null,
  'client cannot create organizations'
);
select results_eq(
  $$select count(*)::bigint from public.notifications$$,
  $$values (1::bigint)$$,
  'client reads only their own notifications'
);
select results_eq(
  $$select count(*)::bigint from public.services where slug in ('published-service', 'draft-service')$$,
  $$values (1::bigint)$$,
  'client sees published services only'
);

reset role;

-- Owner context.
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000001', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"00000000-0000-0000-0000-000000000001","email":"owner@gridspell.test","role":"authenticated"}',
  true
);
select results_eq(
  $$select count(*)::bigint from public.profiles where id in (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000007'
  )$$,
  $$values (7::bigint)$$,
  'owner can read all fixture profiles'
);
select results_eq(
  $$select count(*)::bigint from public.app_user_roles where user_id in (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003'
  )$$,
  $$values (3::bigint)$$,
  'owner can read all fixture staff roles'
);
select results_eq(
  $$select count(*)::bigint from public.organizations where id in (
    '10000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000002'
  )$$,
  $$values (2::bigint)$$,
  'owner can read all fixture organizations'
);
select results_eq(
  $$select count(*)::bigint from public.tasks where id in (
    '30000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000002'
  )$$,
  $$values (2::bigint)$$,
  'owner can read internal and client-visible fixture tasks'
);
select results_eq(
  $$select count(*)::bigint from public.client_invitations$$,
  $$values (1::bigint)$$,
  'owner can read all invitations'
);
select lives_ok(
  $$insert into public.organizations (name, slug) values ('Owner Created', 'owner-created')$$,
  'owner can create organizations'
);
select results_eq(
  $$select count(*)::bigint from public.services where slug in ('published-service', 'draft-service')$$,
  $$values (2::bigint)$$,
  'owner can preview unpublished fixture services'
);

reset role;

-- Team-member context: broad read access without owner/admin management access.
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000003', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"00000000-0000-0000-0000-000000000003","email":"team@gridspell.test","role":"authenticated"}',
  true
);
select results_eq(
  $$select count(*)::bigint from public.projects where id in (
    '20000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000002'
  )$$,
  $$values (2::bigint)$$,
  'team member can read all fixture projects'
);
select results_eq(
  $$select count(*)::bigint from public.tasks where id in (
    '30000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000002'
  )$$,
  $$values (2::bigint)$$,
  'team member can read internal fixture tasks'
);
select throws_ok(
  $$insert into public.organizations (name, slug) values ('Team Forbidden', 'team-forbidden')$$,
  '42501',
  null,
  'team member cannot create organizations'
);

reset role;

-- Outsider context.
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000006', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"00000000-0000-0000-0000-000000000006","email":"outsider@test.dev","role":"authenticated"}',
  true
);
select results_eq(
  $$select count(*)::bigint from public.organizations$$,
  $$values (0::bigint)$$,
  'outsider cannot read organizations'
);
select results_eq(
  $$select count(*)::bigint from public.projects$$,
  $$values (0::bigint)$$,
  'outsider cannot read projects'
);
select throws_ok(
  $$insert into public.messages (project_id, sender_id, body) values ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000006', 'Forbidden')$$,
  '42501',
  null,
  'outsider cannot post into another organization project'
);
select results_eq(
  $$select count(*)::bigint from public.notifications$$,
  $$values (1::bigint)$$,
  'outsider still reads only their own notification'
);

reset role;

-- Invited user context and acceptance RPC.
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000007', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"00000000-0000-0000-0000-000000000007","email":"invitee@beta.test","role":"authenticated"}',
  true
);
select results_eq(
  $$select count(*)::bigint from public.client_invitations$$,
  $$values (1::bigint)$$,
  'invitee can read the pending invitation for their email'
);
select lives_ok(
  $$select public.accept_client_invitation('40000000-0000-0000-0000-000000000001', 'Beta Client')$$,
  'invitee can accept their own active invitation'
);
select results_eq(
  $$select count(*)::bigint from public.organization_members where organization_id = '10000000-0000-0000-0000-000000000002'$$,
  $$values (1::bigint)$$,
  'accepting an invitation creates organization membership'
);
select results_eq(
  $$select status::text from public.client_invitations where id = '40000000-0000-0000-0000-000000000001'$$,
  $$values ('accepted'::text)$$,
  'accepted invitation is marked accepted'
);
select results_eq(
  $$select count(*)::bigint from public.projects$$,
  $$values (1::bigint)$$,
  'newly accepted client can read the organization project'
);

reset role;

-- Anonymous users only receive published content.
set local role anon;
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claims', '{"role":"anon"}', true);
select results_eq(
  $$select count(*)::bigint from public.services where slug in ('published-service', 'draft-service')$$,
  $$values (1::bigint)$$,
  'anonymous visitors see published fixture services only'
);

select * from finish();
rollback;
