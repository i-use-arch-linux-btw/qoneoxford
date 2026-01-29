import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";
import { PAGE_SIZE } from "./constants";

export type GetProfilesOptions = { college?: string; page: number };

export async function getProfiles(
  options: GetProfilesOptions
): Promise<{ profiles: Profile[]; totalCount: number }> {
  const { college: collegeFilter = "", page } = options;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createClient();
  if (!supabase) {
    return { profiles: [], totalCount: 0 };
  }

  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });
  if (collegeFilter) {
    query = query.eq("college", collegeFilter);
  }
  const res = await query.range(from, to);
  const profiles = (res.data ?? []) as Profile[];
  const totalCount = res.count ?? 0;

  return { profiles, totalCount };
}

export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Profile;
}
