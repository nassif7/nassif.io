// Backfills the `settings` and `homepage` globals, plus Marineria's
// caseStudyContent, with the values that used to be hardcoded in components.
// Run once against the target DB:
//   node -r ./scripts/_patch-next-env.cjs --import tsx scripts/seed-payload-content.ts
// (plain `npx tsx` crashes here — tsx's ESM/CJS interop mishandles @next/env
// once @payloadcms/db-postgres pulls in payload/node; see _patch-next-env.cjs)
import { readFileSync } from 'fs'
import { getPayload } from 'payload'

// Static imports evaluate before any other top-level code, so
// `payload.config.ts` (which reads process.env.PAYLOAD_SECRET/DATABASE_URL
// at import time) must not be statically imported until env vars are set —
// hence the dynamic import() below instead of a top-level `import config from`.
try {
  const env = readFileSync('.env.local', 'utf-8')
  for (const line of env.split('\n')) {
    const eq = line.indexOf('=')
    if (eq > 0 && !line.startsWith('#')) {
      const key = line.slice(0, eq).trim()
      const val = line.slice(eq + 1).trim().replace(/^"|"$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  }
} catch {}

function splitBold(text: string) {
  return text.split(/(\*\*.+?\*\*)/g).filter(Boolean).map(part =>
    part.startsWith('**') && part.endsWith('**')
      ? { text: part.slice(2, -2), bold: true }
      : { text: part, bold: false }
  )
}

function textToLexical(paragraphs: string[]) {
  return {
    root: {
      type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
      children: paragraphs.map(text => ({
        type: 'paragraph', version: 1, textFormat: 0, textStyle: '', indent: 0, direction: 'ltr',
        children: splitBold(text).map(({ text: t, bold }) => ({
          type: 'text', version: 1, text: t, format: bold ? 1 : 0, style: '', detail: 0, mode: 'normal',
        })),
      })),
    },
  }
}

const SETTINGS = {
  email: 'hello@nassif.pro',
  location: 'Berlin',
  timezone: 'CET',
  availability: 'Available for Q4 2026',
  role: 'Software Engineer',
  seoTitle: 'Nassif Nassif — Software Engineer, Berlin',
  seoDescription: 'Software engineer based in Berlin. Eight years building software across corporate platforms, startups, and independent projects.',
  github: 'https://github.com/nassif7',
  linkedin: 'https://linkedin.com/in/nassif',
  footerTagline: 'Software engineer in Berlin, building interfaces that feel obvious.',
  footerJoke: 'Professional button-maker.',
  caseStudyCtaEyebrow: 'Next step',
  caseStudyCtaHeading: 'Got something with this shape?',
  caseStudyCtaLead: 'Available for contract and full-time work from Q4 2026 — Berlin, or remote across European hours.',
}

const HOMEPAGE = {
  heroEyebrow: 'Nassif Nassif — Software Engineer',
  heroHeading: 'Good software shouldn’t need explanations.',
  heroLead: 'A systems thinker with eight years building software across corporate platforms, startups, and independent projects. I work between design and engineering, turning complex problems into simple, intuitive solutions.',
  heroPrimaryButton: 'View work index',
  heroSecondaryButton: 'Download CV',
  facts: [
    { label: 'Based in', value: 'Berlin, Germany' },
    { label: 'Focus', value: 'Platform · Product · UX' },
    { label: 'Engagements', value: 'Contract · Full-time' },
    { label: 'Languages', value: 'EN C1 · DE B2 · AR native' },
  ],
  stats: [
    { value: '8', label: 'Years building software' },
    { value: '3', label: 'Companies shipped for' },
    { value: '2', label: 'Apps in public stores' },
    { value: 'React · RN', label: 'Primary platforms' },
  ],
  servicesSectionTitle: 'What I’m hired for.',
  servicesSectionLead: 'Three kinds of work, all the same discipline: reduce complexity, decide well, know what to leave out.',
  services: [
    {
      index: '01 / Web',
      title: 'Product interfaces',
      description: 'Application UI, dashboards, and marketing surfaces built to hold up as the product grows — not just as the first screen ships.',
      items: [{ text: 'Next.js & React builds' }, { text: 'Component libraries' }, { text: 'Accessibility & performance' }, { text: 'CMS integration' }],
    },
    {
      index: '02 / Systems',
      title: 'Design systems & tooling',
      description: 'Consistency enforced by the type system rather than left to convention. Systems that make the correct thing the easiest thing to build.',
      items: [{ text: 'Token architecture' }, { text: 'Typed component APIs' }, { text: 'Generation tooling' }, { text: 'Documentation & adoption' }],
    },
    {
      index: '03 / Mobile',
      title: 'Mobile applications',
      description: 'Cross-platform iOS and Android products from first screen to store listing, including the parts nobody enjoys: auth, push, review.',
      items: [{ text: 'React Native & Expo' }, { text: 'Real-time data' }, { text: 'Push notifications' }, { text: 'App Store submission' }],
    },
  ],
  workSectionTitle: 'Two projects, in detail.',
  workSectionLead: 'Client products where the constraints were real and the decisions are worth reading about.',
  indexSectionTitle: 'Everything, on one page.',
  trackSectionTitle: 'What shipped, and when.',
  writingSectionTitle: 'Notes on the work.',
  writingSectionLead: 'Interface ethics, engineering culture, and the occasional detour. Written slowly.',
  ctaEyebrow: 'Next step',
  ctaHeading: 'You have an idea. I’ve shipped eight years of them.',
  ctaLead: 'Available for contract and full-time work from Q4 2026 — Berlin, or remote across European hours.',
}

const MARINERIA_CASE_STUDY = {
  eyebrow: 'Case 01',
  category: 'Client work · Mobile',
  lead: 'A recruitment app for the Italian maritime industry, serving three different audiences from a single codebase — and telling candidates the truth when they don’t qualify.',
  heroImages: [
    { url: '/projects/marineria/marineria1.avif', alt: 'Marineria.it app — login and job listing screens' },
    { url: '/projects/marineria/marineria3.avif', alt: 'Marineria.it app — crew profile and application screens' },
  ],
  sections: [
    {
      sectionId: 'brief',
      num: '01',
      eyebrow: 'The brief',
      heading: 'A web recruitment platform needed to become a mobile product.',
      body: textToLexical([
        'Marineria.it is an established Italian maritime recruitment platform. Ship operators post positions; crew members — deckhands, engineers, officers — apply for them. The business worked on the web, but the people using it don’t sit at desks. They’re on vessels, in ports, between contracts, on phones.',
        'The brief was a native-feeling app for iOS and Android covering the full platform: browsing, applying, profile management, and the recruiter-side tooling. **One codebase, two stores, two languages.**',
      ]),
      spec: [
        { k: 'Audiences', v: 'Guests, crew members, recruiters' },
        { k: 'Languages', v: 'Italian and English, in-app toggle' },
        { k: 'Auth', v: 'OTP or password, registration inline' },
        { k: 'Stack', v: 'TypeScript, React Native, Expo' },
      ],
    },
    {
      sectionId: 'problem',
      num: '02',
      eyebrow: 'The problem',
      heading: 'Three audiences, opposite needs, one app.',
      body: textToLexical([
        'Most recruitment apps solve for one side of the market and treat the other as an admin panel. Here both sides were first-class, plus a third group that mattered commercially: people who wanted to look before committing to anything.',
        'Guests needed to browse and filter the entire job board without an account — the platform’s supply of candidates depends on it. Crew needed to build a profile once and apply repeatedly with it. Recruiters needed the inverse: search across candidates by skill and location, then make contact directly.',
      ]),
      pullQuote: 'The hard part wasn’t the feature list. It was making three products feel like one, without a mode switch the user has to reason about.',
    },
    {
      sectionId: 'approach',
      num: '03',
      eyebrow: 'Approach',
      heading: 'Let the account type shape the app, not a menu.',
      body: textToLexical([
        'Rather than a role picker at launch, the app resolves capability from the session and lets each surface adapt. A guest sees the board and a prompt where an action would be. A crew member sees the same board with apply enabled. A recruiter sees the board plus the candidate search it mirrors.',
        'Registration lives inside the login screen instead of behind a separate flow — the moment someone needs an account is the moment they’re trying to do something, so the account creation happens there rather than as a detour.',
      ]),
      figureImages: [
        { url: '/projects/marineria/marineria3.avif', alt: 'Job listing and filtering screen' },
        { url: '/projects/marineria/marineria1.avif', alt: 'Login screen with OTP and guest browsing' },
      ],
      figureCaption: 'Fig. 01 — The board is the shared surface across all three audiences; capability changes, layout doesn’t.',
    },
    {
      sectionId: 'build',
      num: '04',
      eyebrow: 'What I built',
      heading: 'The parts that decide whether an app gets used twice.',
      body: textToLexical([
        '**Real-time listings with filters** that hold their state across navigation, because a candidate scanning a board and opening a role expects to come back to the same list.',
        '**Honest qualification feedback.** When a crew member doesn’t meet a position’s requirements, the app says which requirement and why — instead of accepting the application into silence. This was the decision I pushed hardest for, and the one most likely to be cut by default.',
        '**Role-targeted push notifications:** crew are notified when a matching position is posted, recruiters when someone applies. Two audiences, two triggers, one notification layer.',
        '**Bilingual throughout,** with the toggle in settings rather than a launch-time choice — maritime crews are multinational and language preference isn’t a property of the device.',
      ]),
    },
    {
      sectionId: 'outcome',
      num: '05',
      eyebrow: 'Outcome',
      heading: 'Shipped to both stores, in both languages.',
      body: textToLexical([
        'The app went live on iOS and Android with the full platform available on mobile, including guest browsing that requires no account at all. The single-codebase decision held: feature work ships to both platforms at once, and the recruiter tooling did not need a separate product.',
      ]),
      outcomes: [
        { value: '2', label: 'Platforms, one codebase' },
        { value: '3', label: 'Audiences, no mode switch' },
        { value: '2', label: 'Languages, toggleable' },
      ],
    },
  ],
  nextEyebrow: 'Case 02 · Side project',
  nextTitle: 'BookMarquee — a knowledge base with no backend',
  nextHref: '/projects/bookmarquee',
}

async function main() {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  console.log('Updating settings global...')
  await payload.updateGlobal({ slug: 'settings', data: SETTINGS })
  console.log('  ✔ settings')

  console.log('\nUpdating homepage global...')
  await payload.updateGlobal({ slug: 'homepage', data: HOMEPAGE })
  console.log('  ✔ homepage')

  console.log('\nUpdating Marineria case study content...')
  const { docs } = await payload.find({ collection: 'projects', where: { slug: { equals: 'marineria' } } })
  if (!docs[0]) {
    console.warn('  ⚠ no project with slug "marineria", skipping')
  } else {
    await payload.update({
      collection: 'projects',
      id: docs[0].id,
      data: { caseStudyContent: MARINERIA_CASE_STUDY },
    })
    console.log('  ✔ marineria')
  }

  console.log('\nDone.')
  process.exit(0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
