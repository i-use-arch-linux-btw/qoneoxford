import Script from "next/script";
import { Headphones, Rss } from "lucide-react";
import { getPodcastFeed, BUZZSPROUT_RSS_FEED_URL } from "@/lib/features/podcast";
import { PodcastEpisodesList } from "@/components/podcast-episodes-list";

export const metadata = {
  title: "Listen | #OneOxford",
  description: "Coffee's On Me — conversations across Oxbridge. Podcast content and more.",
};

export default async function ListenPage() {
  const feed = await getPodcastFeed();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Listen
          </h1>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Content Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <div className="space-y-12 text-[#002147]">
            {/* Intro */}
            <div>
              <p className="text-lg leading-relaxed md:text-xl">
                The #OneOxford campaign started with a simple question: &ldquo;What&apos;s your one thing you&apos;d change about Oxford?&rdquo; These conversations became Coffee&apos;s On Me — a podcast where we explore the stories, struggles, and hopes of students across Oxbridge.
              </p>
            </div>

            <div className="h-px bg-[#002147]/10" />

            {/* Podcast Header */}
            <div className="rounded-none border border-[#002147]/10 bg-[#FAFAFA] p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center bg-[#E2C044]">
                  <Headphones className="size-6 text-[#002147]" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-normal tracking-tight text-[#002147] md:text-3xl">
                    Coffee&apos;s On Me
                  </h2>
                  <p className="mt-2 text-[#002147]/60">
                    {feed.episodes.length > 0
                      ? `${feed.episodes.length} episodes available`
                      : "Podcast episodes from the #OneOxford campaign."}
                  </p>
                </div>
              </div>
              <a
                href={BUZZSPROUT_RSS_FEED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#002147]/60 transition-colors hover:text-[#002147]"
              >
                <Rss className="size-4" />
                Subscribe via RSS
              </a>
            </div>

            {/* Buzzsprout Embed Player */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#002147] md:text-2xl">
                Listen Now
              </h3>
              <div className="overflow-hidden rounded-none border border-[#002147]/10 bg-white">
                <div id="buzzsprout-large-player" />
                <Script
                  src="https://www.buzzsprout.com/1963997.js?container_id=buzzsprout-large-player&player=large"
                  strategy="lazyOnload"
                />
              </div>
            </div>

            {/* Episodes List */}
            {feed.episodes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#002147] md:text-2xl">
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
