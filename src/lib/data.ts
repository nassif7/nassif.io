export const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
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
    type: 'Side project',
    name: 'oneMore',
    desc: 'A cigarette tracking app that helps smokers build awareness of their habits — not by pressuring them to quit, but by turning an unconscious habit into a conscious choice.',
    longDesc: 'oneMore is a personal cigarette tracking app designed to help smokers build awareness of their habits and take meaningful steps toward smoking less. By logging each cigarette in real time, users gain a clear picture of how much they smoke, when they smoke, and what triggers their cravings.\n\nThe app focuses on simplicity and honesty — rather than pressuring users to quit cold turkey, oneMore meets them where they are, encouraging gradual reduction one cigarette at a time. Every log is a moment of mindfulness, turning an unconscious habit into a conscious choice.\n\nWith insights into daily and weekly patterns, oneMore empowers users to set their own pace, celebrate small wins, and stay motivated on their journey toward a healthier life.',
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
  },
  {
    num: '02',
    type: 'Side project',
    name: 'Project Beta',
    desc: 'Another one you\'re proud of. Even small tools count — especially if they solved a real problem.',
    longDesc: '',
    images: [],
    stack: ['Next.js', 'Node.js'],
    link: null,
    linkLabel: null,
    wip: true,
  },
  {
    num: '03',
    type: 'In progress',
    name: 'Something new',
    desc: 'Coming soon. Tease it here until it\'s ready.',
    longDesc: '',
    images: [],
    stack: [],
    link: null,
    linkLabel: null,
    wip: true,
  },
] as const

export const WRITING_TAGS = ['Politics', 'Philosophy', 'Tech & Society', 'General'] as const

export const CONTACT_ITEMS = [
  { type: 'Email', value: 'n_nassif@icloud.com', action: 'Write ↗', href: 'mailto:n_nassif@icloud.com' },
  { type: 'GitHub', value: '@nassif', action: 'View ↗', href: 'https://github.com' },
  { type: 'LinkedIn', value: 'Nassif Nassif', action: 'Connect ↗', href: 'https://linkedin.com' },
  { type: 'Resume', value: 'PDF · 2025', action: 'Download ↗', href: '/resume.pdf' },
] as const
