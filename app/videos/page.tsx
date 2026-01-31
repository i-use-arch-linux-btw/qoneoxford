import {
  VideoCarousel,
  TikTokGallery,
  type FeaturedVideo,
  type TikTokVideo,
} from "@/components/videos";

export const metadata = {
  title: "Videos | #OneOxford",
  description: "Watch team videos and community content from the #OneOxford campaign.",
};

// Placeholder data for featured team videos (carousel)
const featuredVideos: FeaturedVideo[] = [
  {
    id: "1",
    title: "My Story: Why I'm Running",
    thumbnail: null,
    videoUrl: null,
    duration: "3:45",
  },
  {
    id: "2",
    title: "Community Voices: 50+ Stories",
    thumbnail: null,
    videoUrl: null,
    duration: "8:22",
  },
  {
    id: "3",
    title: "The Manifesto Explained",
    thumbnail: null,
    videoUrl: null,
    duration: "5:17",
  },
  {
    id: "4",
    title: "Behind the Campaign",
    thumbnail: null,
    videoUrl: null,
    duration: "4:33",
  },
];

// Placeholder data for TikTok-style short videos
const tiktokVideos: TikTokVideo[] = [
  {
    id: "t1",
    thumbnail: null,
    videoUrl: null,
    title: "POV: You're studying at the Rad Cam at 2am",
    placeholderStyle: 0,
  },
  {
    id: "t2",
    thumbnail: null,
    videoUrl: null,
    title: "When your tutor says 'interesting point'",
    placeholderStyle: 3,
  },
  {
    id: "t3",
    thumbnail: null,
    videoUrl: null,
    title: "Oxford college tier list (controversial)",
    placeholderStyle: 6,
  },
  {
    id: "t4",
    thumbnail: null,
    videoUrl: null,
    title: "Things freshers need to know pt.1",
    placeholderStyle: 1,
  },
  {
    id: "t5",
    thumbnail: null,
    videoUrl: null,
    title: "A day in the life at Brasenose",
    placeholderStyle: 4,
  },
  {
    id: "t6",
    thumbnail: null,
    videoUrl: null,
    title: "Rowing practice at 5am (we're fine)",
    placeholderStyle: 7,
  },
  {
    id: "t7",
    thumbnail: null,
    videoUrl: null,
    title: "The queue at Pret when everyone has lectures",
    placeholderStyle: 2,
  },
  {
    id: "t8",
    thumbnail: null,
    videoUrl: null,
    title: "What your Oxford college says about you",
    placeholderStyle: 5,
  },
  {
    id: "t9",
    thumbnail: null,
    videoUrl: null,
    title: "Formal hall outfits check",
    placeholderStyle: 8,
  },
  {
    id: "t10",
    thumbnail: null,
    videoUrl: null,
    title: "When someone asks what you're doing after graduation",
    placeholderStyle: 9,
  },
];

export default function VideosPage() {
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

      {/* Featured Videos Carousel Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h2 className="mb-8 font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
            Team Videos
          </h2>
          <VideoCarousel videos={featuredVideos} />
        </div>
      </section>

      {/* TikTok Gallery Section - True full width */}
      <section className="bg-white pb-16 md:pb-24">
        <div className="mx-auto mb-8 max-w-4xl px-6 md:px-12">
          <h2 className="font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
            Clips
          </h2>
        </div>
        <div className="w-full">
          <TikTokGallery videos={tiktokVideos} />
        </div>
      </section>
    </div>
  );
}
