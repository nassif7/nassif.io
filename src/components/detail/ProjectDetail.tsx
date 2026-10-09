import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { getProjectNeighbours, pad } from '@/data'
import type { Project } from '@/data'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { DetailLink } from '@/components/site/DetailLink'
import { ProjectToc, CONTENT_ID } from './ProjectToc'
import styles from './detail.module.css'

function ExternalLinks({ links }: { links: Project['links'] }) {
  if (!links.length) return null
  return (
    <div className={clsx(styles.ext, 'k')}>
      {links.map(l =>
        l.href.startsWith('/') ? (
          <Link key={l.href} href={l.href}>{l.label} <span className={styles.go}>→</span></Link>
        ) : (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} <span className={styles.go}>↗</span></a>
        ),
      )}
    </div>
  )
}

export function ProjectDetail({ project: p, embedded = false }: { project: Project; embedded?: boolean }) {
  const { index, prev, next } = getProjectNeighbours(p.slug)
  const isCase = p.kind === 'case-study' && !!p.sections?.length

  const facts: [string, React.ReactNode][] = [['Role', p.role], ['Year', p.year]]
  if (p.client) facts.push(['Client', p.client])
  if (p.platform) facts.push(['Platform', p.platform])
  facts.push(['Stack', p.stack.join(' · ')])
  facts.push(['Status', p.status.live ? <span className={styles.live}>{p.status.label}</span> : p.status.label])

  return (
    <div className={clsx(styles.sheet, styles.project, embedded && styles.embed)} data-sheet={embedded ? undefined : ''}>
      {!embedded && <Header current="/projects" />}

      <div className={styles.title}>
        <div>
          <DetailLink href="/projects" mode="closes" className={clsx(styles.back, 'k')}>← Projects index</DetailLink>
          <h1 className={styles.h1Project}>{p.name}<span>{p.type}</span></h1>
        </div>
        <div className={clsx(styles.tmeta, 'k')}>
          <span><b>{isCase ? 'Case study' : 'Project entry'}</b></span>
          <span>No. {pad(index + 1)} · {p.year}</span>
        </div>
      </div>

      <aside className={styles.side}>
        {p.cover && (
          <div className={styles.fig}>
            <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(max-width: 860px) 100vw, 40vw" priority />
          </div>
        )}
        <dl className={clsx(styles.facts, 'k')}>
          {facts.map(([k, v]) => (
            <div key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
        <ExternalLinks links={p.links} />
        {isCase && <ProjectToc sections={p.sections!} />}
      </aside>

      <main id={CONTENT_ID} className={clsx(styles.content, !isCase && styles.entry)} tabIndex={0} aria-label={`${p.name} — details`}>
        <p className={styles.lede}>{p.lede}</p>

        {isCase ? (
          p.sections!.map((s, i) => (
            <section key={s.id} id={s.id} className={clsx(styles.sec, styles.body)}>
              <span className={clsx(styles.secN, 'k')}>{pad(i + 1)} — {s.label}</span>
              <h2>{s.heading}</h2>
              {s.body.map((html, j) => <p key={j} dangerouslySetInnerHTML={{ __html: html }} />)}
              {s.pull && <p className={styles.pull}>{s.pull}</p>}
              {s.figure && (
                <figure className={styles.inl}>
                  <div className={styles.inlFig}>
                    <Image src={s.figure.image.src} alt={s.figure.image.alt} fill sizes="(max-width: 860px) 100vw, 55vw" />
                  </div>
                  <figcaption className="k"><span>Fig. {pad(i + 1)}</span><span>{s.figure.caption}</span></figcaption>
                </figure>
              )}
              {s.outcomes && (
                <div className={styles.outs}>
                  {s.outcomes.map(o => (
                    <div key={o.label}><b>{o.value}</b><span className="k">{o.label}</span></div>
                  ))}
                </div>
              )}
            </section>
          ))
        ) : (
          <section className={clsx(styles.sec, styles.body)}>
            {p.body.map((html, j) => <p key={j} dangerouslySetInnerHTML={{ __html: html }} />)}
          </section>
        )}

        <nav className={clsx(styles.pn, styles.pnProject)} aria-label="More projects">
          <DetailLink href={`/projects/${prev.slug}`} mode="swap">
            <span className="k">← Previous</span><b>{prev.name}</b>
          </DetailLink>
          <DetailLink href={`/projects/${next.slug}`} mode="swap">
            <span className="k">Next →</span><b>{next.name}</b>
          </DetailLink>
        </nav>
      </main>

      {!embedded && <Footer />}
    </div>
  )
}
