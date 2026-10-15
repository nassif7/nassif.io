import { cache } from 'react'
import { fetchPosts, fetchProfile, fetchProjects, fetchSite, fetchTimeline } from '@/lib/content'
import { PROJECT_TYPES } from './types'
import type { Post, Project, TimelineEntry } from './types'

export { site, pad, isTall, readingTime, timelineYear, formatDate, formatMonth } from './format'
export type { Post, Project, TimelineEntry } from './types'

// cached per request, so a page and its children share one query
export const getProjects = cache(fetchProjects)
export const getPosts = cache(fetchPosts)
export const getTimeline = cache(fetchTimeline)
export const getProfile = cache(fetchProfile)
export const getSite = cache(fetchSite)

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find(p => p.slug === slug)
}

export async function getFeaturedProject(): Promise<Project | undefined> {
  const list = await getProjects()
  return list.find(p => p.featured) ?? list[0]
}

export async function getProjectIndex(slug: string): Promise<number> {
  return (await getProjects()).findIndex(p => p.slug === slug)
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find(p => p.slug === slug)
}

export async function getFeaturedPost(): Promise<Post | undefined> {
  const list = await getPosts()
  return list.find(p => p.featured) ?? list[0]
}

/** Position of a post in the list, plus the list itself (for "More writing"). */
export async function getPostNeighbours(slug: string) {
  const list = await getPosts()
  const i = list.findIndex(p => p.slug === slug)
  return { index: i, list }
}

/** Chips: only values with at least one item, in canonical order. */
export async function projectTypeCounts() {
  const list = await getProjects()
  return PROJECT_TYPES.map(t => ({ value: t as string, count: list.filter(p => p.type === t).length })).filter(c => c.count > 0)
}

export async function topicCounts() {
  const list = await getPosts()
  const names = [...new Set(list.map(p => p.topic))].sort((a, b) => a.localeCompare(b))
  return names.map(t => ({ value: t, count: list.filter(p => p.topic === t).length }))
}
