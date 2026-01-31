import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-oxford-blue text-white">
      <div className="container mx-auto max-w-6xl px-6 py-10">
        {/* Main footer content - horizontal layout */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left: Branding */}
          <div className="shrink-0">
            <p className="text-sm text-white/70">
              David Quan · Oxford Student Union
            </p>
            <Image
              src="/logo-skim.png"
              alt="OneOxford"
              width={150}
              height={50}
              className="mt-2"
            />
          </div>

          {/* Center: Navigation */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <Link href="/people" className="text-white/80 transition-colors hover:text-white">
              Community
            </Link>
            <Link href="/manifesto" className="text-white/80 transition-colors hover:text-white">
              Manifesto
            </Link>
            <Link href="/listen" className="text-white/80 transition-colors hover:text-white">
              Listen
            </Link>
            <Link href="/vote" className="text-white/80 transition-colors hover:text-white">
              Vote
            </Link>
          </nav>

          {/* Right: Contact */}
          <div className="text-sm">
            <p className="text-white/70">Questions or concerns?</p>
            <a
              href="mailto:elections@oxfordsu.ox.ac.uk"
              className="mt-1 inline-block text-white underline underline-offset-4 transition-colors hover:text-oxford-yellow"
            >
              elections@oxfordsu.ox.ac.uk
            </a>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="mt-8 border-t border-white/20 pt-6">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} OneOxford Campaign. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
