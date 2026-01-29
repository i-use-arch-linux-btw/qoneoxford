const BEEHIV_RSS = "https://rss.beehiiv.com/feeds/GsfktsGepZ.xml";

export type NewsletterItem = { title: string; link: string; date: string; snippet: string };

export async function GET() {
  try {
    const res = await fetch(BEEHIV_RSS, { next: { revalidate: 300 } });
    if (!res.ok) {
      return Response.json({ error: "Failed to fetch RSS" }, { status: 502 });
    }
    const xml = await res.text();
    const items = parseRssItems(xml);
    return Response.json(items);
  } catch (err) {
    return Response.json({ error: "RSS fetch error" }, { status: 500 });
  }
}

function parseRssItems(xml: string): NewsletterItem[] {
  const items: NewsletterItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  const getTag = (blob: string, tag: string) => {
    const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
    const m = re.exec(blob);
    return m ? m[1].replace(/<[^>]+>/g, "").trim() : "";
  };
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
