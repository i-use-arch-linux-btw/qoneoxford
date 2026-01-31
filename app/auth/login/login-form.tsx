"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const safeNext = next.startsWith("/") ? next : "/";
  const [loading, setLoading] = useState(false);
  const [authNotConfigured, setAuthNotConfigured] = useState(false);

  const handleSignInWithGoogle = useCallback(async () => {
    setLoading(true);
    setAuthNotConfigured(false);
    try {
      const supabase = createClient();
      if (!supabase) {
        setAuthNotConfigured(true);
        setLoading(false);
        return;
      }
      const redirectTo = `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback${safeNext !== "/" ? `?next=${encodeURIComponent(safeNext)}` : ""}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) {
        setLoading(false);
        return;
      }
      // Supabase redirects the browser; we don't navigate manually
    } catch {
      setLoading(false);
    }
  }, [safeNext]);

  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use your Google account to sign in to #OneOxford.
        </p>
        {authNotConfigured && (
          <p className="mt-4 text-sm text-amber-600 dark:text-amber-400" role="alert">
            Auth is not configured. Please set Supabase env vars for this environment.
          </p>
        )}
        <Button
          type="button"
          className="mt-6 w-full"
          onClick={handleSignInWithGoogle}
          disabled={loading}
        >
          {loading ? "Redirecting…" : "Sign in with Google"}
        </Button>
      </div>
    </div>
  );
}
