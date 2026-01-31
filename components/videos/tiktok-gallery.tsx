"use client";

import { useState } from "react";
import { X } from "lucide-react";

function PlaceholderPattern({ style }: { style: number }) {
  const patterns = [
    // Solid dark blue
    "bg-[#002147]",
    // Lighter blue
    "bg-[#003366]",
    // Dark with subtle gradient
    "bg-gradient-to-b from-[#002147] to-[#001a36]",
    // Blue to slightly lighter
    "bg-gradient-to-br from-[#002147] to-[#003d7a]",
    // With gold accent at bottom
    "bg-gradient-to-b from-[#002147] via-[#002147] to-[#1a1a0a]",
    // Diagonal gradient
    "bg-gradient-to-tr from-[#001a36] to-[#002147]",
    // Muted navy
    "bg-[#0a1f3a]",
    // Deep blue
    "bg-[#001833]",
    // Slight purple tint
    "bg-[#0f1f3d]",
    // Warm navy
    "bg-[#0d2240]",
  ];
  
  return <div className={`size-full ${patterns[style % patterns.length]}`} />;
}

export type TikTokVideo = {
  id: string;
  thumbnail: string | null;
  videoUrl: string | null;
  title: string;
  placeholderStyle?: number;
};

type TikTokGalleryProps = {
  videos: TikTokVideo[];
};

export function TikTokGallery({ videos }: TikTokGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<TikTokVideo | null>(null);

  return (
    <>
      {/* Gallery Grid - Full width with small gaps */}
      <div className="grid grid-cols-3 gap-1 md:grid-cols-8 lg:grid-cols-10">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group relative bg-[#002147]"
            style={{ aspectRatio: "9/16" }}
          >
            {/* Thumbnail */}
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt={video.title}
                className="size-full object-cover"
              />
            ) : (
              <PlaceholderPattern style={video.placeholderStyle ?? 0} />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
          </button>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute right-4 top-4 z-10 border border-white/30 bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            aria-label="Close video"
          >
            <X className="size-5" />
          </button>

          {/* Video container */}
          <div
            className="relative flex h-full max-h-[85vh] w-full max-w-sm items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full overflow-hidden border border-white/10 bg-[#002147]"
              style={{ aspectRatio: "9/16" }}
            >
              {selectedVideo.videoUrl ? (
                <iframe
                  src={selectedVideo.videoUrl}
                  className="size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center">
                  <p className="text-white/40">Video coming soon</p>
                </div>
              )}

              {/* Video title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-sm text-white">{selectedVideo.title}</p>
              </div>
            </div>
          </div>

          <p className="absolute bottom-4 text-xs text-white/30">
            Click anywhere to close
          </p>
        </div>
      )}
    </>
  );
}
