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

/** Left nav: order of importance Manifesto, About, Community, Videos */
const navLinksLeft = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/about", label: "About" },
  { href: "/people", label: "Community" },
  { href: "/videos", label: "Videos" },
];

/** Right nav: order of importance Vote, Events, Listen, Newsletter (least important, dropped first when narrow) */
const navLinksRight = [
  { href: "/vote", label: "Vote" },
  { href: "/events", label: "Events" },
  { href: "/listen", label: "Listen" },
  { href: "/newsletter", label: "Newsletter" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    setOpen(false);
    router.refresh();
    router.push("/");
  };

  const userLabel = session?.user?.email ?? "Account";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto grid h-14 w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-4">
        <nav className="hidden min-w-0 lg:flex lg:flex-1 lg:items-center lg:gap-6">
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
          <nav className="hidden lg:flex lg:items-center lg:gap-6">
            {navLinksRight.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  link.href === "/newsletter" && "hidden xl:inline-block"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {session ? (
            <div className="flex shrink-0 items-center gap-2">
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
            <Button asChild size="sm" variant="outline" className="shrink-0 self-center">
              <Link href="/auth/login">Sign in</Link>
            </Button>
          )}
          <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
            <Drawer.Trigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
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
                    <Button asChild>
                      <Link href="/people/add" onClick={() => setOpen(false)}>
                        Add your voice
                      </Link>
                    </Button>
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
