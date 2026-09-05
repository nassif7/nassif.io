export interface CvTag { text: string; pri?: boolean }

export const CV_PROJECTS: { title: string; when: string; bullets: string[]; tags: CvTag[] }[] = [
  {
    title: 'Marineria.it',
    when: '2026',
    bullets: ['Development of a bilingual mobile app (iOS/Android) using React Native. Focused on UI design and API integration with OTP authentication.'],
    tags: [{ text: 'Mobile.UX', pri: true }, { text: 'React.Native', pri: true }, { text: 'REST.API' }, { text: 'OTP' }, { text: 'i18next' }],
  },
  {
    title: 'OneMore',
    when: '2026',
    bullets: ['Cigarette tracking app built with React Native and Expo. Deliberately minimal design: log each cigarette, see the real number, no streaks or artificial gamification. Live on the App Store.'],
    tags: [{ text: 'Mobile.UX', pri: true }, { text: 'React.Native', pri: true }, { text: 'Expo' }],
  },
  {
    title: 'Keen Studio',
    when: 'Ongoing',
    bullets: ['Cross-platform UI generation system for React and React Native, enforcing design decisions at the type level via generateTheme() and createUI(). Component library and theme engine live; CLI and visual configurator in active development to reduce setup friction and enforce consistency across projects.'],
    tags: [{ text: 'React', pri: true }, { text: 'React.Native', pri: true }, { text: 'TypeScript', pri: true }, { text: 'Design.Tokens' }, { text: 'Turborepo' }],
  },
  {
    title: 'BookMarquee',
    when: '2026',
    bullets: ['Chrome and Firefox extension (Manifest V3) to organize and manage Twitter/X bookmarks.'],
    tags: [{ text: 'React', pri: true }, { text: 'TypeScript', pri: true }, { text: 'Vite' }, { text: 'Chrome/Firefox.MV3' }],
  },
  {
    title: 'Wahl-O-Mat',
    when: '2019',
    bullets: ['Analysis of interface issues and creation of interactive Figma prototypes. Validation of new design concepts through direct user feedback.'],
    tags: [{ text: 'User.Research', pri: true }, { text: 'Figma.Prototyping' }, { text: 'UX.Analysis' }],
  },
]

export const CV_CORE_STACK = [
  'TypeScript', 'JavaScript (ES6+)', 'React', 'React Native', 'Expo', 'Next.js', 'Redux Toolkit',
  'REST APIs', 'GraphQL', 'Radix UI', 'HTML5/CSS3', 'Sass/SCSS', 'Design Systems', 'Git/GitHub',
]

export const CV_TOOLING = [
  'TanStack Query', 'Apollo Client', 'Vite', 'Webpack', 'Jest', 'Vitest', 'React Testing Library',
  'Cypress', 'Playwright', 'Storybook', 'pnpm Workspaces', 'Turborepo', 'Sentry', 'Node.js',
  'Postman', 'Claude Code', 'Microfrontend', 'CI/CD pipelines', 'Base UI', 'Gluestack',
]

export const CV_FAMILIAR = [
  'Vue.js', 'Tailwind CSS', 'React Native Reanimated', 'i18next', 'Fastify', 'Browser Extensions (MV3)',
  'Supabase', 'WebSockets', 'Recharts', 'Core Web Vitals', 'Docker', 'SQL/NoSQL', 'Firebase', 'Drizzle', 'SQLite',
]

export const CV_LANGUAGES = [
  { lang: 'English', level: 'C1' },
  { lang: 'German', level: 'B2' },
  { lang: 'Arabic', level: 'Native' },
]

export const CV_EDUCATION = [
  { school: 'Syrian Virtual University', detail: 'B.Sc. Information Technology', when: '2006 — 2009' },
  { school: 'Tishreen University', detail: 'Diploma, Computer Science', when: '2002 — 2005' },
  { school: 'ReDI School', detail: 'Creative Web Dev / React', when: 'Nov 2016 — Mar 2017' },
]
