import { aboutSections } from "@/content/about";

export const metadata = {
  title: "About | #OneOxford",
  description: "David Quan — My story and why I'm running for Oxford SU.",
};

export default function AboutPage() {
  return (
    <div className="container max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground">About David</h1>
      <p className="mt-2 text-muted-foreground">My story and why #OneOxford.</p>

      <div className="mt-8 space-y-8 text-foreground">
        <section>
          <p className="whitespace-pre-line leading-relaxed">{aboutSections.intro}</p>
        </section>
        <section>
          <p className="whitespace-pre-line leading-relaxed">{aboutSections.personal}</p>
        </section>
        <section>
          <p className="whitespace-pre-line leading-relaxed">{aboutSections.closing}</p>
        </section>
      </div>
    </div>
  );
}
