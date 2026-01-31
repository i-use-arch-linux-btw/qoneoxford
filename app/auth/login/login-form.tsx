"use client";

import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <div className="fixed inset-0 z-50 bg-[#002147]">
      {/* Back link */}
      <div className="absolute left-6 top-6 z-10 md:left-12 md:top-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
      </div>

      <div className="flex h-full">
        {/* Left side - Branding */}
        <div className="hidden w-1/2 flex-col justify-between p-12 lg:flex xl:p-16">
          <div />
          
          <div className="animate-fade-up opacity-0">
            <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-tight text-white xl:text-6xl">
              Welcome to<br />
              <span className="text-[#E2C044]"><span className="font-instrument-serif">#</span>OneOxford</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-white/60">
              Join the movement. One community, One standard, One voice.
            </p>
          </div>

          <div className="animate-fade-up animation-delay-200 opacity-0">
            <div className="flex gap-8">
              {["One Voice", "One Vote", "One Community"].map((pillar) => (
                <span
                  key={pillar}
                  className="text-xs font-medium uppercase tracking-widest text-white/30"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Sign in form */}
        <div className="flex w-full items-center justify-center bg-white p-6 md:p-12 lg:w-1/2">
          <div className="w-full max-w-md">
            {/* Mobile branding */}
            <div className="mb-12 lg:hidden">
              <h1 className="font-serif text-3xl font-normal tracking-tight text-[#002147]">
                Welcome to <span className="text-[#E2C044]"><span className="font-instrument-serif">#</span>OneOxford</span>
              </h1>
              <p className="mt-3 text-sm text-[#002147]/60">
                Join the movement. One community, One standard, One voice.
              </p>
            </div>

            <div className="animate-fade-up animation-delay-100 opacity-0">
              <h2 className="text-2xl font-semibold tracking-tight text-[#002147]">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-[#002147]/60">
                Use your Google account to continue
              </p>
              {authNotConfigured && (
                <p className="mt-4 text-sm text-amber-600" role="alert">
                  Auth is not configured. Please set Supabase environment variables.
                </p>
              )}
            </div>

            <div className="animate-fade-up animation-delay-200 mt-10 opacity-0">
              <button
                type="button"
                onClick={handleSignInWithGoogle}
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 bg-[#002147] px-8 py-5 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {!loading && (
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="size-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Redirecting...
                  </span>
                ) : (
                  "Continue with Google"
                )}
              </button>
            </div>

            <div className="animate-fade-up animation-delay-300 mt-8 opacity-0">
              <p className="text-center text-xs text-[#002147]/40">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-[#002147]/60">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-[#002147]/60">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Decorative element */}
            <div className="animate-fade-up animation-delay-400 mt-16 flex items-center gap-4 opacity-0">
              <div className="h-px flex-1 bg-[#002147]/10" />
              <span className="text-xs font-medium uppercase tracking-widest text-[#002147]/30">
                #OneOxford
              </span>
              <div className="h-px flex-1 bg-[#002147]/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E2C044]" />
    </div>
  );
}
