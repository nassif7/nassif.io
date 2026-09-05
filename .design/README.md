# Handoff: nassif.pro Redesign

## Overview

A structural and visual redesign of **nassif.pro**, the personal site of Nassif Nassif (Software Engineer, Berlin). The redesign moves the site from a flowing, editorial, "artistic" presentation to a **structured, grid-disciplined, corporate-credible** one — while keeping a personal voice.

Three deliverables:

1. **Homepage** — single long-scroll page, 7 numbered sections
2. **CV** — printable A4 document, PDF-exportable
3. **Case study template** — demonstrated with Marineria.it; two more are planned (BookMarquee, Keen Studio)

The design goal, in the client's words, was to go from "messy me" to "someone who intends to charge money" — achieved not by decoration but by **visible grid, labeled sections, and real metadata**.

---

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior. **They are not production code to copy directly.**

The task is to **recreate these designs in the target codebase's existing environment**, using its established patterns, component library, and conventions.

The existing site lives at **`nassif7/nassif.io`** (GitHub, branch `main`) and is a **Next.js App Router project using CSS Modules**. The intended implementation path is:

- Rebuild these designs as React components in that repo
- Use CSS Modules, matching the existing `src/components/<name>/<Name>.module.css` convention
- Replace the current palette tokens in `src/styles/globals.css` with the tokens in this document
- Content currently lives in `content/projects/*.md` and `content/posts/*.md` — keep that content pipeline; the redesign changes presentation, not the content source

If a decision is ambiguous, prefer the existing repo's conventions over anything implied by the HTML structure here.

---

## Fidelity

**High-fidelity.** Final colors, typography, spacing, and interaction states are all specified. Recreate pixel-accurately using the codebase's existing patterns.

Two deliberate exceptions, both flagged in-place:

- The **CV** contains no placeholders anymore — it is complete and real.
- The **Moviemiento** entry in the work index carries the year `2023`, which is **an unverified guess**. Confirm with Nassif before shipping.

---

## Design Tokens

Defined in `styles/nassif.css` under `:root`. Port these into `src/styles/globals.css`.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#FFFFFF` | Page ground |
| `--paper-2` | `#F7F7F7` | Utility bar, table row hover |
| `--paper-3` | `#ECECEC` | Image placeholder ground |
| `--ink` | `#000000` | All body and heading type |
| `--ink-2` | `#1A1A1A` | Reserved |
| `--espresso` | `#0C0C0C` | Dark band background |
| `--mid` | `#4A4A4A` | Secondary / body copy |
| `--muted` | `#767676` | Small labels, metadata (**AA floor — do not lighten**) |
| `--line` | `#E3E3E3` | Hairline rules |
| `--line-2` | `#C7C7C7` | Decorative-only rules, inactive arrows |
| `--rust` | `#2E2BA8` | **Accent (indigo)** |
| `--rust-lit` | `#3E3BC9` | Accent hover/filled-button hover |
| `--brass` | `#5A5A5A` | "In progress" pill |

Semantic status colors (outside the accent system):

| Purpose | Value |
| --- | --- |
| Availability dot, "live/shipped" pill border | `#4E7A3C` |
| "live/shipped" pill text | `#3F6330` |
| Dark-band eyebrow | `#9B99FF` |

> **Token naming note:** the accent variables are still named `--rust*` from an earlier warm palette. Rename to `--accent*` when porting; the name is legacy, the value is correct.

### The Accent Rule

The accent is deliberately constrained to **≤5% of surface area**. It touches only:

1. Eyebrow labels
2. Active/emphasis rules
3. Links
4. Status pills

Everything else is black on white with grey hairlines. **This restraint is the design.** Widening accent usage breaks it.

### Typography

Two families, both from Google Fonts:

- **`DM Sans`** — weights 300, 400, 500, 600, 700. All headings, body, UI.
- **`DM Mono`** — weights 400, 500. All labels, metadata, eyebrows, years, stack lists, buttons.

