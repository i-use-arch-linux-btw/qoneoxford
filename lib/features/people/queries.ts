import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";
import { PAGE_SIZE } from "./constants";

export type GetProfilesOptions = { college?: string; subject?: string; page: number };

const EMPTY_PROFILES: { profiles: Profile[]; totalCount: number } = {
  profiles: [],
  totalCount: 0,
};

export async function getProfiles(
  options: GetProfilesOptions
): Promise<{ profiles: Profile[]; totalCount: number }> {
  try {
    const { college: collegeFilter = "", subject: subjectFilter = "", page } = options;
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
    if (subjectFilter) {
      query = query.eq("subject", subjectFilter);
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

export async function getDistinctSubjects(): Promise<string[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("profiles")
      .select("subject")
      .eq("approved", true) as { data: { subject: string }[] | null; error: unknown };

    if (error || !data) return [];

    // Extract unique subjects and sort alphabetically
    const subjects = [...new Set(data.map((p) => p.subject).filter(Boolean))].sort();
    return subjects;
  } catch (err) {
    console.error("[people] getDistinctSubjects error:", err);
    return [];
  }
}

/**
 * Get a selection of profiles with photos for the homepage "Faces" section
 */
export async function getFeaturedProfiles(limit: number = 10): Promise<Profile[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("approved", true)
      .not("photo_url", "is", null)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data as Profile[];
  } catch (err) {
    console.error("[people] getFeaturedProfiles error:", err);
    return [];
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

/**
 * Get the current authenticated user's profile (including unapproved)
 */
export async function getUserProfile(): Promise<Profile | null> {
  try {
    const supabase = await createClient();
    if (!supabase) return null;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id" as never, user.id)
      .maybeSingle();

    if (error || !data) return null;
    return data as Profile;
  } catch (err) {
    console.error("[people] getUserProfile error:", err);
    return null;
  }
}
