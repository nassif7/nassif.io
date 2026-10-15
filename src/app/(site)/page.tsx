import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Portrait } from '@/components/site/Portrait'
import { BerlinClock } from '@/components/site/BerlinClock'
import { FitLines } from '@/components/site/FitLines'
import { getFeaturedPost, getFeaturedProject, getProfile, formatMonth, isTall } from '@/data'
import styles from './home.module.css'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export default async function Home() {
  const [project, post, profile] = await Promise.all([getFeaturedProject(), getFeaturedPost(), getProfile()])
  const [l1, l2] = profile.headline
  // hover layer: the opening of the essay, skipping anything identical to the dek
  const plain = (html: string) => html.replace(/<[^>]+>/g, '').trim()
  const opening = post
    ? post.body.map(plain).filter(t => t && t !== plain(post.dek)).slice(0, 3).join(' ')
    : ''

  return (
    <div className={styles.sheet} data-sheet>
      <Header large />

      <div className={styles.top}>
        <h1>
          <span className={clsx(styles.l1, styles.rv)} style={delay(100)}>{l1}</span>
          <span className={clsx(styles.l2, styles.rv)} style={delay(180)}>{l2}</span>
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
            <div className={clsx(styles.img, isTall(project.cover) && styles.contain)}>
              {project.cover && (
                <Image src={project.cover.src} alt={project.cover.alt} fill sizes="(max-width: 860px) 100vw, 40vw" priority />
              )}
            </div>
            <div className={styles.pt}>
              <h2 className={styles.ft}>{project.name}</h2>
              <FitLines className={styles.sw}>
                <p className={styles.swA} data-fit="a">{project.summary}</p>
                <div className={styles.swB} data-fit="b">
                  <dl className={clsx(styles.facts, 'k')}>
                    <div><dt>Role</dt><dd>{project.role}</dd></div>
                    {project.platform && <div><dt>Platform</dt><dd>{project.platform}</dd></div>}
                    <div><dt>Stack</dt><dd>{project.stack.slice(0, 3).join(' · ')}</dd></div>
                  </dl>
                </div>
              </FitLines>
              <div className={clsx(styles.fr, 'k')}>
                <span>{project.kind === 'case-study' ? 'Case study' : 'Project'} · {project.year}</span>
                <span className={styles.go}>Read <span>↗</span></span>
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
            <h2 className={styles.ft}>{post.title}</h2>
            <FitLines className={styles.sw} reserveLines={2}>
              <p className={styles.swA} data-fit="a">{post.dek}</p>
              {opening && (
                <div className={styles.swB} data-fit="b">
                  <p className={styles.open}>{opening}</p>
                </div>
              )}
            </FitLines>
            <div className={clsx(styles.fr, 'k')}>
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
