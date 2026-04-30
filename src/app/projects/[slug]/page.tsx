import { getProject, getAllProjects } from '@/lib/projects'
import { ProjectGallery } from '@/components/ProjectGallery'
import styles from './project.module.css'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  return { title: `${project.name} — Nassif Nassif` }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  let project
  try {
    project = getProject(params.slug)
  } catch {
    notFound()
  }

  const paragraphs = project.content.split('\n\n').filter(Boolean)

  return (
    <main className={styles.page}>
      <a href="/projects" className={styles.back}>← All projects</a>

      <header className={styles.header}>
        <span className={styles.label}>{project.num} — {project.type}</span>
        <h1 className={styles.name}>{project.name}</h1>
      </header>

      <div className={styles.body}>
        <div className={styles.left}>
          {project.brainstorm ? (
            <div className={styles.brainstorm}>
              <span className={styles.brainstormLabel}>// early concept</span>
              <p>Integrity</p>
              <p>Autonomy</p>
              <p>Awareness</p>
              <p>Accountability</p>
              <p>Courage</p>
            </div>
          ) : project.images.length > 0 ? (
            <ProjectGallery
            images={project.images}
            name={project.name}
            classes={{
              gallery: styles.gallery,
              galleryMain: styles.galleryMain,
              arrowLeft: styles.arrowLeft,
              arrowRight: styles.arrowRight,
              galleryThumbs: styles.galleryThumbs,
              thumb: styles.thumb,
              thumbActive: styles.thumbActive,
            }}
          />
          ) : (
            <div className={styles.noImage}>// photos coming soon</div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.desc}>
            {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          {project.stack.length > 0 && (
            <div className={styles.stack}>
              {project.stack.map(t => <span key={t} className={styles.pill}>{t}</span>)}
            </div>
          )}

          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {project.linkLabel}
            </a>
          )}

          {project.privacyPolicy && (
            <a href={project.privacyPolicy} className={styles.link}>
              Privacy Policy
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
