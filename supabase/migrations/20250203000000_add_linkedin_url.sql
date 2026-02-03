-- Add optional social links to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS instagram_handle text,
  ADD COLUMN IF NOT EXISTS linkedin_url text;

COMMENT ON COLUMN public.profiles.instagram_handle IS 'Instagram username without @';
COMMENT ON COLUMN public.profiles.linkedin_url IS 'LinkedIn username (the part after linkedin.com/in/)';
