import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PODCAST_DRIVE_URL } from "@/content/podcast";

export const metadata = {
  title: "Listen | #OneOxford",
  description: "Coffee's On Me — conversations across Oxbridge. Podcast content and more.",
};

export default function ListenPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground">Listen</h1>
      <p className="mt-2 text-muted-foreground">
        Coffee&apos;s On Me — heartfelt conversations with students across Oxbridge. Researching, asking, listening.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
        <p className="text-foreground">
          Access podcast content and conversations from the #OneOxford campaign.
        </p>
        <Button asChild className="mt-4">
          <a href={PODCAST_DRIVE_URL} target="_blank" rel="noopener noreferrer">
            Open podcast folder
          </a>
        </Button>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/about" className="underline hover:no-underline">
          About David
        </Link>
        {" · "}
        <Link href="/people" className="underline hover:no-underline">
          Community
        </Link>
      </p>
    </div>
  );
}
