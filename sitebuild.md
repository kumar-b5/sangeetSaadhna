# Site Build Plan

## Phase 0 – Project Baseline
1. **Audit existing code**: Review `src/components`, `src/pages`, and `sanity/schemas` to catalogue current placeholders and identify reusable structures.
2. **Confirm environment**: Ensure `.env.local` has Sanity + Firebase values, run `npm run dev` (Astro) and `npm run dev` in `sanity/` to verify the baseline site compiles.
3. **Establish branch strategy**: Create feature branches per phase (e.g. `feature/theme-foundation`, `feature/events-page`) to keep work isolated and reviewable.

## Phase 1 – Visual Theme & Global UX
1. **Brand palette and typography**:
   - Define community-driven palette in `src/styles/tokens.css` (primary, secondary, neutral, accent, backgrounds).
   - Choose a headline + body font pairing (e.g. Google Fonts) and load via `Layout.astro` `<head>`.
2. **Global styles**: Expand `src/styles/globals.css` to set body defaults, heading scale, link states, buttons, and layout utilities (use Tailwind @layer or custom CSS).
3. **Layout shell**:
   - Update `Layout.astro` to include `<head>` metadata slots (`<title>`, OpenGraph tags).
   - Implement responsive grid with consistent paddings and max-width container utilities.
4. **Navigation & footer**:
   - Flesh out `Nav.astro` with logo area, primary menu (Home, About, Mission, Events, Contact, Donation), and mobile menu toggle.
   - Implement `Footer.astro` with contact snippet, social links (YouTube, Instagram), newsletter CTA placeholder, and copyright.
5. **Accessibility & theme checks**: Use contrast tools to ensure AA compliance, tab through nav, verify color usage for community inclusivity.

## Phase 2 – Content Modeling in Sanity
1. **Schema organization**: Update `sanity/schemas/*.ts` with real fields.
   - `siteSettings`: site title, tagline, contact email, social links, donation links.
   - `page`: slug, title, hero content blocks, rich body (Portable Text), SEO metadata.
   - `event`: title, slug, start/end date, location, description, YouTube URL, image, categories (e.g. Monthly Program, Workshop).
   - `person`: name, role, bio, headshot for community leaders.
2. **Reusable objects**: Add object schemas (callouts, CTA blocks, schedule items) to keep content structured.
3. **Sample content migration**: In Sanity Studio, create documents for About, Mission, a few past events, and upcoming monthly program.
4. **Content queries**: Define GROQ snippets (`sanity/queries`) to fetch:
   - `siteSettings`
   - Navigation pages (filter by `showInNav` boolean)
   - Upcoming events (by date)
   - Past events with YouTube links (sorted descending)
5. **Tokens & secrets**: Generate read-only token if any dataset is private and store in `.env.local`.

## Phase 3 – Landing Page & Storytelling
1. **Homepage hero**: Build `src/pages/index.astro` to pull hero copy and background media from Sanity (fallback static copy while content loads).
2. **Featured sections**:
   - Monthly program teaser (next upcoming event with CTA to Events page).
   - Community story section (quote/testimonial pulled from Sanity `page` block or `person`).
   - Video highlight carousel (recent YouTube embeds via events with video flag).
3. **Newsletter/Volunteer CTA**: Add CTA component that writes to Firebase (optional) or mailto/form placeholder.
4. **SEO**: Add meta description, structured data (JSON-LD for community organization), share image.

## Phase 4 – Static Content Pages
1. **About page (`about.astro`)**:
   - Fetch `page` content for “About” slug and render hero, narrative sections, timeline using Portable Text to Astro components.
2. **Mission page (`mission.astro`)**:
   - Create new page file; load Mission statement blocks, guiding principles, community impact metrics.
3. **Contact page (`contact.astro`)**:
   - Include address/map (Google Maps embed or static map), contact form (submit to Firebase Cloud Function or email service), and social handles.
4. **Donation page (`donation.astro`)**:
   - Pull donation options from Sanity (UPI, bank transfer, external platforms). Show QR codes/images stored in Sanity assets.
   - Add CTA to subscribe for donor updates.
5. **Page template component**: Build `src/components/PageSection.astro` to render Portable Text blocks for layout consistency.

## Phase 5 – Events & Media Experience
1. **Events index (`src/pages/events/index.astro`)**:
   - Fetch upcoming and past events from Sanity.
   - Use `CardEvent.astro` enhancements (date badge, tags, call-to-action buttons).
   - Group sections: “Upcoming Monthly Program” (next event) and “Past Celebrations”.
2. **Event detail page ([slug].astro)**:
   - Fetch event by slug; display hero with date/location, schedule, performers.
   - Embed YouTube video using sanitized iframe from event data, fallback image if no video.
   - List related resources (PDF programs, photo galleries) if available via Sanity file assets.
