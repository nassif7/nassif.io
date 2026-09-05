'use client'

import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { DarkCta } from '@/components/cta/DarkCta'
import type { ProjectMeta } from '@/lib/projects'
import { marineriaCaseStudy } from '@/content/case-studies/marineria'
import styles from './CaseStudy.module.css'

const CASE_STUDIES: Record<string, typeof marineriaCaseStudy> = {
  marineria: marineriaCaseStudy,
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*.+?\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <Fragment key={i}>{part}</Fragment>
  )
}

interface Props {
  project: ProjectMeta
}

export function CaseStudy({ project }: Props) {
  const cs = CASE_STUDIES[project.slug]
  const [active, setActive] = useState(cs?.sections[0]?.id ?? '')

  useEffect(() => {
    if (!cs) return
    const onScroll = () => {
      let current = active
      for (const s of cs.sections) {
        const el = document.getElementById(s.id)
        if (el && window.scrollY >= el.offsetTop - 160) current = s.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cs])

  if (!cs) return null

  return (
    <main>
      <section className={styles.hd}>
        <div className="wrap">
          <Link href="/#index" className={styles.back}>← Work index</Link>
          <div className={styles.top}>
            <div className={styles.t}>
              <div className="eyebrow"><span className="n">{cs.eyebrow}</span>{cs.category}</div>
              <h1 className={`display ${styles.title}`}>{cs.title}</h1>
              <p className="lead">{cs.lead}</p>
            </div>
            <dl className={styles.x}>
              {project.client && <div><dt className="meta-k">Client</dt><dd>{project.client}</dd></div>}
              {project.year && <div><dt className="meta-k">Year</dt><dd className="tnum">{project.year}</dd></div>}
              {project.role && <div><dt className="meta-k">Role</dt><dd>{project.role}</dd></div>}
              {project.platforms && <div><dt className="meta-k">Platforms</dt><dd>{project.platforms}</dd></div>}
              {project.status && <div><dt className="meta-k">Status</dt><dd>{project.status}</dd></div>}
            </dl>
          </div>
        </div>
      </section>

      <div className={styles.hero}>
        {cs.heroImages.map(img => (
          <img key={img.src} src={img.src} alt={img.alt} />
        ))}
      </div>

      <div className="wrap">
        <div className={styles.body}>
          <aside className={styles.aside}>
            <div className="meta-k">Contents</div>
            <ul>
              {cs.sections.map(s => (
                <li key={s.id} data-active={active === s.id || undefined}>
                  <a href={`#${s.id}`}>{s.num} — {s.eyebrow}</a>
                </li>
              ))}
            </ul>
          </aside>

          <div className={styles.main}>
            {cs.sections.map(s => (
              <section key={s.id} className={styles.sec} id={s.id}>
                <div className="eyebrow"><span className="n">{s.num}</span>{s.eyebrow}</div>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, i) => <p key={i}>{renderInline(p)}</p>)}
                {s.pullQuote && <p className={styles.pull}>{s.pullQuote}</p>}
                {s.spec && (
                  <dl className={styles.spec}>
                    {s.spec.map(row => (
                      <div key={row.k}><dt className="meta-k">{row.k}</dt><dd>{row.v}</dd></div>
                    ))}
                  </dl>
                )}
                {s.figure && (
                  <figure className={styles.shots}>
                    <div className={styles.shotsRow}>
                      {s.figure.images.map(img => <img key={img.src} src={img.src} alt={img.alt} />)}
                    </div>
                    <figcaption>{s.figure.caption}</figcaption>
                  </figure>
                )}
                {s.outcomes && (
                  <div className={styles.outs}>
                    {s.outcomes.map(o => (
                      <div key={o.label}><strong className="tnum">{o.value}</strong><span className="meta-k">{o.label}</span></div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.next}>
        <div className="wrap">
          <div className={styles.nextL}>
            <div className="eyebrow">{cs.next.eyebrow}</div>
            <h3>{cs.next.title}</h3>
          </div>
          <div className={styles.nextR}>
            <Link href={cs.next.href} className="btn">Read next →</Link>
          </div>
        </div>
      </section>

      <DarkCta
        eyebrow="Next step"
        heading="Got something with this shape?"
        lead="Available for contract and full-time work from Q4 2026 — Berlin, or remote across European hours."
      />
    </main>
  )
}
