import type { Metadata } from 'next'
import clsx from 'clsx'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Portrait } from '@/components/site/Portrait'
import { getProfile, getTimeline } from '@/data'
import { timelineYear } from '@/data/format'
import styles from './about.module.css'

export const metadata: Metadata = { title: 'About' }

export default async function AboutPage() {
  const [timeline, profile] = await Promise.all([getTimeline(), getProfile()])
  const oldest = Math.min(...timeline.map(e => e.start))
  const [lede, ledeMuted] = profile.aboutLede

  return (
    <div className={styles.canvas}>
      <div className={styles.sheet}>
        <Header current="/about" large />

        <main className={styles.main}>
          <header className={styles.title}>
            <h1 className={styles.h1}>About</h1>
          </header>

          <div className={styles.links}>
            <a href={profile.cv.pdf} download>Download CV</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            {profile.socials.map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>

          <dl className={clsx(styles.facts, 'k')}>
            <div>
              <dt>Based in</dt>
              <dd>{profile.city}, Germany</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>{profile.languages.map(l => l.name).join(' · ')}</dd>
            </div>
            <div>
              <dt>Engagement</dt>
              <dd>{profile.engagement}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd><span className={profile.availability.open ? styles.live : undefined}>{profile.availability.open ? 'Available' : profile.availability.label}</span></dd>
            </div>
          </dl>

          <div className={styles.featureGrid}>
            <section className={styles.introCopy} aria-label="About Nassif">
              <p className={styles.lede}>{lede}<em>{ledeMuted}</em></p>
              <div className={styles.prose}>
                {profile.aboutBody.map((html, i) => <p key={i} dangerouslySetInnerHTML={{ __html: html }} />)}
              </div>
            </section>

            <aside className={styles.sidePanel} aria-label="Portrait">
              <figure className={styles.portrait}>
                <div className={styles.frame}><Portrait /></div>
                <figcaption className={clsx(styles.caption, 'k')}>
                  <span>Portrait</span><span>{profile.name} · {profile.city}</span>
                </figcaption>
              </figure>
            </aside>
          </div>

          <section className={styles.timeline} aria-labelledby="timeline-title">
            <div className={styles.sectionHead}>
              <h2 id="timeline-title">Selected chapters</h2>
              <span className="k">{oldest} to now</span>
            </div>
            <ol className={styles.entries}>
              {timeline.map(entry => (
                <li key={`${entry.start}-${entry.title}`} className={entry.current ? styles.current : undefined}>
                  <span className={clsx(styles.year, 'k')}>{timelineYear(entry)}</span>
                  <div className={styles.entryCopy}>
                    <h3>{entry.title}</h3>
                    <p className={clsx(styles.org, 'k')}>{entry.org}</p>
                  </div>
                  {entry.summary && <p className={styles.summary}>{entry.summary}</p>}
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
