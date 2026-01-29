import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { ProfileCard, PAGE_SIZE } from "@/components/profile-card";
import collegesData from "@/data/colleges.json";

const colleges = collegesData as string[];

export const dynamic = "force-dynamic";

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ college?: string; page?: string }>;
}) {
  const params = await searchParams;
  const collegeFilter = params.college ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createClient();
  let profiles: Profile[] = [];
  let count = 0;

  if (supabase) {
    let q = supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });
    if (collegeFilter) q = q.eq("college", collegeFilter);
    const res = await q.range(from, to);
    profiles = res.data ?? [];
    count = res.count ?? 0;
  }

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);
  const hasMore = page < totalPages;

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground">Community</h1>
      <p className="mt-2 text-muted-foreground">
        Meet the people behind #OneOxford. Filter by college or add your voice.
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">College:</span>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/people"
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                !collegeFilter
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </Link>
            {colleges.slice(0, 12).map((c) => (
              <Link
                key={c}
                href={collegeFilter === c ? "/people" : `/people?college=${encodeURIComponent(c)}`}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  collegeFilter === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {c.replace(" College", "")}
              </Link>
            ))}
          </div>
        </div>
        <Button asChild>
          <Link href="/people/add">Add your voice</Link>
        </Button>
      </div>

      <Suspense fallback={<PeopleGridSkeleton />}>
        {profiles.length === 0 ? (
          <div className="mt-12 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
            <p>No profiles yet. Be the first — add your voice.</p>
            <Button asChild className="mt-4">
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
