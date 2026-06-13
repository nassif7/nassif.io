import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type Collection = {
  id: string
  slug: string
  title: string
}

export type PostMeta = {
  id: string
  slug: string
  title: string
  date: string
  tags?: string[]
  excerpt: string
  collections?: Collection[]
}

export type Post = PostMeta & {
  hidden?: boolean
  body: any
}

function normalizePost(doc: any): PostMeta {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    date: doc.date,
    tags: doc.tags?.map((t: { tag: string }) => t.tag) ?? [],
    excerpt: doc.excerpt ?? '',
    collections: doc.collections?.map((c: any) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
    })) ?? [],
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { hidden: { equals: false } },
    sort: '-date',
    depth: 1,
  })
  return docs.map(normalizePost)
}

export async function getFeaturedPosts(): Promise<PostMeta[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { featured: { equals: true } },
        { hidden: { equals: false } },
      ],
    },
    sort: '-date',
    depth: 1,
  })
  return docs.map(normalizePost)
}

export async function getAllCollections(): Promise<Collection[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'post-collections',
    sort: 'title',
  })
  return docs.map((c: any) => ({ id: c.id, slug: c.slug, title: c.title }))
}

export async function getPost(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 1,
  })
  if (!docs[0]) return null
  const doc = docs[0]
  return {
    ...normalizePost(doc),
    hidden: doc.hidden ?? false,
    body: doc.body,
  }
}
