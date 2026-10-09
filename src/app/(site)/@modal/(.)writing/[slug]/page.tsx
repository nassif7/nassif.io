import { notFound } from 'next/navigation'
import { ReadyGate } from '@/components/site/Modal'
import { PostDetail } from '@/components/detail/PostDetail'
import { getPost } from '@/data'

export default async function PostModal({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  return (
    <ReadyGate key={post.slug}>
      <PostDetail post={post} embedded />
    </ReadyGate>
  )
}