3. **Monthly highlights component**: Create `MonthlyProgram.astro` to highlight current month’s schedule on homepage and events index.
4. **Pagination / filtering**: Add filters (category dropdown) for events list using Astro islands or simple querystring filtering.
5. **Video gallery**: Optionally create `src/pages/videos.astro` to aggregate event videos for future expansion.

## Phase 6 – Interactive Features (Firebase + Forms)
1. **RSVP / Contact form**:
   - Create Astro API route or Netlify-style endpoint that posts to Firebase Firestore or SendGrid.
   - Implement hCaptcha/Recaptcha Lite for spam protection if needed.
2. **Newsletter signup**: Integrate Firebase (or alternative) to store emails; alternatively pipe to Google Sheets via Cloud Function.
3. **Analytics**: Add Firebase Analytics or Google Analytics 4 with consent banner; ensure tracking respects privacy laws.
4. **Authentication (future optional)**: Outline how to secure private media via Firebase Auth for members-only content.

## Phase 7 – Performance, Accessibility & QA
1. **Image optimization**: Use Astro’s built-in `<Image />` component (`astro:assets`); store responsive images in Sanity with `assetMetadata`.
2. **Static generation strategy**:
   - Use Astro’s `getStaticPaths` for events, enabling incremental rebuilds via `astro build` on content change.
   - Consider SSG + `fetch` caching to keep hosting costs low on Firebase.
3. **CSS & JS budget**: Prefer Tailwind + component-level CSS, avoid large client-side bundles, leverage Astro islands only where interactive (contact form, filters).
4. **Accessibility tests**: Run `npm run check:a11y`, Lighthouse, manual keyboard testing; address violations before release.
5. **Performance audit**: Lighthouse/Pagespeed for TTFB, LCP, CLS; ensure YouTube embeds use `loading="lazy"` and placeholder thumbnails.
6. **Cross-browser QA**: Test on modern browsers + mobile devices; verify responsive breakpoints.
7. **Validation scripts**: Run `npm run check` and `npm run check:a11y` locally prior to commit; CI enforces both.

## Phase 8 – Deployment & Operations
1. **Build artifacts**: Confirm `npm run build` produces `dist/` aligned with Firebase Hosting config.
2. **Firebase Hosting setup**:
   - In `/Users/bharatchaturvedi/Public/repository/firebase`, ensure `firebase.json` points hosting public path to `../sangeetSaadhna/dist`.
   - Configure rewrites if using Astro SSR (otherwise static hosting is sufficient).
3. **CI/CD pipeline**: GitHub Actions workflow (`.github/workflows/deploy.yml`) installs dependencies, runs diagnostics (`npm run check`, `npm run check:a11y`), builds, and deploys with `FirebaseExtended/action-hosting-deploy@v0`. Required repository secrets:
   - `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`, `SANITY_READ_TOKEN`
   - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`
   - `PUBLIC_SITE_URL`
   - `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT` (JSON credentials)
4. **Sanity deploy**: Use `npm run deploy` in `sanity/` to host studio if desired; otherwise manage content via hosted Sanity Studio.
5. **Monitoring**: Enable Firebase Hosting logs, set up uptime monitoring (e.g. Google Cloud Monitoring or external service).
6. **Backup strategy**: Export Sanity dataset periodically (`sanity dataset export`) and enable Firestore automatic backups if storing form submissions.

## Phase 9 – Future Enhancements & Scalability
1. **Community contributions**: Add blog or testimonies collection, allow moderators to publish via Sanity.
2. **Multilingual support**: Extend Sanity schemas for localized fields, integrate Astro i18n routing.
3. **Event registration + ticketing**: Integrate payment links or Eventbrite; manage quotas via Firebase Cloud Functions.
4. **Media library**: Create gallery pages using Sanity asset references, add filtering by event type/year.
5. **Search**: Implement client-side search (Lunr.js) or hosted (Algolia) using Sanity dataset exports.
6. **Performance scaling**: Configure Sanity webhooks to trigger the GitHub deploy workflow when content changes to keep hosting in sync.
7. **Governance**: Document contribution guidelines, content governance workflow, and roles for volunteers in README/Notion; include CI/CD runbook and rollback steps.

## Ongoing Maintenance Checklist
1. Monthly review of upcoming events content; ensure monthly program is highlighted.
2. Quarterly performance/a11y audit and dependency updates (`npm outdated`).
3. Security reviews: rotate Sanity tokens, audit Firebase IAM roles.
4. Community feedback loop: gather feedback via forms, iterate on features with stakeholders.
