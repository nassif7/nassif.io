import styles from './UtilityBar.module.css'

export function UtilityBar() {
  return (
    <div className={styles.util}>
      <div className="wrap">
        <span><b className={styles.b}>Berlin</b> · CET</span>
        <span className={styles.right}>
          <span><span className={styles.dot} />Available for Q4 2026</span>
          <a href="mailto:hello@nassif.pro" className={styles.email}>hello@nassif.pro</a>
        </span>
      </div>
    </div>
  )
}
