import Link from "next/link";
import { ArrowRight, Headphones, ExternalLink } from "lucide-react";
import { PODCAST_DRIVE_URL } from "@/content/podcast";

export const metadata = {
  title: "Listen | #OneOxford",
  description: "Coffee's On Me — conversations across Oxbridge. Podcast content and more.",
};

export default function ListenPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Listen
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
            Coffee&apos;s On Me — heartfelt conversations with students across Oxbridge. Researching, asking, listening.
          </p>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Content Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <div className="space-y-12 text-[#002147]">
            {/* Intro */}
            <div>
              <p className="text-lg leading-relaxed md:text-xl">
                The #OneOxford campaign started with a simple question: &ldquo;What&apos;s your one thing you&apos;d change about Oxford?&rdquo; These conversations became Coffee&apos;s On Me — a podcast where we explore the stories, struggles, and hopes of students across Oxbridge.
              </p>
            </div>

            <div className="h-px bg-[#002147]/10" />

            {/* Podcast CTA Card */}
            <div className="rounded-none border border-[#002147]/10 bg-[#FAFAFA] p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center bg-[#E2C044]">
                  <Headphones className="size-6 text-[#002147]" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-normal tracking-tight text-[#002147] md:text-3xl">
                    Coffee&apos;s On Me
                  </h2>
                  <p className="mt-2 text-[#002147]/60">
                    Access all podcast episodes and conversations from the #OneOxford campaign.
                  </p>
                </div>
              </div>
              <a
                href={PODCAST_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
              >
                Open podcast folder
                <ExternalLink className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="h-px bg-[#002147]/10" />

            {/* More to explore */}
            <div>
              <h3 className="mb-6 text-xl font-semibold text-[#002147] md:text-2xl">
                More to explore
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "About David", href: "/about", description: "My story and why I'm running" },
                  { label: "Community", href: "/people", description: "Meet the people behind the movement" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group relative overflow-hidden border border-[#002147]/10 p-6 transition-all hover:border-[#002147]/30 hover:bg-[#002147]"
                  >
                    <h4 className="font-serif text-xl font-normal tracking-tight text-[#002147] transition-colors group-hover:text-white">
                      {item.label}
                    </h4>
                    <p className="mt-1 text-sm text-[#002147]/50 transition-colors group-hover:text-white/60">
                      {item.description}
                    </p>
                    <ArrowRight className="mt-4 size-4 text-[#002147]/30 transition-all group-hover:translate-x-2 group-hover:text-[#E2C044]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
