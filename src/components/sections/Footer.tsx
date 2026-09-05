import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="/" className="logo">n<i>/</i>N</a>
            <p className={styles.tagline}>Software engineer in Berlin, building interfaces that feel obvious.</p>
          </div>

          <div className={styles.col}>
            <div className="meta-k">Site</div>
            <ul>
              <li><a href="/#work">Selected work</a></li>
              <li><a href="/#index">Work index</a></li>
              <li><a href="/#services">Services</a></li>
              <li><a href="/#writing">Writing</a></li>
              <li><a href="/cv">CV</a></li>
            </ul>
          </div>

          <div className={styles.col}>
            <div className="meta-k">Elsewhere</div>
            <ul>
              <li><a href="https://github.com/nassif7" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/nassif" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="mailto:hello@nassif.pro">Email</a></li>
            </ul>
          </div>

          <div className={styles.status}>
            <div className="meta-k">Status</div>
            <ul>
              <li className={styles.statusRow}><span className={styles.dot} />Available Q4 2026</li>
              <li>Berlin · CET</li>
            </ul>
          </div>
        </div>

        <div className={styles.bar}>
          <span>n|N · Nassif Nassif · Berlin · {new Date().getFullYear()}</span>
          <span>Professional button-maker.</span>
        </div>
      </div>
    </footer>
  )
}
