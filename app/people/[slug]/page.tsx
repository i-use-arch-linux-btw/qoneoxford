import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/share-button";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createClient();
  if (!supabase) return { title: "Profile | #OneOxford" };
  const { data } = await supabase.from("profiles").select("name, one_thing, photo_url").eq("slug", slug).single();
  const row = data as { name: string; one_thing: string; photo_url: string } | null;
  if (!row) return { title: "Profile | #OneOxford" };
  const title = `${row.name} · #OneOxford`;
  const description = row.one_thing ? `${row.name} — ${row.one_thing.slice(0, 120)}…` : `${row.name} · One Oxford`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: row.photo_url ? [{ url: row.photo_url, width: 600, height: 800 }] : [],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  const supabase = createClient();
  if (!supabase) {
    notFound();
  }
  const { data, error } = await supabase.from("profiles").select("*").eq("slug", slug).single();
  if (error || !data) {
    notFound();
  }
  const profile = data as Profile;

  return (
    <div className="container px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-64">
            <Image
              src={profile.photo_url}
              alt={profile.name}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.college}</p>
            <p className="mt-1 text-sm text-muted-foreground">{profile.subject}</p>
            {profile.one_thing && (
              <blockquote className="mt-4 border-l-4 border-primary pl-4 text-foreground">
                &ldquo;{profile.one_thing}&rdquo;
              </blockquote>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <ShareButton
                title={`${profile.name} · #OneOxford`}
                text={profile.one_thing ?? `${profile.name} supports #OneOxford`}
                path={`/people/${profile.slug}`}
              />
              <Button asChild variant="outline" size="sm">
                <Link href="/people">Back to community</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
