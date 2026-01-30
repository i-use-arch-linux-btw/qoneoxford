This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environments (localhost, staging, production)

| Environment   | Use case              | How to run / deploy                    | APP_ENV      |
|---------------|------------------------|----------------------------------------|--------------|
| **Localhost** | Quick local test      | `npm run dev` → http://localhost:3000   | development  |
| **Staging**   | Dev server for admins | Vercel Preview (e.g. branch or PR)     | staging      |
| **Production**| Live site             | Vercel Production (e.g. main)          | production   |

- **Localhost**: Uses `.env.development` and `.env.local` (local Supabase). Copy `.env.local.example` to `.env.local` and set local Supabase URL and keys. Keep `NEXT_PUBLIC_APP_ENV=development` in `.env.local`.
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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
