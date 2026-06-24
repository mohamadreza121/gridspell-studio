begin;

create extension if not exists pgtap with schema extensions;
select plan(18);

select has_column('public', 'invoices', 'notes', 'invoices store admin notes');
select has_column('public', 'invoices', 'updated_at', 'invoices track updates');
select has_function('public', 'recalculate_proposal_totals', 'proposal total recalculation RPC exists');

insert into auth.users (id, email, raw_user_meta_data)
values
  ('80000000-0000-0000-0000-000000000001', 'phase6-owner@gridspell.test', '{"full_name":"Phase 6 Owner"}'),
  ('80000000-0000-0000-0000-000000000002', 'phase6-team@gridspell.test', '{"full_name":"Phase 6 Team"}'),
  ('80000000-0000-0000-0000-000000000003', 'phase6-client@gridspell.test', '{"full_name":"Phase 6 Client"}');

insert into public.app_user_roles (user_id, role)
values
  ('80000000-0000-0000-0000-000000000001', 'owner'),
  ('80000000-0000-0000-0000-000000000002', 'team_member');

insert into public.organizations (id, name, slug)
values ('81000000-0000-0000-0000-000000000001', 'Phase 6 Company', 'phase-6-company');

insert into public.organization_members (organization_id, user_id, role)
values ('81000000-0000-0000-0000-000000000001', '80000000-0000-0000-0000-000000000003', 'client');

-- Team member delivery permissions.
set local role authenticated;
select set_config('request.jwt.claim.sub', '80000000-0000-0000-0000-000000000002', true);
select set_config('request.jwt.claims', '{"sub":"80000000-0000-0000-0000-000000000002","email":"phase6-team@gridspell.test","role":"authenticated"}', true);

select lives_ok(
  $$insert into public.projects (id, organization_id, name, slug, created_by) values ('82000000-0000-0000-0000-000000000001', '81000000-0000-0000-0000-000000000001', 'Phase 6 Delivery', 'phase-6-delivery', '80000000-0000-0000-0000-000000000002')$$,
  'team member can create a project'
);
select lives_ok(
  $$update public.projects set progress = 25, status = 'active' where id = '82000000-0000-0000-0000-000000000001'$$,
  'team member can update a project'
);
select lives_ok(
  $$insert into public.project_phases (id, project_id, name) values ('83000000-0000-0000-0000-000000000001', '82000000-0000-0000-0000-000000000001', 'Discovery')$$,
  'team member can create project phases'
);
select lives_ok(
  $$insert into public.milestones (id, project_id, phase_id, title) values ('84000000-0000-0000-0000-000000000001', '82000000-0000-0000-0000-000000000001', '83000000-0000-0000-0000-000000000001', 'Direction approved')$$,
  'team member can create milestones'
);
select lives_ok(
  $$insert into public.tasks (id, project_id, milestone_id, title, client_visible) values ('85000000-0000-0000-0000-000000000001', '82000000-0000-0000-0000-000000000001', '84000000-0000-0000-0000-000000000001', 'Prepare concepts', true)$$,
  'team member can create tasks'
);
select throws_ok(
  $$insert into public.leads (name,email,project_type,budget_range,message) values ('Blocked Lead','blocked@test.dev','Website','$5k','No access')$$,
  '42501', null,
  'team member cannot manage leads'
);
select throws_ok(
  $$insert into public.proposals (title) values ('Blocked Proposal')$$,
  '42501', null,
  'team member cannot create proposals'
);
select throws_ok(
  $$insert into public.invoices (invoice_number) values ('BLOCKED-001')$$,
  '42501', null,
  'team member cannot create invoices'
);

-- Owner sales, finance, and content permissions plus proposal totals.
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '80000000-0000-0000-0000-000000000001', true);
select set_config('request.jwt.claims', '{"sub":"80000000-0000-0000-0000-000000000001","email":"phase6-owner@gridspell.test","role":"authenticated"}', true);

select lives_ok(
  $$insert into public.leads (id,name,email,project_type,budget_range,message) values ('86000000-0000-0000-0000-000000000001','Owner Lead','owner-lead@test.dev','Website','$10k','Qualified lead')$$,
  'owner can create leads'
);
select lives_ok(
  $$insert into public.proposals (id, organization_id, title, tax) values ('87000000-0000-0000-0000-000000000001','81000000-0000-0000-0000-000000000001','Phase 6 Proposal',130)$$,
  'owner can create proposals'
);
select lives_ok(
  $$insert into public.proposal_items (proposal_id,title,quantity,unit_price) values ('87000000-0000-0000-0000-000000000001','Design system',2,1000)$$,
  'owner can add proposal items'
);
select results_eq(
  $$select subtotal, total from public.proposals where id = '87000000-0000-0000-0000-000000000001'$$,
  $$values (2000::numeric, 2130::numeric)$$,
  'proposal item trigger refreshes subtotal and total'
);
select lives_ok(
  $$insert into public.invoices (invoice_number,organization_id,amount_due,notes) values ('GS-P6-001','81000000-0000-0000-0000-000000000001',2130,'Deposit')$$,
  'owner can create invoices'
);
select lives_ok(
  $$insert into public.services (slug,title,summary,published) values ('phase-6-service','Phase 6 Service','Admin managed service content',false)$$,
  'owner can manage content'
);

-- Client remains blocked from admin delivery creation.
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '80000000-0000-0000-0000-000000000003', true);
select set_config('request.jwt.claims', '{"sub":"80000000-0000-0000-0000-000000000003","email":"phase6-client@gridspell.test","role":"authenticated"}', true);
select throws_ok(
  $$insert into public.projects (name,slug,organization_id) values ('Forbidden','forbidden-phase6','81000000-0000-0000-0000-000000000001')$$,
  '42501', null,
  'client cannot create projects'
);

select * from finish();
rollback;
