# nassif.pro — Claude Code handoff

Rebuild the redesigned site in `nassif7/nassif.io` (Next.js App Router, content in `content/`). The HTML files in this project are the **visual spec** — open them in a browser and match them exactly. Their inline JS arrays (`P`, `D`, `A`) are sample content; replace them with the content layer described below.

---

## 1. Routes

| Route | Spec file | Summary |
|---|---|---|
| `/` | Home.html | One screen, no page scroll on desktop. Hero, portrait, featured project + featured article. |
| `/projects` | Projects.html | Screen-height frame; only the list scrolls. One filter: **type**. Hover row → preview panel. |
| `/projects/[slug]` | Project.html | Opens as full-screen modal from lists (see 3c); standalone page on direct visit. Two layouts by `kind`. |
| `/writing` | Writing.html | Same frame as Projects. One filter: **topic**. |
| `/writing/[slug]` | Article.html | Essay reader. Modal from lists (see 3c); standalone on direct visit. |
| `/about` | About.html | Left: timeline. Right: about text, portrait, facts, links. Each column scrolls independently. |
| `/cv` | CV.html | A4 printable CV. **Still old warm styling — restyle to the site system** (white, ink, petrol accent, Archivo + DM Mono). |

Delete the old homepage sections (masthead, TopBar, Stack, grid/noise overlays, italic serif display).

---

## 2. Global design system

**Colour tokens**
```css
--bg:#FFFFFF; --ink:#0B0B0D; --mute:<neutral grey from spec>; --hair:<light grey rule from spec>;
--acc:#2F6664; /* petrol — ~5% of the page */
```
Accent is used ONLY for: links + hover, arrows, active nav item, section/figure numbers, "live" status dots, the footer quote, the portrait lines, small metadata highlights. Never for big type, backgrounds, cards, or body text. No other colours. No gradients.

**Type**
- Archivo — headings and body. DM Mono — uppercase metadata (`.k`: ~10–11px, letter-spacing .14em).
- No serif anywhere. Hero contrast: huge heavy "PRODUCT", thin "ENGINEER,", tiny mono metadata.

**Rules**
- Nothing tilted or rotated — logo included.
- Thin 1px rules (`--ink` for section heads, `--hair` for rows).
- Images greyscale by default, full colour on hover of their row/card (`filter` transition ~.4s).
- `prefers-reduced-motion: reduce` → no transitions or reveals.

**Shell (every page)**
- `<header>`: logo (links `/`) left; nav right — Projects · Writing · About · CV. Current page: accent colour + `aria-current="page"`.
- `<footer>`: left "Built with love, shipped with hope 🙂" in `--acc`; right `Berlin · {today}` — today in `Europe/Berlin`, `en-GB`, `{day:'numeric',month:'short',year:'numeric'}` → "7 Oct 2026". Render client-side to avoid hydration mismatch.
- Desktop: fixed-height sheet (`html,body{height:100%;overflow:hidden}`, `.sheet{position:fixed;inset:0;display:grid}`), scroll only inside the designated regions (`min-height:0;overflow-y:auto`, thin scrollbar).
- **Breakpoint `(max-width:860px),(max-height:480px)`** → normal page scroll. Release height too: `html,body{height:auto;min-height:100%;overflow:auto}`, `.sheet{position:static}`, all scroll regions `overflow:visible`. Forgetting `height:auto` clips content.

**Portrait**
`public/avatar.png` drawn to a `<canvas>` as horizontal engraved lines in `--acc` (algorithm in the inline script of Home.html / About.html: sample luminance per pixel, draw 1px-wide vertical bars whose height = darkness × line spacing). Small accent corner brackets + "Fig. 01" caption. Make it a `<Portrait size>` client component.

---

## 3. Page specs

**Home** — header; hero headline "Product engineer, / whole thing — not a layer of it." + one line ("Nassif Nassif, Berlin. Eight years between design and engineering — from the first sketch to the store listing."); portrait top-right with Berlin clock, coordinates, availability; bottom row: `01 Featured project` (project where `featured:true`) with "All projects →", and `02 Featured article` (post where `featured:true`) with "All writing →". Featured project image greyscale → colour on hover.

**Projects** — title + count ("07 projects"); type chips (`All` + one per type present, with counts); list rows: year · name · desc · type · status; right panel shows hovered/focused row's image + meta (falls back to typographic panel if no image). Rows link to `/projects/[slug]`. Keyboard focus = hover. Filter state in URL `?type=`.

