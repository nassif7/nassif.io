import clsx from 'clsx'
import { site } from '@/data/format'
import { TodayDate } from './TodayDate'
import { Logo } from './Logo'
import styles from './shell.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSignature}>
        <span className={styles.footerSeal}><Logo className={styles.footerMark} /></span>
        <span className={clsx(styles.quote, 'k')}>{site.footerQuote}</span>
      </div>
      <span className={clsx(styles.footerPlace, 'k')}>
        <span>Berlin · <TodayDate /></span>
      </span>
    </footer>
  )
}
