import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostDetail } from '@/components/detail/PostDetail'
import { getPost, getPosts } from '@/data'

export function generateStaticParams() {
  return getPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug)
  return post ? { title: post.title, description: post.dek } : {}
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  return <PostDetail post={post} />
}
