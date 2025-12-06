# Sangeet Saadhna Community Site

Astro-based web experience for the Sangeet Saadhna community with Sanity CMS and Firebase integrations.

## Local Development

```bash
npm install
npm run dev
```

- Studio: `cd sanity && npm install && npm run dev`
- Firebase (optional): `cd ../firebase && firebase emulators:start`

## Initial Setup on a New Machine

1. Clone the repo and ensure Node.js 18+ plus npm are installed.
2. Install root dependencies: `npm install`.
3. Install Sanity Studio dependencies: `cd sanity && npm install`.
4. Install Firebase Functions dependencies: `cd functions && npm install`.
5. Copy `.env.local` (or create one) and populate the variables listed below for your environment.
6. Install the Firebase CLI (`npm install -g firebase-tools`) and run `firebase login` if you plan to deploy or run emulators.
7. (Optional) Run `firebase use sangeetsaadhna-fe7ac` to bind the CLI to the hosting project.

After that:

- `npm run dev` starts the Astro site.
- `cd sanity && npm run dev` starts the CMS studio.
- `cd functions && npm run serve` starts the Firebase Functions emulator once the CLI is configured.

Environment variables live in `.env.local`. Minimum required:

```
SANITY_PROJECT_ID=<id>
SANITY_DATASET=production
SANITY_API_VERSION=2023-10-01
SANITY_READ_TOKEN=<read-only token if dataset is private>
FIREBASE_PROJECT_ID=sangeetsaadhna-fe7ac
VITE_FIREBASE_API_KEY=<value>
VITE_FIREBASE_AUTH_DOMAIN=<value>
VITE_FIREBASE_PROJECT_ID=sangeetsaadhna-fe7ac
VITE_FIREBASE_APP_ID=<value>
PUBLIC_SITE_URL=http://localhost:4321
YOUTUBE_API_KEY=<youtube_data_api_v3_key>
YOUTUBE_CHANNEL_ID=UCra7Oq4y-Y2-_kpKGHs-yYA
SENDGRID_API_KEY=<sendgrid_api_key>
RSVP_INBOX=team@sangeetsaadhna.org
```

## Commands

- `npm run dev` – Astro dev server (http://localhost:4321)
- `npm run build` – Static production build to `dist/`
- `npm run preview` – Preview production build locally
- `npm run check` – Astro diagnostics
- `npm run check:a11y` – Accessibility audit (uses `astro check --experimental-a11y`)
- `npm run deploy` – Build and deploy to Firebase Hosting (requires CLI login)

## Content & Data

- Sanity schemas defined in `sanity/schemas`
- GROQ queries shared in `sanity/queries` and consumed via `src/lib/sanityQueries.ts`
- Portable Text rendering helpers in `src/lib/portableText.ts`

## Deployment & CI/CD

- Build output (`dist/`) is configured for Firebase Hosting via `firebase.json`. Set `PUBLIC_SITE_URL` to production domain before `npm run build` to generate correct metadata.
- GitHub Actions workflow `.github/workflows/deploy.yml` handles build + deploy on pushes to `main`. Provide repository secrets:
  - `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`, `SANITY_READ_TOKEN`
  - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`
  - `PUBLIC_SITE_URL`
  - `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT` (Base64/JSON service account with Hosting Admin)
- Manual deploy remains available via `npm run deploy` after running `firebase login` and `firebase use <project>`. 