The grotesk/mono split is systematic: **mono signals data and chrome, sans carries prose.**

| Role | Class | Size | Weight | Tracking | Notes |
| --- | --- | --- | --- | --- | --- |
| Hero display | `.display` | `clamp(42px,5.6vw,82px)` | 500 | `-.038em` | `line-height:1`, `text-wrap:balance` |
| Section heading | `h2.sec` | `clamp(27px,3vw,40px)` | 500 | `-.026em` | `line-height:1.08` |
| Case study title | `.case-b h3` | 31px | 500 | `-.03em` | |
| Sub-heading | `h3` | 19px | 600 | `-.015em` | |
| Lead paragraph | `.lead` | 19px | 300 | — | `color:--mid`, `max-width:34em` |
| Body | `body` | 16px | 400 | — | `line-height:1.65`, `text-wrap:pretty` |
| Eyebrow | `.eyebrow` | 10px | 500 | `.2em` | mono, uppercase, accent |
| Meta key | `.meta-k` | 9.5px | 500 | `.18em` | mono, uppercase, `--muted` |
| Meta | `.meta` | 11px | 400 | `.04em` | mono, `--muted` |
| Button | `.btn` | 11px | 500 | `.1em` | mono, uppercase |
| Pill | `.pill` | 9.5px | 500 | `.12em` | mono, uppercase |

Tabular numerals (`font-variant-numeric: tabular-nums`, class `.tnum`) on **every** number that sits in a column — years, stats, index cells.

### Layout

| Token | Value |
| --- | --- |
| Max content width | `1240px` |
| Gutter (desktop) | `40px` |
| Gutter (≤900px) | `22px` |
| Grid | 12 columns, `32px` column gap |
| Grid (≤900px) | 6 columns, `20px` gap |
| Section padding | `88px 0` desktop / `60px 0` mobile |
| Breakpoints | `1120px` (masthead compression), `900px` (mobile) |

### Rules & Borders

Three weights, used consistently and meaningfully:

- `1px solid var(--line)` — ordinary dividers, table rows
- `1px solid var(--ink)` — section-head rule, table header underline
- `2px solid var(--ink)` — masthead bottom, footer top, major boundaries

**No border radius anywhere. No shadows** except on floating phone screenshots (`0 3px 22px rgba(24,20,16,.15)`). Corners are square by design.

---

## Screens / Views

### 1. Homepage (`Homepage.html`)

Single-column long scroll, seven numbered sections. Sections are numbered `01`–`07` in their eyebrows; the numbering is part of the structural read.

#### 1.1 Utility bar (`.util`)

- Full-width, `34px` tall, `--paper-2` background, `1px solid var(--line)` bottom
- Mono, `10.5px`, `.12em`, uppercase, `--muted`
- Left: `Berlin · CET`. Right: availability + email
- Availability dot: `6px` circle, `#4E7A3C`, `pulse` animation — `opacity 1 → .35 → 1`, `2.4s`, `ease-in-out`, infinite

#### 1.2 Masthead (`.mast`)

- `position: sticky; top: 0; z-index: 50`, `66px` tall
- `--paper` background, `backdrop-filter: blur(6px)`, `2px solid var(--ink)` bottom
- Logo: `n/N` — mono, 21px, weight 500, `-.03em`; the `/` is `<i>` in accent, `font-style: normal`
- Tagline: `Software Engineer` — mono `9.5px`, `.16em`, uppercase, `--muted`, separated by `1px` left border with `14px` padding
- Nav: Work / Services / Track record / Writing / CV — 14px, `--mid`, active `--ink` weight 500
- CTA: `Start a project`, filled black button

**Responsive:** at `≤1120px` nav shrinks to 13px with `8px` padding and the tagline hides. At `≤900px` nav hides entirely. All masthead children carry `white-space: nowrap; flex-shrink: 0` — this was a real bug; without it the masthead collapses in the 900–1120px band.

#### 1.3 Hero (`.hero`)

12-column, `align-items: end`:

