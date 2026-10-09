'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const DETAIL = /^\/(projects|writing)\/[^/]+$/

let underlying: string | null = null

/** The last non-detail page the visitor was on, i.e. the page a modal is open over. */
export const getUnderlyingPath = () => underlying

export function PathTracker() {
  const pathname = usePathname()
  useEffect(() => {
    if (!DETAIL.test(pathname)) underlying = pathname
  }, [pathname])
  return null
}
