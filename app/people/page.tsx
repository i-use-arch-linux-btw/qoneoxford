import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getProfiles,
  PAGE_SIZE,
  COLLEGES,
} from "@/lib/features/people";
import { ProfileCard } from "@/components/people/profile-card";
import { CollegeFilter } from "@/components/people/college-filter";

export const metadata = {
  title: "Community | #OneOxford",
  description: "Meet the people behind #OneOxford — the voices shaping our movement.",
};

export const dynamic = "force-dynamic";

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ college?: string; page?: string }>;
}) {
  const params = await searchParams;
  const collegeFilter = params.college ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const { profiles, totalCount } = await getProfiles({
    college: collegeFilter || undefined,
    page,
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const hasMore = page < totalPages;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Styled like other pages */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Community
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
            Meet the people behind #OneOxford — the voices shaping our movement.
          </p>
          
          {/* CTA Button */}
          <div className="mt-10">
            <Link
              href="/people/add"
              className="group inline-flex items-center gap-3 bg-[#E2C044] px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-white"
            >
              Add your voice
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Content Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-6 md:px-12">
          {/* Filter Controls */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg text-[#002147]/60">
              {totalCount} {totalCount === 1 ? "voice" : "voices"} in the community
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#002147]/60">Filter by college:</span>
              <Suspense fallback={<div className="h-10 w-[200px] rounded-md border border-[#002147]/10 bg-[#FAFAFA]" />}>
                <CollegeFilter colleges={COLLEGES} />
              </Suspense>
            </div>
          </div>

          <Suspense fallback={<PeopleGridSkeleton />}>
            {profiles.length === 0 ? (
              <div className="mx-auto max-w-md border border-[#002147]/10 px-8 py-16 text-center">
                <p className="font-serif text-2xl text-[#002147]">No profiles yet</p>
                <p className="mt-2 text-[#002147]/60">Be the first — add your voice to the movement.</p>
                <Link
                  href="/people/add"
                  className="group mt-8 inline-flex items-center gap-3 bg-[#002147] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
                >
                  Add yourself
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {profiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-12 flex justify-center">
                    <Link
                      href={`/people?page=${page + 1}${collegeFilter ? `&college=${encodeURIComponent(collegeFilter)}` : ""}`}
                      className="group inline-flex items-center gap-3 border border-[#002147]/20 px-8 py-4 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:border-[#002147] hover:bg-[#002147] hover:text-white"
                    >
                      Load more
                      <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </div>
                )}
              </>
            )}
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function PeopleGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="overflow-hidden border border-[#002147]/10 bg-[#FAFAFA]">
          <div className="aspect-3/4 w-full bg-[#002147]/5" />
          <div className="p-3">
            <div className="h-4 w-24 rounded bg-[#002147]/10" />
            <div className="mt-1 h-3 w-16 rounded bg-[#002147]/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
