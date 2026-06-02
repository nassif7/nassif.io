import styles from './SlugHeader.module.css'

interface SlugHeaderProps {
  backHref: string
  backLabel: string
  label: string
  title: string
}

export function SlugHeader({ backHref, backLabel, label, title }: SlugHeaderProps) {
  return (
    <>
      <a href={backHref} className={styles.back}>{backLabel}</a>
      <header className={styles.header}>
        <span className={styles.label}>{label}</span>
        <h1 className={styles.title}>{title}</h1>
      </header>
    </>
  )
}
