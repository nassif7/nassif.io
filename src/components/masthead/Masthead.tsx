import styles from './Masthead.module.css'

export function Masthead() {
  return (
    <div className={styles.masthead}>
      <span className={styles.mastheadLeft}>berlin</span>
      <a href="/" className={styles.mastheadLogo}>
        <span>n</span>
        <span className={styles.logoPipe}>/</span>
        <span>N</span>
      </a>
      <a href="mailto:hello@nassif.pro" className={styles.mastheadHello}>
        say hello →
      </a>
    </div>
  )
}
