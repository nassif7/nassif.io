import Link from 'next/link'
import clsx from 'clsx'
import { site } from '@/data/format'
import { ContactTrigger } from '@/components/contact/ContactProvider'
import { Logo } from './Logo'
import styles from './shell.module.css'

export function Header({ current, large }: { current?: string; large?: boolean }) {
  return (
    <header className={clsx(styles.header, large && styles.homeHeader)}>
      <Link href="/" aria-label="Nassif Nassif, home">
        <Logo className={clsx(styles.mark, large && styles.markLg)} />
      </Link>
      <div className={styles.homeRail}>
        <nav className={clsx(styles.nav, 'k')} aria-label="Main">
          {site.nav.map(item =>
            item.action === 'contact' ? (
              <ContactTrigger key={item.label}>{item.label}</ContactTrigger>
            ) : (
              <Link key={item.href} href={item.href} aria-current={current === item.href ? 'page' : undefined}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  )
}
