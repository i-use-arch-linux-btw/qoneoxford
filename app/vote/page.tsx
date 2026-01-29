export const metadata = {
  title: "How to vote | #OneOxford",
  description: "Voting 9–12 February — your vote counts.",
};

export default function VotePage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground">How to vote</h1>
      <p className="mt-2 text-muted-foreground">
        Voting runs 9–12 February. One vote — one voice.
      </p>

      <div className="mt-8 space-y-6 text-foreground">
        <section>
          <h2 className="text-xl font-semibold">When</h2>
          <p className="mt-2 text-muted-foreground">
            Monday 9 February – Thursday 12 February, until 8pm.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Where</h2>
          <p className="mt-2 text-muted-foreground">
            Vote online when the ballot opens. Link will be shared here and by Oxford SU when voting opens.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Who</h2>
          <p className="mt-2 text-muted-foreground">
            All Oxford students are eligible to vote in the SU elections. Your vote counts.
          </p>
        </section>
      </div>
    </div>
  );
}
