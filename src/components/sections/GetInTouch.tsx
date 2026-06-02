import styles from './GetInTouch.module.css'

export function GetInTouch({ className }: { className?: string }) {
  return (
    <section className={`${styles.section}${className ? ` ${className}` : ''}`}>
      <div className={styles.box}>
        <span className={styles.label}>// you have an idea</span>
        <div className={styles.row}>
          <h2 className={styles.heading}>Let&apos;s get in touch.</h2>
          <a href="mailto:n_nassif@icloud.com" className={styles.btn}>
            Write me →
          </a>
        </div>
      </div>
    </section>
  )
}
