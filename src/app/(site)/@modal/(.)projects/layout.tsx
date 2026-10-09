import { ModalShell } from '@/components/site/Modal'

export default function ProjectModalLayout({ children }: { children: React.ReactNode }) {
  return <ModalShell label="Project" noun="project">{children}</ModalShell>
}
