-- colleges: id, name, slug
CREATE TABLE IF NOT EXISTS public.colleges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE
);

CREATE INDEX IF NOT EXISTS idx_colleges_slug ON public.colleges(slug);

-- profiles: id, slug, name, college, subject, one_thing, photo_url, video_clip_url, created_at, approved
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  college text NOT NULL,
  subject text NOT NULL,
  one_thing text NOT NULL,
  photo_url text NOT NULL,
  video_clip_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  approved boolean DEFAULT true NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_college ON public.profiles(college);
CREATE INDEX IF NOT EXISTS idx_profiles_approved ON public.profiles(approved);
CREATE INDEX IF NOT EXISTS idx_profiles_slug ON public.profiles(slug);

-- RLS: public read approved profiles; insert via service role only
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read approved profiles"
  ON public.profiles FOR SELECT
  USING (approved = true);

CREATE POLICY "Public read colleges"
  ON public.colleges FOR SELECT
  USING (true);

-- Storage bucket: create via Dashboard or API; policy: public read, authenticated/service write
-- INSERT INTO storage.buckets (id, name, public) VALUES ('profile-photos', 'profile-photos', true);
