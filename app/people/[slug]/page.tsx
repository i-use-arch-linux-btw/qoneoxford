import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getProfileBySlug } from "@/lib/features/people";
import { ShareButton } from "@/components/share-button";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  if (!profile) return { title: "Profile | #OneOxford" };
  const title = `${profile.name} · #OneOxford`;
  const description = profile.one_thing
    ? `${profile.name} — ${profile.one_thing.slice(0, 120)}…`
    : `${profile.name} · One Oxford`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: profile.photo_url ? [{ url: profile.photo_url, width: 600, height: 800 }] : [],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  if (!profile) notFound();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <Link
            href="/people"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to community
          </Link>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-6 text-lg text-white/60 md:text-xl">
            {profile.college} · {profile.subject}
          </p>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Content Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-6 md:px-12">
          <div className="flex flex-col gap-12 md:flex-row md:gap-16">
            {/* Photo */}
            <div className="relative aspect-3/4 w-full shrink-0 overflow-hidden border border-[#002147]/10 bg-[#FAFAFA] md:w-80">
              <Image
                src={profile.photo_url}
                alt={profile.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            
            {/* Details */}
            <div className="flex-1 space-y-8">
              {profile.one_thing && (
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#002147]/50">
                    One thing I&apos;d change
                  </p>
                  <blockquote className="border-l-4 border-[#E2C044] pl-6">
                    <p className="font-serif text-2xl leading-snug text-[#002147] md:text-3xl">
                      &ldquo;{profile.one_thing}&rdquo;
                    </p>
                  </blockquote>
                </div>
              )}
              
              {profile.involvements && (
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#002147]/50">
                    Involvements & Community
                  </p>
                  <p className="text-lg leading-relaxed text-[#002147]">
                    {profile.involvements}
                  </p>
                </div>
              )}
              
              {profile.other_info && (
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#002147]/50">
                    More
                  </p>
                  <p className="text-lg leading-relaxed text-[#002147]">
                    {profile.other_info}
                  </p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 pt-4">
                <ShareButton
                  title={`${profile.name} · #OneOxford`}
                  text={profile.one_thing ?? `${profile.name} supports #OneOxford`}
                  path={`/people/${profile.slug}`}
                />
                <Link
                  href="/people"
                  className="inline-flex items-center gap-2 border border-[#002147]/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:border-[#002147] hover:bg-[#002147] hover:text-white"
                >
                  <ArrowLeft className="size-4" />
                  All voices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
