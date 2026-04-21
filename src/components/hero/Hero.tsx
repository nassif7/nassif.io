'use client'

import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

export function Hero() {
  const [upper, setUpper] = useState(false)
  const [time, setTime] = useState({ h: '00', m: '00', s: '00', gmt: '' })

  useEffect(() => {
    const id = setInterval(() => setUpper((u) => !u), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const offset = -now.getTimezoneOffset() / 60
      setTime({
        h: String(now.getHours()).padStart(2, '0'),
        m: String(now.getMinutes()).padStart(2, '0'),
        s: String(now.getSeconds()).padStart(2, '0'),
        gmt: `GMT+${offset}`,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className={styles.hero} id="home">
      <span className={styles.roleTag}>Building since forever</span>

      <div className={styles.logoMark} aria-hidden="true">
        <div className={styles.logoText}>
          <span className={styles.logoLetter}>{upper ? 'N' : 'n'}</span>
          <span className={styles.logoPipe} />
          <span className={styles.logoLetter}>{upper ? 'n' : 'N'}</span>
        </div>
        <p className={styles.logoTime}>{time.h}:{time.m}:{time.s} <span>{time.gmt}</span></p>
      </div>

      <div className={styles.main}>
        <div className={styles.nameBlock}>
          <h1 className={styles.name}>Nassif.</h1>
          <p className={styles.sub}>Frontend Engineer</p>
        </div>
      </div>

      <div className={styles.strip}>
        <div className={styles.stripItem}>
          <span className={styles.stripLabel}>Based in</span>
          <span className={styles.stripValue}>Berlin, DE</span>
        </div>
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[
              'React',
              'TypeScript',
              'Next.js',
              'Node.js',
              'Tailwind',
              'React Native',
              'PostgreSQL',
              'Framer Motion',
              'Figma',
              'Git',
            ].map((t, i) => (
              <span key={i} className={styles.tickerItem}>
                {t}
              </span>
            ))}
            {[
              'React',
              'TypeScript',
              'Next.js',
              'Node.js',
              'Tailwind',
              'React Native',
              'PostgreSQL',
              'Framer Motion',
              'Figma',
              'Git',
            ].map((t, i) => (
              <span key={`b${i}`} className={styles.tickerItem}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.stripRight}>Available for projects</div>
      </div>
    </section>
  )
}
