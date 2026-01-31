import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

export type SupabaseBrowserClient = ReturnType<typeof createBrowserClient<Database>>;

/**
 * Creates a Supabase browser client. Callers must null-check the result.
 * Returns null when NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are missing.
 */
export function createClient(): SupabaseBrowserClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return null;
  }
  return createBrowserClient<Database>(url, key);
}
