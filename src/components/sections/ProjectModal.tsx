'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import styles from './ProjectModal.module.css'
import { PROJECTS } from '@/lib/data'

type Project = typeof PROJECTS[number]

interface Props {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          onClick={e => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <IoClose />
          </button>

          <div className={styles.photoBand}>
            <span className={styles.photoLabel}>// photo coming soon</span>
          </div>

          <div className={styles.body}>
            <span className={styles.type}>{project.num} — {project.type}</span>
            <h2 className={styles.name}>{project.name}</h2>
            <p className={styles.desc}>{project.desc}</p>

            {project.stack.length > 0 && (
              <div className={styles.stack}>
                {project.stack.map(t => <span key={t} className={styles.pill}>{t}</span>)}
              </div>
            )}

            {!project.wip && project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {project.linkLabel} ↗
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
