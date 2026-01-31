import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AddProfileForm } from "./form";
import { COLLEGES } from "@/lib/features/people";

export const metadata = {
  title: "Add Your Voice | #OneOxford",
  description: "Join the #OneOxford community. Share your one thing you'd change about Oxford.",
};

export default function AddYourselfPage() {
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
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
            Join the #OneOxford community. Share your one thing you&apos;d change about Oxford.
          </p>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Form Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-xl px-6 md:px-12">
          <AddProfileForm colleges={COLLEGES} />
          
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
