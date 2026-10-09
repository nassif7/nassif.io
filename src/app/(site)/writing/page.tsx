import type { Metadata } from 'next'
import { WritingIndex } from '@/components/lists/WritingIndex'
import { getPosts, topicCounts } from '@/data'

export const metadata: Metadata = { title: 'Writing' }

export default async function WritingPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams
  // lists only need a plain-text opening, not the whole essay
  const plain = (html: string) => html.replace(/<[^>]+>/g, '').trim()
  const posts = (await getPosts()).map(p => ({
    ...p,
    body: [],
    opening: p.body.map(plain).filter(t => t && t !== plain(p.dek)).slice(0, 3).join(' '),
  }))
  return <WritingIndex posts={posts} chips={await topicCounts()} initialTopic={topic ?? null} />
}
