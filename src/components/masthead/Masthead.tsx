'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './Masthead.module.css'

const LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Track record', href: '/#track' },
  { label: 'Writing', href: '/#writing' },
  { label: 'CV', href: '/cv' },
]

const SECTION_IDS = ['work', 'services', 'index', 'track', 'writing']

export function Masthead() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      let current = ''
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 160) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isOn = (href: string) => {
    if (href === '/cv') return false
    const id = href.replace('/#', '')
    return id === 'work' ? active === 'work' || active === 'index' : active === id
  }

  return (
    <>
      <header className={styles.mast}>
        <div className="wrap">
          <a href="/" className="logo">n<i>/</i>N</a>
          <span className={styles.logoSub}>Software Engineer</span>

          <nav className={styles.main}>
            {LINKS.map(l => (
              <a key={l.href} href={l.href} className={clsx({ [styles.on]: isOn(l.href) })}>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="mailto:hello@nassif.pro" className={clsx('btn btn-fill', styles.cta)}>
            Start a project
          </a>

          <button
            type="button"
            className={styles.menuBtn}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className={clsx(styles.menuIcon, { [styles.menuIconOpen]: menuOpen })} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.drawer}>
          <nav className={styles.drawerNav}>
            {LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:hello@nassif.pro"
            className="btn btn-fill"
            onClick={() => setMenuOpen(false)}
          >
            Start a project
          </a>
        </div>
      )}
    </>
  )
}
