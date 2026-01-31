import Link from "next/link";
import Image from "next/image";
import type { Profile } from "@/lib/supabase/types";
import { PlaceholderImage } from "@/components/placeholder-image";

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link 
      href={`/people/${profile.slug}`} 
      className="group block overflow-hidden border border-[#002147]/10 bg-white transition-all hover:border-[#002147]/30 hover:shadow-lg"
    >
      <div className="relative aspect-3/4 w-full bg-[#FAFAFA]">
        {profile.photo_url ? (
          <Image
            src={profile.photo_url}
            alt={profile.name}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <PlaceholderImage
            variant="portrait"
            theme="blue"
            pattern="circles"
            className="h-full w-full transition-transform group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="p-4">
        <p className="font-semibold text-[#002147]">{profile.name}</p>
        <p className="text-sm text-[#002147]/60">{profile.college}</p>
        {profile.involvements && (
          <p className="mt-1 line-clamp-1 text-xs text-[#002147]/50">
            {profile.involvements}
          </p>
        )}
        {profile.one_thing && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#002147]/70">
            &ldquo;{profile.one_thing}&rdquo;
          </p>
        )}
        {profile.instagram_handle && (
          <a
            href={`https://www.instagram.com/${profile.instagram_handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-block text-xs text-[#002147]/70 underline transition-colors hover:text-[#002147]"
          >
            @{profile.instagram_handle}
          </a>
        )}
      </div>
    </Link>
  );
}
