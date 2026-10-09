import { projects } from './projects'
import { posts as allPosts } from './posts'
import { timeline } from './timeline'
import { PROJECT_TYPES, TOPICS } from './types'
import type { Post, Project, TimelineEntry } from './types'

export { profile, site } from './profile'
export type { Post, Project, TimelineEntry } from './types'

export const pad = (n: number) => String(n).padStart(2, '0')

export function getProjects(): Project[] {
  return projects
}

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getFeaturedProject(): Project {
  return projects.find(p => p.featured) ?? projects[0]
}

/** Previous/next wrap around the list. */
export function getProjectNeighbours(slug: string) {
  const i = projects.findIndex(p => p.slug === slug)
  return {
    index: i,
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  }
}

/** Newest first. */
export function getPosts(): Post[] {
  return [...allPosts].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string): Post | undefined {
  return allPosts.find(p => p.slug === slug)
}

export function getFeaturedPost(): Post {
  const sorted = getPosts()
  return sorted.find(p => p.featured) ?? sorted[0]
}

export function getPostNeighbours(slug: string) {
  const list = getPosts()
  const i = list.findIndex(p => p.slug === slug)
  return {
    index: i,
    list,
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  }
}

export function readingTime(post: Post): { words: number; minutes: number } {
  const words = post.body.join(' ').replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
  return { words, minutes: Math.max(1, Math.ceil(words / 230)) }
}

/** Chips: only values with at least one item, in canonical order. */
export function projectTypeCounts() {
  return PROJECT_TYPES.map(t => ({ value: t as string, count: projects.filter(p => p.type === t).length })).filter(c => c.count > 0)
}

export function topicCounts() {
  return TOPICS.map(t => ({ value: t as string, count: allPosts.filter(p => p.topic === t).length })).filter(c => c.count > 0)
}

export function timelineYear(e: TimelineEntry): string {
  if (e.label) return e.label
  return e.start === e.end || !e.end ? String(e.start) : `${e.start}–${String(e.end).slice(-2)}`
}

/** Newest first. */
export function getTimeline(): TimelineEntry[] {
  return timeline
}

const DATE_LONG = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const DATE_MONTH = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })
export const formatDate = (iso: string) => DATE_LONG.format(new Date(iso))
export const formatMonth = (iso: string) => DATE_MONTH.format(new Date(iso))
