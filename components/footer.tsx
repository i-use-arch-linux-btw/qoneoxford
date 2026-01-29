import Link from "next/link";

const DISCLAIMER =
  "If you have any concerns about the contents of this page, please contact the Deputy Returning Officer on elections@oxfordsu.ox.ac.uk";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-5xl px-4 py-8 text-center">
        <p className="text-center text-sm text-muted-foreground">
          {DISCLAIMER.split(" on ")[0]}
          {" on "}
          <a
            href="mailto:elections@oxfordsu.ox.ac.uk"
            className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
          >
            elections@oxfordsu.ox.ac.uk
          </a>
        </p>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          David Quan · Oxford Student Union · #OneOxford
        </p>
        <nav className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <Link href="/people" className="hover:text-foreground">Community</Link>
          <Link href="/about" className="hover:text-foreground">About</Link>
          <Link href="/manifesto" className="hover:text-foreground">Manifesto</Link>
          <Link href="/listen" className="hover:text-foreground">Listen</Link>
          <Link href="/vote" className="hover:text-foreground">Vote</Link>
        </nav>
      </div>
    </footer>
  );
}
