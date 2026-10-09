import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/detail/ProjectDetail'
import { getProject } from '@/data'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = await getProject((await params).slug)
  return project ? { title: project.name, description: project.summary } : {}
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = await getProject((await params).slug)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
