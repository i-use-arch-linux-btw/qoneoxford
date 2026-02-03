import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  getProfiles,
  getDistinctSubjects,
  getUserProfile,
  PAGE_SIZE,
  COLLEGES,
} from "@/lib/features/people";
import { ProfileCard } from "@/components/people/profile-card";
import { CollegeFilter } from "@/components/people/college-filter";
import { SubjectFilter } from "@/components/people/subject-filter";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Community | #OneOxford",
  description: "Meet the people behind #OneOxford — the voices shaping our movement.",
};

export const dynamic = "force-dynamic";

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ college?: string; subject?: string; page?: string }>;
}) {
  let collegeFilter = "";
  let subjectFilter = "";
  let page = 1;
  let profiles: Awaited<ReturnType<typeof getProfiles>>["profiles"] = [];
  let totalCount = 0;
  let subjects: string[] = [];

  // Check if user has a profile
  const supabase = await createClient();
  const { data: { user } } = supabase 
    ? await supabase.auth.getUser() 
    : { data: { user: null } };
  const userProfile = user ? await getUserProfile() : null;

  try {
    const params = await searchParams;
    collegeFilter = params.college ?? "";
    subjectFilter = params.subject ?? "";
    page = Math.max(1, parseInt(params.page ?? "1", 10));
    const [result, fetchedSubjects] = await Promise.all([
      getProfiles({
        college: collegeFilter || undefined,
        subject: subjectFilter || undefined,
        page,
      }),
      getDistinctSubjects(),
    ]);
    profiles = result.profiles;
    totalCount = result.totalCount;
    subjects = fetchedSubjects;
  } catch (err) {
    console.error("[people] page data error:", err);
  }

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
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            {userProfile ? (
              <Link
                href="/people/edit"
                className="group inline-flex items-center gap-3 bg-[#E2C044] px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-white"
              >
                Manage your voice
                {!userProfile.approved && (
                  <span className="ml-1 text-xs opacity-70">(pending)</span>
                )}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
              </Link>
            ) : (
              <Link
                href="/people/add"
                className="group inline-flex items-center gap-3 bg-[#E2C044] px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-white"
              >
                Add your voice
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
              </Link>
            )}
            <a
              href="https://chat.whatsapp.com/GA7EoFbX5ri0bc1oM5TNwX"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-white/40 px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
            >
              Join WhatsApp
              <ArrowUpRight className="size-5" />
            </a>
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#002147]/60">College:</span>
                <Suspense fallback={<div className="h-10 w-[200px] rounded-md border border-[#002147]/10 bg-[#FAFAFA]" />}>
                  <CollegeFilter colleges={COLLEGES} />
                </Suspense>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#002147]/60">Subject:</span>
                <Suspense fallback={<div className="h-10 w-[200px] rounded-md border border-[#002147]/10 bg-[#FAFAFA]" />}>
                  <SubjectFilter subjects={subjects} />
                </Suspense>
              </div>
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
                      href={`/people?page=${page + 1}${collegeFilter ? `&college=${encodeURIComponent(collegeFilter)}` : ""}${subjectFilter ? `&subject=${encodeURIComponent(subjectFilter)}` : ""}`}
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
