'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PROJECTS } from '@/lib/data'
import shared from './section.module.css'
import styles from './Projects.module.css'
import { ProjectModal } from './ProjectModal'

type Project = typeof PROJECTS[number]

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)

  return (
    <section id="work" className={shared.section}>
      <div className={shared.sectionHeader}>
        <span className={shared.label}>Selected work</span>
        <a href="/projects" className={shared.seeAll}>All projects →</a>
      </div>

      <div className={styles.list}>
        {PROJECTS.map(project => (
          <button
            key={project.num}
            className={styles.row}
            onClick={() => setOpen(project)}
          >
            <span className={styles.name}>{project.name}</span>
            <span className={styles.type}>{project.type}</span>
            <span className={styles.year}>2024</span>
            <span className={styles.arrow}>↗</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
