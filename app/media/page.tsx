import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Media | #OneOxford",
  description: "Listen to Coffee's On Me podcast and stay updated with the #OneOxford newsletter.",
};

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Media
          </h1>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Cards Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Podcast Card */}
            <Link
              href="/listen"
              className="group relative overflow-hidden border border-[#002147]/10 bg-white p-8 transition-all hover:border-[#002147]/30 md:p-10"
            >
              <h2 className="font-serif text-2xl font-normal tracking-tight text-[#002147] md:text-3xl">
                Listen
              </h2>
              <p className="mt-2 text-sm text-[#002147]/50">
                Coffee&apos;s On Me — heartfelt conversations with students across Oxbridge.
              </p>
              <ArrowRight className="mt-6 size-5 text-[#002147]/30 transition-all group-hover:translate-x-2 group-hover:text-[#E2C044]" />
            </Link>

            {/* Newsletter Card */}
            <Link
              href="/newsletter"
              className="group relative overflow-hidden border border-[#002147]/10 bg-white p-8 transition-all hover:border-[#002147]/30 md:p-10"
            >
              <h2 className="font-serif text-2xl font-normal tracking-tight text-[#002147] md:text-3xl">
                Newsletter
              </h2>
              <p className="mt-2 text-sm text-[#002147]/50">
                Stories, updates, and community voices delivered to your inbox.
              </p>
              <ArrowRight className="mt-6 size-5 text-[#002147]/30 transition-all group-hover:translate-x-2 group-hover:text-[#E2C044]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
