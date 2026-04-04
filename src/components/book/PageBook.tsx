'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './PageBook.module.css'

interface Section {
  id: string
  node: React.ReactNode
}

interface PageBookProps {
  sections: Section[]
}

const variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    y: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.98,
  }),
}

const transition = {
  y:       { type: 'spring' as const, stiffness: 280, damping: 32 },
  opacity: { duration: 0.2 },
  scale:   { duration: 0.3 },
}

export function PageBook({ sections }: PageBookProps) {
  const [current, setCurrent] = useState(0)
  const [dir, setDir]         = useState(1)
  const locked                = useRef(false)

  const goTo = useCallback((index: number) => {
    if (locked.current || index === current || index < 0 || index >= sections.length) return
    locked.current = true
    setDir(index > current ? 1 : -1)
    setCurrent(index)
  }, [current, sections.length])

  useEffect(() => {
    let acc = 0
    const onWheel = (e: WheelEvent) => {
      acc += e.deltaY
      if (acc > 60)       { acc = 0; goTo(current + 1) }
      else if (acc < -60) { acc = 0; goTo(current - 1) }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [current, goTo])

  useEffect(() => {
    const onNav = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      const idx = sections.findIndex(s => s.id === id)
      if (idx !== -1) goTo(idx)
    }
    window.addEventListener('book-navigate', onNav)
    return () => window.removeEventListener('book-navigate', onNav)
  }, [sections, goTo])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('book-section-changed', { detail: sections[current].id }))
    locked.current = false
  }, [current, sections])

  return (
    <div className={styles.book}>
      <AnimatePresence custom={dir} initial={false}>
        <motion.div
          key={current}
          className={styles.page}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
        >
          {sections[current].node}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
