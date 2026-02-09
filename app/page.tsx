import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CyclingHeadline } from "@/components/cycling-headline";
import { ScrollPillars } from "@/components/scroll-pillars";
import {
  PlaceholderImage,
  AbstractPlaceholder,
  AnimatedPhotoCard,
} from "@/components/placeholder-image";
import { getFeaturedProfiles } from "@/lib/features/people";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProfiles = await getFeaturedProfiles(10);
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Bold & Oversized */}
      <section className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#002147]">
        {/* Mobile photo collage background - visible on mobile only */}
        <div className="absolute inset-0 lg:hidden">
          {/* Photo grid background */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 opacity-40">
            <div className="relative overflow-hidden">
              <Image
                src="/DSC02713.JPG"
                alt="David Quan"
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="/IMG_2944.JPG"
                alt="OneOxford community"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="/IMG_5398.JPG"
                alt="OneOxford community"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="/IMG_5739.JPG"
                alt="OneOxford community"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-[#002147]/90 to-[#002147]/70" />
        </div>

        {/* Abstract background decoration with animations - desktop only */}
        <div className="hidden lg:block">
          <AbstractPlaceholder variant={3} animated />
        </div>

        {/* Floating photo collage - right side - desktop only */}
        <div className="absolute right-0 top-0 hidden h-full w-[45%] lg:block">
          <div className="relative h-full w-full">
            {/* Main large photo - floating animation */}
            <div className="absolute right-8 top-[10%] h-[55%] w-[75%] animate-fade-in animate-float-up opacity-0 shadow-2xl animation-delay-400">
              <Image
                src="/DSC02713.JPG"
                alt="David Quan"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 35vw, 0vw"
                priority
              />
            </div>
            {/* Smaller overlapping photo - floating animation */}
            <div className="absolute bottom-[15%] right-[50%] h-[38%] w-[55%] animate-fade-in opacity-0 shadow-xl animation-delay-500">
              <Image
                src="/IMG_2944.JPG"
                alt="OneOxford community"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 0vw"
              />
            </div>
            {/* Accent photo - floating animation */}
            <div className="absolute bottom-[30%] right-4 h-[28%] w-[40%] animate-fade-in opacity-0 shadow-lg animation-delay-300">
              <Image
                src="/IMG_5398.JPG"
                alt="OneOxford community"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, 0vw"
              />
            </div>
          </div>
        </div>

        <div className="container relative mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 md:px-12">
          {/* Campaign tagline - positioned above headline, static width */}
          <div className="animate-fade-up mb-4 opacity-0 md:mb-6">
            <span className="font-handwritten whitespace-nowrap text-3xl text-[#E2C044] md:text-4xl lg:text-5xl">
              David Quan 权丁文 for President
            </span>
          </div>

          {/* Massive headline */}
          <div className="max-w-5xl lg:max-w-3xl">
            <CyclingHeadline />
          </div>

          {/* Bold CTAs */}
          <div className="animate-fade-up animation-delay-300 mt-16 flex flex-col gap-4 opacity-0 sm:flex-row sm:gap-6 md:mt-20">
            <a
              href="https://www.oxfordsu.org/studentvoice/elections/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#E2C044] px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-white"
            >
              Vote now
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </a>
            <Link
              href="/people"
              className="group inline-flex items-center gap-3 border border-white/40 px-8 py-5 text-base font-semibold uppercase tracking-wide text-white/80 transition-colors hover:border-white hover:text-white"
            >
              Meet the community
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
        </div>
      </section>

      {/* Statement Section */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto max-w-5xl px-6 md:px-12">
          <p className="font-serif text-3xl font-normal leading-snug tracking-tight text-[#002147] md:text-5xl lg:text-6xl">
            &ldquo;What&apos;s your <span className="text-[#E2C044]">One thing</span> you&apos;d change about Oxford?&rdquo;
          </p>
          <p className="mt-6 text-right text-base font-medium text-[#002147]/50 md:text-lg">
            — The question that started it all
          </p>
        </div>
      </section>

      {/* Community Photo Grid */}
      <section className="bg-[#FAFAFA] py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#E2C044]">
                The Movement
              </span>
              <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#002147] md:text-4xl">
                #OneOxford Voices
              </h2>
            </div>
            <Link
              href="/people"
              className="group hidden items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#002147]/60 transition-colors hover:text-[#002147] sm:flex"
            >
              View all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Asymmetric photo grid with staggered animations */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
            {featuredProfiles.length > 0 ? (
              <>
                {/* Large featured photo - David Quan linking to manifesto */}
                <Link
                  href="/manifesto"
                  className="group col-span-2 row-span-2 relative overflow-hidden aspect-square"
                >
                  <Image
                    src="/DSC02713.JPG"
                    alt="David Quan"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-sm font-semibold text-white">David Quan</p>
                    <p className="text-xs text-white/70">Read the manifesto</p>
                  </div>
                </Link>
                
                {/* Smaller photos with staggered animations */}
                {featuredProfiles.slice(0, 8).map((profile, index) => (
                  <Link
                    key={profile.id}
                    href={`/people/${profile.slug}`}
                    className={`group relative col-span-1 overflow-hidden aspect-square ${index >= 4 ? 'hidden lg:block' : ''}`}
                  >
                    <Image
                      src={profile.photo_url!}
                      alt={profile.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(min-width: 1024px) 16vw, 25vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-xs font-semibold text-white truncate">{profile.name}</p>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <>
                {/* Fallback placeholders when no profiles are available */}
                <div className="col-span-2 row-span-2">
                  <AnimatedPhotoCard
                    theme="blue"
                    pattern="circles"
                    floatDirection="up"
                    delay={0}
                    className="h-full min-h-[300px] w-full"
                  />
                </div>
                {[
                  { theme: "gold" as const, pattern: "dots" as const, delay: 0.5 },
                  { theme: "gradient" as const, pattern: "lines" as const, delay: 1 },
                  { theme: "light" as const, pattern: "grid" as const, delay: 1.5, hidden: true },
                  { theme: "blue" as const, pattern: "waves" as const, delay: 2, hidden: true },
                  { theme: "light" as const, pattern: "circles" as const, delay: 0.75 },
                  { theme: "blue" as const, pattern: "dots" as const, delay: 1.25 },
                  { theme: "gold" as const, pattern: "lines" as const, delay: 1.75, hidden: true },
                  { theme: "gradient" as const, pattern: "dots" as const, delay: 2.25, hidden: true },
                ].map((item, i) => (
                  <div key={i} className={`col-span-1 ${item.hidden ? 'hidden lg:block' : ''}`}>
                    <AnimatedPhotoCard
                      theme={item.theme}
                      pattern={item.pattern}
                      floatDirection={i % 2 === 0 ? "up" : "down"}
                      delay={item.delay}
                      className="h-full min-h-[140px] w-full"
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Mobile view all link */}
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/people"
              className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#002147]/60"
            >
              View all people
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Pillars - Scroll Experience */}
      <ScrollPillars />

      {/* Big CTA Section */}
      <section className="bg-[#E2C044] py-24 md:py-32">
        <div className="container mx-auto max-w-5xl px-6 md:px-12">
          <h2 className="font-serif text-4xl font-normal leading-[1.1] tracking-tight text-[#002147] md:text-6xl lg:text-7xl">
            Ready to vote<br />for change?
          </h2>
          
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://www.oxfordsu.org/studentvoice/elections/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
            >
              Vote now
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </a>
            <Link
              href="/manifesto"
              className="group inline-flex items-center gap-3 border border-[#002147]/40 px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:border-[#002147] hover:bg-[#002147] hover:text-white"
            >
              Read manifesto
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links with Images */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto max-w-5xl px-6 md:px-12">
          <h2 className="font-serif text-4xl font-normal leading-[1.1] tracking-tight text-[#002147] md:text-5xl">
            Discover more
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Community",
                href: "/people",
                description: "Meet the people behind the movement",
                pattern: "circles" as const,
              },
              {
                label: "Manifesto",
                href: "/manifesto",
                description: "Read our vision for Oxford",
                pattern: "lines" as const,
              },
              {
                label: "Vote",
                href: "/vote",
                description: "Make your voice count",
                pattern: "dots" as const,
              },
              {
                label: "Listen",
                href: "/listen",
                description: "Hear stories from the community",
                pattern: "waves" as const,
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative overflow-hidden border border-[#002147]/10 transition-all hover:border-[#002147]/30"
              >
                {/* Background placeholder image - revealed on hover */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <PlaceholderImage
                    variant="landscape"
                    theme="blue"
                    pattern={item.pattern}
                    className="h-full w-full"
                  />
                  <div className="absolute inset-0 bg-[#002147]/80" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10">
                  <h3 className="font-serif text-2xl font-normal tracking-tight text-[#002147] transition-colors group-hover:text-white md:text-3xl">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-[#002147]/50 transition-colors group-hover:text-white/60">
                    {item.description}
                  </p>
                  <ArrowRight className="mt-6 size-5 text-[#002147]/30 transition-all group-hover:translate-x-2 group-hover:text-[#E2C044]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
