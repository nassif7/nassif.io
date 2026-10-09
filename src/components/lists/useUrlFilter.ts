'use client'

import { useCallback, useState } from 'react'

/** Single-value filter mirrored into `?param=` without triggering a navigation. */
export function useUrlFilter(param: string, initial: string | null) {
  const [value, setValue] = useState<string | null>(initial)
  const set = useCallback(
    (next: string | null) => {
      setValue(next)
      const url = new URL(window.location.href)
      if (next) url.searchParams.set(param, next)
      else url.searchParams.delete(param)
      window.history.replaceState(window.history.state, '', url)
    },
    [param],
  )
  return [value, set] as const
}
