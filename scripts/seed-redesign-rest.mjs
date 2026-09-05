// REST-API version of seed-redesign.ts — run against a live `next dev` server,
// following the same pattern as scripts/seed-rest.mjs (standalone `payload`
// imports are broken under this Node/tsx combo — see loadEnv.js / @next/env
// interop). Usage:
//   npm run dev   (in another terminal)
//   node scripts/seed-redesign-rest.mjs
const BASE = 'http://localhost:3000'

async function api(path, method, body, token) {
  const res = await fetch(`${BASE}/api${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `JWT ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${JSON.stringify(json)}`)
  return json
}

const PROJECT_PATCHES = {
  discrep: { year: '2026', status: 'Position paper', statusVariant: 'default', order: 2 },
  bookmarquee: {
    year: '2026',
    role: 'Sole designer & engineer',
    platforms: 'Chrome Side Panel',
    status: 'Published',
    statusVariant: 'live',
    order: 3,
    featuredOrder: 2,
  },
  'one-more': { year: '2026', status: 'App Store', statusVariant: 'live', order: 4 },
  marineria: {
    year: '2026',
    client: 'Marineria.it',
    role: 'Lead frontend',
    platforms: 'iOS · Android',
    status: 'Shipped',
    statusVariant: 'live',
    order: 5,
    caseStudy: true,
    featuredOrder: 1,
  },
  moviemiento: { year: '2017', status: 'Live', statusVariant: 'live', order: 7 },
}

const NEW_PROJECTS = [
  {
    name: 'Keen Studio',
    slug: 'keen-studio',
    type: 'Dev tools',
    desc: 'Cross-platform UI generation system enforcing design decisions at the type level via generateTheme() and createUI(). Component library and theme engine live; CLI and visual configurator in development.',
    stack: [{ item: 'TypeScript' }, { item: 'React' }, { item: 'React Native' }],
    year: 'Ongoing',
    status: 'In progress',
    statusVariant: 'wip',
    order: 1,
    hidden: false,
    featured: false,
  },
  {
    name: 'Wahl-O-Mat',
    slug: 'wahl-o-mat',
    type: 'UX research',
    desc: 'Interface analysis and interactive Figma prototypes for Germany’s voting-advice tool, validated through direct user feedback.',
    stack: [{ item: 'Figma' }, { item: 'User research' }],
    year: '2019',
    status: 'Delivered',
    statusVariant: 'default',
    order: 6,
    hidden: false,
    featured: false,
  },
]

const EXPERIENCE = [
  {
    title: 'Three products shipped independently',
    tag: 'Marineria.it · oneMore · BookMarquee',
    year: '2026',
    description: 'A client mobile app on both stores, an App Store release of my own, and a cross-browser extension — designed, built, and submitted end to end.',
    bullets: [],
    showInTrackRecord: true,
    showInCV: false,
    order: 1,
  },
  {
    title: 'Keen Studio in development',
    tag: 'Design systems · Product',
    year: 'Ongoing',
    description: 'Component library and theme engine live; CLI and visual configurator in active development.',
    bullets: [],
    showInTrackRecord: true,
    showInCV: false,
    order: 2,
  },
  {
    title: 'Software Developer UI/UX',
    tag: 'Verbraucherzentrale Bundesverband',
    year: '2022–25',
    cvWhen: 'Dec 2022 — Sep 2025',
    description: 'Bridged design and backend on a national consumer-protection platform; made complex forms configurable and dynamic.',
    bullets: [
      'Collaborated with designers and backend developers to ensure seamless integration of design and functionality.',
      'Optimized forms to make them more configurable and dynamic.',
      'Conducted code reviews and provided constructive feedback to improve code quality.',
    ],
    showInTrackRecord: true,
    showInCV: true,
    order: 3,
  },
  {
    title: 'Software Developer',
    tag: 'LQ Enterprise',
    year: '2019–22',
    cvWhen: 'Mar 2019 — Nov 2022',
    description: 'Built the central UI component library used across multiple product teams, plus dynamic form generators and real-time features.',
    bullets: [
      "Contributed to the company's central UI component library, used across multiple product teams.",
      'Built dynamic form generators within the platform.',
      'Developed real-time features using WebSockets and SignalR for live data updates.',
    ],
    showInTrackRecord: true,
    showInCV: true,
    order: 4,
  },
  {
    title: 'Software Engineer',
    tag: 'kloeckner.i',
    year: '2017–19',
    cvWhen: 'Jul 2017 — Feb 2019',
    description: 'Shipped web applications across Phoenix, Rails, Ember, and Vue.js; introduced automated testing and led production releases.',
    bullets: [
      'Contributed to several web applications using Phoenix, Rails, Ember, and Vue.js.',
      'Set up automated tests to increase efficiency and provide faster feedback to the team.',
      'Led feature releases in the production environment.',
    ],
    showInTrackRecord: true,
    showInCV: true,
    order: 5,
  },
  {
    title: 'Volunteer instructor',
    tag: 'ReDI School of Digital Integration',
    year: '2017',
    cvWhen: 'Spring 2017',
    description: 'Taught web development fundamentals to students with refugee and migration backgrounds.',
    bullets: ['Taught web development fundamentals to students with refugee and migration backgrounds.'],
    showInTrackRecord: true,
    showInCV: true,
    order: 6,
  },
  {
    title: 'Content Moderator',
    tag: 'Arvato Bertelsmann',
    year: '2016–17',
    cvWhen: 'Nov 2016 — May 2017',
    description: '',
    bullets: ['Moderated Arabic-language online content, ensuring quality and accuracy.'],
    showInTrackRecord: false,
    showInCV: true,
    order: 7,
  },
].map(e => ({ ...e, bullets: e.bullets.map(text => ({ text })) }))

async function main() {
  // Not run in this session — the data was seeded instead via a temporary
  // Local API route (getPayload directly), since standalone `payload`
  // imports crash under this environment's Node/tsx + @next/env combo and
  // these placeholder credentials aren't the real admin login. Fill in the
  // real admin email/password below if you need to re-run this.
  const login = await api('/users/login', 'POST', { email: 'hello@nassif.pro', password: 'REPLACE_ME' })
  const token = login.token
  if (!token) throw new Error('Login failed — set the real admin password in this script')

  console.log('Patching existing projects...')
  for (const [slug, data] of Object.entries(PROJECT_PATCHES)) {
    const found = await api(`/projects?where[slug][equals]=${slug}`, 'GET', undefined, token)
    const doc = found.docs?.[0]
    if (!doc) {
      console.warn(`  ⚠ no project with slug "${slug}", skipping`)
      continue
    }
    await api(`/projects/${doc.id}`, 'PATCH', data, token)
    console.log(`  ✔ ${slug}`)
  }

  console.log('\nCreating missing projects...')
  for (const project of NEW_PROJECTS) {
    const found = await api(`/projects?where[slug][equals]=${project.slug}`, 'GET', undefined, token)
    if (found.docs?.[0]) {
      console.log(`  – ${project.name} already exists, skipping`)
      continue
    }
    await api('/projects', 'POST', project, token)
    console.log(`  ✔ ${project.name}`)
  }

  console.log('\nSeeding experience...')
  for (const entry of EXPERIENCE) {
    const found = await api(`/experience?where[title][equals]=${encodeURIComponent(entry.title)}`, 'GET', undefined, token)
    if (found.docs?.[0]) {
      console.log(`  – ${entry.title} already exists, skipping`)
      continue
    }
    await api('/experience', 'POST', entry, token)
    console.log(`  ✔ ${entry.title}`)
  }

  console.log('\nDone.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
