<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into nassif.io. PostHog is now initialized via `instrumentation-client.ts` (Next.js 15.3+ pattern) with a reverse proxy through `/ingest` to reduce ad-blocker interference. Server-side tracking is handled by a shared `posthog-node` client in `src/lib/posthog-server.ts`. Nine events are instrumented across client and server, covering the full portfolio conversion funnel from content discovery to contact.

| Event | Description | File |
|-------|-------------|------|
| `project_viewed` | User viewed a project detail page — top of portfolio funnel | `src/app/(site)/projects/[slug]/page.tsx` |
| `post_viewed` | User viewed a blog post — top of content funnel | `src/app/(site)/blog/[slug]/page.tsx` |
| `project_link_clicked` | User clicked an external project link, App Store button, or privacy policy | `src/components/analytics/ProjectLinks.tsx` |
| `cta_clicked` | User clicked a call-to-action button (home, project, or blog pages) | `src/components/cta/CallToAction.tsx` |
| `social_link_clicked` | User clicked Email, GitHub, or LinkedIn in the contact section | `src/components/sections/Contact.tsx` |
| `contact_form_submitted` | User successfully submitted the contact form | `src/components/sections/Contact.tsx` |
| `contact_form_failed` | Contact form submission returned an error | `src/components/sections/Contact.tsx` |
| `ko_fi_clicked` | User clicked the Ko-fi donation link | `src/components/DonateBar.tsx` |
| `contact_received` | Server-side: contact form message processed by the API | `src/app/api/contact/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](https://eu.posthog.com/project/192624/dashboard/720994)
- [Contact conversion funnel](https://eu.posthog.com/project/192624/insights/d4KPyWKx) — project_viewed → cta_clicked → contact_form_submitted
- [Contact form submissions](https://eu.posthog.com/project/192624/insights/6imtEKfa) — submitted vs. failed over time
- [Content engagement](https://eu.posthog.com/project/192624/insights/TiWXfhiS) — project views + post views over time
- [Outbound link clicks](https://eu.posthog.com/project/192624/insights/rCi89WJA) — project links, social links, CTAs, Ko-fi
- [Total contacts received](https://eu.posthog.com/project/192624/insights/9bfZOJlk) — all-time contact form submissions

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
