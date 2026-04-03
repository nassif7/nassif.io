'use client'

import { useState, useEffect } from 'react'
import styles from './TopBar.module.css'

const LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

function useLocalTime() {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      const offset = -now.getTimezoneOffset() / 60
      const gmt = `GMT${offset >= 0 ? '+' : ''}${offset}`
      const city = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop()?.replace('_', ' ') ?? 'Local'
      setDisplay(`${city} · ${time} ${gmt}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return display
}

export function TopBar() {
  const [open, setOpen] = useState(false)
  const time = useLocalTime()

  return (
    <>
      <header className={styles.bar}>
        <div className={styles.left}>
          <a className={styles.logo} href="#">n<em>/</em>N</a>
          <button
            className={styles.toggle}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.toggleLine} ${open ? styles.open1 : ''}`} />
            <span className={`${styles.toggleLine} ${open ? styles.open2 : ''}`} />
            <span className={`${styles.toggleLine} ${open ? styles.open3 : ''}`} />
          </button>
        </div>
        <span className={styles.clock}>{time}</span>
      </header>

      {open && (
        <div className={styles.menu} onClick={() => setOpen(false)}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href} className={styles.menuLink}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
