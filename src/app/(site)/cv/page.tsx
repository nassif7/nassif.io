export const dynamic = 'force-dynamic'

import clsx from 'clsx'
import { getAllExperience } from '@/lib/experience'
import {
  CV_PROJECTS, CV_CORE_STACK, CV_TOOLING, CV_FAMILIAR, CV_LANGUAGES, CV_EDUCATION,
} from '@/content/cv'
import styles from './cv.module.css'

export const metadata = { title: 'CV — Nassif Nassif' }

export default async function CvPage() {
  const experience = (await getAllExperience()).filter(e => e.showInCV)

  return (
    <main className={styles.page}>
      <div className={styles.doc}>
        <div className={styles.hd}>
          <div>
            <span className="logo">n<i>/</i>N</span>
            <h1>Nassif Nassif</h1>
            <div className={styles.role}>Software Engineer · Platform · Product · UX</div>
          </div>
          <div className={styles.contact}>
            hello@nassif.pro<br />
            +49 176 80815884<br />
            nassif.pro<br />
            github.com/nassif7
          </div>
        </div>

        <p className={styles.intro}>
          A systems thinker with <b>8 years of experience building software across corporate platforms,
          startups, and independent projects.</b> AI-native in my workflow while staying grounded in the
          fundamentals. I&apos;m driven by turning complex problems into simple, intuitive solutions.
        </p>

        <dl className={styles.strip}>
          <div><dt className={styles.mk}>Location</dt><dd>Berlin, Germany</dd></div>
          <div><dt className={styles.mk}>Availability</dt><dd>Q4 2026</dd></div>
          <div><dt className={styles.mk}>Engagement</dt><dd>Contract / Full-time</dd></div>
          <div><dt className={styles.mk}>Remote</dt><dd>CET hours</dd></div>
        </dl>

        <h2 className={styles.s}>Experience</h2>
        {experience.map(e => (
          <div key={e.id} className={styles.item}>
            <div className={styles.org}>{e.tag}</div>
            <div className={styles.itemTop}><h3>{e.title}</h3><span className={styles.when}>{e.cvWhen}</span></div>
            {e.bullets.length > 0 && (
              <ul>
                {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </div>
        ))}

        <h2 className={styles.s}>Projects</h2>
        {CV_PROJECTS.map(p => (
          <div key={p.title} className={styles.item}>
            <div className={styles.itemTop}>
              <h3>{p.title}</h3>
              <span className={clsx(styles.when, /^\d+$/.test(p.when) && 'tnum')}>{p.when}</span>
            </div>
            <ul>{p.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <div className={styles.stackL}>
              {p.tags.map(t => (
                <span key={t.text} className={clsx(styles.tag, t.pri && styles.pri)}>{t.text}</span>
              ))}
            </div>
          </div>
        ))}

        <h2 className={styles.s}>Expertise</h2>
        <div className={styles.two}>
          <div>
            <span className={styles.subK}>Core stack</span>
            <div className={styles.stackL}>
              {CV_CORE_STACK.map(t => <span key={t} className={clsx(styles.tag, styles.pri)}>{t}</span>)}
            </div>
            <span className={styles.subK}>Tooling &amp; testing</span>
            <div className={styles.stackL}>
              {CV_TOOLING.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
          </div>
          <div>
            <span className={styles.subK}>Familiar with</span>
            <div className={styles.stackL}>
              {CV_FAMILIAR.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
            <span className={styles.subK}>Languages</span>
            <dl className={styles.rows}>
              {CV_LANGUAGES.map(l => (
                <div key={l.lang}><dt>{l.lang}</dt><dd>{l.level}</dd></div>
              ))}
            </dl>
            <span className={styles.subK}>Interests</span>
            <p className={styles.note}>Reading, writing, chess, bouldering, football, F1, design, and photography.</p>
          </div>
        </div>

        <h2 className={styles.s}>Education &amp; courses</h2>
        <dl className={styles.rows}>
          {CV_EDUCATION.map(ed => (
            <div key={ed.school}>
              <dt><b>{ed.school}</b> — {ed.detail}</dt>
              <dd className="tnum">{ed.when}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.foot}>
          <span>Nassif Nassif · Curriculum Vitae</span>
          <span>nassif.pro · {new Date().getFullYear()}</span>
        </div>
      </div>
    </main>
  )
}
