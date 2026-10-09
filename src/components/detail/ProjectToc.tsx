'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { pad } from '@/data'
import type { CaseSection } from '@/data/types'
import styles from './detail.module.css'

export const CONTENT_ID = 'detail-content'

export function ProjectToc({ sections }: { sections: CaseSection[] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const root = document.getElementById(CONTENT_ID)
    if (!root || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { root, rootMargin: '0px 0px -65% 0px' },
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [sections])

  return (
    <nav className={clsx(styles.toc, 'k')} aria-label="Contents">
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-current={active === s.id ? 'true' : undefined}
          onClick={e => {
            e.preventDefault()
            const root = document.getElementById(CONTENT_ID)
            const target = document.getElementById(s.id)
            if (root && target) root.scrollTo({ top: target.offsetTop - root.offsetTop - 8 })
          }}
        >
          <span>{pad(i + 1)}</span>{s.label}
        </a>
      ))}
    </nav>
  )
}