**Project** — header block: name + type, "Case study" / "Project entry", `No. 01 · 2024`. Side: image (or none), facts (Role, Year, Client?, Platform?, Stack, Status). 
- `entry`: lede + 1–3 short paragraphs + external links.
- `case-study`: contents rail (sticky) from `sections`; each section = number + label, heading, paragraphs, optional pull quote, optional figure, optional outcome stats. 
- Footer nav: previous / next project.

**Writing** — same as Projects with topic chips (`?topic=`), rows: date · title · dek · topic · reading time.

**Article** — title, dek, meta (date · topic · reading time), body max ~36em, prev/next.

**About** — left `Timeline` (newest first, year column + vertical rule + dot; `current:true` items get filled accent dot and accent year; education items lighter weight). Right: lede, portrait thumbnail, 3 paragraphs, facts (Based in, Languages, Engagement, Status with live dot), links (CV ↓, Email, GitHub, LinkedIn).

---

## 3b. Mobile & small screens

The HTML spec files already contain the responsive rules — resize the browser to check. Three tiers:

| Tier | Query | Behaviour |
|---|---|---|
| Desktop | default | Fixed one-screen sheet, internal scroll regions only. |
| Short desktop | `max-height:640–700px` | Drop secondary text so the sheet still fits: list descriptions (`.row p`), Home project dek, Article "more" block, Project contents rail; Project figure capped at 30vh. |
| Tablet / phone | `(max-width:860px),(max-height:480px)` | Page scrolls normally. `html,body{height:auto;min-height:100%;overflow:auto}`, `.sheet{position:static;min-height:100svh}`, single column, every scroll region `overflow:visible`. |
| Small phone | `max-width:560px` | Header stacks (logo above nav), page titles stack with their metadata left-aligned. |

**Per page (≤860px unless noted)**
- **Home** — currently switches at `(max-width:640px),(max-height:440px)`; **align it to 860/480** like every other page. Stack: header → headline → intro → portrait (96px) → featured project (image 16:10 above text) → featured article → footer (two lines, stacked).
- **Projects / Writing** — hover preview panel hidden (no hover on touch); list flows with the page; descriptions always shown; sticky table head at `top:0`. ≤560px: table head hidden, rows become `28px | 1fr | 40px` (number · title+desc · year), type and arrow columns hidden, filter chips wrap under their label.
- **Project** — side facts above content, figure 16:10 full-width, contents rail hidden. ≤560px: outcome stats one per row.
- **Article** — single column, reading-progress bar and "more" block hidden.
- **About** — **About text first, timeline second** (`order`). ≤560px: timeline year gutter narrows (rule at 66px, years 56px wide), portrait drops below the lede.
- **Nav** — stays as plain text links; no hamburger. On ≤560px it sits on its own row under the logo and wraps if needed.
- **Touch** — all hover effects (greyscale → colour, arrow nudge) also trigger on `:focus-visible`; never hide information behind hover. Minimum tap target 44px for chips and nav links (add padding, not visible size).
- Use `100svh`, not `100vh`, so mobile browser bars don't clip the sheet.

---

## 3c. Detail views open in a full-screen modal

Projects and posts do **not** navigate away from the list. Clicking a row (Projects, Writing) or a featured item (Home) opens the detail in a full-screen modal over the current page. Prototype: `modal.js` (+ the `embed=1` script at the end of Project.html / Article.html).

**Behaviour**
- Modal = white full-viewport layer. Top bar: label left ("Project" / "Essay", accent, mono), "Close  Esc ×" right; 1px ink rule under it. Below: the detail page content **without** site header and footer.
- Opens with 320ms fade + 14px rise; `prefers-reduced-motion` → instant.
- URL updates (pushState) so the open item is shareable; Back closes the modal; Forward reopens it.
- Close: × button, Esc, browser Back. Focus moves to Close on open and returns to the clicked row on close. Background scroll locked. `role="dialog" aria-modal="true"`, focus trapped.
- Prev/next links inside the modal swap the content in place (replaceState, no new history entry).
- Inside the modal, every same-origin link is intercepted: Project/Article links swap content in place; the list link of the page underneath ("← Projects index" on /projects, "← Writing" on /writing) just closes the modal; other site links navigate the top window; external links open in a new tab.
- Esc always closes and restores the list URL, even after in-modal navigation.
- On ≤860px the title stays first inside the modal (no grid-row overrides leaking into the stacked layout).
- Cmd/Ctrl/middle-click on a row still opens the real page in a new tab.
- **Direct visit / refresh of `/projects/[slug]` or `/writing/[slug]` renders the full standalone page** (with header + footer) — good for SEO and sharing.

