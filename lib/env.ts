/**
 * App environment (three tiers):
 * - development: localhost, quick local test (next dev, .env.local)
 * - staging: dev server for admins (Vercel Preview, set in Vercel env)
 * - production: live build (Vercel Production)
 * Falls back to NODE_ENV when NEXT_PUBLIC_APP_ENV is unset.
 */
const APP_ENV =
  process.env.NEXT_PUBLIC_APP_ENV ??
  (process.env.NODE_ENV === "production" ? "production" : "development");

export const isLocal = APP_ENV === "development";
export const isStaging = APP_ENV === "staging";
export const isProduction = APP_ENV === "production";
/** @deprecated Use isLocal for localhost dev */
export const isDev = isLocal;
export { APP_ENV };
