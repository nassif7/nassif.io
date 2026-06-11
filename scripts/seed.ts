import { readFileSync } from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'

// Load .env.local
try {
  const env = readFileSync('.env.local', 'utf-8')
  for (const line of env.split('\n')) {
    const eq = line.indexOf('=')
    if (eq > 0 && !line.startsWith('#')) {
      const key = line.slice(0, eq).trim()
      const val = line.slice(eq + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  }
} catch {}

function portableTextToLexical(blocks: any[]) {
  const children = (blocks ?? []).map((block: any) => {
    if (block._type !== 'block') return null
    return {
      type: 'paragraph',
      version: 1,
      textFormat: 0,
      textStyle: '',
      indent: 0,
      direction: 'ltr',
      children: (block.children ?? []).map((span: any) => {
        let format = 0
        if (span.marks?.includes('strong')) format |= 1
        if (span.marks?.includes('em')) format |= 2
        if (span.marks?.includes('code')) format |= 16
        return { type: 'text', version: 1, text: span.text ?? '', format, style: '', detail: 0, mode: 'normal' }
      }),
    }
  }).filter(Boolean)

  return {
    root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children },
  }
}

const POSTS = [
  {
    title: 'Croissant as a statement',
    slug: 'croissant-as-a-statement',
    date: '2026-05-31',
    tags: ['philosophical', 'irony', 'existentialism'],
    excerpt: 'Camus asks us to imagine Sisyphus happy. It sounds simple until you actually try to live it. The croissant understood this before any of us did.',
    hidden: true,
    collections: ['philosophy'],
    body: [
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Every morning you choose. Bread is there, reliable, functional, asking nothing except that you keep going. The croissant is also there. It is not asking you to keep going. It is asking something subtler.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Camus asks us to imagine Sisyphus happy. It sounds simple until you actually try to live it. The croissant understood this before any of us did.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'It breaks apart too easily. It leaves traces of itself everywhere. It refuses to stay contained. And yet here it is, in every café, every corner, wherever humans are still figuring out how to begin.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Maybe that is the whole point.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Bread is a promise. The croissant is a rejection of that entire premise. In the mornings when alarms go off, emails stack up, schedules fill in, and bread sits there doing its dutiful best, the croissant is the only thing on the counter that is smiling.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Not happiness in some grand philosophical sense. Nothing so dramatic. Just the quiet decision that if the rock is going uphill again anyway, the morning could at least taste good. 🥐☕' }] },
    ],
  },
  {
    title: 'On the politics of interface design',
    slug: 'on-the-politics-of-interface-design',
    date: '2025-03-15',
    tags: [],
    excerpt: 'Every button is a decision. Every form is a stance. Design is never neutral.',
    hidden: true,
    collections: [],
    body: [
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Every button is a decision. Every form is a stance. Design is never neutral — it encodes values, assumptions, power structures. The question isn\'t whether your interface has politics. It does. The question is whether you\'re aware of them.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'When you default a gender field to "Male", that\'s a political choice. When you hide the unsubscribe link in gray 8px text, that\'s a political choice. When you make the "delete account" flow five steps long and the "upgrade" flow one click, that\'s a political choice.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'We don\'t talk about this enough in frontend. We talk about accessibility (sometimes), performance (always), and aesthetics (constantly). But the ethics of interface design — the slow, quiet ways our decisions shape behavior — that gets left out.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'I\'m not saying every developer needs to be a political philosopher. I\'m saying: pay attention to whose interests your defaults serve. Ask who benefits when the UX is "optimized." Notice when friction is designed in, and for whom.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'The interface is never just the interface.' }] },
    ],
  },
  {
    title: 'The frontend is never just frontend',
    slug: 'the-frontend-is-never-just-frontend',
    date: '2025-01-10',
    tags: [],
    excerpt: 'You can\'t separate the UI from the system it lives in. Anyone who tells you otherwise hasn\'t shipped enough.',
    hidden: true,
    collections: [],
    body: [
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'You can\'t separate the UI from the system it lives in. Anyone who tells you otherwise hasn\'t shipped enough.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Every state management decision is a product decision. Every loading state is a statement about how you handle uncertainty. Every error message is a moment of trust — or broken trust — with the person using your software.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Frontend developers have spent years fighting to be taken seriously as engineers. And I get it. The work is real and complex and the "it\'s just CSS" dismissal is exhausting.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'But in fighting for that credibility, some of us overcorrected. We became obsessed with the technical purity of our work — the architecture, the bundle size, the TypeScript strictness — and forgot that the thing we\'re building is used by actual people with actual problems.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'The best frontend work I\'ve ever seen comes from developers who care equally about the code and the person on the other side of the screen. Who know when to push back on a design decision because the API doesn\'t support it, and when to push back on an API decision because the design requires it.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'That\'s the job. Not frontend. Not backend. The whole thing.' }] },
    ],
  },
  {
    title: 'What it means to finish something',
    slug: 'what-it-means-to-finish-something',
    date: '2025-02-20',
    tags: [],
    excerpt: 'I have a graveyard of half-built things. I think most developers do.',
    hidden: true,
    collections: [],
    body: [
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'I have a graveyard of half-built things. I think most developers do.' }] },
      { _type: 'block', children: [
        { _type: 'span', marks: [], text: 'Side projects that got to 80% and stopped. Apps that were almost ready to launch. Tools that solved a real problem but never got the README. They sit in folders with names like ' },
        { _type: 'span', marks: ['code'], text: 'v2' },
        { _type: 'span', marks: [], text: ', ' },
        { _type: 'span', marks: ['code'], text: 'new-approach' },
        { _type: 'span', marks: [], text: ', ' },
        { _type: 'span', marks: ['code'], text: 'final-final' },
        { _type: 'span', marks: [], text: '.' },
      ]},
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'For a long time I thought this was a discipline problem. Start less, finish more. But I\'m not sure anymore.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Some things are worth finishing. Some things teach you what you needed to learn at 60% and then it\'s okay to stop. The problem isn\'t the stopping — it\'s the shame around it. The feeling that an unshipped thing is a failed thing.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Finishing is overrated as a virtue. What matters is whether you were honest with yourself about what you were building and why. Did you start it to learn? Did you learn? Then it\'s finished, in the way that matters.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Did you start it to ship? Then ship it, even if it\'s not perfect. Especially if it\'s not perfect.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'The graveyard is fine. Just don\'t lie to yourself about which kind of project you\'re building.' }] },
    ],
  },
]

