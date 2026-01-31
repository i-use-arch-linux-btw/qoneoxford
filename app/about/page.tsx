import { aboutSections } from "@/content/about";

export const metadata = {
  title: "About | #OneOxford",
  description: "David Quan — My story and why I'm running for Oxford SU.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Styled like homepage */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            About David
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
            My story and why I&apos;m running for Oxford SU.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Content Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <div className="space-y-12 text-[#002147]">
            <div>
              <p className="whitespace-pre-line text-lg leading-relaxed md:text-xl">
                {aboutSections.intro}
              </p>
            </div>
            <div className="h-px bg-[#002147]/10" />
            <div>
              <p className="whitespace-pre-line text-lg leading-relaxed md:text-xl">
                {aboutSections.personal}
              </p>
            </div>
            <div className="h-px bg-[#002147]/10" />
            <div>
              <p className="whitespace-pre-line text-lg leading-relaxed md:text-xl">
                {aboutSections.closing}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
