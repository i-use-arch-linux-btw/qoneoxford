import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ExternalLink, Rss } from "lucide-react";
import { getEpisodeBySlug, getPodcastFeed, BUZZSPROUT_RSS_FEED_URL } from "@/lib/features/podcast";

interface EpisodePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    return { title: "Episode Not Found | #OneOxford" };
  }

  return {
    title: `${episode.title} | Coffee's On Me`,
    description: episode.description || "Listen to this episode of Coffee's On Me podcast.",
  };
}

export async function generateStaticParams() {
  const feed = await getPodcastFeed();
  return feed.episodes.map((episode) => ({
    slug: episode.slug,
  }));
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  // Buzzsprout single episode player URL
  const playerUrl = episode.buzzsproutId
    ? `https://www.buzzsprout.com/1963997/${episode.buzzsproutId}?client_source=small_player&iframe=true`
    : null;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          {/* Back link */}
          <Link
            href="/media"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Media
          </Link>

          {/* Episode title */}
          <h1 className="font-serif text-2xl leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            {episode.title}
          </h1>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Content Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <div className="space-y-12 text-[#002147]">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#002147]/60">
              {episode.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  {new Date(episode.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              {episode.duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {episode.duration}
                </span>
              )}
            </div>

            {/* Embedded Player */}
            {playerUrl && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#002147]">
                  Listen to this episode
                </h2>
                <div className="overflow-hidden rounded-none border border-[#002147]/10 bg-[#FAFAFA]">
                  <iframe
                    src={playerUrl}
                    loading="lazy"
                    width="100%"
                    height="200"
                    frameBorder="0"
                    scrolling="no"
                    title={`Listen to ${episode.title}`}
                    className="block"
                  />
                </div>
              </div>
            )}

            {/* Fallback audio player */}
            {!playerUrl && episode.audioUrl && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#002147]">
                  Listen to this episode
                </h2>
                <audio
                  controls
                  className="w-full"
                  preload="metadata"
                >
                  <source src={episode.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            <div className="h-px bg-[#002147]/10" />

            {/* Description */}
            {episode.descriptionHtml && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#002147]">
                  About this episode
                </h2>
                <div
                  className="text-base leading-relaxed text-[#002147]/70 [&>p]:mb-6 [&>p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-[#002147] [&_em]:italic [&_a]:text-[#002147] [&_a]:underline [&_a:hover]:text-[#002147]/80 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-6 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: episode.descriptionHtml }}
                />
              </div>
            )}

            <div className="h-px bg-[#002147]/10" />

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              {episode.link && (
                <a
                  href={episode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#002147] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
                >
                  <ExternalLink className="size-4" />
                  View on Buzzsprout
                </a>
              )}
              <a
                href={BUZZSPROUT_RSS_FEED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#002147]/20 bg-white px-6 py-3 text-sm font-medium text-[#002147] transition-colors hover:bg-[#FAFAFA]"
              >
                <Rss className="size-4" />
                Subscribe via RSS
              </a>
            </div>

            <div className="h-px bg-[#002147]/10" />

            {/* Back to Media */}
            <Link
              href="/media"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#002147]/60 transition-colors hover:text-[#002147]"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Media
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
