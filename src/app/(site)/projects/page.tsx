import type { Metadata } from 'next'
import { ProjectsIndex } from '@/components/lists/ProjectsIndex'
import { getProjects, projectTypeCounts } from '@/data'

export const metadata: Metadata = { title: 'Projects' }

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams
  return <ProjectsIndex projects={await getProjects()} chips={await projectTypeCounts()} initialType={type ?? null} />
}
