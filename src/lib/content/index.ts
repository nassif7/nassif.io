import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Image, Link, Post, Profile, Project, TimelineEntry } from '@/data/types'
import { lexicalToParagraphs } from './lexical'
import { CONTENT_TAG } from './revalidate'

// Content is cached until it is edited in the admin (see revalidateContent) or an hour passes.
const cached = <T>(key: string, fn: () => Promise<T>) => unstable_cache(fn, ['content', key], { tags: [CONTENT_TAG], revalidate: 3600 })

export { lexicalToParagraphs } from './lexical'

const db = () => getPayload({ config: configPromise })

const media = (m: any): Image | undefined =>
  m && typeof m === 'object' && m.url ? { src: m.url, alt: m.alt ?? '' } : undefined

function toProject(d: any): Project {
  const cover = media(d.cover) ?? (d.coverUrl ? { src: d.coverUrl, alt: d.name } : undefined)
  return {
    slug: d.slug,
    name: d.name,
    kind: d.kind,
    type: d.type,
    year: d.year,
    role: d.role?.name ?? '',
    client: d.client || undefined,
    platform: d.platform || undefined,
    stack: (d.stack ?? []).map((s: any) => s?.name).filter(Boolean),
    status: { label: d.status?.label ?? '', live: !!d.status?.live },
    summary: d.summary,
    lede: d.lede,
    cover: cover ? { ...cover, alt: cover.alt || d.name } : undefined,
    links: (d.links ?? []).map((l: any): Link => ({ label: l.label, href: l.href })),
    featured: !!d.featured,
    body: lexicalToParagraphs(d.body),
    sections:
      d.kind === 'case-study'
        ? (d.sections ?? []).map((s: any) => {
            const fig = media(s.figure?.image)
            return {
              id: s.sectionId,
              label: s.label,
              heading: s.heading,
              body: lexicalToParagraphs(s.body),
              pull: s.pull || undefined,
              figure: fig ? { image: fig, caption: s.figure?.caption ?? '' } : undefined,
              outcomes: s.outcomes?.length ? s.outcomes.map((o: any) => ({ value: o.value, label: o.label })) : undefined,
            }
          })
        : undefined,
  }
}

function toPost(d: any): Post {
  return {
    slug: d.slug,
    title: d.title,
    date: String(d.date).slice(0, 10),
    topic: d.topic?.name ?? '',
    dek: d.dek,
    featured: !!d.featured,
    body: lexicalToParagraphs(d.body),
  }
}

/** Newest first; `order` (if set) overrides the year sort. */
export const fetchProjects = cached('projects', async (): Promise<Project[]> => {
  const payload = await db()
  const { docs } = await payload.find({ collection: 'projects', where: { draft: { not_equals: true } }, limit: 500, depth: 2, pagination: false })
  return [...docs]
    .sort((a: any, b: any) => (a.order ?? 1e9) - (b.order ?? 1e9) || b.year - a.year || a.name.localeCompare(b.name))
    .map(toProject)
})

export const fetchPosts = cached('posts', async (): Promise<Post[]> => {
  const payload = await db()
  const { docs } = await payload.find({ collection: 'posts', where: { draft: { not_equals: true } }, sort: '-date', limit: 500, depth: 1, pagination: false })
  return docs.map(toPost)
})

export const fetchTimeline = cached('timeline', async (): Promise<TimelineEntry[]> => {
  const payload = await db()
  const { docs } = await payload.find({ collection: 'timeline', limit: 500, depth: 0, pagination: false })
  return docs
    .map((d: any): TimelineEntry => ({
      start: d.start,
      end: d.end ?? null,
      label: d.label || undefined,
      title: d.title,
      org: d.org,
      kind: d.kind,
      current: !!d.current,
      summary: d.summary || undefined,
      bullets: (d.bullets ?? []).map((b: any) => b.text),
      cvWhen: d.cvWhen || undefined,
      showOnCV: d.showOnCV !== false,
    }))
    .sort((a, b) => b.start - a.start || (b.end ?? 9999) - (a.end ?? 9999))
})

export const fetchProfile = cached('profile', async (): Promise<Profile> => {
  const payload = await db()
  const p: any = await payload.findGlobal({ slug: 'profile', depth: 0 })
  return {
    name: p.name,
    role: p.role,
    city: p.city,
    timezone: p.timezone,
    coords: p.coords ?? '',
    since: p.since ?? 0,
    headline: [p.headline?.line1, p.headline?.line2, p.headline?.line3, p.headline?.line3Muted],
    intro: p.intro,
    aboutLede: [p.aboutLede?.main ?? '', p.aboutLede?.muted ?? ''],
    aboutBody: (p.aboutBody ?? []).map((b: any) => b.text),
    languages: (p.languages ?? []).map((l: any) => ({ name: l.name, level: l.level })),
    engagement: p.engagement ?? '',
    availability: { open: !!p.availability?.open, label: p.availability?.label ?? '' },
    email: p.email,
    socials: (p.socials ?? []).map((s: any) => ({ label: s.label, href: s.href })),
    cv: { pdf: p.cvPdf ?? '/nassif-nassif-cv.pdf' },
  }
})

export const fetchSite = cached('site', async () => {
  const payload = await db()
  const s: any = await payload.findGlobal({ slug: 'site', depth: 1 })
  return {
    title: s.title as string,
    seoTitle: (s.seoTitle as string) || undefined,
    description: (s.description as string) || undefined,
    footerQuote: s.footerQuote as string,
    ogImage: media(s.ogImage)?.src,
  }
})
