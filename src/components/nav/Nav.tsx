'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { NAV_LINKS } from '@/lib/data'
import styles from './Nav.module.css'

const SECTION_IDS = ['work', 'writing']


export function Nav() {
  const [activeHref, setActiveHref] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = ''
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = `#${id}`
      }
      setActiveHref(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

const handleClick = (href: string) => {
    if (href.startsWith('mailto:') || href.startsWith('http')) return
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const id = href.replace('#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={clsx(styles.nav, { [styles.navScrolled]: scrolled })} aria-label="Main navigation">
      <a
        href="/"
        className={styles.logo}
        aria-label="Home"
      >
        n<em aria-hidden="true">|</em>N
      </a>
      <ul className={styles.navList} role="list">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            {/*
              We use a plain <a> here styled with Base UI conventions.
              For a richer example of Base UI, see the Tooltip on stack items
              and the Dialog on contact — both in their respective components.
            */}
            <a
              href={href}
              onClick={(e) => {
                if (!href.startsWith('mailto:') && !href.startsWith('http')) {
                  e.preventDefault()
                }
                handleClick(href)
              }}
              className={clsx(styles.navItem, {
                [styles.navItemActive]: activeHref === href,
              })}
              aria-current={activeHref === href ? 'page' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a href="mailto:hello@nassif.pro" className={styles.sayHello}>Get in touch</a>
    </nav>
  )
}
