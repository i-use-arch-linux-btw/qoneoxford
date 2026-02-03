import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { EditProfileForm } from "./form";
import { COLLEGES, getUserProfile } from "@/lib/features/people";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Edit Your Voice | #OneOxford",
  description: "Update your #OneOxford profile.",
};

export default async function EditProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = supabase 
    ? await supabase.auth.getUser() 
    : { data: { user: null } };

  // Redirect to login if not signed in
  if (!user) {
    redirect("/auth/login?next=/people/edit");
  }

  // Get user's profile
  const profile = await getUserProfile();

  // Redirect to add page if user doesn't have a profile
  if (!profile) {
    redirect("/people/add");
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
            Edit your voice
          </h1>
          {!profile.approved && (
            <p className="mt-6 text-lg text-[#E2C044]">
              Your profile is pending review
            </p>
          )}
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Form Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-xl px-6 md:px-12">
          <EditProfileForm colleges={COLLEGES} profile={profile} />
          
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
