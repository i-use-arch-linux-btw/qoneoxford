"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ChevronDown } from "lucide-react";
import type { PodcastEpisode } from "@/lib/features/podcast";

const EPISODES_PER_PAGE = 5;

interface PodcastEpisodesListProps {
  episodes: PodcastEpisode[];
}

export function PodcastEpisodesList({ episodes }: PodcastEpisodesListProps) {
  const [visibleCount, setVisibleCount] = useState(EPISODES_PER_PAGE);

  const visibleEpisodes = episodes.slice(0, visibleCount);
  const hasMore = visibleCount < episodes.length;
  const remainingCount = episodes.length - visibleCount;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + EPISODES_PER_PAGE, episodes.length));
  };

  return (
    <div className="space-y-4">
      {visibleEpisodes.map((episode) => (
        <Link
          key={episode.slug}
          href={`/listen/${episode.slug}`}
          className="group block border border-[#002147]/10 bg-white p-6 transition-all hover:border-[#002147]/30 hover:bg-[#FAFAFA]"
        >
          <h4 className="line-clamp-2 text-lg font-semibold tracking-tight text-[#002147] transition-colors group-hover:text-[#002147]/80 md:text-xl">
            {episode.title}
          </h4>

          {/* Meta info */}
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#002147]/50">
            {episode.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {new Date(episode.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
            {episode.duration && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {episode.duration}
              </span>
            )}
          </div>

          {/* Description */}
          {episode.description && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#002147]/60">
              {episode.description}
            </p>
          )}
        </Link>
      ))}

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={loadMore}
          className="group flex w-full items-center justify-center gap-2 border border-[#002147]/10 bg-[#FAFAFA] px-6 py-4 text-sm font-medium text-[#002147]/70 transition-all hover:border-[#002147]/30 hover:bg-[#002147] hover:text-white"
        >
          <span>
            Load more ({remainingCount} remaining)
          </span>
          <ChevronDown className="size-4 transition-transform group-hover:translate-y-0.5" />
        </button>
      )}
    </div>
  );
}
