begin;

create extension if not exists pgtap with schema extensions;
select plan(11);

select has_column('public', 'tasks', 'completed_at', 'tasks stores completion time');
select has_column('public', 'tasks', 'completed_by', 'tasks stores the completing user');
select has_function(
  'public',
  'set_client_task_status',
  'secure client task status RPC exists'
);

insert into auth.users (id, email, raw_user_meta_data)
values
  ('60000000-0000-0000-0000-000000000001', 'phase5-owner@gridspell.test', '{"full_name":"Phase 5 Owner"}'),
  ('60000000-0000-0000-0000-000000000002', 'phase5-client@gridspell.test', '{"full_name":"Phase 5 Client"}'),
  ('60000000-0000-0000-0000-000000000003', 'phase5-viewer@gridspell.test', '{"full_name":"Phase 5 Viewer"}'),
  ('60000000-0000-0000-0000-000000000004', 'phase5-outsider@gridspell.test', '{"full_name":"Phase 5 Outsider"}');

insert into public.app_user_roles (user_id, role)
values ('60000000-0000-0000-0000-000000000001', 'owner');

insert into public.organizations (id, name, slug)
values ('61000000-0000-0000-0000-000000000001', 'Phase 5 Company', 'phase-5-company');

insert into public.organization_members (organization_id, user_id, role)
values
  ('61000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000002', 'client'),
  ('61000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000003', 'client_viewer');

insert into public.projects (id, organization_id, name, slug)
values (
  '62000000-0000-0000-0000-000000000001',
  '61000000-0000-0000-0000-000000000001',
  'Phase 5 Project',
  'phase-5-project'
);

insert into public.project_members (project_id, user_id, role)
values
  ('62000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000002', 'client'),
  ('62000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000003', 'client_viewer');

insert into public.tasks (id, project_id, title, status, client_visible)
values
  ('73000000-0000-0000-0000-000000000001', '62000000-0000-0000-0000-000000000001', 'Client content task', 'not_started', true),
  ('73000000-0000-0000-0000-000000000002', '62000000-0000-0000-0000-000000000001', 'Internal delivery task', 'not_started', false);

set local role authenticated;
select set_config('request.jwt.claim.sub', '60000000-0000-0000-0000-000000000002', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"60000000-0000-0000-0000-000000000002","email":"phase5-client@gridspell.test","role":"authenticated"}',
  true
);

select lives_ok(
  $$select public.set_client_task_status('73000000-0000-0000-0000-000000000001', 'in_progress')$$,
  'client contributor can start a client-visible task'
);
select lives_ok(
  $$select public.set_client_task_status('73000000-0000-0000-0000-000000000001', 'completed')$$,
  'client contributor can complete a client-visible task'
);
select results_eq(
  $$select status::text, completed_by, completed_at is not null from public.tasks where id = '73000000-0000-0000-0000-000000000001'$$,
  $$values ('completed'::text, '60000000-0000-0000-0000-000000000002'::uuid, true)$$,
  'task completion metadata is recorded'
);
select throws_ok(
  $$select public.set_client_task_status('73000000-0000-0000-0000-000000000002', 'completed')$$,
  '42501',
  null,
  'client cannot update an internal task'
);

reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '60000000-0000-0000-0000-000000000003', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"60000000-0000-0000-0000-000000000003","email":"phase5-viewer@gridspell.test","role":"authenticated"}',
  true
);
select throws_ok(
  $$select public.set_client_task_status('73000000-0000-0000-0000-000000000001', 'not_started')$$,
  '42501',
  null,
  'client viewer cannot change task status'
);

reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '60000000-0000-0000-0000-000000000004', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"60000000-0000-0000-0000-000000000004","email":"phase5-outsider@gridspell.test","role":"authenticated"}',
  true
);
select throws_ok(
  $$select public.set_client_task_status('73000000-0000-0000-0000-000000000001', 'not_started')$$,
  '42501',
  null,
  'outsider cannot update another workspace task'
);

reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '60000000-0000-0000-0000-000000000001', true);
select set_config(
  'request.jwt.claims',
  '{"sub":"60000000-0000-0000-0000-000000000001","email":"phase5-owner@gridspell.test","role":"authenticated"}',
  true
);
select lives_ok(
  $$select public.set_client_task_status('73000000-0000-0000-0000-000000000002', 'in_progress')$$,
  'staff can update internal task status'
);
select results_eq(
  $$select count(*)::bigint from public.activity_logs where entity_id in ('73000000-0000-0000-0000-000000000001','73000000-0000-0000-0000-000000000002') and action = 'task_status_changed'$$,
  $$values (3::bigint)$$,
  'task status changes create activity log entries'
);

select * from finish();
rollback;
