# Before publishing

Status when written (2026-10-10): the redesign is committed locally, `main` is 5 commits ahead of `origin/main`, nothing is pushed.

## Must do

- [ ] **Finish the topics migration.** The database has 0 topics and 0 of 6 posts linked, so Writing shows blank topics and an empty filter chip.
  1. Run `npm run dev`. Answer the schema prompts with the first option (`+ … create`). Answer **Yes** to dropping the old `topic` column.
  2. When `/admin` loads, run:
     `NODE_ENV=development node -r ./scripts/_patch-next-env.cjs --import tsx scripts/migrate-topics.ts <scratchpad>/payload-backup-3`
     (`payload-backup-3/` holds the old post topics. If the folder is gone, assign topics by hand: Croissant, What it means to finish something, A human life → Philosophy; Notion project manager, The frontend is never just frontend → Tech; On the politics of interface design → Politics.)
- [ ] **Deploy code and database together.** The database already has the new schema and content. The live site still runs the old code, which reads the old shape, so it is probably broken until you push and deploy. Production does not push schema changes by itself.
- [ ] **Contact form.** Without these it only logs and shows an error with your email:
  - Create a Resend account and an API key; verify the `nassif.pro` domain.
  - Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in `.env.local` **and** in the host's environment settings (Vercel).
  - Send a test message from the live site.
- [ ] **Production environment variables.** Confirm `DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `NEXT_PUBLIC_POSTHOG_HOST` are set on the host.
- [ ] **Check the content cache.** Edit something in the live `/admin` and confirm the public page updates (content is cached until saved or one hour).

## Review in `/admin` (not blockers)

- [ ] Project years: Marineria 2024, oneMore 2025, BookMarquee 2025, Moviemiento 2017.
- [ ] Discrep is visible (it was hidden before). Tick Draft to hide it.
- [ ] Marineria's cover is a cropped profile screen: pick a better one.
- [ ] Keen Studio vs Discrep order (both 2026): set `Order` on Keen Studio to 1 if it should come first.
- [ ] Wording of roles, statuses and technologies (e.g. "Lead Product", "VS Code").
- [ ] Footer quote and nav are in code (`src/data/site.ts`), not editable in the admin.

## Not verified yet

- [ ] Real devices and Safari (only Chromium was tested).
- [ ] The modals (project, essay, contact) on a phone.
- [ ] Lighthouse, accessibility and SEO checks: sitemap, RSS (`/writing/rss.xml`), OG image.

## Cleanup (optional)

- [ ] Delete the unused old components in `src/components/` (`sections`, `masthead`, `hero`, `ui`, `identity`, `cta`, `project-header`, `book`, `nav`, `topbar`, `prose`, `layout`, `utilitybar`, `case-study`, `DonateBar*`, `ProjectGallery*`).
- [ ] Delete the old loaders in `src/lib/` (`projects.ts`, `posts.ts`, `experience.ts`, `homepage.ts`, `settings.ts`, `data.ts`).
- [ ] Remove the Legacy collections in `/admin` once you are happy (Experience, PostCollections, Settings, Homepage).
- [ ] Decide what to do with `/cv`: it still exists but is not in the nav; the About page still links to the CV PDF.
- [ ] `scripts/migrate-redesign.ts` and `scripts/migrate-taxonomies.ts` were one-time; remove them after the migration is done.
