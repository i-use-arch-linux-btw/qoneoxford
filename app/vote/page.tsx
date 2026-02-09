export const metadata = {
  title: "How to vote | #OneOxford",
  description: "Voting 9–12 February — your vote counts.",
};

const voteInfo = [
  {
    title: "When",
    body: "Monday 9 February – Thursday 12 February, until 8pm.",
  },
  {
    title: "Where",
    body: "Vote online via the Oxford SU Elections Hub.",
    link: "https://www.oxfordsu.org/studentvoice/elections/",
  },
  {
    title: "Who",
    body: "All Oxford students are eligible to vote in the SU elections. Your vote counts.",
  },
];

export default function VotePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002147] py-16 md:py-20 lg:py-24">
        <div className="container relative mx-auto max-w-7xl px-6 md:px-12">
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            How to vote
          </h1>
          <div className="mt-8">
            <a
              href="https://www.oxfordsu.org/studentvoice/elections/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#E2C044] px-8 py-5 text-base font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-white"
            >
              Vote now on Oxford SU
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
      </section>

      {/* Content Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-6 md:px-12">
          <div className="space-y-12 text-[#002147]">
            {voteInfo.map((section, index) => (
              <div key={index}>
                {index > 0 && <div className="h-px bg-[#002147]/10" />}
                <div className={index > 0 ? "pt-12" : ""}>
                  <h3 className="mb-4 text-xl font-semibold text-[#002147] md:text-2xl">
                    {section.title}
                  </h3>
                  <p className="text-lg leading-relaxed md:text-xl">
                    {section.body}
                    {"link" in section && section.link && (
                      <>
                        {" "}
                        <a
                          href={section.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#E2C044] underline underline-offset-4 transition-colors hover:text-[#002147]"
                        >
                          Go to Elections Hub &rarr;
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
