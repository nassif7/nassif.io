import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Portrait } from '@/components/site/Portrait'
import { BerlinClock } from '@/components/site/BerlinClock'
import { getFeaturedPost, getFeaturedProject, getProfile, formatMonth } from '@/data'
import styles from './home.module.css'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export default async function Home() {
  const [project, post, profile] = await Promise.all([getFeaturedProject(), getFeaturedPost(), getProfile()])
  const [l1, l2, l3, l3Muted] = profile.headline

  return (
    <div className={styles.sheet} data-sheet>
      <Header large />

      <div className={styles.top}>
        <h1>
          <span className={clsx(styles.l1, styles.rv)} style={delay(100)}>{l1}</span>
          <span className={clsx(styles.l2, styles.rv)} style={delay(180)}>{l2}</span>
          <span className={clsx(styles.l3, styles.rv)} style={delay(260)}>{l3}<span>{l3Muted}</span></span>
        </h1>
        <p className={clsx(styles.about, styles.rv)} style={delay(340)}>{profile.intro}</p>
      </div>

      <figure className={clsx(styles.photo, styles.rv)} style={delay(300)}>
        <div className={styles.frame}><Portrait /></div>
        <figcaption className="k"><span>Fig. 01</span><span>Berlin <BerlinClock /></span></figcaption>
      </figure>

      <section className={styles.feat}>
        {project && (
        <div className={clsx(styles.fi, styles.rv)} style={delay(420)}>
          <div className={clsx(styles.fh, 'k')}>
            <span><span className={styles.n}>01</span>Featured project</span>
            <Link href="/projects">All projects →</Link>
          </div>
          <Link href={`/projects/${project.slug}`} className={styles.proj}>
            <div className={styles.img}>
              {project.cover && (
                <Image src={project.cover.src} alt={project.cover.alt} fill sizes="(max-width: 860px) 100vw, 40vw" priority />
              )}
            </div>
            <div className={styles.pt}>
              <div>
                <h2 className={styles.ft}>{project.name}</h2>
                <p className={styles.fd}>{project.summary}</p>
              </div>
              <div>
                <dl className={clsx(styles.meta, 'k')}>
                  <div><dt>Year</dt><dd>{project.year}</dd></div>
                  {project.platform && <div><dt>Platform</dt><dd>{project.platform}</dd></div>}
                  <div><dt>Stack</dt><dd>{project.stack[1] ?? project.stack[0]}</dd></div>
                </dl>
                <span className={clsx(styles.go, 'k')} style={{ marginTop: 14 }}>
                  {project.kind === 'case-study' ? 'Read case study' : 'View project'} <span>↗</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
        )}

        {post && (
        <div className={clsx(styles.fi, styles.rv)} style={delay(500)}>
          <div className={clsx(styles.fh, 'k')}>
            <span><span className={styles.n}>02</span>Featured article</span>
            <Link href="/writing">All writing →</Link>
          </div>
          <Link href={`/writing/${post.slug}`} className={styles.art}>
            <div>
              <h2 className={styles.ft}>{post.title}</h2>
              <p className={styles.fd}>{post.dek}</p>
            </div>
            <div className={clsx(styles.ab, 'k')}>
              <span>Essay · {formatMonth(post.date)}</span>
              <span className={styles.go}>Read <span>↗</span></span>
            </div>
          </Link>
        </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
