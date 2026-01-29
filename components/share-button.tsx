"use client";

import { Button } from "@/components/ui/button";
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
    <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
      <Share2 className="size-4" />
      Share
    </Button>
  );
}
