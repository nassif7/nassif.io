export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Writing', href: '#writing' },
] as const

export const STACK_ITEMS = [
  { name: 'React', role: 'UI / Frontend', icon: 'SiReact' },
  { name: 'TypeScript', role: 'Language', icon: 'SiTypescript' },
  { name: 'Next.js', role: 'Framework', icon: 'SiNextdotjs' },
  { name: 'React Native', role: 'Mobile', icon: 'SiReact' },
  { name: 'Tailwind', role: 'Styling', icon: 'SiTailwindcss' },
  { name: 'Node.js', role: 'Backend', icon: 'SiNodedotjs' },
  { name: 'PostgreSQL', role: 'Database', icon: 'SiPostgresql' },
  { name: 'Python', role: 'Scripting', icon: 'SiPython' },
  { name: 'Git', role: 'Version ctrl', icon: 'SiGit' },
  { name: 'Docker', role: 'DevOps', icon: 'SiDocker' },
  { name: 'Figma', role: 'Design', icon: 'SiFigma' },
  { name: 'Vercel', role: 'Deployment', icon: 'SiVercel' },
] as const

export const PROJECTS = [
  {
    num: '01',
    type: 'Concept',
    name: 'Discrep',
    desc: 'A framework and tool for closing the gap between who you think you are and how you actually behave. Not by telling you who to be, but by showing you the pattern.',
    longDesc: 'Most people don\'t lack self-awareness. They lack an honest mirror. Self-Coherence is a framework built around one uncomfortable observation: the gap between stated values and actual behavior is one of the least examined parts of being human.\n\nIt organizes self-assessment around five internal dimensions: Integrity, Autonomy, Awareness, Accountability, and Courage. The research backing is real (Higgins, Rogers, Deci & Ryan, Brené Brown), but the idea came from personal experience, not a literature review.\n\nStill early. A position paper exists, real conversations are happening, and the shape of the product is forming.',
    images: [],
    stack: [],
    link: null,
    linkLabel: null,
    wip: false,
    brainstorm: true,
  },
  {
    num: '02',
    type: 'Side project',
    name: 'oneMore',
    desc: 'A cigarette tracking app. Not to make you quit, just to make you notice.',
    longDesc: 'oneMore is a cigarette tracking app. You log each one as you smoke it. That\'s basically it.\n\nThe idea is simple: most smokers don\'t have a clear picture of how much they actually smoke. Seeing the number in real time, noticing the patterns, knowing what triggers it. That alone changes something. No lectures, no streak counters, no pressure.\n\nIf you want to cut down, great. If you\'re not ready, it still shows you where you are. Built for iOS and Android with React Native and Expo.',
    images: [
      '/projects/one-more/one-more1.png',
      '/projects/one-more/one-more2.png',
      '/projects/one-more/one-more3.png',
      '/projects/one-more/one-more4.png',
      '/projects/one-more/one-more5.png',
      '/projects/one-more/one-more6.png',
    ],
    stack: ['TypeScript', 'React Native', 'Expo'],
    link: null,
    linkLabel: null,
    wip: false,
    brainstorm: false,
  },
  {
    num: '03',
    type: 'Client work',
    name: 'Marineria.it',
    desc: 'A mobile app for Marineria.it, a maritime recruitment platform. iOS and Android, real-time listings, crew profiles, recruiter tools.',
    longDesc: 'Marineria.it is an Italian maritime recruitment platform. This is their mobile app, built with React Native, Expo, and TypeScript.\n\nThe app works without an account. Guests can browse and filter job offers. Crew members can build a profile, apply for positions, and get honest feedback when they don\'t qualify. Recruiters can post jobs, search candidates by skills or location, and contact applicants directly.\n\nPush notifications go out when a matching job is posted (for crew) or when someone applies (for recruiters). The app is in Italian and English with a toggle in settings.\n\nLogin is either OTP or password. Registration is built into the login screen.',
    images: [
      '/projects/marineria/marineria1.png',
      '/projects/marineria/marineria2.png',
      '/projects/marineria/marineria3.png',
      '/projects/marineria/marineria4.png',
      '/projects/marineria/marineria5.png',
      '/projects/marineria/marineria6.png',
      '/projects/marineria/marineria7.png',
      '/projects/marineria/marineria8.png',
    ],
    stack: ['TypeScript', 'React Native', 'Expo'],
    link: 'https://marineria.it',
    linkLabel: 'Visit site',
    wip: false,
    brainstorm: false,
  },
  {
    num: '04',
    type: 'Client work',
    name: 'Moviemiento',
    desc: 'A custom website for a Berlin-based cinema non-profit. They show films on bikes. The site had to match.',
    longDesc: 'Moviemiento is a Berlin non-profit that does traveling cinema, bicycle screenings, and international film education. Good people, interesting work.\n\nThe site is built on WordPress with a fully custom PHP theme. No page builder, no template. Every line of HTML and CSS written by hand to match the original design exactly.\n\nIt\'s bilingual (German and English), fully responsive, and covers everything from news archives to project listings. The design has a strong visual identity and the build had to respect that.',
    images: [
      '/projects/moviemiento/moviemiento3.png',
      '/projects/moviemiento/moviemiento4.png',
      '/projects/moviemiento/moviemiento5.png',
      '/projects/moviemiento/moviemiento6.png',
    ],
    stack: ['PHP', 'WordPress', 'HTML', 'CSS'],
    link: 'https://www.moviemiento.org',
    linkLabel: 'Visit site',
    wip: false,
    brainstorm: false,
  },
] as const

export const WRITING_TAGS = ['Politics', 'Philosophy', 'Tech & Society', 'General'] as const

export const CONTACT_ITEMS = [
  { type: 'Email', value: 'n_nassif@icloud.com', action: 'Write ↗', href: 'mailto:n_nassif@icloud.com' },
  { type: 'GitHub', value: '@nassif', action: 'View ↗', href: 'https://github.com' },
  { type: 'LinkedIn', value: 'Nassif Nassif', action: 'Connect ↗', href: 'https://linkedin.com' },
  { type: 'Resume', value: 'PDF · 2025', action: 'Download ↗', href: '/resume.pdf' },
] as const
