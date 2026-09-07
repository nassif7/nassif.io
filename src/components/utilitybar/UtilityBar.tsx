import { getSettings } from '@/lib/settings'
import styles from './UtilityBar.module.css'

export async function UtilityBar() {
  const settings = await getSettings()

  return (
    <div className={styles.util}>
      <div className="wrap">
        <span><b className={styles.b}>{settings.location}</b> · {settings.timezone}</span>
        <span className={styles.right}>
          <span><span className={styles.dot} />{settings.availability}</span>
          <a href={`mailto:${settings.email}`} className={styles.email}>{settings.email}</a>
        </span>
      </div>
    </div>
  )
}
