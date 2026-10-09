import { notFound } from 'next/navigation'
import { ReadyGate } from '@/components/site/Modal'
import { ProjectDetail } from '@/components/detail/ProjectDetail'
import { getProject } from '@/data'

export default async function ProjectModal({ params }: { params: Promise<{ slug: string }> }) {
  const project = await getProject((await params).slug)
  if (!project) notFound()
  return (
    <ReadyGate key={project.slug}>
      <ProjectDetail project={project} embedded />
    </ReadyGate>
  )
}
