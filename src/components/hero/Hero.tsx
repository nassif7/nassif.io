'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

export function Hero() {
  const [upper, setUpper] = useState(false)
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  useEffect(() => {
    const id = setInterval(() => setUpper((u) => !u), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className={styles.hero} id="home">
      <span className={styles.roleTag}>Built with intention, shipped with hope.</span>

      {/* logoMark — kept for later use
      <div className={styles.logoMark} aria-hidden="true">
        <div className={styles.logoText}>
          <span className={styles.logoLetter}>{upper ? 'N' : 'n'}</span>
          <span className={styles.logoPipe} />
          <span className={styles.logoLetter}>{upper ? 'n' : 'N'}</span>
        </div>
        <p className={styles.logoTime}>— kept for later —</p>
      </div>
      */}

      <div className={styles.masthead}>
          <span className={styles.mastheadLeft}>berlin - de</span>
          <div className={styles.mastheadLogo} aria-hidden="true">
            <span>{upper ? 'N' : 'n'}</span>
            <span className={styles.logoPipe}>{upper ? '\\' : '/'}</span>
            <span>{upper ? 'n' : 'N'}</span>
          </div>
          <span className={styles.mastheadDate}>{date}</span>
        </div>

        <div className={styles.headline}>
          <h1 className={styles.name}>n.Nassif</h1>
          <p className={styles.deck}>Professional button-maker. Powered by coffee and boredom.</p>
        </div>

        <div className={styles.rule} />

        <div className={styles.article}>
          <Image
            src="/avatar.png"
            alt="Nassif"
            width={260}
            height={260}
            className={styles.avatar}
          />
          <div className={styles.body}>
            <p>
              Frontend engineer with a thing for <strong>detail</strong>, a low tolerance for bad UX,
              and a high tolerance for ambiguity. I've been doing this long enough to know the rules,
              which ones to follow, and which ones to break on purpose.
            </p>
            <p>
              I work at the intersection of design and engineering. I care about <strong>how things feel</strong>,
              not just how they function. The invisible half-pixel. The transition that's 20ms too slow.
              The copy that's technically correct but feels wrong.
            </p>
            <p>
              Syrian, based in Berlin. Still more curious than tired.
            </p>
            <p>Still growing. Still figuring it out. That's probably not changing.</p>
          </div>
        </div>
    </section>
  )
}
