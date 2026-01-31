import Script from "next/script";
import { getNewsletterItems } from "@/lib/features/newsletter";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Newsletter | #OneOxford",
  description: "Stay updated with the latest from the #OneOxford movement.",
};

export default async function NewsletterPage() {
  const items = await getNewsletterItems();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Newsletter
          </h1>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Subscribe Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <Script
            src="https://embeds.beehiiv.com/attribution.js"
            strategy="lazyOnload"
          />
          <iframe
            src="https://embeds.beehiiv.com/71536852-e217-40cd-982a-d3caef9152eb"
            data-test-id="beehiiv-embed"
            width="100%"
            height="320"
            frameBorder="0"
            scrolling="no"
            className="border-2 border-[#002147]/10 bg-transparent"
          />
        </div>
      </section>

      {/* Past Issues Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <h2 className="font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
            Past issues
          </h2>

          <div className="mt-12 space-y-4">
            {items.length === 0 ? (
              <div className="border border-[#002147]/10 bg-white p-6 text-center">
                <p className="text-[#002147]/60">
                  No issues yet. Subscribe above to be the first to know when we publish.
                </p>
              </div>
            ) : (
              items.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 border border-[#002147]/10 bg-white p-6 transition-all hover:border-[#002147]/30 hover:bg-[#FAFAFA]"
                >
                  <div className="flex-1">
                    <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-[#002147] transition-colors group-hover:text-[#002147]/80 md:text-xl">
                      {item.title}
                    </h3>

                    {item.date && (
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-[#002147]/50">
                        <Calendar className="size-3.5" />
                        {new Date(item.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    )}

                    {item.snippet && (
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#002147]/60">
                        {item.snippet}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-[#002147]/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#E2C044]" />
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#E2C044] py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6 text-center md:px-12">
          <h2 className="font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl lg:text-5xl">
            Be part of the movement
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-[#002147]/70">
            Your voice matters. Join thousands of Oxford students working for change.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/people/add"
              className="group inline-flex items-center justify-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
            >
              Add your voice
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </Link>
            <Link
              href="/manifesto"
              className="group inline-flex items-center justify-center gap-3 border border-[#002147]/40 px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:border-[#002147] hover:bg-[#002147] hover:text-white"
            >
              Read manifesto
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
