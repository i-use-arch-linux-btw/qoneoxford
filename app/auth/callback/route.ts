import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const AUTH_CODE_ERROR_PATH = "/auth/auth-code-error";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    next = "/";
  }

  if (!code) {
    return NextResponse.redirect(new URL(AUTH_CODE_ERROR_PATH, request.url));
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.redirect(new URL(AUTH_CODE_ERROR_PATH, request.url));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL(AUTH_CODE_ERROR_PATH, request.url));
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const origin = new URL(request.url).origin;

  const base =
    forwardedHost != null && forwardedHost !== ""
      ? `${forwardedProto === "https" ? "https" : "http"}://${forwardedHost}`
      : origin;

  return NextResponse.redirect(`${base}${next}`);
}
