import styles from './Identity.module.css'

export function Identity() {
  return (
    <div className={styles.wrap}>
      <div className={styles.name}>
        <span className={styles.first}>nassif</span>
        <span className={styles.last}>NASSIF</span>
      </div>

      <p className={styles.line}>
        frontend engineer · berlin
      </p>

      <p className={styles.bio}>
        I build things that feel good to use.
        Analog soul, digital hands.
        42 and still figuring it out — on purpose.
      </p>

      <nav className={styles.nav}>
        <a href="#stack">stack</a>
        <a href="#projects">projects</a>
        <a href="#writing">writing</a>
        <a href="#contact">contact</a>
      </nav>
    </div>
  )
}
