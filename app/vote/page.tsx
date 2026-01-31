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
    body: "Vote online when the ballot opens. Link will be shared here and by Oxford SU when voting opens.",
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
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
            Voting runs 9–12 February. One vote — one voice.
          </p>
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