**Next.js implementation** — intercepting + parallel routes:
```
app/
  layout.tsx                      // renders {children}{modal}
  @modal/default.tsx              // returns null
  @modal/(.)projects/[slug]/page.tsx   // <Modal><ProjectDetail/></Modal>
  @modal/(.)writing/[slug]/page.tsx    // <Modal><PostDetail/></Modal>
  projects/[slug]/page.tsx        // full page: <Shell><ProjectDetail/></Shell>
  writing/[slug]/page.tsx
```
`ProjectDetail` / `PostDetail` are shared components — no iframe. `<Modal>` is a client component: close = `router.back()`, Esc listener, focus trap, scroll lock. In-modal prev/next use `router.replace`.

---

## 4. Data models

Content lives in the repo as Markdown/MDX + frontmatter (projects, posts) and YAML/JSON (site, profile, timeline). Validate everything with **Zod** in `src/lib/content/schema.ts`; loaders in `src/lib/content/*.ts`; fail the build on invalid content. Dates are ISO strings — all formatting happens in UI.

### 4.1 Project — `content/projects/{slug}.mdx`
```ts
const ProjectType = z.enum([
  'Mobile app','Browser extension','Website','Dev tool','Editor theme','Concept'
]); // the ONLY filter on /projects — add values here, nowhere else

const Project = z.object({
  slug: z.string(),                    // from filename; URL key
  name: z.string(),                    // "Marineria.it"
  kind: z.enum(['case-study','entry']),// picks the detail layout
  type: ProjectType,
  year: z.number().int(),              // list sort (desc) + meta
  role: z.string(),                    // "Lead frontend"
  client: z.string().optional(),       // client work only
  platform: z.string().optional(),     // "iOS · Android"
  stack: z.array(z.string()),          // display only, not filtered
  status: z.object({
    label: z.string(),                 // "Live · App Store", "In progress", "Position paper"
    live: z.boolean().default(false),  // true → accent dot
  }),
  summary: z.string().max(160),        // one-line desc used in list + home card
  lede: z.string(),                    // detail page intro
  cover: Image.optional(),             // list preview + detail side image
  links: z.array(Link).default([]),    // store / repo / live site
  featured: z.boolean().default(false),// exactly one → homepage
  order: z.number().optional(),        // manual override of year sort
  draft: z.boolean().default(false),   // hidden in production
  sections: z.array(CaseSection).optional(), // REQUIRED when kind==='case-study'
});
// MDX body = paragraphs for kind 'entry' (1–3 short paragraphs)

const CaseSection = z.object({
  id: z.string(),            // anchor, "brief"
  label: z.string(),         // rail + eyebrow, "The brief"
  heading: z.string(),       // "A web platform needed to become a mobile product."
  body: z.string(),          // markdown; inline **strong** allowed
  pull: z.string().optional(),
  figure: z.object({ image: Image, caption: z.string() }).optional(),
  outcomes: z.array(z.object({ value: z.string(), label: z.string() })).optional(), // "2" / "Platforms, one codebase"
});

const Image = z.object({ src: z.string(), alt: z.string(), width: z.number(), height: z.number() });
const Link  = z.object({ label: z.string(), href: z.string().url() });
```
Refinement: `kind==='case-study'` ⇒ `sections.length >= 1`. Only one `featured:true`.

Seed content (from spec): Keen Studio (Dev tool, 2026, in progress), Discrep (Concept, 2026, position paper), BookMarquee (Browser extension, 2025, live · Chrome Web Store), oneMore (Mobile app, 2025, live · App Store), Marineria.it (Mobile app, 2024, live · iOS & Android, **case-study, featured**), Bone Page & Kohle und Meer (Editor theme, 2024, published · VS Code), Moviemiento (Website, 2023, live). The full Marineria case study text is in Project.html → `D[...].sections`.

