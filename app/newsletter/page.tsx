import { getNewsletterItems } from "@/lib/features/newsletter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Newsletter | #OneOxford",
  description: "Latest from the #OneOxford newsletter.",
};

export default async function NewsletterPage() {
  const items = await getNewsletterItems();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
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
