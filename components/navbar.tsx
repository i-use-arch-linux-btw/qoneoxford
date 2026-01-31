"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinksLeft = [
  { href: "/people", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/videos", label: "Videos" },
];

const navLinksRight = [
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
      <div className="container grid h-14 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-4">
        <nav className="hidden min-w-0 md:flex md:flex-1 md:items-center md:gap-6">
          <Button asChild size="sm" variant="default" className="self-center">
            <Link href="/people/add">Add your voice</Link>
          </Button>
          {navLinksLeft.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="flex items-center justify-center justify-self-center font-semibold text-primary"
          aria-label="#OneOxford"
        >
          <span className="flex items-center gap-0.5">
            <span
              className="leading-none text-primary"
              style={{ fontSize: "2.5em", lineHeight: 1 }}
              aria-hidden
            >
              #
            </span>
            <span className="flex w-[min-content] flex-col leading-tight">
              <span>One</span>
              <span>Oxford</span>
            </span>
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-6">
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navLinksRight.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
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
          <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
            <Drawer.Trigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-50 bg-black/50" />
              <Drawer.Content
                aria-describedby={undefined}
                className={cn(
                  "fixed inset-y-0 right-0 z-50 flex h-full w-[280px] flex-col border-l bg-background shadow-lg outline-none"
                )}
              >
                <Drawer.Title className="sr-only">Navigation menu</Drawer.Title>
                <div className="flex flex-col gap-4 pt-8 pl-6 pr-12">
                  <Drawer.Close asChild className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
                    <Button variant="ghost" size="icon" aria-label="Close menu">
                      <X className="size-4" />
                    </Button>
                  </Drawer.Close>
                  <nav className="flex flex-col gap-4">
                    {[...navLinksLeft, ...navLinksRight].map((link) => (
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
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
