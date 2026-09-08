import clsx from 'clsx'
import { getAllExperience } from '@/lib/experience'
import { getHomepage } from '@/lib/homepage'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'
import styles from './TrackRecord.module.css'

export async function TrackRecord() {
  const [allEntries, homepage] = await Promise.all([getAllExperience(), getHomepage()])
  const entries = allEntries.filter(e => e.showInTrackRecord)

  return (
    <section id="track" className={shared.band} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHeader num="05" eyebrow="Track record" title={homepage.trackSectionTitle} />
        <div className={styles.timeline}>
          {entries.map(e => (
            <div key={e.id} className={clsx(styles.row, e.current && styles.current)}>
              <div className={styles.year}>{e.year}</div>
              <div className={styles.node} />
              <h3 className={styles.title}>{e.title}</h3>
              {e.tag && <span className={styles.org}>{e.tag}</span>}
              {e.description && <p className={styles.desc}>{e.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
