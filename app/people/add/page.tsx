import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { AddProfileForm } from "./form";
import { COLLEGES } from "@/lib/features/people";
import { createClient } from "@/lib/supabase/server";
import { getServiceRoleClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Add Your Voice | #OneOxford",
  description: "Join the #OneOxford community. Share your One thing you'd change about Oxford.",
};

type ExistingProfile = {
  id: string;
  slug: string;
  name: string;
  approved: boolean;
} | null;

export default async function AddYourselfPage() {
  const supabase = await createClient();
  const { data: { user } } = supabase 
    ? await supabase.auth.getUser() 
    : { data: { user: null } };

  // Check if user has already submitted a profile
  let existingProfile: ExistingProfile = null;
  if (user) {
    const serviceClient = getServiceRoleClient();
    if (serviceClient) {
      const { data } = await serviceClient
        .from("profiles")
        .select("id, slug, name, approved")
        .eq("user_id" as never, user.id)
        .maybeSingle();
      existingProfile = data as ExistingProfile;
    }
  }

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
            Add your voice
          </h1>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Form Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-xl px-6 md:px-12">
          {existingProfile ? (
            <div className="border border-[#002147]/10 p-8 text-center md:p-12">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#002147]/5">
                <CheckCircle className="size-8 text-[#002147]" />
              </div>
              <p className="font-serif text-3xl text-[#002147]">You&apos;ve already submitted</p>
              <p className="mt-4 text-[#002147]/60">
                Each account can only submit one profile.
              </p>
              {existingProfile.approved ? (
                <p className="mt-2 text-sm text-green-600">
                  Your profile is live and visible to the community.
                </p>
              ) : (
                <p className="mt-2 text-sm text-[#002147]/50">
                  Your profile is pending review. We&apos;ll notify you once it&apos;s approved.
                </p>
              )}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                {existingProfile.approved && (
                  <Link
                    href={`/people/${existingProfile.slug}`}
                    className="group inline-flex items-center justify-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
                  >
                    View your profile
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
                  </Link>
                )}
                <Link
                  href="/people"
                  className="group inline-flex items-center justify-center gap-3 border border-[#002147]/20 bg-white px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-[#002147]/5"
                >
                  View all voices
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
          ) : (
            <AddProfileForm colleges={COLLEGES} isSignedIn={!!user} />
          )}
          
          <p className="mt-12 text-center text-sm text-[#002147]/60">
            <Link href="/people" className="underline transition-colors hover:text-[#002147] hover:no-underline">
              Back to community
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
