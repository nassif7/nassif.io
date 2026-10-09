'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useModal } from './Modal'
import { getUnderlyingPath } from './PathTracker'

type Props = Omit<React.ComponentProps<'a'>, 'href'> & {
  href: string
  /** `swap`: replaces the content in place (modal) · `closes`: link to a list page */
  mode: 'swap' | 'closes'
}

/**
 * Link used inside detail views.
 * - `swap`: inside the modal fades the content out, loads the next item and replaces the URL
 * - `closes`: closes the modal when that list is the page underneath, otherwise navigates
 */
export function DetailLink({ href, mode, onClick, children, ...rest }: Props) {
  const modal = useModal()
  const router = useRouter()

  if (!modal) {
    return <Link href={href} {...rest}>{children}</Link>
  }
  return (
    <a
      href={href}
      {...rest}
      onClick={e => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        if (mode === 'swap') modal.navigate(href)
        else if (getUnderlyingPath() === href) modal.close()
        else router.push(href)
      }}
    >
      {children}
    </a>
  )
}
