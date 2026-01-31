import { createBrowserClient, type SupabaseClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createClient(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    // Return null when Supabase is not configured
    return null;
  }
  return createBrowserClient<Database>(url, key);
}