const PROJECTS = [
  {
    name: 'BookMarquee',
    slug: 'bookmarquee',
    type: 'Side project',
    desc: 'A Chrome extension that turns X bookmarks into a searchable knowledge base. Stored locally in your browser, zero backend, no account needed.',
    stack: ['React', 'TypeScript', 'Vite', 'Chrome MV3'],
    images: [
      'https://cdn.sanity.io/images/ztb0gf8u/production/44af78e5e9d7b3eae010ab977b8d518978ef9823-1280x800.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/686727a58a9f2716832af6efe480872abe3d6164-1280x800.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/4c3387a4724e558d13ecf5b21809e041291f841d-1280x800.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/b88d57fdeb23bba4e6cc326daf759f55f5681bb8-1280x800.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/b40ee3efea54a3429c2be3f0aef22718d7307c4e-1280x800.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/ff5fd4c9c4d2e779e4e4066e5dc035a12f448c68-1280x800.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/03d5c192fd76494807cee5bc9ff4004c3df278f6-1280x800.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/28f06f44a71e70ea04b00ed4d4eb9fa88ed02d38-1280x800.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/1f9a948861e65130b523ba178a6f47dcc119ef0e-1280x800.heif',
    ],
    links: [{ platform: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/bookmarx/lpgfdocpjecjdagbjcbomobccfeaefep', comingSoon: false }],
    privacyPolicy: 'https://nassif.io/projects/bookmarquee/privacy',
    wip: false,
    brainstorm: false,
    body: [
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'BookMarquee turns X\'s native bookmarks into a personal, searchable knowledge base that lives entirely in your browser. No account, no server, nothing leaves your machine.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Since X doesn\'t expose a bookmark API to third parties, BookMarquee intercepts the browser\'s own internal GraphQL requests at runtime. A single click starts a full sync: the extension auto-scrolls the bookmarks page, captures content silently as it loads, detects when it\'s caught up with previously saved items, and stops early.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Bookmarks are stored in Chrome\'s extension storage and organized through user-defined collections with keyword-based auto-sorting. Filters narrow by collection, tag, and media type — tag options update live based on what\'s in the active collection. A search bar covers tweet text, author name, handle, and hashtags.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'The bookmark detail view shows the full tweet, lets you assign or create a collection inline via a searchable dropdown, and gives you a one-click URL copy. Import and export round-trip cleanly through JSON, with deduplication on re-import.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'The UI lives in Chrome\'s Side Panel. Built with React and TypeScript, with light, dark, and system themes and a customizable accent color.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Available on the Chrome Web Store.' }] },
    ],
  },
  {
    name: 'Discrep',
    slug: 'discrep',
    type: 'Concept',
    desc: 'A framework and tool for closing the gap between who you think you are and how you actually behave. Not by telling you who to be, but by showing you the pattern.',
    stack: [],
    images: [],
    links: [],
    privacyPolicy: null,
    wip: false,
    brainstorm: true,
    body: [
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Most people don\'t lack self-awareness. They lack an honest mirror. Self-Coherence is a framework built around one uncomfortable observation: the gap between stated values and actual behavior is one of the least examined parts of being human.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'It organizes self-assessment around five internal dimensions: Integrity, Autonomy, Awareness, Accountability, and Courage. The research backing is real (Higgins, Rogers, Deci & Ryan, Brené Brown), but the idea came from personal experience, not a literature review.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Still early. A position paper exists, real conversations are happening, and the shape of the product is forming.' }] },
    ],
  },
  {
    name: 'Marineria.it',
    slug: 'marineria',
    type: 'Client work',
    desc: 'A mobile app for Marineria.it, a maritime recruitment platform. iOS and Android, real-time listings, crew profiles, recruiter tools.',
    stack: ['TypeScript', 'React Native', 'Expo'],
    images: [
      'https://cdn.sanity.io/images/ztb0gf8u/production/1f354e040a1893266adfc6a0b033bea7ed63a856-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/516468bf829293bbc6a1a41e84ae5616ee910fdc-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/f3319f7f7d251be7214b6efa94987cd109364a2c-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/4c7cf80b89cc846a3d150a9f69e73d1f516ed428-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/9eae694f97e4ec6db7dd6813544e0331a37abae8-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/9839cc48bddeeb8dfbac89039d294591da72903c-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/d77d9f213149cf5821df1507586aeafce898d3ae-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/cca0353a10c253386eda86ec24521858ea840554-552x1200.heif',
    ],
    links: [{ platform: 'Website', url: 'https://marineria.it', comingSoon: false }],
    privacyPolicy: null,
    wip: false,
    brainstorm: false,
    body: [
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Marineria.it is an Italian maritime recruitment platform. This is their mobile app, built with React Native, Expo, and TypeScript.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'The app works without an account. Guests can browse and filter job offers. Crew members can build a profile, apply for positions, and get honest feedback when they don\'t qualify. Recruiters can post jobs, search candidates by skills or location, and contact applicants directly.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Push notifications go out when a matching job is posted (for crew) or when someone applies (for recruiters). The app is in Italian and English with a toggle in settings.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Login is either OTP or password. Registration is built into the login screen.' }] },
    ],
  },
  {
    name: 'Moviemiento',
    slug: 'moviemiento',
    type: 'Client work',
    desc: 'A custom website for a Berlin-based cinema non-profit. They show films on bikes. The site had to match.',
    stack: ['PHP', 'WordPress', 'HTML', 'CSS'],
    images: [
      'https://cdn.sanity.io/images/ztb0gf8u/production/c3b70dacdcb3d5cfc766d136ad99132bf181529e-1200x683.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/3860f0eedd52f253db31eb1fbd90dffd1777a9d8-1200x681.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/c424c3c832c4858aff7b66dee96dc264d812b785-1200x682.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/098fd6598ef4ab111b0708bebc2149c85108c3c5-1200x681.heif',
    ],
    links: [{ platform: 'Website', url: 'https://www.moviemiento.org', comingSoon: false }],
    privacyPolicy: null,
    wip: false,
    brainstorm: false,
    body: [
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'Moviemiento is a Berlin non-profit that does traveling cinema, bicycle screenings, and international film education. Good people, interesting work.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'The site is built on WordPress with a fully custom PHP theme. No page builder, no template. Every line of HTML and CSS written by hand to match the original design exactly.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'It\'s bilingual (German and English), fully responsive, and covers everything from news archives to project listings. The design has a strong visual identity and the build had to respect that.' }] },
    ],
  },
  {
    name: 'OneMore',
    slug: 'one-more',
    type: 'Side project',
    desc: 'A cigarette tracking app. Not to make you quit, just to make you notice.',
    stack: ['TypeScript', 'React Native', 'Expo'],
    images: [
      'https://cdn.sanity.io/images/ztb0gf8u/production/475233c592263fb12de3fe46f8cc28e8551600c8-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/4fa4d91c03441beaee3a41b709ec5336e6274596-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/2e547ca96f021ef347b8aeb7ea9e5a3f2d07bef7-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/dd24e5f81211621504493214c97b882c71296ad4-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/f809c0eb21bd48176dfa2a79a7a4ddd625cb9a63-552x1200.heif',
      'https://cdn.sanity.io/images/ztb0gf8u/production/b25d4e6ea56567241a9333c0ff463f7cc5715a66-552x1200.heif',
    ],
    links: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/onemore-smoke-tracker/id6766982502', comingSoon: false },
      { platform: 'Google Play', url: null, comingSoon: true },
    ],
    privacyPolicy: 'https://nassif.io/projects/one-more/privacy',
    wip: false,
    brainstorm: false,
    body: [
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'oneMore is a cigarette tracking app. You log each one as you smoke it. That\'s basically it.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'The idea is simple: most smokers don\'t have a clear picture of how much they actually smoke. Seeing the number in real time, noticing the patterns, knowing what triggers it. That alone changes something. No lectures, no streak counters, no pressure.' }] },
      { _type: 'block', children: [{ _type: 'span', marks: [], text: 'If you want to cut down, great. If you\'re not ready, it still shows you where you are. Built for iOS and Android with React Native and Expo.' }] },
    ],
  },
]

