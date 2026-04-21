'use client'

import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

export function Hero() {
  const ROLES = ['Frontend Engineer', 'App Builder', 'Product Crafter']

  const [upper, setUpper] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [time, setTime] = useState({ h: '00', m: '00', s: '00', gmt: '' })

  useEffect(() => {
    const id = setInterval(() => setUpper((u) => !u), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 3000)
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
      <span className={styles.roleTag}>Built with intention, shipped with hope.</span>

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
          <p className={styles.sub}>{ROLES[roleIndex]}</p>
        </div>
      </div>

    </section>
  )
}
