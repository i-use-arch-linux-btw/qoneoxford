"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, LogOut, X } from "lucide-react";

const leftLinks = [
  { href: "/people", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/videos", label: "Videos" },
];

const rightLinks = [
  { href: "/listen", label: "Listen" },
  { href: "/events", label: "Events" },
  { href: "/vote", label: "Vote" },
  { href: "/newsletter", label: "Newsletter" },
];

const allLinks = [...leftLinks, ...rightLinks];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session: s } }: { data: { session: Session | null } }) => setSession(s));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, s: Session | null) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setOpen(false);
    router.refresh();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#002147]">
      <div className="relative px-8">
        <div className="flex h-20 items-center justify-center">
          {/* Left links */}
          <nav className="hidden flex-1 items-center justify-end gap-8 xl:flex">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-[#E2C044]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <Link href="/" className="flex shrink-0 cursor-pointer items-center justify-center px-12">
            <Image
              src="/logo-skim.png"
              alt="OneOxford"
              width={300}
              height={300}
              className="h-18 w-auto"
              priority
            />
          </Link>

          {/* Right links */}
          <nav className="hidden flex-1 items-center justify-start gap-8 xl:flex">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-[#E2C044]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Add your voice - absolute positioned far left */}
        <div className="absolute left-8 top-1/2 hidden -translate-y-1/2 xl:flex">
          <Link
            href="/people/add"
            className="bg-[#E2C044] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#002147] transition-colors hover:bg-white"
          >
            Add your voice
          </Link>
        </div>

        {/* Sign in - absolute positioned far right */}
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 xl:flex">
          {session ? (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 border border-white/40 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:border-white hover:text-white"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="border border-white/40 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:border-white hover:text-white"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 xl:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <button
                className="flex size-10 items-center justify-center text-white"
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-0 bg-[#002147] p-0 sm:max-w-md" showCloseButton={false}>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col">
                {/* Mobile header */}
                <div className="flex items-center justify-end px-6 pt-6">
                  <button
                    onClick={() => setOpen(false)}
                    className="flex size-10 items-center justify-center text-white"
                    aria-label="Close menu"
                  >
                    <X className="size-6" />
                  </button>
                </div>

                {/* Mobile links */}
                <nav className="flex flex-1 flex-col gap-6 px-6 py-8">
                  {allLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-[#E2C044]"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTAs */}
                <div className="p-6">
                  <Link
                    href="/people/add"
                    className="flex w-full items-center justify-center bg-[#E2C044] py-4 text-sm font-bold uppercase tracking-wider text-[#002147]"
                    onClick={() => setOpen(false)}
                  >
                    Add your voice
                  </Link>
                  {session ? (
                    <button
                      onClick={handleSignOut}
                      className="mt-3 flex w-full items-center justify-center gap-2 border border-white/20 py-4 text-sm font-bold uppercase tracking-wider text-white"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </button>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="mt-3 flex w-full items-center justify-center border border-white/20 py-4 text-sm font-bold uppercase tracking-wider text-white"
                      onClick={() => setOpen(false)}
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
