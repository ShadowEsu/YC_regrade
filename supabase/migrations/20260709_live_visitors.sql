-- Live visitor presence: heartbeat via register_visitor, count via get_live_visitor_count

alter table public.site_visitors
  add column if not exists last_seen_at timestamptz not null default timezone('utc', now());

update public.site_visitors
set last_seen_at = first_seen_at
where last_seen_at < first_seen_at;

create or replace function public.register_visitor(
  p_visitor_id uuid,
  p_path text default '/'
)
returns json
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  row_count integer;
  total_count bigint;
begin
  if p_visitor_id is null then
    raise exception 'visitor_id required';
  end if;

  insert into public.site_visitors (visitor_id, landing_path, last_seen_at)
  values (
    p_visitor_id,
    coalesce(nullif(trim(p_path), ''), '/'),
    timezone('utc', now())
  )
  on conflict (visitor_id) do update
  set last_seen_at = timezone('utc', now());

  get diagnostics row_count = row_count;

  select count(*)::bigint into total_count from public.site_visitors;

  return json_build_object(
    'registered', row_count > 0,
    'total', total_count
  );
end;
$$;

create or replace function public.get_live_visitor_count()
returns json
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_live bigint;
begin
  select count(*)::bigint into v_live
  from public.site_visitors
  where last_seen_at >= timezone('utc', now()) - interval '3 minutes';

  return json_build_object(
    'live', v_live,
    'updated_at', timezone('utc', now())
  );
end;
$$;

grant execute on function public.get_live_visitor_count() to anon;
