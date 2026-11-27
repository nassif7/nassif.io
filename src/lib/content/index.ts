import type { Post, Profile, Project, TimelineEntry } from '@/data/types'
import { posts } from '@/data/seed/posts'
import { profile, site } from '@/data/seed/profile'
import { projects } from '@/data/seed/projects'
import { timeline } from '@/data/seed/timeline'

export { lexicalToParagraphs } from './lexical'

export async function fetchProjects(): Promise<Project[]> {
  return [...projects]
}

export async function fetchPosts(): Promise<Post[]> {
  return [...posts]
}

export async function fetchTimeline(): Promise<TimelineEntry[]> {
  return [...timeline]
}

export async function fetchProfile(): Promise<Profile> {
  return profile
}

export async function fetchSite() {
  return {
    title: site.title,
    seoTitle: undefined,
    description: profile.intro,
    footerQuote: site.footerQuote,
    ogImage: undefined,
  }
}
