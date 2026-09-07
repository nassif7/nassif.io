import { getSettings } from '@/lib/settings'
import styles from './Footer.module.css'

export async function Footer() {
  const settings = await getSettings()

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="/" className="logo">n<i>/</i>N</a>
            <p className={styles.tagline}>{settings.footerTagline}</p>
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
              {settings.github && <li><a href={settings.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>}
              {settings.linkedin && <li><a href={settings.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
              <li><a href={`mailto:${settings.email}`}>Email</a></li>
            </ul>
          </div>

          <div className={styles.status}>
            <div className="meta-k">Status</div>
            <ul>
              <li className={styles.statusRow}><span className={styles.dot} />{settings.availability}</li>
              <li>{settings.location} · {settings.timezone}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bar}>
          <span>n|N · Nassif Nassif · {settings.location} · {new Date().getFullYear()}</span>
          <span>{settings.footerJoke}</span>
        </div>
      </div>
    </footer>
  )
}
