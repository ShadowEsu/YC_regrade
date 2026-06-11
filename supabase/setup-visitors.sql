-- Run once in the Supabase SQL editor.
-- Creates visitor tracking for the private stats dashboard (stats.html).

create table if not exists public.site_visitors (
  visitor_id uuid primary key,
  first_path text not null default '/',
  first_seen_at timestamptz not null default timezone('utc', now())
);

alter table public.site_visitors enable row level security;

-- No direct table access for anon; only RPCs below.
revoke all on public.site_visitors from anon, authenticated;

create or replace function public.register_visitor(
  p_visitor_id uuid,
  p_path text default '/'
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  insert into public.site_visitors (visitor_id, first_path)
  values (p_visitor_id, coalesce(nullif(trim(p_path), ''), '/'))
  on conflict (visitor_id) do nothing;
end;
$$;

create or replace function public.get_visitor_stats()
returns json
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_total bigint;
  v_today bigint;
  v_week bigint;
begin
  select count(*)::bigint into v_total from public.site_visitors;

  select count(*)::bigint into v_today
  from public.site_visitors
  where first_seen_at >= date_trunc('day', timezone('utc', now()));

  select count(*)::bigint into v_week
  from public.site_visitors
  where first_seen_at >= date_trunc('day', timezone('utc', now())) - interval '7 days';

  return json_build_object(
    'total', v_total,
    'today', v_today,
    'week', v_week,
    'updated_at', timezone('utc', now())
  );
end;
$$;

grant execute on function public.register_visitor(uuid, text) to anon;
grant execute on function public.get_visitor_stats() to anon;
