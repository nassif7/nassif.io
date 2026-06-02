import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  sub: string
}

export function PageHeader({ title, sub }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.back}>← nassif.pro</a>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.sub}>{sub}</p>
    </header>
  )
}
