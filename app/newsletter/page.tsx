import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Newsletter | #OneOxford",
  description: "Latest from the #OneOxford newsletter.",
};

const BEEHIV_RSS = "https://rss.beehiiv.com/feeds/GsfktsGepZ.xml";

async function getNewsletterItems(): Promise<{ title: string; link: string; date: string; snippet: string }[]> {
  try {
    const res = await fetch(BEEHIV_RSS, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    const getTag = (blob: string, tag: string) => {
      const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
      const m = re.exec(blob);
      return m ? m[1].replace(/<[^>]+>/g, "").trim() : "";
    };
    const items: { title: string; link: string; date: string; snippet: string }[] = [];
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
  } catch {
    return [];
  }
}

export default async function NewsletterPage() {
  const items = await getNewsletterItems();

  return (
    <div className="container max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground">Newsletter</h1>
      <p className="mt-2 text-muted-foreground">
        Latest from the #OneOxford newsletter. Subscribe via Beehiv.
      </p>

      <div className="mt-8 space-y-4">
        {items.length === 0 ? (
          <p className="text-muted-foreground">
            No issues yet, or the feed could not be loaded. You can subscribe at the Beehiv link when available.
          </p>
        ) : (
          items.map((item, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {item.title}
                  </a>
                </h2>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </CardHeader>
              {item.snippet && (
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.snippet}</p>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
