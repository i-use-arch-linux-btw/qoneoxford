"use client";

export default function PeopleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Community
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-6 md:px-12">
          <div className="mx-auto max-w-md border border-[#002147]/10 px-8 py-16 text-center">
            <p className="font-serif text-2xl text-[#002147]">
              Something went wrong loading the community
            </p>
            <p className="mt-2 text-[#002147]/60">
              Please try again. If it keeps happening, check back later.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="group mt-8 inline-flex items-center gap-3 bg-[#002147] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
