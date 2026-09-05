import clsx from 'clsx'
import { getAllExperience } from '@/lib/experience'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'
import styles from './TrackRecord.module.css'

export async function TrackRecord() {
  const entries = (await getAllExperience()).filter(e => e.showInTrackRecord)

  return (
    <section id="track" className={shared.band} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHeader num="05" eyebrow="Track record" title="What shipped, and when." />
        <div className={styles.tl}>
          {entries.map(e => (
            <div key={e.id} className={styles.row}>
              <div className={clsx(styles.year, /\d/.test(e.year) && 'tnum')}>{e.year}</div>
              <div className={styles.body}>
                <div>
                  <h3>{e.title}</h3>
                  {e.tag && <span className={styles.tag}>{e.tag}</span>}
                </div>
                <p>{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
