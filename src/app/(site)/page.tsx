import clsx from 'clsx'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Portrait } from '@/components/site/Portrait'
import { getProfile, getTimeline } from '@/data'
import { timelineYear } from '@/data/format'
import styles from './home.module.css'

export default async function Home() {
  const [profile, timeline] = await Promise.all([getProfile(), getTimeline()])
  const [headline, secondLine] = profile.headline
  const displaySecondLine = secondLine.replace(/,\s*$/, '')
  const recent = timeline.slice(0, 4)

  return (
    <div className={styles.canvas}>
      <div className={styles.sheet}>
        <Header large />

        <main>
          <section className={styles.hero} aria-labelledby="home-title">
            <div className={styles.intro}>
              <h1 id="home-title"><span>{headline}</span><span>{displaySecondLine}</span></h1>
              <p className={styles.lede}>{profile.intro}</p>
              <p className={styles.availability}><i />{profile.availability.label}</p>
            </div>

            <figure className={styles.photo}>
              <div className={styles.frame}><Portrait /></div>
              <figcaption className={clsx(styles.caption, 'k')}><span>Portrait</span><span>{profile.name} · {profile.city}</span></figcaption>
            </figure>
          </section>

          <section className={styles.timeline} aria-labelledby="timeline-title">
            <div className={styles.sectionHead}>
              <div><h2 id="timeline-title">Selected Chapters</h2></div>
            </div>
            <ol className={styles.entries}>
              {recent.map(entry => (
                <li key={`${entry.start}-${entry.title}`} className={entry.current ? styles.current : undefined}>
                  <span className={clsx(styles.year, 'k')}>{timelineYear(entry)}</span>
                  <div className={styles.entryCopy}>
                    <h3>{entry.title}</h3>
                    <p className={clsx(styles.org, 'k')}>{entry.org}</p>
                  </div>
                  <p className={styles.summary}>{entry.summary}</p>
                </li>
              ))}
            </ol>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
