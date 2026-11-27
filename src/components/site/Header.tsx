'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { site } from '@/data/format'
import { ContactTrigger } from '@/components/contact/ContactProvider'
import { Logo } from './Logo'
import styles from './shell.module.css'

export function Header({ current, large }: { current?: string; large?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const links = () => site.nav.map(item =>
    item.action === 'contact' ? (
      <ContactTrigger key={item.label}>{item.label}</ContactTrigger>
    ) : (
      <Link key={item.href} href={item.href} aria-current={current === item.href ? 'page' : undefined}>
        {item.label}
      </Link>
    ),
  )

  return (
    <header className={clsx(styles.header, large && styles.homeHeader)}>
      <Link href="/" aria-label="Nassif Nassif, home">
        <Logo className={clsx(styles.mark, large && styles.markLg)} />
      </Link>
      <div className={styles.homeRail}>
        <nav className={clsx(styles.nav, 'k')} aria-label="Main">
          {links()}
        </nav>
      </div>
      <button
        className={clsx(styles.menuToggle, menuOpen && styles.menuOpen, 'k')}
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen(open => !open)}
      >
        <i aria-hidden="true"><b /><b /><b /></i>
      </button>
      <nav
        id="mobile-navigation"
        className={clsx(styles.mobileNav, 'k')}
        aria-label="Main"
        hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        {links()}
      </nav>
    </header>
  )
}
