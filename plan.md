# Environment Setup Plan

## 1. Tooling Prerequisites
- Install Node.js 20.x (e.g. `nvm install 20 && nvm use 20`) to match the CLI tooling.
- Ensure npm 10+ is available (ships with Node 20); enable Corepack if using pnpm.
- Install Sanity CLI globally: `npm install -g @sanity/cli`.
- Install Firebase CLI globally: `npm install -g firebase-tools`.
- Verify you can authenticate with the Google account that owns the Firebase project `sangeetsaadhna-fe7ac` and the Sanity project “SangeetSaadhna”.

## 2. Repository Layout & Clones
- Astro frontend repo lives at `/Users/bharatchaturvedi/Public/repository/sangeetSaadhna`.
- Sanity studio base is `/Users/bharatchaturvedi/Public/repository/sangeetSaadhna/sanity` (already initialized).
- Firebase project files live in `/Users/bharatchaturvedi/Public/repository/firebase`.
- Keep these sibling directories so relative paths in the plan stay valid.

## 3. Environment Variables
- Duplicate `.env` → `.env.local` to store secrets outside version control (Astro reads both).
- Populate:
  - `SANITY_PROJECT_ID` = actual project id from sanity.io/manage.
  - `SANITY_DATASET` = `production` (or desired dataset).
  - `SANITY_API_VERSION` = e.g. `2023-10-01`.
  - `SANITY_READ_TOKEN` = optional read-only token if GROQ queries need private data.
  - `FIREBASE_PROJECT_ID` = `sangeetsaadhna-fe7ac`.
  - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID` = web app config from Firebase console.
  - `SENDGRID_API_KEY`, `RSVP_INBOX`, `PUBLIC_SITE_URL` as required.
- Export the same Sanity/Firebase variables in your shell when running CLIs (`export SANITY_PROJECT_ID=…`).

## 4. Install Node Dependencies
- From the Astro root run `npm install` to restore existing deps (`@sanity/client`, `firebase`, Tailwind).
- Add Astro toolchain: `npm install --save-dev astro @astrojs/tailwind typescript @types/node`.
- Optional: add lint/format tooling (`eslint`, `prettier`) if desired.

## 5. Astro Project Configuration
- Create `astro.config.mjs` with Tailwind integration:
  ```js
  import { defineConfig } from 'astro/config';
  import tailwind from '@astrojs/tailwind';

  export default defineConfig({
    integrations: [tailwind({ config: { applyBaseStyles: false } })],
    srcDir: './src',
    output: 'static',
    server: { port: 4321 }
  });
  ```
- Update `package.json` scripts:
  ```json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
  ```
- Add `tailwind.config.cjs` and `postcss.config.cjs` if missing; run `npx tailwindcss init -p`.
- Optionally initialize TypeScript (`npx astro add --ts`) and create `tsconfig.json`.

## 6. Sanity Studio Setup (`sanity/`)
- Authenticate: `cd sanity && sanity login`.
- Link local studio to project: `sanity init --reconfigure`, choose **SangeetSaadhna**, dataset `production`, output `./sanity`.
- Ensure `sanity.config.ts` exports the project config referencing `schemas`.
- Run `sanity dev` (default http://localhost:3333) to verify studio.
- Deploy when ready: `sanity deploy`.
- Generate read token for frontend in Sanity manage UI if needed.

## 7. Frontend ↔ Sanity Integration
- Implement `src/lib/sanityClient.ts`:
  ```ts
  import { createClient } from '@sanity/client';

  export const sanityClient = createClient({
    projectId: import.meta.env.SANITY_PROJECT_ID,
    dataset: import.meta.env.SANITY_DATASET,
    apiVersion: import.meta.env.SANITY_API_VERSION,
    useCdn: true,
    token: import.meta.env.SANITY_READ_TOKEN
  });
  ```
- Add GROQ helper functions in `src/lib` and use them in pages/components.
- Consider `sanity-codegen` for typed schema outputs if TypeScript is adopted.

## 8. Firebase Project (`../firebase`)
- Authenticate: `cd ../firebase && firebase login`.
- Set default project: `firebase use sangeetsaadhna-fe7ac`.
- If initializing from scratch: `firebase init` (select Hosting, Functions, Emulators as needed) and set hosting public directory to `../sangeetSaadhna/dist`.
- Confirm `.firebaserc` and `firebase.json` reference the correct project.
- Configure emulators (`firebase init emulators`) if local testing of Firestore/Auth is required.
- For Cloud Functions, ensure Node runtime in `functions/package.json` matches (Node 18/20).

## 9. Frontend ↔ Firebase Integration
- In Astro repo, create `src/lib/firebaseClient.ts` that initializes the Firebase SDK using `VITE_FIREBASE_*`.
- Use Astro server endpoints or islands to interact with Firebase services (Auth, Firestore, Storage).
- If deploying via Firebase Hosting, ensure Astro builds to `dist/` (see `astro.config.mjs`).

## 10. Local Development Workflow
- Start Sanity studio: `cd sanity && sanity dev`.
- Optionally start Firebase emulators: `cd ../firebase && firebase emulators:start`.
- Run Astro frontend: `npm run dev` (http://localhost:4321).
- Restart dev server when environment variables change to refresh `import.meta.env`.

## 11. Production Build & Deployment
- Build Astro site: `npm run build` (outputs `dist/`).
- Run `npm run check` to catch integration issues before deploy.
- Deploy Sanity studio: `cd sanity && sanity deploy`.
- Deploy frontend to Firebase Hosting: `cd ../firebase && firebase deploy --only hosting`.
- Consider CI automation (GitHub Actions) to run build/test and trigger Firebase deploys.

## 12. Verification & Maintenance
- Test Sanity fetch from the Astro app to confirm dataset access.
- Validate Firebase web app config (auth domains, API key) matches the deployed hosting site.
- Rotate Sanity read tokens and Firebase API keys periodically.
- Keep dependencies updated (`npm outdated`, `npm update`) and follow CLI upgrade prompts for Astro/Sanity/Firebase.

