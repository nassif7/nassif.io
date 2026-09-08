'use client'

import { useEffect, useState } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { DarkCta } from '@/components/cta/DarkCta'
import { ProjectHeader } from '@/components/project-header/ProjectHeader'
import { useSetMobileNav } from '@/components/masthead/MobileNavContext'
import type { Project } from '@/lib/projects'
import styles from './CaseStudy.module.css'

interface Props {
  project: Project
  cta: { email: string; eyebrow: string; heading: string; lead: string }
}

export function CaseStudy({ project, cta }: Props) {
  const cs = project.caseStudyContent
  const [active, setActive] = useState(cs?.sections[0]?.sectionId ?? '')

  useSetMobileNav(
    cs
      ? [
          ...cs.sections.map(s => ({ num: s.num, label: s.eyebrow, href: `#${s.sectionId}` })),
          { num: '', label: 'Work index', href: '/#index' },
        ]
      : []
  )

  useEffect(() => {
    if (!cs) return
    const onScroll = () => {
      let current = active
      for (const s of cs.sections) {
        const el = document.getElementById(s.sectionId)
        if (el && window.scrollY >= el.offsetTop - 160) current = s.sectionId
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
      <ProjectHeader
        backHref="/#index"
        backLabel="Work index"
        eyebrowLabel={cs.category}
        title={project.name}
        lead={cs.lead}
        client={project.client}
        year={project.year}
        role={project.role}
        platforms={project.platforms}
        status={project.status}
      />

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
                <li key={s.sectionId} data-active={active === s.sectionId || undefined}>
                  <a href={`#${s.sectionId}`}>{s.num} — {s.eyebrow}</a>
                </li>
              ))}
            </ul>
          </aside>

          <div className={styles.main}>
            {cs.sections.map(s => (
              <section key={s.sectionId} className={styles.sec} id={s.sectionId}>
                <div className="eyebrow"><span className="n">{s.num}</span>{s.eyebrow}</div>
                <h2>{s.heading}</h2>
                {s.body && <RichText data={s.body} />}
                {s.pullQuote && <p className={styles.pull}>{s.pullQuote}</p>}
                {s.spec.length > 0 && (
                  <dl className={styles.spec}>
                    {s.spec.map(row => (
                      <div key={row.k}><dt className="meta-k">{row.k}</dt><dd>{row.v}</dd></div>
                    ))}
                  </dl>
                )}
                {s.figureImages.length > 0 && (
                  <figure className={styles.shots}>
                    <div className={styles.shotsRow}>
                      {s.figureImages.map(img => <img key={img.src} src={img.src} alt={img.alt} />)}
                    </div>
                    {s.figureCaption && <figcaption>{s.figureCaption}</figcaption>}
                  </figure>
                )}
                {s.outcomes.length > 0 && (
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

      <DarkCta
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        lead={cta.lead}
        email={cta.email}
      />
    </main>
  )
}
