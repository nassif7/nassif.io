import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Nassif Nassif',
  role: 'Product engineer',
  city: 'Berlin',
  timezone: 'Europe/Berlin',
  coords: '52.52° N · 13.40° E',
  since: 2016,
  headline: ['Product', 'engineer,', 'whole thing — ', 'not a layer of it.'],
  intro:
    'Nassif Nassif, Berlin. Eight years between design and engineering — from the first sketch to the store listing.',
  aboutLede: [
    'I build products end to end — the flow, the interface, the data, the release. ',
    'Not frontend. Not backend. The whole thing.',
  ],
  aboutBody: [
    'Eight years of building software across corporate platforms, startups, and independent projects. Most of that time has been spent where design and engineering meet — component libraries, configurable forms, real-time interfaces — the places where a product either holds together or quietly doesn’t.',
    'I started in Berlin in 2016, learned web development at ReDI School, and taught it there a few months later. The habit stuck: <strong>learn it properly, then hand it over.</strong> I still work that way — understanding the whole system before touching one layer of it.',
    'AI-native in my workflow, grounded in the fundamentals. I care as much about the person on the other side of the screen as about the architecture behind it. Outside of work: reading, writing, chess, bouldering, football, F1, and photography.',
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'C1' },
    { name: 'German', level: 'B2' },
  ],
  engagement: 'Contract · Full-time',
  availability: { open: true, label: 'Available Q4 2026' },
  email: 'hello@nassif.pro',
  socials: [
    { label: 'GitHub', href: 'https://github.com/nassif7' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/nassif' },
  ],
  cv: { pdf: '/nassif-nassif-cv.pdf' },
}

export const site = {
  title: 'Nassif Nassif',
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Writing', href: '/writing' },
    { label: 'About', href: '/about' },
    { label: 'CV', href: '/cv' },
  ],
  footerQuote: 'Built with love, shipped with hope 🙂',
}
