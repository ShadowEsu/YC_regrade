-- join_waitlist: returns queue position + duplicate flag
-- get_waitlist_stats: public aggregate counts (no emails)
-- Grants anon execute on visitor analytics RPCs

CREATE OR REPLACE FUNCTION public.join_waitlist(p_email text, p_source text DEFAULT 'hero')
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_email text := lower(trim(p_email));
  v_position bigint;
  v_row_count integer;
BEGIN
  IF v_email IS NULL OR v_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' THEN
    RETURN json_build_object('ok', false, 'error', 'invalid_email');
  END IF;

  INSERT INTO public.waitlist (email, source)
  VALUES (v_email, coalesce(nullif(trim(p_source), ''), 'hero'))
  ON CONFLICT ((lower(email))) DO NOTHING;

  GET DIAGNOSTICS v_row_count = ROW_COUNT;

  SELECT count(*)::bigint INTO v_position
  FROM public.waitlist w
  WHERE w.created_at <= (
    SELECT created_at FROM public.waitlist WHERE lower(email) = v_email LIMIT 1
  );

  RETURN json_build_object(
    'ok', true,
    'duplicate', v_row_count = 0,
    'position', v_position,
    'total', (SELECT count(*)::bigint FROM public.waitlist)
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_waitlist_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN json_build_object(
    'total', (SELECT count(*)::bigint FROM public.waitlist),
    'spots_left', greatest(0, 100 - (SELECT count(*)::bigint FROM public.waitlist)),
    'updated_at', timezone('utc', now())
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.join_waitlist(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_waitlist_stats() TO anon;
GRANT EXECUTE ON FUNCTION public.register_visitor(uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_visitor_stats() TO anon;
GRANT EXECUTE ON FUNCTION public.get_live_visitor_count() TO anon;
