-- Rename graduation_year to year and change type from integer to text
-- This stores year of study (e.g., "Bachelor's 1st Year", "Master's") instead of graduation year

-- First, rename the column
ALTER TABLE public.profiles 
RENAME COLUMN graduation_year TO year;

-- Then convert to text type
ALTER TABLE public.profiles 
ALTER COLUMN year TYPE text USING year::text;

-- Note: Existing numeric values like "2025" will remain as text.
-- You may want to manually update them to the new format if needed.
