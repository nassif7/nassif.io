'use client'

import styles from './TopBar.module.css'

const LINKS = [
  { label: 'Work',    href: '#work'    },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: 'mailto:hallo@nassif.pro' },
]

const SOCIAL = [
  { label: 'GH', href: 'https://github.com/nassif' },
  { label: 'LI', href: 'https://linkedin.com/in/nassif' },
]

export function TopBar() {
  return (
    <>
      <aside className={styles.sidebar}>
        <a className={styles.logo} href="#">n<em>|</em>N</a>

        <nav className={styles.nav}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href} className={styles.navLink}>
              {l.label}
            </a>
          ))}
        </nav>
      </aside>

      <aside className={styles.sidebarRight}>
        <a href="mailto:hallo@nassif.pro" className={styles.available} aria-label="Send email">
          say hello →
        </a>
      </aside>
    </>
  )
}
