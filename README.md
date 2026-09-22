# Helpperr

Marketing site for Helpperr, built with [Next.js](https://nextjs.org) (App Router) and Tailwind CSS v4.

- `app/page.tsx` — the live homepage.
- `app/home-new/page.tsx` — the new dark-theme homepage (`/home-new`), built from the components in `components/home-new/` and the copy in `lib/home-new-content.ts`.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the live homepage, or [http://localhost:3000/home-new](http://localhost:3000/home-new) for the new page.

Other scripts:

```bash
npm run build   # production build (see "Build output" below)
npm run start   # serve the production build locally
npm run lint    # run ESLint
```

## Build output

This project builds into `dist/` instead of the Next.js default `.next/` (configured in `next.config.ts` via `distDir: "dist"`). No extra configuration is needed to deploy — Vercel's Next.js builder reads `next.config.ts` and picks up the custom output directory automatically.

## Deploy on Vercel

### Option A — Vercel dashboard (recommended)

1. Push your changes to GitHub (this repo's `origin` remote is already set up).
2. Go to [vercel.com/new](https://vercel.com/new) and import the `Helpperr` GitHub repository.
3. Vercel auto-detects the **Next.js** framework preset — leave the Build Command (`next build` / `npm run build`), Output Directory, and Install Command on their defaults.
4. No environment variables are required for this project.
5. Click **Deploy**. Every subsequent push to `main` triggers a new production deployment automatically; pushes to other branches get their own preview deployments.

### Option B — Vercel CLI

```bash
npm i -g vercel   # one-time install
vercel login      # one-time auth
vercel            # deploy a preview from the current directory
vercel --prod     # deploy to production
```

The CLI will ask a few setup questions on first run (link to an existing project or create a new one) and then reuses that configuration on future deploys.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
