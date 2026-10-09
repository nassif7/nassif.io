import { notFound } from 'next/navigation'
import { Modal } from '@/components/site/Modal'
import { ProjectDetail } from '@/components/detail/ProjectDetail'
import { getProject } from '@/data'

export default async function ProjectModal({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  return (
    <Modal label="Project">
      <ProjectDetail project={project} embedded />
    </Modal>
  )
}
