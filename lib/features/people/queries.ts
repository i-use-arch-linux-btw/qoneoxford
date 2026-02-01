import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";
import { PAGE_SIZE } from "./constants";

export type GetProfilesOptions = { college?: string; page: number };

const EMPTY_PROFILES: { profiles: Profile[]; totalCount: number } = {
  profiles: [],
  totalCount: 0,
};

export async function getProfiles(
  options: GetProfilesOptions
): Promise<{ profiles: Profile[]; totalCount: number }> {
  try {
    const { college: collegeFilter = "", page } = options;
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const supabase = await createClient();
    if (!supabase) {
      return EMPTY_PROFILES;
    }

    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (collegeFilter) {
      query = query.eq("college", collegeFilter);
    }
    const res = await query.range(from, to);
    const profiles = (res.data ?? []) as Profile[];
    const totalCount = res.count ?? 0;

    return { profiles, totalCount };
  } catch (err) {
    console.error("[people] getProfiles error:", err);
    return EMPTY_PROFILES;
  }
}

export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  try {
    const supabase = await createClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("slug", slug)
      .eq("approved", true)
      .single();

    if (error || !data) return null;
    return data as Profile;
  } catch (err) {
    console.error("[people] getProfileBySlug error:", err);
    return null;
  }
}
