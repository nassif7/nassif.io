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
    <div className={styles.sheet} data-sheet>
      <Header current="/about" />

      <div className={styles.title}>
        <h1 className={styles.h1}>About<span>{profile.name}</span></h1>
        <div className={clsx(styles.tmeta, 'k')}>
          <span><b>{profile.role}</b></span>
          <span>{profile.city} · since {profile.since}</span>
        </div>
      </div>

      <section className={clsx(styles.scroll, styles.tlw)} tabIndex={0} aria-label="Timeline">
        <div className={clsx(styles.tlh, 'k')}><span>Timeline</span><span>{oldest} to now</span></div>
        <ol className={styles.tl}>
          {timeline.map(e => (
            <li key={`${e.start}-${e.title}`} className={clsx(e.current && styles.now, e.kind === 'education' && styles.edu)}>
              <span className={clsx(styles.y, 'k')}>{timelineYear(e)}</span>
              <span className={styles.nd} />
              <h3>{e.title}</h3>
              <span className={clsx(styles.org, 'k')}>{e.org}</span>
              {e.summary && <p>{e.summary}</p>}
            </li>
          ))}
        </ol>
      </section>

      <section className={clsx(styles.scroll, styles.ab)} tabIndex={0} aria-label="About me">
        <div className={styles.who}>
          <p className={styles.lede}>{lede}<em>{ledeMuted}</em></p>
          <figure className={styles.pt}>
            <div className={styles.frame}><Portrait width={300} /></div>
            <figcaption className="k">Fig. 01</figcaption>
          </figure>
        </div>

        <div className={styles.prose}>
          {profile.aboutBody.map((html, i) => <p key={i} dangerouslySetInnerHTML={{ __html: html }} />)}
        </div>

        <dl className={clsx(styles.facts, 'k')}>
          <dt>Based in</dt><dd>{profile.city}, Germany</dd>
          <dt>Languages</dt><dd>{profile.languages.map(l => (l.level === 'Native' ? l.name : `${l.name} ${l.level}`)).join(' · ')}</dd>
          <dt>Engagement</dt><dd>{profile.engagement}</dd>
          <dt>Status</dt><dd><span className={profile.availability.open ? styles.live : undefined}>{profile.availability.label}</span></dd>
        </dl>

        <div className={clsx(styles.links, 'k')}>
          <a href={profile.cv.pdf} download>Download CV <span className={styles.go}>↓</span></a>
          <a href={`mailto:${profile.email}`}>Email <span className={styles.go}>↗</span></a>
          {profile.socials.map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} <span className={styles.go}>↗</span></a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
