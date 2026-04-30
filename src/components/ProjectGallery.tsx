'use client'

import { useState, useEffect } from 'react'

interface Classes {
  gallery: string
  galleryMain: string
  arrowLeft: string
  arrowRight: string
  galleryThumbs: string
  thumb: string
  thumbActive: string
}

interface Props {
  images: string[]
  name: string
  classes: Classes
}

export function ProjectGallery({ images, name, classes }: Props) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActive(i => Math.min(i + 1, images.length - 1))
      if (e.key === 'ArrowLeft') setActive(i => Math.max(i - 1, 0))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [images.length])

  return (
    <div className={classes.gallery}>
      <div className={classes.galleryMain}>
        {active > 0 && (
          <button className={classes.arrowLeft} onClick={() => setActive(i => i - 1)}>‹</button>
        )}
        <img src={images[active]} alt={`${name} screenshot ${active + 1}`} />
        {active < images.length - 1 && (
          <button className={classes.arrowRight} onClick={() => setActive(i => i + 1)}>›</button>
        )}
      </div>
      {images.length > 1 && (
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
      )}
    </div>
  )
}
