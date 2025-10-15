# Sangeet Saadhna Community Site

Astro-based web experience for the Sangeet Saadhna community with Sanity CMS and Firebase integrations.

## Local Development

```bash
npm install
npm run dev
```

- Studio: `cd sanity && npm install && npm run dev`
- Firebase (optional): `cd ../firebase && firebase emulators:start`

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
