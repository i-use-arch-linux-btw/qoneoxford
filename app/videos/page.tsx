import timestampsData from "@/data/video-timestamps.json";

export const metadata = {
  title: "Videos | #OneOxford",
  description: "My story and the #OneOxford community video.",
};

const timestamps = timestampsData as { name: string; college: string; timestamp: string }[];

export default function VideosPage() {
  return (
    <div className="container max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground">Videos</h1>
      <p className="mt-2 text-muted-foreground">
        My story and the community video — find your moment.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-foreground">My story</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Personal, direct to camera — why I&apos;m running. (Video embed: add your YouTube URL when ready.)
        </p>
        <div className="mt-4 aspect-video w-full max-w-xl rounded-lg border border-border bg-muted">
          <p className="flex h-full items-center justify-center text-muted-foreground">
            Add YouTube embed URL
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Community video</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          50+ voices, each sharing their one thing. (Video embed: add your YouTube URL when ready.)
        </p>
        <div className="mt-4 aspect-video w-full max-w-xl rounded-lg border border-border bg-muted">
          <p className="flex h-full items-center justify-center text-muted-foreground">
            Add YouTube embed URL
          </p>
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
