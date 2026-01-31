import { BUZZSPROUT_RSS_FEED_URL } from "./constants";
import type { PodcastEpisode, PodcastFeed } from "./types";

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function getTag(blob: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = re.exec(blob);
  if (!m) return "";
  // Handle CDATA sections
  let content = m[1];
  const cdataMatch = /^<!\[CDATA\[([\s\S]*?)\]\]>$/.exec(content.trim());
  if (cdataMatch) {
    content = cdataMatch[1];
  }
  // Strip HTML tags and decode HTML entities
  return decodeHtmlEntities(content.replace(/<[^>]+>/g, "").trim());
}

function getTagRaw(blob: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = re.exec(blob);
  if (!m) return "";
  let content = m[1];
  const cdataMatch = /^<!\[CDATA\[([\s\S]*?)\]\]>$/.exec(content.trim());
  if (cdataMatch) {
    content = cdataMatch[1];
  }
  // Decode HTML entities but preserve HTML tags for rich text
  return decodeHtmlEntities(content.trim());
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function getAttribute(blob: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["'][^>]*>`, "i");
  const m = re.exec(blob);
  return m ? m[1] : "";
}

function getItunesTag(blob: string, tag: string): string {
  return getTag(blob, `itunes:${tag}`);
}

function parseEpisodeNumber(title: string): number | undefined {
  // Try to extract episode number from title like "Episode 1:" or "#1" or "E1"
  const match = title.match(/(?:Episode|Ep\.?|E|#)\s*(\d+)/i);
  return match ? parseInt(match[1], 10) : undefined;
}

function extractBuzzsproutId(link: string, audioUrl: string): string {
  // Try to extract from link like "https://www.buzzsprout.com/1963997/episodes/12345678"
  const linkMatch = link.match(/buzzsprout\.com\/\d+\/episodes\/(\d+)/i);
  if (linkMatch) return linkMatch[1];
  
  // Try to extract from audio URL like "https://www.buzzsprout.com/1963997/12345678-episode-title.mp3"
  const audioMatch = audioUrl.match(/buzzsprout\.com\/\d+\/(\d+)/i);
  if (audioMatch) return audioMatch[1];
  
  return "";
}

function generateSlug(title: string, buzzsproutId: string): string {
  // Create a URL-safe slug from the title
  const titleSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  
  // Append buzzsprout ID for uniqueness
  return buzzsproutId ? `${titleSlug}-${buzzsproutId}` : titleSlug;
}

function formatDuration(duration: string): string {
  // Duration can be in seconds or HH:MM:SS format
  if (duration.includes(":")) {
    return duration;
  }
  const totalSeconds = parseInt(duration, 10);
  if (isNaN(totalSeconds)) return "";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function parsePodcastFeed(xml: string): PodcastFeed {
  // Get channel info
  const channelMatch = /<channel>([\s\S]*?)<\/channel>/i.exec(xml);
  const channel = channelMatch ? channelMatch[1] : xml;

  const title = getTag(channel, "title");
  const description = getTag(channel, "description") || getItunesTag(channel, "summary");
  const image = getAttribute(channel, "itunes:image", "href") || getTag(channel, "url");

  // Parse episodes
  const episodes: PodcastEpisode[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;

  while ((m = itemRegex.exec(xml)) !== null) {
    const blob = m[1];
    const episodeTitle = getTag(blob, "title");
    const episodeDescription = getTagRaw(blob, "description") || getItunesTag(blob, "summary");
    const link = getTag(blob, "link");
    const audioUrl = getAttribute(blob, "enclosure", "url");
    const pubDate = getTag(blob, "pubDate");
    const duration = getItunesTag(blob, "duration");
    const date = pubDate ? new Date(pubDate).toISOString().slice(0, 10) : "";

    const buzzsproutId = extractBuzzsproutId(link, audioUrl);
    const slug = generateSlug(episodeTitle, buzzsproutId);

    episodes.push({
      title: episodeTitle,
      description: stripHtml(episodeDescription),
      descriptionHtml: episodeDescription,
      link,
      audioUrl,
      date,
      duration: formatDuration(duration),
      episodeNumber: parseEpisodeNumber(episodeTitle),
      slug,
      buzzsproutId,
    });
  }

  return {
    title,
    description,
    image,
    episodes,
  };
}

export async function getPodcastFeed(): Promise<PodcastFeed> {
  try {
    // Use no-store to avoid Next.js data cache errors for large RSS feeds (>2MB)
    // The page itself will be revalidated based on route config
    const res = await fetch(BUZZSPROUT_RSS_FEED_URL, { cache: "no-store" });
    if (!res.ok) {
      return { title: "", description: "", image: "", episodes: [] };
    }
    const xml = await res.text();
    return parsePodcastFeed(xml);
  } catch {
    return { title: "", description: "", image: "", episodes: [] };
  }
}

export async function getEpisodeBySlug(slug: string): Promise<PodcastEpisode | null> {
  const feed = await getPodcastFeed();
  return feed.episodes.find((ep) => ep.slug === slug) || null;
}
