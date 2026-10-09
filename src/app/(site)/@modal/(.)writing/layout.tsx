import { ModalShell } from '@/components/site/Modal'

export default function WritingModalLayout({ children }: { children: React.ReactNode }) {
  return <ModalShell label="Essay" noun="essay">{children}</ModalShell>
}
