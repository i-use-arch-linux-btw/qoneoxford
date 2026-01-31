import { manifestoSections } from "@/content/manifesto";

export const metadata = {
  title: "Manifesto | #OneOxford",
  description:
    "Our vision for #OneOxford — practical support, connectivity, and a student union that works for everyone.",
};

export default function ManifestoPage() {
  const policySections = [
    manifestoSections.practicalSupport,
    manifestoSections.misconduct,
    manifestoSections.connectivity,
    manifestoSections.aiAndCareers,
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            Manifesto
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-6 text-[#002147] md:px-12">
          {/* Slogan */}
          <div className="mb-16">
            <h2 className="mb-6 font-serif text-3xl md:text-4xl">Slogan</h2>
            <p className="text-lg leading-relaxed md:text-xl">
              {manifestoSections.slogan}
            </p>
          </div>

          <div className="h-px bg-[#002147]/10" />

          {/* Background */}
          <div className="my-16">
            <h2 className="mb-12 font-serif text-3xl md:text-4xl">
              {manifestoSections.background.title}
            </h2>
            <div className="space-y-10">
              {manifestoSections.background.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="mb-3 text-xl font-semibold md:text-2xl">
                    {section.title}
                  </h3>
                  <p className="text-lg leading-relaxed md:text-xl">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#002147]/10" />

          {/* Vision */}
          <div className="my-16">
            <h2 className="mb-6 font-serif text-3xl md:text-4xl">
              {manifestoSections.visionTitle}
            </h2>
            <div className="space-y-8">
              <p className="text-lg leading-relaxed md:text-xl">
                {manifestoSections.vision}
              </p>
              <p className="text-lg leading-relaxed md:text-xl">
                {manifestoSections.suAsHub}
              </p>
              {policySections.map((section, index) => (
                <div key={index}>
                  <h3 className="mb-3 text-xl font-semibold md:text-2xl">
                    {section.title}
                  </h3>
                  <p className="text-lg leading-relaxed md:text-xl">
                    {section.body}
                  </p>
                </div>
              ))}
              <p className="text-lg leading-relaxed md:text-xl">
                {manifestoSections.callToAction}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
