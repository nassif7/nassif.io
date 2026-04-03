# nassif-website

Personal website built with **Next.js 14**, **TypeScript**, and **Base UI** (headless component library by MUI).

## Stack

- **Next.js 14** — App Router, server components by default
- **TypeScript** — strict mode
- **Base UI** (`@base_ui/react`) — headless, unstyled primitives:
  - `Button` — hero CTAs (focus, disabled, aria handling)
  - `Tooltip` — stack item role labels on hover
  - `Dialog` — email copied toast/confirmation
- **CSS Modules** — scoped styles, no Tailwind, no CSS-in-JS
- **clsx** — conditional classNames

## Base UI usage in this project

| Component | Where | Why |
|-----------|-------|-----|
| `Button` | `Hero.tsx` | Accessible button with focus ring, disabled state |
| `Tooltip` | `Stack.tsx` | Hover label showing tech role, keyboard accessible |
| `Dialog` | `Contact.tsx` | Toast confirmation when email is copied |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    layout.tsx       # Root layout, imports Nav
    page.tsx         # Home page, assembles all sections
  components/
    nav/
      Nav.tsx        # Sticky nav with scroll-active link tracking
      Nav.module.css
    hero/
      Hero.tsx       # Dark grid hero section
      Hero.module.css
    sections/
      About.tsx
      Stack.tsx      # Base UI Tooltip
      Projects.tsx
      Writing.tsx
      Contact.tsx    # Base UI Dialog (toast)
      Footer.tsx
      section.module.css  # Shared section styles
  lib/
    data.ts          # All site content in one place — edit here
  styles/
    globals.css      # CSS variables, reset, fonts
```

## Customising content

All content lives in `src/lib/data.ts`:
- `NAV_LINKS` — navigation items
- `STACK_ITEMS` — tech stack grid
- `PROJECTS` — project cards
- `WRITING_TAGS` — blog tag pills
- `CONTACT_ITEMS` — contact grid

## Deploying to Vercel

```bash
npx vercel
```
