'use client'

import { useEffect, useRef } from 'react'
import styles from './detail.module.css'
import { CONTENT_ID } from './ProjectToc'

export function ReadingProgress() {
  const bar = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = document.getElementById(CONTENT_ID)
    if (!el) return
    const update = () => {
      const max = el.scrollHeight - el.clientHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 1})`
    }
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return <span ref={bar} className={styles.prog} aria-hidden="true" />
}
