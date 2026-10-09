import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/detail/ProjectDetail'
import { getProject, getProjects } from '@/data'

export function generateStaticParams() {
  return getProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug)
  return project ? { title: project.name, description: project.summary } : {}
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
