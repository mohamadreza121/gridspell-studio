begin;

create extension if not exists pgtap with schema extensions;
select plan(15);

insert into auth.users (id, email, raw_user_meta_data)
values
  ('50000000-0000-0000-0000-000000000001', 'portal-owner@gridspell.test', '{"full_name":"Portal Owner"}'),
  ('50000000-0000-0000-0000-000000000002', 'portal-client@gridspell.test', '{"full_name":"Portal Client"}'),
  ('50000000-0000-0000-0000-000000000003', 'portal-viewer@gridspell.test', '{"full_name":"Portal Viewer"}'),
  ('50000000-0000-0000-0000-000000000004', 'portal-outsider@gridspell.test', '{"full_name":"Portal Outsider"}');

insert into public.app_user_roles (user_id, role)
values ('50000000-0000-0000-0000-000000000001', 'owner');

insert into public.organizations (id, name, slug)
values ('51000000-0000-0000-0000-000000000001', 'Portal Test Company', 'portal-test-company');

insert into public.organization_members (organization_id, user_id, role)
values
  ('51000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002', 'client'),
  ('51000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000003', 'client_viewer');

insert into public.projects (id, organization_id, name, slug)
values (
  '52000000-0000-0000-0000-000000000001',
  '51000000-0000-0000-0000-000000000001',
  'Portal Test Project',
  'portal-test-project'
);

insert into public.project_members (project_id, user_id, role)
values
  ('52000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002', 'client'),
  ('52000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000003', 'client_viewer');

insert into public.approvals (id, project_id, title, description)
values (
  '53000000-0000-0000-0000-000000000001',
  '52000000-0000-0000-0000-000000000001',
  'Homepage approval',
  'Approve the homepage direction'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.support_tickets'::regclass),
  'support_tickets has RLS enabled'
);
select policies_are(
  'public',
  'support_tickets',
  array[
    'support_tickets_create_contributors',
    'support_tickets_delete_admin',
    'support_tickets_read_workspace',
    'support_tickets_update_staff'
  ],
  'support ticket policies are installed'
);

-- Full client contributor.
set local role authenticated;
select set_config('request.jwt.claim.sub', '50000000-0000-0000-0000-000000000002', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"50000000-0000-0000-0000-000000000002","email":"portal-client@gridspell.test","role":"authenticated"}',
  true
);

select lives_ok(
  $$insert into public.messages (project_id, sender_id, body) values ('52000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002', 'Client portal message')$$,
  'client contributor can send project messages'
);
select lives_ok(
  $$insert into public.files (organization_id, project_id, uploaded_by, storage_path, file_name) values ('51000000-0000-0000-0000-000000000001', '52000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002', '52000000-0000-0000-0000-000000000001/client-file.txt', 'client-file.txt')$$,
  'client contributor can create file metadata'
);
select lives_ok(
  $$insert into public.support_tickets (organization_id, project_id, created_by, subject, body) values ('51000000-0000-0000-0000-000000000001', '52000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002', 'Need project help', 'Please help with the project portal setup.')$$,
  'client contributor can create a support ticket'
);
select lives_ok(
  $$update public.approvals set status = 'approved', decided_by = '50000000-0000-0000-0000-000000000002', decided_at = now() where id = '53000000-0000-0000-0000-000000000001'$$,
  'client contributor can decide an approval'
);
select results_eq(
  $$select count(*)::bigint from public.profiles where id in ('50000000-0000-0000-0000-000000000002','50000000-0000-0000-0000-000000000003')$$,
  $$values (2::bigint)$$,
  'client can read profile names for workspace members'
);

reset role;

-- Viewer role remains read-only.
set local role authenticated;
select set_config('request.jwt.claim.sub', '50000000-0000-0000-0000-000000000003', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"50000000-0000-0000-0000-000000000003","email":"portal-viewer@gridspell.test","role":"authenticated"}',
  true
);

select throws_ok(
  $$insert into public.messages (project_id, sender_id, body) values ('52000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000003', 'Viewer forbidden message')$$,
  '42501',
  null,
  'client viewer cannot send messages'
);
select throws_ok(
  $$insert into public.files (organization_id, project_id, uploaded_by, storage_path, file_name) values ('51000000-0000-0000-0000-000000000001', '52000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000003', '52000000-0000-0000-0000-000000000001/viewer-file.txt', 'viewer-file.txt')$$,
  '42501',
  null,
  'client viewer cannot upload files'
);
select throws_ok(
  $$insert into public.support_tickets (organization_id, project_id, created_by, subject, body) values ('51000000-0000-0000-0000-000000000001', '52000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000003', 'Viewer request', 'Viewer should not create this support request.')$$,
  '42501',
  null,
  'client viewer cannot create support tickets'
);
select is_empty(
  $$update public.approvals set decision_note = 'Viewer change' where id = '53000000-0000-0000-0000-000000000001' returning id$$,
  'client viewer cannot update approvals'
);
select results_eq(
  $$select count(*)::bigint from public.support_tickets where organization_id = '51000000-0000-0000-0000-000000000001'$$,
  $$values (1::bigint)$$,
  'client viewer can read support history for their organization'
);

reset role;

-- Outsider sees no support data.
set local role authenticated;
select set_config('request.jwt.claim.sub', '50000000-0000-0000-0000-000000000004', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"50000000-0000-0000-0000-000000000004","email":"portal-outsider@gridspell.test","role":"authenticated"}',
  true
);
select results_eq(
  $$select count(*)::bigint from public.support_tickets where organization_id = '51000000-0000-0000-0000-000000000001'$$,
  $$values (0::bigint)$$,
  'outsider cannot read another organization support tickets'
);

reset role;

-- Staff can manage support tickets.
set local role authenticated;
select set_config('request.jwt.claim.sub', '50000000-0000-0000-0000-000000000001', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"50000000-0000-0000-0000-000000000001","email":"portal-owner@gridspell.test","role":"authenticated"}',
  true
);
select lives_ok(
  $$update public.support_tickets set status = 'in_progress', assigned_to = '50000000-0000-0000-0000-000000000001' where organization_id = '51000000-0000-0000-0000-000000000001'$$,
  'staff can update support ticket status'
);
select results_eq(
  $$select status::text from public.support_tickets where organization_id = '51000000-0000-0000-0000-000000000001'$$,
  $$values ('in_progress'::text)$$,
  'staff support ticket update is visible'
);

select * from finish();
rollback;
