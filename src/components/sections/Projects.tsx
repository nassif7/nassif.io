import Link from 'next/link'
import clsx from 'clsx'
import { getFeaturedProjects } from '@/lib/projects'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'
import styles from './Projects.module.css'

export async function Projects() {
  const projects = await getFeaturedProjects()

  return (
    <section id="work" className={shared.band} style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHeader
          num="03"
          eyebrow="Selected work"
          title="Two projects, in detail."
          lead="Client products where the constraints were real and the decisions are worth reading about."
          meta="Full index ↓"
          metaHref="#index"
        />

        {projects.map((p, i) => {
          const photo = p.featuredImage || p.images[0] || null
          const mobile = p.slug === 'marineria'
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={clsx(styles.case, mobile ? styles.caseMobile : styles.caseAlt)}
            >
              <div className={styles.caseImg}>
                {photo && <img src={photo} alt={`${p.name} screens`} />}
              </div>
              <div className={styles.caseB}>
                <div className="eyebrow"><span className="n">{String(i + 1).padStart(2, '0')}</span>{p.type} · {p.year}</div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <dl className={styles.caseMeta}>
                  {p.role && <div><dt className="meta-k">Role</dt><dd>{p.role}</dd></div>}
                  {p.platforms && <div><dt className="meta-k">Platforms</dt><dd>{p.platforms}</dd></div>}
                  <div><dt className="meta-k">Stack</dt><dd>{p.stack.join(' · ')}</dd></div>
                  {p.status && <div><dt className="meta-k">Status</dt><dd>{p.status}</dd></div>}
                </dl>
                <span className="btn btn-ghost">{p.caseStudy ? 'Read case study →' : 'View project →'}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
