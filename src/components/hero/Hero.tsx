'use client'

import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

const PHASES = [
  { leftUpper: false, rightUpper: false },
  { leftUpper: true,  rightUpper: false },
  { leftUpper: true,  rightUpper: true  },
  { leftUpper: false, rightUpper: true  },
]

export function Hero() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 1000)
    return () => clearInterval(id)
  }, [])

  const { leftUpper, rightUpper } = PHASES[phase]

  return (
    <section className={styles.hero} id="home">
      <span className={styles.roleTag}>Building since forever</span>


      <div className={styles.main}>
        {/* Left: text */}
        <div className={styles.left}>
          <div className={styles.nameWrap}>
            <span className={styles.nameLine1}>Nassif.</span>
            <span className={styles.nameLine2}>Frontend Engineer</span>
          </div>
          <p className={styles.bio}>
            Building things that feel good to use.<br />
            <em>Carefully, obsessively, sometimes chaotically.</em>
          </p>
        </div>

        {/* Right: logomark */}
        <div className={styles.logoMark} aria-hidden="true">
          <span className={styles.d1} />
          <span className={styles.d2} />
          <span className={styles.d3} />
          <span className={styles.d4} />
          <span className={styles.d5} />
          <span className={styles.d6} />
          <div className={styles.logoBox}>
            <svg width="200" height="110" viewBox="0 0 80 44" fill="none">
              <text x="32" y="33" textAnchor="end" fontFamily="DM Sans, sans-serif" fontSize="31" fontWeight="400" fill="#111"
                style={{ opacity: leftUpper ? 0 : 1, transition: 'opacity 0.4s ease' }}>n</text>
              <text x="32" y="33" textAnchor="end" fontFamily="DM Sans, sans-serif" fontSize="31" fontWeight="500" fill="#111"
                style={{ opacity: leftUpper ? 1 : 0, transition: 'opacity 0.4s ease' }}>N</text>
              <text x="40" y="38" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="48" fontWeight="300" fill="#111"
                className={styles.lineSwing}>|</text>
              <text x="48" y="33" textAnchor="start" fontFamily="DM Sans, sans-serif" fontSize="31" fontWeight="400" fill="#111"
                style={{ opacity: rightUpper ? 0 : 1, transition: 'opacity 0.4s ease' }}>n</text>
              <text x="48" y="33" textAnchor="start" fontFamily="DM Sans, sans-serif" fontSize="31" fontWeight="500" fill="#111"
                style={{ opacity: rightUpper ? 1 : 0, transition: 'opacity 0.4s ease' }}>N</text>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.strip}>
        <div className={styles.stripItem}>
          <span className={styles.stripLabel}>Based in</span>
          <span className={styles.stripValue}>Berlin, DE</span>
        </div>

        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind', 'React Native', 'PostgreSQL', 'Framer Motion', 'Figma', 'Git'].map((t, i) => (
              <span key={i} className={styles.tickerItem}>{t}</span>
            ))}
            {['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind', 'React Native', 'PostgreSQL', 'Framer Motion', 'Figma', 'Git'].map((t, i) => (
              <span key={`b${i}`} className={styles.tickerItem}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.stripRight}>Available for projects</div>
      </div>
    </section>
  )
}
