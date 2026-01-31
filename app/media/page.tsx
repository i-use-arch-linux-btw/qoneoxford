import Script from "next/script";
import Image from "next/image";
import { ArrowUpRight, Calendar, Headphones, Rss } from "lucide-react";
import { getNewsletterItems } from "@/lib/features/newsletter";
import { getPodcastFeed, BUZZSPROUT_RSS_FEED_URL } from "@/lib/features/podcast";
import { PodcastEpisodesList } from "@/components/podcast-episodes-list";

export const metadata = {
  title: "Media | #OneOxford",
  description: "Listen to Coffee's On Me podcast and stay updated with the #OneOxford newsletter.",
};

// Hardcoded articles (external publications, etc.)
const articles = [
  {
    title: "Dear Granddad",
    link: "https://www.varsity.co.uk/features/23458",
    date: "2022-04-03",
    snippet: "David Quan delves into memories of his grandfather and contemplates the importance of gratitude and service.",
    source: "Varsity",
  },
];

export default async function MediaPage() {
  const [items, feed] = await Promise.all([
    getNewsletterItems(),
    getPodcastFeed(),
  ]);

  // Combine newsletter items with hardcoded articles
  const allArticles = [
    ...articles,
    ...items,
  ].sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Media
          </h1>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Newsletter Subscribe Section */}
      <section className="bg-white pb-12 pt-16 md:py-16">
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

      {/* Articles Section */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <h2 className="font-serif text-2xl font-normal tracking-tight text-[#002147] md:text-3xl">
            Articles
          </h2>

          <div className="mt-6 space-y-4">
            {allArticles.map((item, i) => (
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
                      {"source" in item && item.source && (
                        <span className="ml-2 text-[#002147]/40">• {item.source}</span>
                      )}
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
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <div className="space-y-12 text-[#002147]">
            {/* Intro */}
            <div>
              <p className="text-lg leading-relaxed md:text-xl">
                The #OneOxford campaign started with a simple question: &ldquo;What&apos;s your One thing you&apos;d change about Oxford?&rdquo; These conversations became Coffee&apos;s On Me — a podcast where we explore the stories, struggles, and hopes of students across Oxbridge.
              </p>
            </div>

            <div className="h-px bg-[#002147]/10" />

            {/* Podcast Header */}
            <div className="flex items-stretch gap-6 sm:gap-8">
              {feed.image ? (
                <Image
                  src={feed.image}
                  alt="Coffee's On Me podcast artwork"
                  width={160}
                  height={160}
                  className="size-24 shrink-0 rounded-2xl object-cover shadow-lg sm:size-40"
                />
              ) : (
                <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-[#E2C044] shadow-lg sm:size-40">
                  <Headphones className="size-10 text-[#002147] sm:size-16" />
                </div>
              )}
              <div className="flex flex-col justify-between py-1">
                <div>
                <h2 className="font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
                  Coffee&apos;s On Me
                </h2>
                  <p className="mt-2 text-[#002147]/60">
                    {feed.episodes.length > 0
                      ? `${feed.episodes.length} episodes available`
                      : "Podcast episodes from the #OneOxford campaign."}
                  </p>
                </div>
                <a
                  href={BUZZSPROUT_RSS_FEED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#002147] px-6 py-3 text-sm font-medium text-[#002147] transition-colors hover:bg-[#002147] hover:text-white"
                >
                  <Rss className="size-4" />
                  Subscribe via RSS
                </a>
              </div>
            </div>

            {/* Episodes List */}
            {feed.episodes.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-normal tracking-tight text-[#002147] md:text-3xl">
                  All Episodes
                </h3>
                <PodcastEpisodesList episodes={feed.episodes} />
              </div>
            )}

            {/* Empty state */}
            {feed.episodes.length === 0 && (
              <div className="rounded-none border border-[#002147]/10 bg-[#FAFAFA] p-8 text-center">
                <p className="text-[#002147]/60">
                  No episodes available at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
