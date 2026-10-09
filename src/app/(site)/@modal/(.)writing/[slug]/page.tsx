import { notFound } from 'next/navigation'
import { Modal } from '@/components/site/Modal'
import { PostDetail } from '@/components/detail/PostDetail'
import { getPost } from '@/data'

export default async function PostModal({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  return (
    <Modal label="Essay">
      <PostDetail post={post} embedded />
    </Modal>
  )
}