- **Left (cols 1–9):** eyebrow `01 / Nassif Nassif — Software Engineer`; `h1.display` reading "Good software shouldn't need explanations."; lead paragraph; two buttons (`View work index` outline, `Download CV` ghost)
- **Right (cols 9–13):** `1px solid var(--line)` left border, `32px` padding-left. Portrait then a 4-row definition list
- **Portrait:** `aspect-ratio: 1`, `object-fit: cover`, `filter: grayscale(1) contrast(.94) brightness(1.04)`, `mix-blend-mode: multiply`, `1px solid var(--line)`
- **Facts:** Based in / Focus / Engagements / Languages — `.meta-k` label left, 13px value right-aligned, `1px` top rule per row (first row none)

**Stat strip** below, 4 equal columns, `1px solid var(--ink)` top and `1px solid var(--line)` bottom, `1px` left border between cells:

| Value | Label |
| --- | --- |
| `8` | Years building software |
| `3` | Companies shipped for |
| `2` | Apps in public stores |
| `React · RN` | Primary platforms |

Numbers are 26px, weight 500, `-.03em`.

#### 1.4 Section head pattern (`.sechead`)

Used by every section from `02` on. This is the core structural device:

- 12-col grid, `1px solid var(--ink)` top, `18px` padding-top, `52px` margin-bottom
- Cols 1–4: eyebrow with number
- Cols 4–11: `h2.sec` + optional lead
- Cols 11–13: right-aligned metadata (e.g. `7 entries`)

At `≤900px` all three stack full-width, left-aligned.

#### 1.5 Services — `02`

Three columns, `1px solid var(--line)` left border between (none on first). Each: `.meta-k` index (`01 / Web`), `h3`, 14.5px description, then a `<ul>` of 4 capability lines — mono 11px, `--muted`, `1px` bottom rule each, `—` prefix via `::before` in `--line-2`.

Content: **Product interfaces** (Web) / **Design systems & tooling** (Systems) / **Mobile applications** (Mobile).

#### 1.6 Selected work — `03`

Two featured `.case` blocks, each an `<a>` wrapping a 12-col grid, `44px` vertical padding, `1px solid var(--line)` top.

Two variants, alternating to create rhythm:

- **`.case-mobile`** (Marineria) — image cols 1–5, `aspect-ratio: 9/16`, portrait phone screenshot `object-fit: contain`, centered, `24px` padding on `--paper-3`, with shadow. Body cols 6–13.
- **`.case-alt`** (BookMarquee) — image cols 7–13 with `order: 2`, body cols 1–6 `order: 1`, `aspect-ratio: 16/11`, `object-fit: cover`.

> **Important:** portrait phone screenshots must use a portrait frame with `contain`. An earlier version cropped them into 16/11 landscape frames and cut the screens in half.

Body: eyebrow (`01 / Client work · 2026`), 31px title, description, a 2×2 metadata grid (Role / Platforms / Stack / Status) with `1px` rules, then a ghost `Read case study →` button.

**Hover:** image scales `1.028` and `filter` goes `saturate(.72) contrast(.98)` → `saturate(1) contrast(1)`, `.5s ease`.

#### 1.7 Work index — `04`

A real table (`table.idx`) — this is the "work log" device that does most of the corporate-credibility work.

- `th`: mono `9.5px`, `.18em`, uppercase, `--muted`, `1px solid var(--ink)` bottom
- `td`: `19px 16px 19px 0` padding, `1px solid var(--line)` bottom, `vertical-align: baseline`
- Row hover: background `--paper-2`, project name → `--ink`, arrow → accent and `translate(3px,-3px)`

Columns: Year (`70px`, mono, `--muted`) / Project (17px name + 13.5px `--muted` description) / Type (accent mono `.ix-t`) / Stack (mono `--mid`) / Status (pill) / Arrow.

Seven rows: Keen Studio (Ongoing, In progress) · Discrep (2026, Position paper) · BookMarquee (2026, Published) · oneMore (2026, App Store) · Marineria.it (2026, Shipped) · Wahl-O-Mat (2019, Delivered) · Moviemiento (2023 ⚠️ unverified, Live).

