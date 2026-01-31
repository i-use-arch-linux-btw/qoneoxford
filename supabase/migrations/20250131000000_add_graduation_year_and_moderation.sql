-- Add graduation_year column to profiles (required field)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS graduation_year integer;

-- Set a default for existing rows (you may want to update these manually)
UPDATE public.profiles SET graduation_year = 2025 WHERE graduation_year IS NULL;

-- Make graduation_year NOT NULL after populating existing rows
ALTER TABLE public.profiles 
ALTER COLUMN graduation_year SET NOT NULL;

-- Change default for approved column to false (moderation)
ALTER TABLE public.profiles 
ALTER COLUMN approved SET DEFAULT false;
