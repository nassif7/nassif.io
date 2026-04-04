'use client'

import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

function useClock() {
  const [time, setTime] = useState({ h: '00', m: '00', s: 0, gmt: '' })
  useEffect(() => {
    let raf: number
    const tick = () => {
      const now = new Date()
      const offset = -now.getTimezoneOffset() / 60
      const gmt = `GMT${offset >= 0 ? '+' : ''}${offset}`
      setTime({
        h: String(now.getHours()).padStart(2, '0'),
        m: String(now.getMinutes()).padStart(2, '0'),
        s: now.getSeconds() + now.getMilliseconds() / 1000,
        gmt,
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return time
}

export function Hero() {
  const { h, m, s, gmt } = useClock()
  const [upper, setUpper] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setUpper((u) => !u), 2000)
    return () => clearInterval(id)
  }, [])

  // seconds hand
  const cx = 115,
    cy = 37
  const angle = (s / 60) * 360 - 90
  const rad = (angle * Math.PI) / 180
  const hx = cx + Math.cos(rad) * 16
  const hy = cy + Math.sin(rad) * 16
  const tx = cx - Math.cos(rad) * 5
  const ty = cy - Math.sin(rad) * 5

  return (
    <section className={styles.hero} id="home">
      <span className={styles.roleTag}>Building since forever</span>

      <div className={styles.logoMark} aria-hidden="true">
        <svg width="480" height="156" viewBox="0 0 240 78" fill="none">
          {/* case */}
          <rect x="0.5" y="0.5" width="239" height="77" rx="3" fill="#F5F2EC" stroke="#1A1612" strokeWidth="0.7" />

          {/* left letter */}
          <text
            x="58"
            y="51"
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="44"
            fontWeight="400"
            fill="#0F0F0E"
          >
            {upper ? 'N' : 'n'}
          </text>

          {/* center sub-dial */}
          <circle cx={cx} cy={cy} r="20" fill="#EDE8DF" stroke="#1A1612" strokeWidth="0.6" />

          {/* 60 ticks */}
          {Array.from({ length: 60 }, (_, i) => {
            const a = (i / 60) * Math.PI * 2 - Math.PI / 2
            const major = i % 5 === 0
            return (
              <line
                key={i}
                x1={cx + Math.cos(a) * (major ? 15 : 17)}
                y1={cy + Math.sin(a) * (major ? 15 : 17)}
                x2={cx + Math.cos(a) * 19.5}
                y2={cy + Math.sin(a) * 19.5}
                stroke="#1A1612"
                strokeWidth={major ? 0.8 : 0.35}
                opacity={major ? 0.5 : 0.2}
              />
            )
          })}

          {/* brand */}
          <text
            x={cx}
            y={cy + 3}
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="3.8"
            letterSpacing="1"
            fill="#6A6460"
            opacity="0.65"
          >
            NASSIF
          </text>

          {/* counterweight */}
          <line
            x1={cx}
            y1={cy}
            x2={tx}
            y2={ty}
            stroke="#1A1612"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.45"
          />

          {/* hand */}
          <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="#1A1612" strokeWidth="0.7" strokeLinecap="round" />

          {/* pivot */}
          <circle cx={cx} cy={cy} r="1.8" fill="#C8472B" />

          {/* right letter */}
          <text
            x="182"
            y="51"
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="44"
            fontWeight="400"
            fill="#0F0F0E"
          >
            {upper ? 'n' : 'N'}
          </text>

          {/* hh:mm GMT+x below sub-dial */}
          <text
            x={cx}
            y="74"
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="7"
            letterSpacing="1"
            fill="#1A1612"
            opacity="0.75"
          >
            {h}:{m}{' '}
            <tspan fontSize="6" opacity="0.5">
              {gmt}
            </tspan>
          </text>
        </svg>
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
