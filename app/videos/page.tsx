import { getTimestamps, getVideoIds } from "@/lib/features/videos";

export const metadata = {
  title: "Videos | #OneOxford",
  description: "My story and the #OneOxford community video.",
};

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video w-full max-w-xl overflow-hidden rounded-lg border border-border bg-muted">
      <iframe
        title="YouTube video"
        src={`https://www.youtube.com/embed/${videoId}`}
        className="size-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video w-full max-w-xl flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 p-6 text-center">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">Video coming soon</p>
    </div>
  );
}

export default function VideosPage() {
  const timestamps = getTimestamps();
  const { storyId, communityId } = getVideoIds();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground">Videos</h1>
      <p className="mt-2 text-muted-foreground">
        My story and the community video — find your moment.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-foreground">My story</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Personal, direct to camera — why I&apos;m running.
        </p>
        <div className="mt-4">
          {storyId ? (
            <YouTubeEmbed videoId={storyId} />
          ) : (
            <VideoPlaceholder label="My story video" />
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Community video</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          50+ voices, each sharing their one thing.
        </p>
        <div className="mt-4">
          {communityId ? (
            <YouTubeEmbed videoId={communityId} />
          ) : (
            <VideoPlaceholder label="Community video" />
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground">Your moment — timestamps</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Find your clip to share.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {timestamps.map((t, i) => (
              <li key={i}>
                {t.name}, {t.college} — {t.timestamp}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
