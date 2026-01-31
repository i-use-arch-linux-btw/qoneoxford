import { getTimestamps, getVideoIds } from "@/lib/features/videos";

export const metadata = {
  title: "Videos | #OneOxford",
  description: "My story and the #OneOxford community video.",
};

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#002147]/10 bg-[#002147]/5">
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
    <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#002147]/20 bg-[#002147]/5 p-6 text-center">
      <p className="text-base font-medium text-[#002147]/60">{label}</p>
      <p className="mt-2 text-sm text-[#002147]/40">Video coming soon</p>
    </div>
  );
}

export default function VideosPage() {
  const timestamps = getTimestamps();
  const { storyId, communityId } = getVideoIds();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Videos
          </h1>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* My Story Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
              My story
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#002147]/60 md:text-xl">
              Personal, direct to camera — why I&apos;m running.
            </p>
          </div>
          {storyId ? (
            <YouTubeEmbed videoId={storyId} />
          ) : (
            <VideoPlaceholder label="My story video" />
          )}
        </div>
      </section>

      {/* Community Video Section */}
      <section className="bg-[#FAFAFA] py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
              Community video
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#002147]/60 md:text-xl">
              50+ voices, each sharing their One thing.
            </p>
          </div>
          {communityId ? (
            <YouTubeEmbed videoId={communityId} />
          ) : (
            <VideoPlaceholder label="Community video" />
          )}
        </div>
      </section>

      {/* Timestamps Section */}
      {timestamps.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto max-w-4xl px-6 md:px-12">
            <div className="mb-10">
              <h2 className="font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
                Your moment
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#002147]/60 md:text-xl">
                Find your clip to share.
              </p>
            </div>
            <div className="space-y-4">
              {timestamps.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-[#002147]/10 pb-4 last:border-b-0"
                >
                  <div>
                    <p className="text-lg font-medium text-[#002147]">{t.name}</p>
                    <p className="text-sm text-[#002147]/50">{t.college}</p>
                  </div>
                  <span className="rounded-full bg-[#E2C044]/20 px-4 py-2 font-mono text-sm font-semibold text-[#002147]">
                    {t.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
