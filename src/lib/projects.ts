import { client, getDraftClient } from '@/sanity/lib/client'
import { allProjectsQuery, projectBySlugQuery } from '@/sanity/lib/queries'
import { draftMode } from 'next/headers'

export type ProjectMeta = {
  slug: string
  name: string
  type: string
  num: string
  desc: string
  stack: string[]
  images: any[]
  link: string | null
  linkLabel: string | null
  appStoreLink: string | null
  androidComingSoon: boolean
  privacyPolicy: string | null
  wip: boolean
  brainstorm: boolean
}

export type Project = ProjectMeta & {
  body: any[]
}

export async function getAllProjects(): Promise<ProjectMeta[]> {
  return client.fetch(allProjectsQuery, {}, { next: { tags: ['project'] } })
}

export async function getProject(slug: string): Promise<Project | null> {
  const { isEnabled } = await draftMode()
  if (isEnabled) {
    const token = process.env.SANITY_API_READ_TOKEN!
    return getDraftClient(token).fetch(projectBySlugQuery, { slug })
  }
  return client.fetch(projectBySlugQuery, { slug }, { next: { tags: [`project:${slug}`] } })
}
