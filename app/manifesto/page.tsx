import { manifestoSections } from "@/content/manifesto";

export const metadata = {
  title: "Manifesto | #OneOxford",
  description: "Our vision for #OneOxford — practical support, connectivity, and a student union that works for everyone.",
};

export default function ManifestoPage() {
  const policySections = [
    manifestoSections.practicalSupport,
    manifestoSections.misconduct,
    manifestoSections.connectivity,
    manifestoSections.aiAndCareers,
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Styled like about page */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Manifesto
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
            Our vision for #OneOxford — practical support, connectivity, and a student union that works for everyone.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Content Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <div className="space-y-12 text-[#002147]">
            <div>
              <p className="whitespace-pre-line text-lg leading-relaxed md:text-xl">
                {manifestoSections.vision}
              </p>
            </div>

            <div className="h-px bg-[#002147]/10" />

            <div>
              <p className="whitespace-pre-line text-lg leading-relaxed md:text-xl">
                {manifestoSections.suAsHub}
              </p>
            </div>

            {policySections.map((section, index) => (
              <div key={index}>
                <div className="h-px bg-[#002147]/10" />
                <div className="pt-12">
                  <h3 className="mb-4 text-xl font-semibold text-[#002147] md:text-2xl">
                    {section.title}
                  </h3>
                  <p className="text-lg leading-relaxed md:text-xl">
                    {section.body}
                  </p>
                </div>
              </div>
            ))}

            <div className="h-px bg-[#002147]/10" />

            <div>
              <p className="whitespace-pre-line text-lg leading-relaxed md:text-xl">
                {manifestoSections.delivery}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
