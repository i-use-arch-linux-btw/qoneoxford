import timestampsData from "@/data/video-timestamps.json";
import type { VideoTimestamp } from "./types";

export function getTimestamps(): VideoTimestamp[] {
  return timestampsData as VideoTimestamp[];
}

export function getVideoIds(): {
  storyId: string | null;
  communityId: string | null;
} {
  return {
    storyId: process.env.NEXT_PUBLIC_VIDEO_STORY_ID ?? null,
    communityId: process.env.NEXT_PUBLIC_VIDEO_COMMUNITY_ID ?? null,
  };
}
