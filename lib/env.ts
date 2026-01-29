/**
 * App environment. Next.js loads .env.development (next dev) or .env.production (next build).
 * Override in .env.local for dev; set in Vercel for production builds.
 * Falls back to NODE_ENV when NEXT_PUBLIC_APP_ENV is unset.
 */
const APP_ENV =
  process.env.NEXT_PUBLIC_APP_ENV ??
  (process.env.NODE_ENV === "production" ? "production" : "development");

export const isDev = APP_ENV === "development";
export const isProduction = APP_ENV === "production";
export { APP_ENV };
