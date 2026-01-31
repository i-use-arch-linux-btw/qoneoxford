import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CyclingHeadline } from "@/components/cycling-headline";
import { ScrollPillars } from "@/components/scroll-pillars";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Bold & Oversized */}
      <section className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#002147]">
        <div className="container relative mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 md:px-12">
          {/* Massive headline */}
          <div className="max-w-5xl">
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

      {/* Quick Links */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto max-w-5xl px-6 md:px-12">
          <h2 className="font-serif text-4xl font-normal leading-[1.1] tracking-tight text-[#002147] md:text-5xl">
            Discover more
          </h2>
          
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Community", href: "/people", description: "Meet the people behind the movement" },
              { label: "Manifesto", href: "/manifesto", description: "Read our vision for Oxford" },
              { label: "Vote", href: "/vote", description: "Make your voice count" },
              { label: "Listen", href: "/listen", description: "Hear stories from the community" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative overflow-hidden border border-[#002147]/10 p-8 transition-all hover:border-[#002147]/30 hover:bg-[#002147] md:p-10"
              >
                <h3 className="font-serif text-2xl font-normal tracking-tight text-[#002147] transition-colors group-hover:text-white md:text-3xl">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-[#002147]/50 transition-colors group-hover:text-white/60">
                  {item.description}
                </p>
                <ArrowRight className="mt-6 size-5 text-[#002147]/30 transition-all group-hover:translate-x-2 group-hover:text-[#E2C044]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
