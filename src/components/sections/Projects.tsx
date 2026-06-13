import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/projects'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'
import styles from './Projects.module.css'

export async function Projects() {
  const projects = await getFeaturedProjects()

  return (
    <section id="work" className={shared.section}>
      <SectionHeader
        label="Featured work"
        linkHref="/projects"
        linkText="All projects →"
        title="Things I've shipped."
        intro="Side projects and work in progress. Small but deliberate."
      />

      <div className={styles.grid}>
        {projects.map((p) => {
          const photo = p.featuredImage || p.images[0] || null
          const slotClass = styles[`slot${p.featuredOrder}`] ?? ''
          return (
            <Link key={p.slug} href={`/projects/${p.slug}`} className={`${styles.card} ${slotClass}`}>
              <div className={styles.imageWrap}>
                {photo ? (
                  <img src={photo} alt={p.name} className={styles.image} />
                ) : (
                  <div className={styles.noImage}>// no photo yet</div>
                )}
              </div>
              <div className={styles.body}>
                <span className={styles.type}>{p.type}</span>
                <span className={styles.name}>{p.name}</span>
                <p className={styles.desc}>{p.desc}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
