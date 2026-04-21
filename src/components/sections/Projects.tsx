'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PROJECTS } from '@/lib/data'
import shared from './section.module.css'
import styles from './Writing.module.css'
import { ProjectModal } from './ProjectModal'

type Project = typeof PROJECTS[number]

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)

  return (
    <section id="work" className={shared.section}>
      <div className={shared.sectionHeader}>
        <span className={shared.label}>Selected work</span>
      </div>

      <h2 className={shared.heading}>Things I've shipped.</h2>
      <p className={shared.intro}>Side projects and work in progress. Small but deliberate.</p>

      <div className={styles.list}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.num}
            className={styles.row}
            style={{ opacity: p.wip ? 0.45 : 1, cursor: p.wip ? 'default' : 'pointer' }}
            onClick={() => !p.wip && setOpen(p)}
          >
            <span className={styles.num}>0{i + 1}</span>
            <div className={styles.rowMain}>
              <span className={styles.title}>{p.name}</span>
              <span className={styles.excerpt}>{p.desc}</span>
            </div>
            <div className={styles.rowMeta}>
              <span className={styles.tag}>{p.type}</span>
              {p.stack.length > 0 && (
                <span className={styles.date}>{p.stack.join(' · ')}</span>
              )}
            </div>
            <span className={styles.arrow}>{p.wip ? '…' : '↗'}</span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
