import styles from './CallToAction.module.css'

interface CallToActionProps {
  label: string
  heading: string
  href: string
  buttonText: string
}

export function CallToAction({ label, heading, href, buttonText }: CallToActionProps) {
  return (
    <div className={styles.box}>
      <span className={styles.label}>// {label}</span>
      <div className={styles.row}>
        <p className={styles.heading}>{heading}</p>
        <a href={href} className={styles.btn}>{buttonText}</a>
      </div>
    </div>
  )
}
