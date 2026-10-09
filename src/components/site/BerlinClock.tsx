'use client'

import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', hour12: false })

export function BerlinClock() {
  const [value, setValue] = useState('--:--')
  useEffect(() => {
    const tick = () => setValue(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 20000)
    return () => clearInterval(id)
  }, [])
  return <span suppressHydrationWarning>{value}</span>
}