async function main() {
  const payload = await getPayload({ config })

  console.log('Seeding post-collections...')
  const philosophyCol = await payload.create({
    collection: 'post-collections',
    data: { title: 'philosophy', slug: 'philosophy' },
  })
  console.log('  ✔ philosophy')

  const collectionMap: Record<string, string> = { philosophy: philosophyCol.id as string }

  console.log('\nSeeding posts...')
  for (const post of POSTS) {
    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        date: post.date,
        tags: post.tags.map(tag => ({ tag })),
        collections: post.collections.map(slug => collectionMap[slug]).filter(Boolean),
        excerpt: post.excerpt,
        hidden: post.hidden,
        body: portableTextToLexical(post.body),
      },
    })
    console.log(`  ✔ ${post.title}`)
  }

  console.log('\nSeeding projects...')
  for (const project of PROJECTS) {
    await payload.create({
      collection: 'projects',
      data: {
        name: project.name,
        slug: project.slug,
        type: project.type,
        desc: project.desc,
        stack: project.stack.map(item => ({ item })),
        images: project.images.map(url => ({ url })),
        links: project.links.map(l => ({
          platform: l.platform,
          url: l.url ?? undefined,
          comingSoon: l.comingSoon,
        })),
        privacyPolicy: project.privacyPolicy ?? undefined,
        wip: project.wip,
        brainstorm: project.brainstorm,
        body: portableTextToLexical(project.body),
      },
    })
    console.log(`  ✔ ${project.name}`)
  }

  console.log('\nDone.')
  process.exit(0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
