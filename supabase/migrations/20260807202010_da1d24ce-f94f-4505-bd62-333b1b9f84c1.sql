CREATE TABLE IF NOT EXISTS public.owner_allowlist (
  email text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.owner_allowlist ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.owner_allowlist TO service_role;

INSERT INTO public.owner_allowlist (email) VALUES ('moaznaser2342@gmail.com')
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.grant_first_user_owner()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.email IS NOT NULL
     AND EXISTS (
       SELECT 1 FROM public.owner_allowlist a
       WHERE lower(a.email) = lower(NEW.email)
     )
  THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'owner')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$function$;