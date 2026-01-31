import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CyclingHeadline } from "@/components/cycling-headline";
import { ScrollPillars } from "@/components/scroll-pillars";
import {
  PlaceholderImage,
  AbstractPlaceholder,
  AnimatedPhotoCard,
} from "@/components/placeholder-image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Bold & Oversized */}
      <section className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#002147]">
        {/* Abstract background decoration with animations */}
        <AbstractPlaceholder variant={3} animated />

        {/* Floating photo collage - right side */}
        <div className="absolute right-0 top-0 hidden h-full w-1/3 lg:block">
          <div className="relative h-full w-full">
            {/* Main large photo - floating animation */}
            <div className="absolute right-12 top-[15%] h-[45%] w-[70%] animate-fade-in opacity-0 shadow-2xl animation-delay-400">
              <AnimatedPhotoCard
                theme="gradient"
                pattern="circles"
                floatDirection="up"
                delay={0}
                className="h-full w-full"
              />
            </div>
            {/* Smaller overlapping photo - floating animation */}
            <div className="absolute bottom-[20%] right-[45%] h-[30%] w-[50%] animate-fade-in opacity-0 shadow-xl animation-delay-500">
              <AnimatedPhotoCard
                theme="gold"
                pattern="dots"
                floatDirection="down"
                delay={1}
                className="h-full w-full"
              />
            </div>
            {/* Accent photo - floating animation */}
            <div className="absolute bottom-[35%] right-8 h-[20%] w-[35%] animate-fade-in opacity-0 shadow-lg animation-delay-300">
              <AnimatedPhotoCard
                theme="blue"
                pattern="lines"
                floatDirection="right"
                delay={0.5}
                className="h-full w-full"
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
            <Link
              href="/people/add"
              className="group inline-flex items-center gap-3 bg-[#E2C044] px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-white"
            >
              Add your voice
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </Link>
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
            &ldquo;What&apos;s your <span className="text-[#E2C044]">one thing</span> you&apos;d change about Oxford?&rdquo;
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
                Faces of OneOxford
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
            {/* Large featured photo */}
            <div className="col-span-2 row-span-2">
              <AnimatedPhotoCard
                theme="blue"
                pattern="circles"
                floatDirection="up"
                delay={0}
                className="h-full min-h-[300px] w-full"
              />
            </div>
            
            {/* Smaller photos with staggered float animations */}
            <div className="col-span-1">
              <AnimatedPhotoCard
                theme="gold"
                pattern="dots"
                floatDirection="down"
                delay={0.5}
                className="h-full min-h-[140px] w-full"
              />
            </div>
            <div className="col-span-1">
              <AnimatedPhotoCard
                theme="gradient"
                pattern="lines"
                floatDirection="up"
                delay={1}
                className="h-full min-h-[140px] w-full"
              />
            </div>
            <div className="col-span-1 hidden lg:block">
              <AnimatedPhotoCard
                theme="light"
                pattern="grid"
                floatDirection="down"
                delay={1.5}
                className="h-full min-h-[140px] w-full"
              />
            </div>
            <div className="col-span-1 hidden lg:block">
              <AnimatedPhotoCard
                theme="blue"
                pattern="waves"
                floatDirection="up"
                delay={2}
                className="h-full min-h-[140px] w-full"
              />
            </div>
            
            {/* Bottom row with opposite float directions */}
            <div className="col-span-1">
              <AnimatedPhotoCard
                theme="light"
                pattern="circles"
                floatDirection="up"
                delay={0.75}
                className="h-full min-h-[140px] w-full"
              />
            </div>
            <div className="col-span-1">
              <AnimatedPhotoCard
                theme="blue"
                pattern="dots"
                floatDirection="down"
                delay={1.25}
                className="h-full min-h-[140px] w-full"
              />
            </div>
            <div className="col-span-1 hidden lg:block">
              <AnimatedPhotoCard
                theme="gold"
                pattern="lines"
                floatDirection="up"
                delay={1.75}
                className="h-full min-h-[140px] w-full"
              />
            </div>
            <div className="col-span-1 hidden lg:block">
              <AnimatedPhotoCard
                theme="gradient"
                pattern="dots"
                floatDirection="down"
                delay={2.25}
                className="h-full min-h-[140px] w-full"
              />
            </div>
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
            <Link
              href="/vote"
              className="group inline-flex items-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
            >
              Vote now
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </Link>
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

      {/* Testimonial / Featured Story Section */}
      <section className="relative overflow-hidden bg-[#002147] py-24 md:py-32">
        <AbstractPlaceholder variant={1} animated />

        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image side */}
            <div className="relative">
              <div className="relative aspect-4/5 w-full max-w-md lg:max-w-none">
                <PlaceholderImage
                  variant="portrait"
                  theme="gradient"
                  pattern="circles"
                  label="Featured member"
                  animated
                  className="h-full w-full shadow-2xl"
                />
              </div>
              {/* Decorative accent - now with subtle animation via CSS */}
              <div className="absolute -bottom-4 -right-4 h-full w-full animate-pulse border border-[#E2C044]/20 lg:-bottom-6 lg:-right-6" style={{ animationDuration: '4s' }} />
            </div>

            {/* Text side */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#E2C044]">
                Featured Story
              </span>
              <blockquote className="mt-6 font-serif text-2xl font-normal leading-relaxed text-white md:text-3xl lg:text-4xl">
                &ldquo;OneOxford gave me the courage to speak up about what
                really matters. For the first time, I feel like my voice
                counts.&rdquo;
              </blockquote>
              <div className="mt-8">
                <p className="font-medium text-white">Student Name</p>
                <p className="text-sm text-white/50">
                  College Name, Year
                </p>
              </div>
              <Link
                href="/people"
                className="group mt-10 inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-[#002147]"
              >
                Read more stories
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