### 4.2 Post — `content/posts/{slug}.mdx`
```ts
const Topic = z.enum(['Philosophy','Politics','Tech']); // the ONLY filter on /writing

const Post = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string().date(),        // "2026-05-20" → "20 May 2026" / list "May 2026"
  topic: Topic,
  dek: z.string().max(200),       // subtitle; list + home card
  featured: z.boolean().default(false), // exactly one → homepage
  draft: z.boolean().default(false),
  updated: z.string().date().optional(),
});
// derived at build: readingTime (words/230, rounded up), prev/next by date
// MDX body = essay
```
Seed: Croissant as a statement (Philosophy, May 2026, **featured**), On the politics of interface design (Politics, Mar 2025), What it means to finish something (Philosophy, Feb 2025), The frontend is never just frontend (Tech, Jan 2025). Exact days: check existing `content/posts` frontmatter.

### 4.3 Timeline entry — `content/timeline.yaml`
```ts
const TimelineEntry = z.object({
  start: z.number().int(),            // 2022
  end: z.number().int().nullable(),   // 2025 | null = ongoing → "Now"
  label: z.string().optional(),       // display override, e.g. "Now"
  title: z.string(),                  // "Software Developer UI/UX"
  org: z.string(),                    // "Verbraucherzentrale Bundesverband"
  kind: z.enum(['work','project','education','volunteer','research']),
  current: z.boolean().default(false),// accent dot
  summary: z.string().optional(),     // one line; education usually none
  showOnCV: z.boolean().default(true),// CV reuses this source
});
// display year: label ?? (start===end || !end ? start : `${start}–${String(end).slice(-2)}`)
```
Sorted newest first. Seed = the 11 entries in About.html. The CV's experience/education blocks read from the same file — one source of truth.

### 4.4 Profile — `content/profile.yaml`
```ts
const Profile = z.object({
  name: z.string(), role: z.string(),          // "Nassif Nassif", "Product engineer"
  city: z.string(), timezone: z.string(),      // "Berlin", "Europe/Berlin"
  coords: z.string(),                          // "52.52° N · 13.40° E"
  since: z.number(),                           // 2016
  headline: z.tuple([z.string(), z.string(), z.string()]), // "Product","engineer,","whole thing — not a layer of it."
  intro: z.string(),                           // home one-liner
  aboutLede: z.string(),
  aboutBody: z.array(z.string()),              // 3 paragraphs
  languages: z.array(z.object({ name: z.string(), level: z.string() })),
  engagement: z.string(),                      // "Contract · Full-time"
  availability: z.object({ open: z.boolean(), label: z.string() }), // "Available Q4 2026"
  email: z.string().email(),
  socials: z.array(Link),                      // GitHub, LinkedIn
  portrait: Image,                             // public/avatar.png
  cv: z.object({ pdf: z.string() }),           // generated or static PDF
  skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })), // CV only — never on home
});
```

### 4.5 Site config — `content/site.yaml`
```ts
const Site = z.object({
  title: z.string(), url: z.string().url(),     // "nassif.pro"
  description: z.string(),
  nav: z.array(z.object({ label: z.string(), href: z.string() })), // Projects, Writing, About, CV
  footerQuote: z.string(),                      // "Built with love, shipped with hope 🙂"
  accent: z.string().default('#2F6664'),
  ogImage: z.string(),
});
```

### 4.6 Derived (build time, not stored)
- `projectTypes` / `topics` with counts → filter chips (only types that have ≥1 non-draft item).
- `featuredProject`, `featuredPost` → Home.
- `prev/next` for projects (list order) and posts (date).
- `readingTime` per post.
- Sitemap, RSS (`/writing/rss.xml`), per-page OG metadata from title + summary/dek.

---

## 5. Implementation notes
- Server components for pages; small client components for: filters (URL search params), list hover preview, portrait canvas, footer date, Berlin clock.
- `generateStaticParams` for all slugs; 404 for drafts in production.
- Use `next/image` for covers; keep the CSS greyscale→colour hover.
- Accessibility: chips are `<button aria-pressed>`; list rows are real links; scroll regions get `tabindex="0"` + `aria-label`; visible focus ring in `--acc`.
- Keep CSS in modules or one tokens file; class names in the spec (`.k`, `.sheet`, `.tl`, `.chip`) are references, not requirements.

## 6. Open items (confirm with Nassif)
1. Project years: CV puts Marineria, oneMore, BookMarquee in 2026; spec data says 2024/2025. Pick one.
2. Moviemiento year (2023 is a guess).
3. Case studies for BookMarquee and Keen Studio not written yet — ship as `kind: entry` until they are.
4. CV page needs the restyle (section 1).
5. Home mobile breakpoint is 640px in the spec — use 860px (section 3b).
