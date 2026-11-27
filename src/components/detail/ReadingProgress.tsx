'use client'

import { useEffect, useRef } from 'react'
import styles from './detail.module.css'

export function ReadingProgress() {
  const bar = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return <span ref={bar} className={styles.prog} aria-hidden="true" />
}
