"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export type FeaturedVideo = {
  id: string;
  title: string;
  thumbnail: string | null;
  videoUrl: string | null;
  duration: string;
};

type VideoCarouselProps = {
  videos: FeaturedVideo[];
};

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    setIsPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
  };

  const currentVideo = videos[currentIndex];

  // Auto-advance carousel every 8 seconds when not playing
  useEffect(() => {
    if (isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [isPlaying, videos.length]);

  return (
    <div className="space-y-4">
      {/* Main carousel display */}
      <div className="relative aspect-video w-full overflow-hidden border border-[#002147]/10 bg-[#002147]">
        {isPlaying && currentVideo.videoUrl ? (
          <iframe
            title={currentVideo.title}
            src={`https://www.youtube.com/embed/${currentVideo.videoUrl}?autoplay=1`}
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Thumbnail / Placeholder */}
            {currentVideo.thumbnail ? (
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                className="size-full object-cover"
              />
            ) : (
              <div className="size-full bg-[#002147]" />
            )}

            {/* Play button overlay - only if video exists */}
            {currentVideo.videoUrl && (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
                aria-label="Play video"
              >
                <div className="flex size-12 items-center justify-center border-2 border-white bg-white/10 transition-colors hover:bg-white/20 md:size-16">
                  <Play className="size-5 text-white md:size-6" fill="currentColor" />
                </div>
              </button>
            )}

            {/* Video info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-10 md:p-6 md:pt-16">
              {currentVideo.duration && (
                <p className="mb-1 font-mono text-xs text-[#E2C044] md:mb-2">
                  {currentVideo.duration}
                </p>
              )}
              <h3 className="font-serif text-base leading-tight text-white md:text-2xl">
                {currentVideo.title}
              </h3>
            </div>
          </>
        )}

        {/* Navigation arrows */}
        {videos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 border border-white/30 bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
              aria-label="Previous video"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 border border-white/30 bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
              aria-label="Next video"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {videos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(false);
              }}
              className={`relative shrink-0 overflow-hidden border transition-all ${
                index === currentIndex
                  ? "border-[#E2C044]"
                  : "border-[#002147]/10 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="aspect-video w-24 md:w-32">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="size-full bg-[#002147]" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
