import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type ProjectLink = {
  id?: string
  platform: string
  url?: string | null
  comingSoon?: boolean
}

export type ProjectMeta = {
  id: string
  slug: string
  name: string
  type: string
  desc: string
  categories?: string[]
  stack: string[]
  images: string[]
  links: ProjectLink[]
  privacyPolicy: string | null
  hidden: boolean
  featured: boolean
  featuredImage: string | null
  featuredOrder: number
  wip: boolean
  brainstorm: boolean
  year: string
  client: string | null
  role: string | null
  platforms: string | null
  status: string
  statusVariant: 'default' | 'live' | 'wip'
  order: number
  caseStudy: boolean
}

export type CaseStudySection = {
  sectionId: string
  num: string
  eyebrow: string
  heading: string
  body: any
  pullQuote: string | null
  spec: { k: string; v: string }[]
  figureCaption: string | null
  figureImages: { src: string; alt: string }[]
  outcomes: { value: string; label: string }[]
}

export type CaseStudyContent = {
  eyebrow: string
  category: string
  lead: string
  heroImages: { src: string; alt: string }[]
  sections: CaseStudySection[]
  nextEyebrow: string
  nextTitle: string
  nextHref: string
}

export type Project = ProjectMeta & {
  body: any
  caseStudyContent: CaseStudyContent | null
}

function resolveImageUrl(img: any): string | null {
  if (typeof img.image === 'object' && img.image?.url) return img.image.url
  return img.url ?? null
}

function normalizeCaseStudyContent(cs: any): CaseStudyContent | null {
  if (!cs) return null
  return {
    eyebrow: cs.eyebrow ?? '',
    category: cs.category ?? '',
    lead: cs.lead ?? '',
    heroImages: (cs.heroImages ?? [])
      .map((img: any) => ({ src: resolveImageUrl(img), alt: img.alt ?? '' }))
      .filter((img: { src: string | null }) => img.src),
    sections: (cs.sections ?? []).map((s: any) => ({
      sectionId: s.sectionId,
      num: s.num,
      eyebrow: s.eyebrow,
      heading: s.heading,
      body: s.body ?? null,
      pullQuote: s.pullQuote || null,
      spec: (s.spec ?? []).map((row: any) => ({ k: row.k, v: row.v })),
      figureCaption: s.figureCaption || null,
      figureImages: (s.figureImages ?? [])
        .map((img: any) => ({ src: resolveImageUrl(img), alt: img.alt ?? '' }))
        .filter((img: { src: string | null }) => img.src),
      outcomes: (s.outcomes ?? []).map((o: any) => ({ value: o.value, label: o.label })),
    })),
    nextEyebrow: cs.nextEyebrow ?? '',
    nextTitle: cs.nextTitle ?? '',
    nextHref: cs.nextHref ?? '',
  }
}

function normalizeProject(doc: any): ProjectMeta {
  return {
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    type: doc.type ?? '',
    desc: doc.desc ?? '',
    categories: doc.categories?.map((c: { category: string }) => c.category) ?? [],
    stack: doc.stack?.map((s: { item: string }) => s.item) ?? [],
    images: doc.images?.map((img: any) => {
      if (typeof img.image === 'object' && img.image?.url) return img.image.url
      return img.url ?? null
    }).filter(Boolean) ?? [],
    links: doc.links?.map((l: any) => ({
      id: l.id,
      platform: l.platform,
      url: l.url ?? null,
      comingSoon: l.comingSoon ?? false,
    })) ?? [],
    privacyPolicy: doc.privacyPolicy ?? null,
    hidden: doc.hidden ?? false,
    featured: doc.featured ?? false,
    featuredImage: typeof doc.featuredImage === 'object' && doc.featuredImage !== null
      ? (doc.featuredImage as any).url ?? null
      : doc.featuredImage ?? null,
    featuredOrder: doc.featuredOrder ?? 0,
    wip: doc.wip ?? false,
    brainstorm: doc.brainstorm ?? false,
    year: doc.year ?? '',
    client: doc.client ?? null,
    role: doc.role ?? null,
    platforms: doc.platforms ?? null,
    status: doc.status ?? '',
    statusVariant: doc.statusVariant ?? 'default',
    order: doc.order ?? 0,
    caseStudy: doc.caseStudy ?? false,
  }
}

export async function getAllProjects(): Promise<ProjectMeta[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    where: { hidden: { not_equals: true } },
    sort: 'order',
    depth: 1,
  })
  return docs.map(normalizeProject)
}

export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: 'featuredOrder',
    depth: 1,
  })
  return docs.map(normalizeProject)
}

export async function getProject(slug: string): Promise<Project | null> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 1,
  })
  if (!docs[0]) return null
  const doc = docs[0]
  return {
    ...normalizeProject(doc),
    body: doc.body,
    caseStudyContent: normalizeCaseStudyContent(doc.caseStudyContent),
  }
}
