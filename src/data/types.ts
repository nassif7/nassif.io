export type Image = { src: string; alt: string }
export type Link = { label: string; href: string }

export const PROJECT_TYPES = [
  'Mobile app',
  'Browser extension',
  'Website',
  'Dev tool',
  'Editor theme',
  'Concept',
] as const
export type ProjectType = (typeof PROJECT_TYPES)[number]

export type CaseSection = {
  id: string
  label: string
  heading: string
  /** HTML paragraphs; inline <strong> allowed */
  body: string[]
  pull?: string
  figure?: { image: Image; caption: string }
  outcomes?: { value: string; label: string }[]
}

export type Project = {
  slug: string
  name: string
  kind: 'case-study' | 'entry'
  type: ProjectType
  year: number
  role: string
  client?: string
  platform?: string
  stack: string[]
  status: { label: string; live: boolean }
  summary: string
  lede: string
  cover?: Image
  links: Link[]
  featured?: boolean
  /** paragraphs for kind 'entry' */
  body: string[]
  /** required when kind === 'case-study' */
  sections?: CaseSection[]
}

export type Topic = string

export type Post = {
  slug: string
  title: string
  /** ISO date */
  date: string
  topic: Topic
  dek: string
  featured?: boolean
  /** HTML paragraphs */
  body: string[]
}

export type TimelineEntry = {
  start: number
  end: number | null
  label?: string
  title: string
  org: string
  kind: 'work' | 'project' | 'education' | 'volunteer' | 'research'
  current?: boolean
  summary?: string
  /** CV only */
  bullets?: string[]
  cvWhen?: string
  showOnCV?: boolean
}

export type Profile = {
  name: string
  role: string
  city: string
  timezone: string
  coords: string
  since: number
  headline: [string, string, string, string]
  intro: string
  aboutLede: [string, string]
  aboutBody: string[]
  languages: { name: string; level: string }[]
  engagement: string
  availability: { open: boolean; label: string }
  email: string
  socials: Link[]
  cv: { pdf: string }
}
