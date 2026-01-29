import eventsData from "@/data/events.json";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Events | #OneOxford",
  description: "Campaign events and socials — get involved.",
};

const events = eventsData as {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
  description: string;
}[];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export default function EventsPage() {
  return (
    <div className="container max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground">Events</h1>
      <p className="mt-2 text-muted-foreground">
        Join us in person — #OneOxford means being part of something real.
      </p>

      <div className="mt-8 space-y-4">
        {events.length === 0 ? (
          <p className="text-muted-foreground">Events will be listed here. Check back soon.</p>
        ) : (
          events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {formatDate(event.date)} · {event.time} · {event.place}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{event.description}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
