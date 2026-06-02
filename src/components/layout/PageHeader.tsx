import { BackLink } from './BackLink'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  sub: string
}

export function PageHeader({ title, sub }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <BackLink href="/" label="nassif.pro" />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.sub}>{sub}</p>
    </header>
  )
}
