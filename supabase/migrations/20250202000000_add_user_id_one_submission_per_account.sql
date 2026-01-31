-- Add user_id column to profiles to track who submitted each profile
-- This allows us to limit one submission per authenticated user

-- Add user_id column (nullable initially for existing rows)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create a unique index on user_id to enforce one profile per user
-- Using a partial index to allow NULL values (for legacy profiles without user_id)
CREATE UNIQUE INDEX IF NOT EXISTS profiles_user_id_unique 
ON public.profiles (user_id) 
WHERE user_id IS NOT NULL;

-- Add an index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON public.profiles (user_id);