**Pill variants:** default `--line-2`/`--mid`; `.live` `#4E7A3C`/`#3F6330`; `.wip` `--brass`.

At `≤900px`, `.idx-hide` drops the Type and Stack columns.

#### 1.8 Track record — `05`

Timeline with a year gutter — doubles as the CV spine.

- Row: `96px 1fr` grid, `32px` gap, `22px` padding, `1px solid var(--line)` top (last row also bottom)
- Year: mono 13px, weight 500, **accent**
- Body: `1fr 1.1fr` grid — left is `h3` + `.tl-tag` (mono `9.5px`, `.16em`, uppercase, `--muted`), right is a 13.5px `--muted` description

Six entries, real career data: 2026 three products shipped · Ongoing Keen Studio · 2022–25 vzbv · 2019–22 LQ Enterprise · 2017–19 kloeckner.i · 2017 ReDI School.

At `≤900px` the year gutter narrows to `60px` and the body stacks.

#### 1.9 Writing — `06`

Same `table.idx` component, three columns (Date / Title / Topic). Four posts.

#### 1.10 Dark CTA band — `07`

- `--espresso` background, `--paper` text
- 12-col: text cols 1–8, buttons cols 9–13
- Heading `clamp(30px,3.6vw,46px)`, weight 500, `-.03em`
- Buttons `.btn-inv`: `1px solid rgba(243,240,233,.3)`, `--paper` text; hover inverts to `--paper` background / `--ink` text, `justify-content: space-between` so the arrow sits right

The `.dark` scope overrides `.lead`, `.body-c`, `.eyebrow`, `.meta`, `.meta-k`, `a`, and rule colors — port it as a modifier class or a themed wrapper.

#### 1.11 Footer

`2px solid var(--ink)` top. 12-col: brand cols 1–5, then Site / Elsewhere / Status link columns. Bottom bar has a `1px` top rule, mono `10.5px` uppercase — left `n|N · Nassif Nassif · Berlin · 2026`, right `Professional button-maker.` (the one sanctioned joke; the voice is otherwise straight).

---

### 2. CV (`CV.html`)

**A flowing print document, not a fixed page.** Built on a `<doc-page size="a4" margin="0.58in">` web component. Content flows and the print engine paginates onto ~2 sheets.

> **Implementation note:** an earlier version used a fixed-height page box and clipped ~483px of content while also deadlocking the preview. If reimplementing, **do not pin the page height** — let content flow and let print pagination handle it.

Point-based sizing throughout (`9.8pt` base) because the output is paper. A repeating footer (`slot="footer"`) prints on every sheet.

Structure:

1. **Header** — `n/N` logo, name at `25pt`, role line `Software Engineer · Platform · Product · UX` in accent mono; right-aligned contact block. `2px solid` black bottom rule.
2. **Intro** — one paragraph, 8 years framing, key phrase bolded
3. **Facts strip** — 4 columns: Location / Availability / Engagement / Remote
4. **Experience** — 5 roles: vzbv (Dec 2022–Sep 2025), LQ Enterprise (Mar 2019–Nov 2022), kloeckner.i (Jul 2017–Feb 2019), ReDI School (Spring 2017), Arvato Bertelsmann (Nov 2016–May 2017). Org name in accent mono uppercase **above** the job title; date right-aligned; bullets prefixed `//` in mono
5. **Projects** — 5 entries with stack tag chips: Marineria.it (2026), OneMore (2026), Keen Studio (Ongoing), BookMarquee (2026), Wahl-O-Mat (2019)
6. **Expertise** — two columns: Core stack + Tooling & testing on the left; Familiar with, Languages (English C1 / German B2 / Arabic Native), Interests on the right
7. **Education & courses** — Syrian Virtual University (2006–2009, B.Sc. IT), Tishreen University (2002–2005, Diploma CS), ReDI School (Nov 2016–Mar 2017)

