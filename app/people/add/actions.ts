"use server";

import { getServiceRoleClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import { profileSlug } from "@/lib/slug";

type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];

const BUCKET = "profile-photos";

export type AddProfileState = { error?: string; success?: boolean; slug?: string };

export async function addProfile(prev: AddProfileState, formData: FormData): Promise<AddProfileState> {
  const name = formData.get("name") as string | null;
  const college = formData.get("college") as string | null;
  const subject = formData.get("subject") as string | null;
  const oneThing = formData.get("one_thing") as string | null;
  const photo = formData.get("photo") as File | null;

  if (!name?.trim() || !college?.trim() || !subject?.trim() || !oneThing?.trim() || !photo?.size) {
    return { error: "Please fill all fields and upload a photo." };
  }

  const supabase = getServiceRoleClient();
  if (!supabase) {
    return { error: "Server configuration error. Please try again later." };
  }

  let slug = profileSlug(name.trim(), college.trim());
  const { data: existing } = await supabase.from("profiles").select("id").eq("slug", slug).maybeSingle();
  if (existing) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const ext = photo.name.split(".").pop() || "jpg";
  const path = `${slug}.${ext}`;

  const arrayBuffer = await photo.arrayBuffer();
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, arrayBuffer, {
    contentType: photo.type || "image/jpeg",
    upsert: true,
  });

  if (uploadError) {
    return { error: "Photo upload failed. Please try again." };
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const photoUrl = urlData.publicUrl;

  const row: ProfileInsert = {
    slug,
    name: name.trim(),
    college: college.trim(),
    subject: subject.trim(),
    one_thing: oneThing.trim(),
    photo_url: photoUrl,
    video_clip_url: null,
    approved: true,
  };
  const { error: insertError } = await supabase.from("profiles").insert(row as never);

  if (insertError) {
    return { error: "Could not save profile. Please try again." };
  }

  return { success: true, slug };
}
