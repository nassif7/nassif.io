'use client'

import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import { NAV_LINKS } from '@/lib/data'
import styles from './Nav.module.css'

const SECTION_IDS = ['about', 'projects', 'stack', 'writing', 'contact']

function StrokeA() {
  return <path d="M 0,2 C 15,1 35,3 60,2 C 35,5 15,6 0,6 Z" fill="url(#ng)"/>
}
function StrokeB() {
  // slight dip in middle
  return <path d="M 0,2 C 12,0 30,3 45,1 C 55,0 58,2 60,2 C 55,5 45,6 30,5 C 15,7 5,5 0,6 Z" fill="url(#ng)"/>
}
function StrokeC() {
  // tighter taper, more angled
  return <path d="M 0,3 C 20,2 40,3 60,1 C 40,3 20,5 0,5 Z" fill="url(#ng)"/>
}

const STROKES = [StrokeA, StrokeB, StrokeC]

export function Nav() {
  const [activeHref, setActiveHref] = useState<string>('#about')
  const [scrolled, setScrolled] = useState(false)
  const [strokeVariants, setStrokeVariants] = useState<Record<string, number>>({})
  const prevActive = useRef<string>('#about')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = '#about'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = `#${id}`
      }
      setActiveHref(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (activeHref !== prevActive.current) {
      setStrokeVariants(v => ({ ...v, [activeHref]: Math.floor(Math.random() * STROKES.length) }))
      prevActive.current = activeHref
    }
  }, [activeHref])

  const handleClick = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const id = href.replace('#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={clsx(styles.nav, { [styles.navScrolled]: scrolled })} aria-label="Main navigation">
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
                e.preventDefault()
                handleClick(href)
              }}
              className={clsx(styles.navItem, {
                [styles.navItemActive]: activeHref === href,
              })}
              aria-current={activeHref === href ? 'page' : undefined}
            >
              {label}
              {activeHref === href && (() => {
                const Stroke = STROKES[strokeVariants[href] ?? 0]
                return (
                  <svg className={styles.activeStroke} viewBox="0 0 60 8" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ng" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%"   stopColor="var(--accent)" stopOpacity="1"/>
                        <stop offset="70%"  stopColor="var(--accent)" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <Stroke />
                  </svg>
                )
              })()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
