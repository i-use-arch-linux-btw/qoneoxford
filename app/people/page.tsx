import { Suspense } from "react";
import Link from "next/link";
import {
  getProfiles,
  PAGE_SIZE,
  COLLEGES,
} from "@/lib/features/people";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/people/profile-card";
import { CollegeFilter } from "@/components/people/college-filter";

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
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Community</h1>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Meet the people behind #OneOxford. Filter by college or add your voice.
        </p>
      </header>

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <div className="flex min-w-0 flex-wrap items-center justify-center gap-3">
          <span className="shrink-0 text-sm font-medium text-muted-foreground">College:</span>
          <Suspense fallback={<div className="h-9 w-[200px] shrink-0 rounded-md border bg-muted" />}>
            <CollegeFilter colleges={COLLEGES} />
          </Suspense>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/people/add">Add your voice</Link>
        </Button>
      </div>

      <Suspense fallback={<PeopleGridSkeleton />}>
        {profiles.length === 0 ? (
          <div className="mx-auto mt-12 max-w-md rounded-lg border border-border bg-muted/30 px-8 py-12 text-center">
            <p className="text-base text-muted-foreground">No profiles yet. Be the first — add your voice.</p>
            <Button asChild className="mt-6">
              <Link href="/people/add">Add yourself</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <Button asChild variant="outline">
                  <Link href={`/people?page=${page + 1}${collegeFilter ? `&college=${encodeURIComponent(collegeFilter)}` : ""}`}>
                    Load more
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </Suspense>
    </div>
  );
}

function PeopleGridSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border bg-muted">
          <div className="aspect-[3/4] w-full bg-muted-foreground/10" />
          <div className="p-3">
            <div className="h-4 w-24 rounded bg-muted-foreground/20" />
            <div className="mt-1 h-3 w-16 rounded bg-muted-foreground/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
