import { client, getDraftClient } from '@/sanity/lib/client'
import { allPostsQuery, postBySlugQuery } from '@/sanity/lib/queries'
import { draftMode } from 'next/headers'

export type PostMeta = {
  slug: string
  title: string
  date: string
  tag: string
  excerpt: string
}

export type Post = PostMeta & {
  hidden?: boolean
  body: any[]
}

export async function getAllPosts(): Promise<PostMeta[]> {
  return client.fetch(allPostsQuery, {}, { next: { tags: ['post'] } })
}

export async function getPost(slug: string): Promise<Post | null> {
  const { isEnabled } = await draftMode()
  if (isEnabled) {
    const token = process.env.SANITY_API_READ_TOKEN!
    return getDraftClient(token).fetch(postBySlugQuery, { slug })
  }
  return client.fetch(postBySlugQuery, { slug }, { next: { tags: [`post:${slug}`] } })
}
