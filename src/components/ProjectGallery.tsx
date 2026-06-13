'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styles from './ProjectGallery.module.css'

interface Classes {
  gallery: string
  galleryMain: string
  arrowLeft: string
  arrowRight: string
  galleryThumbs: string
  thumb: string
  thumbActive: string
  dots?: string
  dot?: string
  dotActive?: string
}

interface Props {
  images: string[]
  name: string
  classes: Classes
}

export function ProjectGallery({ images, name, classes }: Props) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = useCallback(() => setActive(i => Math.max(i - 1, 0)), [])
  const next = useCallback(() => setActive(i => Math.min(i + 1, images.length - 1)), [images.length])
  const close = useCallback(() => setLightbox(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [prev, next, close])

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <>
      <div className={classes.gallery}>
        <div className={classes.galleryMain}>
          {active > 0 && (
            <button className={classes.arrowLeft} onClick={prev}>‹</button>
          )}
          <img
            src={images[active]}
            alt={`${name} screenshot ${active + 1}`}
            className={styles.mainImg}
            onClick={() => setLightbox(true)}
          />
          {active < images.length - 1 && (
            <button className={classes.arrowRight} onClick={next}>›</button>
          )}
        </div>
        {images.length > 1 && (
          <>
            <div className={classes.galleryThumbs}>
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`${classes.thumb} ${i === active ? classes.thumbActive : ''}`}
                  onClick={() => setActive(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
            <div className={classes.dots}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${classes.dot} ${i === active ? classes.dotActive : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {lightbox && createPortal(
        <div
          className={styles.overlay}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} image ${active + 1} of ${images.length}`}
        >
          <button className={styles.close} onClick={close} aria-label="Close">×</button>

          {active > 0 && (
            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Previous image"
            >‹</button>
          )}

          <img
            src={images[active]}
            alt={`${name} screenshot ${active + 1}`}
            className={styles.overlayImg}
            onClick={e => e.stopPropagation()}
          />

          {active < images.length - 1 && (
            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Next image"
            >›</button>
          )}

          {images.length > 1 && (
            <span className={styles.counter}>{active + 1} / {images.length}</span>
          )}
        </div>,
        document.body
      )}
    </>
  )
}
