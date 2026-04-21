'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [active, setActive] = useState(0)
  const images = 'images' in project ? [...project.images] as string[] : []
  const longDesc = 'longDesc' in project ? project.longDesc as string : ''

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActive(i => Math.min(i + 1, images.length - 1))
      if (e.key === 'ArrowLeft') setActive(i => Math.max(i - 1, 0))
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, images.length])

  return createPortal(
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <IoClose />
          </button>

          {/* images panel */}
          <div className={styles.imagePanel}>
            {images.length > 0 ? (
              <>
                <div className={styles.imageMain}>
                  {active > 0 && (
                    <button className={styles.arrowLeft} onClick={() => setActive(i => i - 1)}>‹</button>
                  )}
                  <img src={images[active]} alt={`${project.name} ${active + 1}`} />
                  {active < images.length - 1 && (
                    <button className={styles.arrowRight} onClick={() => setActive(i => i + 1)}>›</button>
                  )}
                </div>
                {images.length > 1 && (
                  <div className={styles.thumbs}>
                    {images.map((src, i) => (
                      <button
                        key={i}
                        className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
                        onClick={() => setActive(i)}
                      >
                        <img src={src} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noImage}>// photos coming soon</div>
            )}
          </div>

          {/* info panel */}
          <div className={styles.infoPanel}>
            <span className={styles.type}>{project.num} — {project.type}</span>
            <h2 className={styles.name}>{project.name}</h2>

            <div className={styles.desc}>
              {(longDesc || project.desc).split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {project.stack.length > 0 && (
              <div className={styles.stack}>
                {project.stack.map(t => <span key={t} className={styles.pill}>{t}</span>)}
              </div>
            )}

            {!project.wip && project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {project.linkLabel}
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
