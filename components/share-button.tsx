"use client";

import { Share2 } from "lucide-react";

type Props = { title: string; text: string; path: string };

export function ShareButton({ title, text, path }: Props) {
  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
    const shareData = { title, text, url: shareUrl };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") copyFallback(shareUrl);
      }
    } else {
      copyFallback(shareUrl);
    }
  };

  const copyFallback = (link: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(link);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 border border-[#002147]/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:border-[#002147] hover:bg-[#002147] hover:text-white"
    >
      <Share2 className="size-4" />
      Share
    </button>
  );
}
