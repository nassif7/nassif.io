'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useMobileNavItems } from './MobileNavContext'
import styles from './Masthead.module.css'

const LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Track record', href: '/#track' },
  { label: 'Writing', href: '/#writing' },
  { label: 'CV', href: '/nassif-nassif-cv.pdf', external: true },
]

const SECTION_IDS = ['work', 'services', 'index', 'track', 'writing']

const HOME_NAV_ITEMS = [
  { num: '01', label: 'Home', href: '/#home' },
  { num: '02', label: 'Services', href: '/#services' },
  { num: '03', label: 'Selected work', href: '/#work' },
  { num: '04', label: 'Work index', href: '/#index' },
  { num: '05', label: 'Track record', href: '/#track' },
  { num: '06', label: 'Writing', href: '/#writing' },
]

const PANEL_ID = 'mobile-nav-panel'

interface MastheadProps {
  email: string
  role: string
  location: string
  timezone: string
  availability: string
}

export function Masthead({ email, role, location, timezone, availability }: MastheadProps) {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const pageNavItems = useMobileNavItems()
  const navItems = pageNavItems ?? HOME_NAV_ITEMS

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

  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus()
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }

  const isOn = (href: string) => {
    if (!href.startsWith('/#')) return false
    const id = href.replace('/#', '')
    return id === 'work' ? active === 'work' || active === 'index' : active === id
  }

  return (
    <>
      <header className={styles.mast}>
        <div className="wrap">
          <a href="/" className="logo">n<i>/</i>N</a>
          <span className={styles.logoSub}>{role}</span>

          <nav className={styles.main}>
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className={clsx({ [styles.on]: isOn(l.href) })}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a href={`mailto:${email}`} className={clsx('btn btn-fill', styles.cta)}>
            Start a project
          </a>

          <button
            ref={toggleRef}
            type="button"
            className={styles.menuBtn}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={PANEL_ID}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div id={PANEL_ID} className={styles.panel} role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className={clsx(styles.panelHead, 'wrap')}>
            <a href="/" className="logo" onClick={closeMenu}>n<i>/</i>N</a>
            <button type="button" className={styles.closeBtn} aria-label="Close menu" onClick={closeMenu}>
              <span className={styles.closeIcon} aria-hidden="true" />
            </button>
          </div>

          <div className={clsx(styles.panelBody, 'wrap')}>
            <nav className={styles.panelNav}>
              {navItems.map((item, i) => (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={closeMenu}
                >
                  {item.num && <span className={styles.panelNum}>{item.num}</span>}
                  {item.label}
                </a>
              ))}
            </nav>

            <div className={styles.panelCtas}>
              <a href={`mailto:${email}`} className="btn btn-fill" onClick={closeMenu}>
                Start a project
              </a>
              <a
                href="/nassif-nassif-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                onClick={closeMenu}
              >
                Download CV
              </a>
            </div>

            <div className={styles.panelInfo}>
              <span><b>{location}</b> · {timezone}</span>
              <span className={styles.panelAvail}><span className={styles.dot} />{availability}</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
