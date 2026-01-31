import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  heroHeadlineWord1,
  heroHeadlineWord2,
  heroTagline,
  heroCtaPrimary,
  heroCtaSecondary,
} from "@/content/brand";

export default function Home() {
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center bg-[#002147] px-4 py-16 text-white">
      <h1 className="flex items-center justify-center gap-1 text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        <span
          className="leading-none text-white"
          style={{ fontSize: "2.5em", lineHeight: 1 }}
          aria-hidden
        >
          #
        </span>
        <span className="flex w-[min-content] flex-col leading-tight">
          <span>{heroHeadlineWord1}</span>
          <span>{heroHeadlineWord2}</span>
        </span>
      </h1>
      <p className="mt-4 max-w-lg text-center text-lg text-white/90 sm:text-xl">
        {heroTagline}
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button asChild size="lg" className="bg-[#E2C044] text-[#002147] hover:bg-[#E2C044]/90">
          <Link href="/people/add">{heroCtaSecondary}</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white">
          <Link href="/people">{heroCtaPrimary}</Link>
        </Button>
      </div>
      <p className="mt-8 text-center text-sm text-white/70">
        David Quan · Oxford Student Union
      </p>
    </section>
  );
}