Every block carries `break-inside: avoid` with `orphans: 3; widows: 3`.

Tag chips: mono `7.2pt`, `1px solid var(--line-2)`, `2.5px 6px` padding. `.pri` variant uses a black border for primary skills.

---

### 3. Case study (`Case Study - Marineria.html`)

The template for all case studies.

- **Header:** back-link, then 12-col — title block cols 1–9 (eyebrow `Case 01`, `.display` title, lead), metadata list cols 10–13 (Client / Year / Role / Platforms / Status), each row `1px` top rule
- **Hero band:** full-bleed, `aspect-ratio: 21/9`, `--paper-3` ground, `1px solid var(--ink)` top. Flex-centered, two portrait screenshots, `max-height: clamp(210px,26vw,330px)`, `38px` padding, `clamp(24px,4vw,64px)` gap

  > `height: 100%` on a flex item resolves against the container's **border box**, so padding is ignored and images touch the rules. Use an explicit max-height cap instead.

- **Body:** 12-col — sticky contents rail cols 1–4 (`top: 110px`, hidden ≤900px), prose cols 5–12
- **Five sections:** The brief / The problem / Approach / What I built / Outcome. Each `56px` padding-bottom + `1px` bottom rule (last none)
- **Prose:** 16.5px, weight 300, `--mid`, `line-height: 1.78`, `max-width: 36em`. `<strong>` goes `--ink` weight 500
- **Pull quote** (`.pull`): `2px solid` accent left border, `24px` padding-left, 20px, `max-width: 28em`
- **Spec table** (`.spec`): 2-col definition grid with `1px` rules
- **Figure** (`figure.shots`): screenshots on `--paper-3` with `1px` border, `28px` padding, caption inside with a `--line-2` top rule
- **Outcomes** (`.outs`): 3 columns, `1px solid var(--ink)` top, 24px numbers over `.meta-k` labels
- **Next-case teaser**, then the shared dark CTA band and a condensed footer

---

## Interactions & Behavior

| Element | Behavior |
| --- | --- |
| Availability dot | `pulse` keyframes, opacity `1 → .35 → 1`, `2.4s ease-in-out infinite` |
| Masthead | Sticky, `blur(6px)` backdrop |
| Nav link | `color` → `--ink`, `.15s` |
| `.btn` | → black fill, `--paper` text, `.18s` on background/color/border |
| `.btn-fill` | → accent background + border, `.18s` |
| `.btn-inv` | → `--paper` background, `--ink` text |
| Index row | Background → `--paper-2`; name → `--ink`; arrow → accent + `translate(3px,-3px)` `.2s` |
| Case card | Image `scale(1.028)` + full saturation, `.5s ease` |
| Anchor nav | `scroll-behavior: smooth` |
| Links | `a` → accent; `a:hover` → `--ink`. **Define both globally** — the editor lets the user add links later and undefined links render browser-default blue |

No JS beyond the `doc-page` component on the CV. Everything else is CSS.

---

## State Management

None. All three pages are static. The only stateful concerns for a real implementation:

- Active-section highlighting in the masthead nav (scroll-spy) — currently a hardcoded `.on` class
- Sticky contents rail active state on case studies — same
- CV PDF export — currently print-driven via `doc-page`

---

## Responsive Behavior

Two breakpoints.

**`≤1120px`** — masthead only: nav to 13px/`8px` padding, CTA padding tightens, tagline hides.

**`≤900px`** — grid drops 12 → 6 columns, gutter `40px` → `22px`, section padding `88px` → `60px`:

- Nav hides (**no mobile menu is designed — this is a gap to resolve**)
- Section heads stack, left-aligned
- Hero right column moves below with a top rule instead of a left border; portrait caps at `150px`
- Stat strip → 2×2
- Services → single column with top rules
- Case blocks force image `order: 1` / body `order: 2`
- Index tables drop `.idx-hide` columns
- Timeline gutter → `60px`, body stacks
- Case study contents rail hides; hero → `4/3` with `max-width: 44%` images

