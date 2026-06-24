begin;

alter table public.tasks
  add column if not exists completed_at timestamptz,
  add column if not exists completed_by uuid references public.profiles(id) on delete set null;

create index if not exists tasks_project_status_due_idx
  on public.tasks (project_id, status, due_date)
  where client_visible = true;

create or replace function public.set_client_task_status(
  target_task_id uuid,
  target_status public.item_status
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_task public.tasks%rowtype;
  viewer_id uuid := (select auth.uid());
  viewer_is_staff boolean := public.is_staff_member();
begin
  if viewer_id is null then
    raise exception using errcode = '42501', message = 'Authentication is required.';
  end if;

  if target_status not in ('not_started', 'in_progress', 'completed') then
    raise exception using errcode = '22023', message = 'That task status is not available to clients.';
  end if;

  select *
  into selected_task
  from public.tasks
  where id = target_task_id;

  if not found then
    raise exception using errcode = 'P0002', message = 'Task not found.';
  end if;

  if not viewer_is_staff and (
    not selected_task.client_visible
    or not public.can_contribute_to_project(selected_task.project_id)
  ) then
    raise exception using errcode = '42501', message = 'You do not have permission to update this task.';
  end if;

  update public.tasks
  set
    status = target_status,
    completed_at = case when target_status = 'completed' then now() else null end,
    completed_by = case when target_status = 'completed' then viewer_id else null end,
    updated_at = now()
  where id = target_task_id;

  insert into public.activity_logs (
    actor_id,
    project_id,
    action,
    entity_type,
    entity_id,
    metadata
  ) values (
    viewer_id,
    selected_task.project_id,
    'task_status_changed',
    'task',
    selected_task.id,
    jsonb_build_object('status', target_status::text)
  );
end;
$$;

revoke all on function public.set_client_task_status(uuid, public.item_status) from public;
grant execute on function public.set_client_task_status(uuid, public.item_status) to authenticated, service_role;

commit;
