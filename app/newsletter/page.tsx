import { getNewsletterItems } from "@/lib/features/newsletter";
import { ArrowRight, Mail } from "lucide-react";
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
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
            Stay updated with the latest from the #OneOxford movement. Stories, updates, and community voices delivered to your inbox.
          </p>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Subscribe CTA Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <div className="flex flex-col items-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#E2C044]">
              <Mail className="size-8 text-[#002147]" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
              Join the conversation
            </h2>
            <p className="mt-4 max-w-md text-lg text-[#002147]/60">
              Subscribe to receive updates on our campaign, community stories, and ways to get involved.
            </p>
            <a
              href="https://oneoxford.beehiiv.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
            >
              Subscribe now
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Past Issues Section */}
      <section className="bg-[#FAFAFA] py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <h2 className="font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
            Past issues
          </h2>
          <p className="mt-4 text-lg text-[#002147]/60">
            Catch up on what you might have missed.
          </p>

          <div className="mt-12 space-y-6">
            {items.length === 0 ? (
              <div className="rounded-lg border border-[#002147]/10 bg-white p-8 text-center">
                <p className="text-lg text-[#002147]/60">
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
                  className="group block overflow-hidden border border-[#002147]/10 bg-white p-6 transition-all hover:border-[#002147]/30 hover:shadow-sm md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium uppercase tracking-wide text-[#E2C044]">
                        {item.date}
                      </p>
                      <h3 className="mt-2 font-serif text-xl font-normal tracking-tight text-[#002147] transition-colors group-hover:text-[#002147]/80 md:text-2xl">
                        {item.title}
                      </h3>
                      {item.snippet && (
                        <p className="mt-3 line-clamp-2 text-base text-[#002147]/60">
                          {item.snippet}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="mt-1 size-5 shrink-0 text-[#002147]/30 transition-all group-hover:translate-x-1 group-hover:text-[#E2C044]" />
                  </div>
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
