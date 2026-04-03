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
    name: 'Project Alpha',
    desc: 'A short description of what it does, who it\'s for, and why you built it.',
    stack: ['React', 'TypeScript'],
    link: '#',
    linkLabel: 'View →',
    wip: false,
  },
  {
    num: '02',
    type: 'Open source',
    name: 'Project Beta',
    desc: 'Another one you\'re proud of. Even small tools count — especially if they solved a real problem.',
    stack: ['Next.js', 'Node.js'],
    link: '#',
    linkLabel: 'GitHub →',
    wip: false,
  },
  {
    num: '03',
    type: 'In progress',
    name: 'Something new',
    desc: 'Coming soon. Tease it here until it\'s ready.',
    stack: [],
    link: null,
    linkLabel: null,
    wip: true,
  },
  {
    num: '04',
    type: 'Future',
    name: 'Your next idea',
    desc: 'A slot waiting to be filled.',
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
