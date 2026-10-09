'use client'

import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', day: 'numeric', month: 'short', year: 'numeric' })

/** Rendered client-side only, so server and client markup never disagree. */
export function TodayDate() {
  const [value, setValue] = useState('')
  useEffect(() => setValue(fmt.format(new Date())), [])
  return <span suppressHydrationWarning>{value}</span>
}
