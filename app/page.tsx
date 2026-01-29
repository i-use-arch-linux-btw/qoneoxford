import Link from "next/link";
import { Button } from "@/components/ui/button";
import { heroTagline, heroCtaPrimary, heroCtaSecondary } from "@/content/brand";

export default function Home() {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-[#002147] px-4 py-16 text-white">
      <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        #OneOxford
      </h1>
      <p className="mt-4 max-w-lg text-center text-lg text-white/90 sm:text-xl">
        {heroTagline}
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg" className="bg-[#E2C044] text-[#002147] hover:bg-[#E2C044]/90">
          <Link href="/people">{heroCtaPrimary}</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">
          <Link href="/people/add">{heroCtaSecondary}</Link>
        </Button>
      </div>
      <p className="mt-8 text-center text-sm text-white/70">
        David Quan · Oxford Student Union
      </p>
    </section>
  );
}
