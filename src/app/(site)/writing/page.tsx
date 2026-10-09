import type { Metadata } from 'next'
import { WritingIndex } from '@/components/lists/WritingIndex'
import { getPosts, topicCounts } from '@/data'

export const metadata: Metadata = { title: 'Writing' }

export default async function WritingPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams
  return <WritingIndex posts={await getPosts()} chips={await topicCounts()} initialTopic={topic ?? null} />
}
