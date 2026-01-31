-- Add optional Instagram handle to profiles (stored without @, e.g. arshpatankar)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS instagram_handle text;

COMMENT ON COLUMN public.profiles.instagram_handle IS 'Instagram username without @; link shown as https://www.instagram.com/<handle>/';
