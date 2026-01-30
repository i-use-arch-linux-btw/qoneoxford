-- Add optional profile fields: any other information, involvements/community
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS other_info text,
  ADD COLUMN IF NOT EXISTS involvements text;

COMMENT ON COLUMN public.profiles.other_info IS 'Any other information the supporter wants to share.';
COMMENT ON COLUMN public.profiles.involvements IS 'Involvements/community around Oxford (e.g. President of Oxford Speaks, Oxford Politics Society).';
