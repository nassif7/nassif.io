'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useModal } from './Modal'
import { getUnderlyingPath } from './PathTracker'

/**
 * Link used inside detail views.
 * - `swap`: prev/next — inside the modal replaces the content in place (no new history entry)
 * - `closes`: link to a list page — closes the modal when that list is the page underneath, otherwise navigates
 */
export function DetailLink({
  href,
  mode,
  className,
  children,
}: {
  href: string
  mode: 'swap' | 'closes'
  className?: string
  children: React.ReactNode
}) {
  const modal = useModal()
  const router = useRouter()

  if (!modal) {
    return <Link href={href} className={className}>{children}</Link>
  }
  return (
    <a
      href={href}
      className={className}
      onClick={e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        if (mode === 'swap') router.replace(href, { scroll: false })
        else if (getUnderlyingPath() === href) modal.close()
        else router.push(href)
      }}
    >
      {children}
    </a>
  )
}
