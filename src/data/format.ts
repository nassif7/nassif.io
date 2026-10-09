import type { Post, TimelineEntry } from './types'

export { site } from './site'

export const pad = (n: number) => String(n).padStart(2, '0')

export function readingTime(post: Post): { words: number; minutes: number } {
  const words = post.body.join(' ').replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
  return { words, minutes: Math.max(1, Math.ceil(words / 230)) }
}

export function timelineYear(e: TimelineEntry): string {
  if (e.label) return e.label
  return e.start === e.end || !e.end ? String(e.start) : `${e.start}–${String(e.end).slice(-2)}`
}

const DATE_LONG = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const DATE_MONTH = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })
export const formatDate = (iso: string) => DATE_LONG.format(new Date(iso))
export const formatMonth = (iso: string) => DATE_MONTH.format(new Date(iso))
