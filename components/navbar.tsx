"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";

const navLinks = [
  { href: "/people", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/videos", label: "Videos" },
  { href: "/listen", label: "Listen" },
  { href: "/events", label: "Events" },
  { href: "/vote", label: "Vote" },
  { href: "/newsletter", label: "Newsletter" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.refresh();
    router.push("/");
  };

  const userLabel = session?.user?.email ?? "Account";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-semibold text-primary">
          #OneOxford
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" variant="default" className="self-center">
            <Link href="/people/add">Add your voice</Link>
          </Button>
          {session ? (
            <div className="flex items-center gap-2">
              <span className="max-w-[140px] truncate text-sm text-muted-foreground" title={session.user.email ?? undefined}>
                {userLabel}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                aria-label="Sign out"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" variant="outline" className="self-center">
              <Link href="/auth/login">Sign in</Link>
            </Button>
          )}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <nav className="flex flex-col gap-4 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild>
                <Link href="/people/add" onClick={() => setOpen(false)}>
                  Add your voice
                </Link>
              </Button>
              {session ? (
                <>
                  <span className="truncate text-sm text-muted-foreground" title={session.user.email ?? undefined}>
                    {userLabel}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSignOut}
                    className="justify-start gap-2"
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link href="/auth/login" onClick={() => setOpen(false)}>
                    Sign in
                  </Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
