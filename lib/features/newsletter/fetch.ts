import { BEEHIV_RSS_FEED_URL } from "./constants";
import type { NewsletterItem } from "./types";

function getTag(blob: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = re.exec(blob);
  return m ? m[1].replace(/<[^>]+>/g, "").trim() : "";
}

export function parseRssItems(xml: string): NewsletterItem[] {
  const items: NewsletterItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRegex.exec(xml)) !== null) {
    const blob = m[1];
    const title = getTag(blob, "title");
    const link = getTag(blob, "link");
    const pubDate = getTag(blob, "pubDate");
    const description = getTag(blob, "description");
    const date = pubDate ? new Date(pubDate).toISOString().slice(0, 10) : "";
    items.push({ title, link, date, snippet: description.slice(0, 200) });
  }
  return items.slice(0, 20);
}

export async function getNewsletterItems(): Promise<NewsletterItem[]> {
  try {
    const res = await fetch(BEEHIV_RSS_FEED_URL, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRssItems(xml);
  } catch {
    return [];
  }
}
