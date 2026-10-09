import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostDetail } from '@/components/detail/PostDetail'
import { getPost } from '@/data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug)
  return post ? { title: post.title, description: post.dek } : {}
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  return <PostDetail post={post} />
}
