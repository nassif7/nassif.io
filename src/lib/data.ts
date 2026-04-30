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

export const WRITING_TAGS = ['Politics', 'Philosophy', 'Tech & Society', 'General'] as const

export const CONTACT_ITEMS = [
  { type: 'Email', value: 'n_nassif@icloud.com', action: 'Write ↗', href: 'mailto:n_nassif@icloud.com' },
  { type: 'GitHub', value: '@nassif', action: 'View ↗', href: 'https://github.com' },
  { type: 'LinkedIn', value: 'Nassif Nassif', action: 'Connect ↗', href: 'https://linkedin.com' },
  { type: 'Resume', value: 'PDF · 2025', action: 'Download ↗', href: '/resume.pdf' },
] as const
