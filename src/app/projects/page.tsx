'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PROJECTS } from '@/lib/data'
import { ProjectModal } from '@/components/sections/ProjectModal'
import styles from './projects.module.css'

type Project = typeof PROJECTS[number]

export default function ProjectsPage() {
  const [open, setOpen] = useState<Project | null>(null)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>← nassif.io</a>
        <h1 className={styles.title}>Work.</h1>
        <p className={styles.sub}>Selected projects — shipped, in progress, and still forming.</p>
      </header>

      <div className={styles.list}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.num}
            className={styles.row}
            style={{
              opacity: p.brainstorm ? 0.5 : 1,
              cursor: 'pointer',
            }}
            onClick={() => setOpen(p)}
          >
            <span className={styles.num}>0{i + 1}</span>
            <div className={styles.rowMain}>
              <span className={styles.rowTitle}>{p.name}</span>
              <span className={styles.excerpt}>{p.desc}</span>
            </div>
            <div className={styles.rowMeta}>
              <span className={styles.tag}>{p.type}</span>
              {p.stack.length > 0 && (
                <span className={styles.date}>{p.stack.join(' · ')}</span>
              )}
            </div>
            <span className={styles.arrow}>↗</span>
          </div>
        ))}
        <a href="mailto:hallo@nassif.pro" className={`${styles.row} ${styles.cta}`}>
          <span className={styles.num}>0{PROJECTS.length + 1}</span>
          <div className={styles.rowMain}>
            <span className={styles.rowTitle}>Your next project</span>
            <span className={styles.excerpt}>Got an idea? Get in touch.</span>
          </div>
          <div className={styles.rowMeta}>
            <span className={styles.tag}>Let's talk</span>
          </div>
          <span className={styles.arrow}>↗</span>
        </a>
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </main>
  )
}
