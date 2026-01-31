This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- **Node.js**: LTS (e.g. 18.x or 20.x). See [nodejs.org](https://nodejs.org) or use [nvm](https://github.com/nvm-sh/nvm) to manage versions.
- **Package manager**: npm (comes with Node), or pnpm / yarn / bun.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Run locally

1. Clone the repo and `cd` into it.
2. Install dependencies: `npm install` (or pnpm / yarn / bun).
3. Copy env: `cp .env.local.example .env.local`.
4. Fill required env in `.env.local` (see **Environment variables** below for where to get each value).
5. Set up the database: create a Supabase project (or use an existing dev project), then run the SQL migrations (see **Database** below).
6. Run the dev server: `npm run dev` and open [http://localhost:3000](http://localhost:3000).

Do not commit `.env.local`; it is gitignored.

## Environment variables

For local run, all required and optional variables are listed in `.env.local.example`. Copy it to `.env.local` and fill in the values.

**Required (local):**

| Variable | Where to get it |
|----------|-----------------|
| `NEXT_PUBLIC_APP_ENV` | Set to `development` for localhost. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → **Project URL**. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page → **Project API keys** → anon public. |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page → **service_role** (secret; server-only). |

**Optional:**

| Variable | Notes |
|----------|--------|
| `NEXT_PUBLIC_VIDEO_STORY_ID` / `NEXT_PUBLIC_VIDEO_COMMUNITY_ID` | YouTube video IDs for `/videos`; if unset, "Video coming soon" is shown. |
| `NEXT_PUBLIC_PODCAST_DRIVE_URL` | Overrides the default podcast Drive link. |

**Staging / Production:** Staging and production env (including `NEXT_PUBLIC_APP_ENV=staging` or `production`) are set in Vercel, not in `.env.local`.

## Database

Use a [Supabase](https://supabase.com) project (create one or use an existing dev project). Apply the schema by running the SQL files in [supabase/migrations/](supabase/migrations/) in order:

- In **Supabase Dashboard → SQL Editor**, run each file; or
- With Supabase CLI: `supabase link` then `supabase db push`.

Migrations:

- `20250128000000_create_colleges_and_profiles.sql` — colleges and profiles tables, RLS, indexes.
- `20250129000000_add_profile_other_info_and_involvements.sql` — extra profile fields.

RLS allows public read of approved profiles and colleges; the service role is used for server-side writes (e.g. people/add).

## Environments (localhost, staging, production)

| Environment   | Use case              | How to run / deploy                    | APP_ENV      |
|---------------|------------------------|----------------------------------------|--------------|
| **Localhost** | Quick local test      | `npm run dev` → http://localhost:3000   | development  |
| **Staging**   | Dev server for admins | Vercel Preview (e.g. branch or PR)     | staging      |
| **Production**| Live site             | Vercel Production (e.g. main)          | production   |

- **Localhost**: See **Environment variables** and **Run locally**.
- **Staging**: In Vercel, set env vars for the **Preview** environment: `NEXT_PUBLIC_APP_ENV=staging` and your staging Supabase URL/keys (e.g. a separate Supabase project or branch for admins).
- **Production**: In Vercel, set env vars for **Production**: `NEXT_PUBLIC_APP_ENV=production` and production Supabase URL/keys.

Before pushing, run `npm run prepush` (or `npm run check-env`). It fails if `.env.local` has `staging` or `production` (those are for deployed builds only).

## Auth (Google sign-in)

Sign-in uses Supabase Auth with Google OAuth ([docs](https://supabase.com/docs/guides/auth/social-login/auth-google)). No extra app env vars are required; the app uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` only.

### Setup checklist

**1. Supabase Dashboard → Authentication → URL Configuration**

- **Site URL**: set to your app origin (e.g. `http://localhost:3000` for dev, `https://your-domain.com` for production).
- **Redirect URLs**: add every URL your app uses as `redirectTo` (must match exactly):
  - Dev: `http://localhost:3000/auth/callback`
  - Production: `https://your-domain.com/auth/callback`

**2. Supabase Dashboard → Authentication → Providers → Google**

- Turn **Google** on.
- Paste **Client ID** and **Client Secret** from Google Cloud (see below).

**3. Google Cloud Console → [Credentials](https://console.cloud.google.com/apis/credentials)**

- Create **OAuth 2.0 Client ID** → type **Web application**.
- **Authorized JavaScript origins**: add your app origins (e.g. `http://localhost:3000`, `https://your-domain.com`).
- **Authorized redirect URIs**: add your **Supabase** auth callback (not your app):
  - Hosted Supabase: `https://<project-ref>.supabase.co/auth/v1/callback`  
    (get the exact URL from Supabase Dashboard → Auth → Providers → Google.)
- Copy Client ID and Client Secret into Supabase → Providers → Google.

## Troubleshooting

### Runtime error: `undefined is not an object (evaluating 'activeTab.id')` in `getCurrentStore`

This overlay comes from **injected code** (e.g. Cursor browser tools or other extensions), not from this app. No fix in this repo can remove the overlay when the error is from injected code.

**Workaround:** Open the app in a clean context (incognito or a browser profile without dev extensions) to confirm the error disappears. When developing, use a clean profile or disable the extension when testing.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (http://localhost:3000). |
| `npm run build` | Production build. |
| `npm run start` | Run production build (run after `build`). |
| `npm run test` | Run Vitest once. |
| `npm run test:watch` | Run Vitest in watch mode. |
| `npm run check-env` / `npm run prepush` | Ensure `.env.local` has `NEXT_PUBLIC_APP_ENV=development` (fails if staging/production; run before pushing). |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
