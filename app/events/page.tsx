import { getEvents, formatEventDate } from "@/lib/features/events";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export const metadata = {
  title: "Events | #OneOxford",
  description: "Campaign events and socials — get involved.",
};

export default function EventsPage() {
  const events = getEvents();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Events
          </h1>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Events Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          {events.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-[#002147]/60 md:text-xl">
                Events will be listed here. Check back soon.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event, index) => (
                <div key={event.id}>
                  {index > 0 && <div className="mb-8 h-px bg-[#002147]/10" />}
                  <article className="group">
                    <h2 className="font-serif text-2xl font-normal tracking-tight text-[#002147] md:text-3xl">
                      {event.title}
                    </h2>
                    
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#002147]/60 md:gap-6 md:text-base">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="size-4 text-[#E2C044]" />
                        {formatEventDate(event.date)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="size-4 text-[#E2C044]" />
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="size-4 text-[#E2C044]" />
                        {event.place}
                      </span>
                    </div>
                    
                    <p className="mt-4 text-lg leading-relaxed text-[#002147]/80 md:text-xl">
                      {event.description}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
