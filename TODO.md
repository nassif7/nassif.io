# Before publishing

The public site now reads its content from local typed files in `src/data/seed/`. Payload admin/API routes and Sanity upload tooling have been disconnected.

## Must do

- [ ] **Contact form (Web3Forms).** The form posts straight from the browser to Web3Forms; there is no server route any more.
  - In Web3Forms, create the form (Website URL: `nassif.pro`) and copy the access key.
  - Set `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` **and** in Vercel (Production), then redeploy (the key is baked in at build time).
  - Send a test message from the live site and confirm it arrives in the inbox.
- [ ] **Production analytics.** Confirm `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` are set on the host.

## Not verified yet

- [ ] Real devices and Safari (only Chromium was tested).
- [ ] The modals (project, essay, contact) on a phone.
- [ ] Lighthouse, accessibility and SEO checks: `/sitemap.xml` returns 404 (none exists yet), RSS (`/writing/rss.xml`), OG image.

## Cleanup (optional)

- [ ] Delete the unused old components in `src/components/` (`sections`, `masthead`, `hero`, `ui`, `identity`, `cta`, `project-header`, `book`, `nav`, `topbar`, `prose`, `layout`, `utilitybar`, `case-study`, `DonateBar*`, `ProjectGallery*`).
- [ ] Delete the old loaders in `src/lib/` (`projects.ts`, `posts.ts`, `experience.ts`, `homepage.ts`, `settings.ts`, `data.ts`).
- [ ] Decide what to do with `/cv`: it still exists but is not in the nav; the About page still links to the CV PDF.
- [ ] Remove one-time migration scripts and retired Payload configuration after confirming no future data recovery is needed.
