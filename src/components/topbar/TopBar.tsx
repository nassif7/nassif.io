'use client'

import styles from './TopBar.module.css'

const LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL = [
  { label: 'GH', href: 'https://github.com/nassif' },
  { label: 'LI', href: 'https://linkedin.com/in/nassif' },
]

export function TopBar() {
  return (
    <aside className={styles.sidebar}>
      <a className={styles.logo} href="#">n<em>|</em>N</a>

      <nav className={styles.nav}>
        {LINKS.map(l => (
          <a key={l.label} href={l.href} className={styles.navLink}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className={styles.social}>
        {SOCIAL.map(s => (
          <a key={s.label} href={s.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>
    </aside>
  )
}
