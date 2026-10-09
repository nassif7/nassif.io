import clsx from 'clsx'
import { site } from '@/data'
import { TodayDate } from './TodayDate'
import styles from './shell.module.css'

export function Footer() {
  return (
    <footer className={clsx(styles.footer, 'k')}>
      <span className={styles.quote}>{site.footerQuote}</span>
      <span>Berlin · <TodayDate /></span>
    </footer>
  )
}
