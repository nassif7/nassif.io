import styles from './section.module.css'

interface SectionHeaderProps {
  label: string
  linkHref: string
  linkText: string
  title: string
  intro: string
}

export function SectionHeader({ label, linkHref, linkText, title, intro }: SectionHeaderProps) {
  return (
    <>
      <div className={styles.sectionHeader}>
        <span className={styles.label}>{label}</span>
        <a href={linkHref} className={styles.seeAll}>{linkText}</a>
      </div>
      <h2 className={styles.heading}>{title}</h2>
      <p className={styles.intro}>{intro}</p>
    </>
  )
}
