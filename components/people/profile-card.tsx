import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Profile } from "@/lib/supabase/types";

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link href={`/people/${profile.slug}`} className="block transition-opacity hover:opacity-90">
      <Card className="overflow-hidden">
        <div className="relative aspect-[3/4] w-full bg-muted">
          <Image
            src={profile.photo_url}
            alt={profile.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        </div>
        <CardContent className="p-3">
          <p className="font-semibold text-foreground">{profile.name}</p>
          <p className="text-sm text-muted-foreground">{profile.college}</p>
          {profile.one_thing && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {profile.one_thing}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
