# Data models

The content model for nassif.io, defined in Payload CMS ([payload.config.ts](payload.config.ts)).

- **Database:** Postgres (`postgresAdapter`)
- **Rich text:** Lexical (`lexicalEditor`)
- **Media storage:** Vercel Blob

Shapes are shown as TypeScript-style documents, the way the API returns them. Every collection document also has `id`, `createdAt` and `updatedAt`. Fields are optional unless marked `required`.

**Arrays of objects:** Payload stores repeatable text fields as arrays of objects, not plain string arrays. For example, `tags` is `{ tag: string }[]`, not `string[]`.

## Collections

| Slug | Source | Purpose |
| --- | --- | --- |
| `posts` | [Posts.ts](src/collections/Posts.ts) | Blog posts |
| `post-collections` | [PostCollections.ts](src/collections/PostCollections.ts) | Groupings / series for posts |
| `projects` | [Projects.ts](src/collections/Projects.ts) | Work items and case studies |
| `experience` | [Experience.ts](src/collections/Experience.ts) | Track record (homepage) and CV entries |
| `media` | [Media.ts](src/collections/Media.ts) | Image uploads |
| `users` | [Users.ts](src/collections/Users.ts) | Admin authentication |

## Globals

| Slug | Source | Purpose |
| --- | --- | --- |
| `settings` | [Settings.ts](src/globals/Settings.ts) | Site-wide contact info, SEO, footer, shared CTAs |
| `homepage` | [Homepage.ts](src/globals/Homepage.ts) | Homepage copy, section by section |

---

## Post

`posts`, with title field `title`.

```ts
Post {
  title:       string            // required
  slug:        string            // required, unique
  date:        Date              // required
  tags:        { tag: string }[]
  collections: PostCollection[]  // relationship → post-collections, hasMany
  excerpt:     string            // textarea
  featured:    boolean           // default false
  hidden:      boolean           // default false
  body:        RichText
}
```

## PostCollection

`post-collections`, with title field `title`. Posts link to these through `Post.collections`.

```ts
PostCollection {
  title: string                  // required
  slug:  string                  // required
}
```

## Project

`projects`, with title field `name`.

Image fields here accept either a `Media` upload or a legacy `url` string (a Sanity CDN link from before the migration). Code that renders them has to handle both.

```ts
Project {
  // ── Basics ─────────────────────────────────────────────
  name:          string          // required
  slug:          string          // required, unique
  type:          string
  desc:          string          // textarea
  year:          string          // work-index year column: "2026" | "Ongoing"
  client:        string          // case study only, e.g. "Marineria.it"
  role:          string          // e.g. "Lead frontend"
  platforms:     string          // e.g. "iOS · Android"
  status:        string          // e.g. "Shipped", "In progress"
  statusVariant: 'default' | 'live' | 'wip'   // default 'default'

  // ── Lists ──────────────────────────────────────────────
  categories: { category: string }[]
  stack:      { item: string }[]
  images:     { image?: Media; url?: string }[]
  links: {
    platform: 'Website' | 'App Store' | 'Google Play' | 'Chrome Web Store'
            | 'VS Code Marketplace' | 'GitHub' | 'npm'   // required
    url?:       string
    comingSoon: boolean          // default false
  }[]
  privacyPolicy: string          // full public URL

  // ── Sidebar flags ──────────────────────────────────────
  hidden:        boolean         // default false
  featured:      boolean         // default false
  featuredImage: Media           // image shown in the home grid
  featuredOrder: number          // home grid slot 1–5, default 0
  wip:           boolean         // default false
  brainstorm:    boolean         // default false
  order:         number          // work index display order, default 0
  caseStudy:     boolean         // default false; renders the case-study template

  // ── Case study (admin shows it only when caseStudy = true) ──
  caseStudyContent: {
    eyebrow:    string           // e.g. "Case 01"
    category:   string           // e.g. "Client work · Mobile"
    lead:       string           // textarea
    heroImages: { image?: Media; url?: string; alt?: string }[]
    sections: {
      sectionId:     string      // required, anchor id, e.g. "brief"
      num:           string      // required, e.g. "01"
      eyebrow:       string      // required, e.g. "The brief"
      heading:       string      // required
      body:          RichText
      pullQuote:     string      // textarea
      spec:          { k: string; v: string }[]          // both required
      figureCaption: string
      figureImages:  { image?: Media; url?: string; alt?: string }[]
      outcomes:      { value: string; label: string }[]  // both required
    }[]
  }

  body: RichText
}
```

