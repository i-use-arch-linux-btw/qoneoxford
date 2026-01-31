-- Change graduation_year from integer to text to store year of study (e.g., "Bachelor's 1st Year", "Master's")
-- First, we need to drop the NOT NULL constraint, change type, then restore constraint

-- Convert existing integer values to text representation
ALTER TABLE public.profiles 
ALTER COLUMN graduation_year TYPE text USING graduation_year::text;

-- Note: Existing numeric values like "2025" will remain as text.
-- You may want to manually update them to the new format if needed.