---

## Accessibility

Verified and load-bearing — several of these were real defects that got fixed:

- `--muted` is `#767676` = **4.54:1** on white. This is the **AA floor for small text and must not be lightened.** All small mono labels depend on it.
- `--line-2` (`#C7C7C7`) is for **decorative rules and inactive arrows only** — never text. Eyebrow numerals were briefly set to it and failed at 2.81:1.
- Dark-band eyebrow `#9B99FF` on `--espresso` = 7.82:1.
- Pills measure 6.90:1.
- Accent `#2E2BA8` on white = ~9.4:1.

When adding any new small-text color, measure it. The palette has no slack at label sizes.

---

## Assets

Copied from the `nassif7/nassif.io` repo — already present in that codebase under `public/`:

| File | Use |
| --- | --- |
| `public/avatar.png` | Hero portrait (500×500) |
| `public/projects/marineria/marineria1.avif` | Marineria featured card + case study hero |
| `public/projects/marineria/marineria3.avif` | Case study hero + figure |
| `public/projects/bookmarquee/bookmarquee01.avif` | BookMarquee featured card |
| `public/projects/bookmarquee/bookmarquee03.avif` | Spare |
| `public/projects/moviemiento/moviemiento3.avif` | Spare |
| `public/projects/one-more/one-more1.avif` | Spare |
| `public/nn-high-resolution-logo-black.svg` | Logo source |

The `n/N` logo in the design is **set in type, not the SVG** — mono, weight 500, with the slash in accent. Keep it as type; it scales and recolors with the system.

Fonts load from Google Fonts. Self-host DM Sans and DM Mono in production.

---

## Files in This Bundle

| File | What it is |
| --- | --- |
| `Homepage.html` | Full homepage design |
| `CV.html` | Printable A4 CV |
| `Case Study - Marineria.html` | Case study template |
| `Accent Options.html` | The accent exploration that led to indigo — 10 candidates in context. Reference for *why* the palette is what it is; not for implementation |
| `styles/nassif.css` | Shared tokens + components for homepage and case study |
| `doc-page.js` | Paged-document component the CV depends on |
| `public/` | Images |

`CV.html` carries its own tokens inline rather than importing `nassif.css`, because it is print-scoped and uses point sizing. **When porting, unify onto one token source** and keep the `pt` scale only for the print stylesheet.

---

## Known Gaps

1. **No mobile nav.** The masthead nav simply hides below 900px. Needs a menu.
2. **Moviemiento's year (`2023`) is unverified.** Confirm with Nassif.
3. **Two case studies unwritten** — BookMarquee and Keen Studio. The template supports them; only content is missing.
4. **Discrep** appears in the index with no case study and is described as a position paper — confirm it should stay.
5. **`--rust*` token names are legacy.** Rename to `--accent*`.
6. **Scroll-spy nav state** is hardcoded.
7. **Writing posts have no detail pages** in this redesign — the repo has `content/posts/*.md`; the index links need real routes.

---

## Design Rationale

Worth knowing so decisions don't get undone in implementation:

- **The client's diagnosis was "too flat, too personal, too artistic."** The fix was **not** a new palette — it was alignment and labeling. Visible grid, hairline rules, eyebrow labels, numbered sections, and metadata rows are what produce corporate credibility. Repetition and alignment, not decoration.
- **The palette went white + indigo** after an explicit exploration (see `Accent Options.html`). Indigo was chosen partly because it matches Nassif's existing CV, so site and PDF read as one system.
- **The accent is capped at ≤5% of surface.** Restraint is the mechanism.
- **The grotesk/mono split is semantic** — mono for data and chrome, sans for prose. "Personality lives in the prose, professionalism in the frame."
- **The work index table and the career timeline** do the heaviest lifting. Three named employers over eight years on a labeled timeline reads very differently than a set of side projects.
- **Voice was dialed back about half.** One joke survives, in the footer. Keep it there.