## Experience

`experience`, with title field `title`. One entry can appear in both the homepage track record and the CV; the `showIn*` flags control which.

```ts
Experience {
  title:       string            // required, e.g. "Software Developer UI/UX"
  tag:         string            // employer, or a project list for milestone entries
  year:        string            // required, track record year: "2022–25" | "Ongoing"
  cvWhen:      string            // CV date range, e.g. "Dec 2022 — Sep 2025"; falls back to year
  description: string            // textarea, track record prose (homepage)
  bullets:     { text: string }[]  // CV detail bullets

  // ── Sidebar ────────────────────────────────────────────
  showInTrackRecord: boolean     // default true
  current:           boolean     // default false; filled timeline node
  showInCV:          boolean     // default true
  order:             number      // default 0
}
```

## Media

`media`, an upload collection. Uploads are converted to webp at quality 80 and resized to at most 2400px wide, without enlarging smaller images.

```ts
Media {
  alt: string
  // plus Payload's standard upload fields:
  // url, filename, mimeType, filesize, width, height
}
```

## User

`users`, with title field `email`. It has `auth: true` and no custom fields, so it holds only Payload's built-in auth fields (`email`, password hash, etc.).

---

## Settings (global)

`settings`, in the **Site** admin group.

```ts
Settings {
  // ── Contact / identity ─────────────────────────────────
  email:        string           // required
  location:     string           // required, e.g. "Berlin"
  timezone:     string           // required, e.g. "CET"
  availability: string           // required, e.g. "Available for Q4 2026"
  role:         string           // required, masthead tagline
  github:       string
  linkedin:     string

  // ── SEO ────────────────────────────────────────────────
  seoTitle:       string         // browser tab title
  seoDescription: string         // textarea, meta description

  // ── Footer ─────────────────────────────────────────────
  footerTagline: string          // textarea
  footerJoke:    string          // the one sanctioned joke

  // ── Closing CTA on project & case study pages ─────────
  caseStudyCtaEyebrow: string
  caseStudyCtaHeading: string
  caseStudyCtaLead:    string    // textarea

  // ── Closing CTA on blog post pages ─────────────────────
  postCtaEyebrow: string
  postCtaHeading: string
  postCtaLead:    string         // textarea
}
```

## Homepage (global)

`homepage`, in the **Site** admin group. The fields follow the page's numbered sections from top to bottom.

```ts
Homepage {
  // ── Hero ───────────────────────────────────────────────
  heroEyebrow:         string    // required
  heroHeading:         string    // required
  heroLead:            string    // required, textarea
  heroPrimaryButton:   string    // label; links to #work
  heroSecondaryButton: string    // label; links to /cv
  facts: { label: string; value: string }[]   // hero right-column definition list
  stats: { value: string; label: string }[]   // hero stat strip

  // ── 02 / Services ──────────────────────────────────────
  servicesSectionTitle: string
  servicesSectionLead:  string   // textarea
  services: {                    // at least 1 row
    index:       string          // required, e.g. "01 / Web"
    title:       string          // required
    description: string          // required, textarea
    items:       { text: string }[]
  }[]

  // ── 03 / Selected work ─────────────────────────────────
  workSectionTitle: string
  workSectionLead:  string       // textarea

  // ── 04 / Work index ────────────────────────────────────
  indexSectionTitle: string

  // ── 05 / Track record ──────────────────────────────────
  trackSectionTitle: string

  // ── 06 / Writing ───────────────────────────────────────
  writingSectionTitle: string
  writingSectionLead:  string    // textarea

  // ── Closing CTA ────────────────────────────────────────
  ctaEyebrow: string
  ctaHeading: string             // required
  ctaLead:    string             // required, textarea
}
```

## Relationships

```
Post ──collections (hasMany)──▶ PostCollection

Project ──featuredImage──────────────────────▶ Media
        ──images[].image─────────────────────▶ Media
        ──caseStudyContent.heroImages[].image─▶ Media
        ──caseStudyContent.sections[].figureImages[].image ──▶ Media
```

`Experience`, `Settings`, `Homepage` and `User` don't reference any other model.
