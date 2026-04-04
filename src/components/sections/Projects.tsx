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

      <div className={styles.grid}>
        {PROJECTS.map(project => (
          <button
            key={project.num}
            className={styles.card}
            onClick={() => setOpen(project)}
          >
            <div className={styles.cardTop}>
              <span className={styles.type}>{project.type}</span>
              <span className={styles.arrow}>↗</span>
            </div>
            <span className={styles.name}>{project.name}</span>
            <span className={styles.desc}>{project.desc}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
