"use server";

import { getServiceRoleClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { profileSlug } from "@/lib/slug";
import { PROFILE_PHOTOS_BUCKET } from "./constants";

type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];

export type AddProfileState = { error?: string; success?: boolean; slug?: string };

export async function addProfile(
  prev: AddProfileState,
  formData: FormData
): Promise<AddProfileState> {
  const name = formData.get("name") as string | null;
  const college = formData.get("college") as string | null;
  const subject = formData.get("subject") as string | null;
  const oneThing = formData.get("one_thing") as string | null;
  const otherInfo = (formData.get("other_info") as string | null)?.trim() || null;
  const involvements = (formData.get("involvements") as string | null)?.trim() || null;
  const photo = formData.get("photo") as File | null;

  if (!name?.trim() || !college?.trim() || !subject?.trim()) {
    return { error: "Please fill in name, college, and subject." };
  }

  const supabase = getServiceRoleClient();
  if (!supabase) {
    return { error: "Server configuration error. Please try again later." };
  }

  let slug = profileSlug(name.trim(), college.trim());
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (existing) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  let photoUrl: string | null = null;

  // Only upload photo if one was provided
  if (photo?.size) {
    const ext = photo.name.split(".").pop() || "jpg";
    const path = `${slug}.${ext}`;

    const arrayBuffer = await photo.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(PROFILE_PHOTOS_BUCKET)
      .upload(path, arrayBuffer, {
        contentType: photo.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      return { error: "Photo upload failed. Please try again." };
    }

    const { data: urlData } = supabase.storage
      .from(PROFILE_PHOTOS_BUCKET)
      .getPublicUrl(path);
    photoUrl = urlData.publicUrl;
  }

  const row: ProfileInsert = {
    slug,
    name: name.trim(),
    college: college.trim(),
    subject: subject.trim(),
    // TODO: Make nullable in DB and use `oneThing?.trim() || null` instead
    one_thing: oneThing?.trim() || "",
    // TODO: Make nullable in DB and use `photoUrl` instead
    photo_url: photoUrl || "",
    video_clip_url: null,
    other_info: otherInfo,
    involvements: involvements,
    approved: true,
  };
  const { error: insertError } = await supabase.from("profiles").insert(row as never);

  if (insertError) {
    return { error: "Could not save profile. Please try again." };
  }

  return { success: true, slug };
}
