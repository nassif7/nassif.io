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
}

export type Project = ProjectMeta & {
  body: any
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
  }
}

export async function getAllProjects(): Promise<ProjectMeta[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    where: { hidden: { not_equals: true } },
    sort: 'createdAt',
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
  }
}
