import styles from './BackLink.module.css'

interface BackLinkProps {
  href: string
  label: string
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <a href={href} className={styles.back}>← {label}</a>
  )
}
