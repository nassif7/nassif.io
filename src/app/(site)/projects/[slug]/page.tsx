import { getProject, getAllProjects } from '@/lib/projects'
import { urlForImage } from '@/sanity/lib/image'
import { ProjectGallery } from '@/components/ProjectGallery'
import { PortableText } from '@portabletext/react'
import styles from './project.module.css'
import { notFound } from 'next/navigation'
import { FaApple, FaGooglePlay } from 'react-icons/fa'

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return { title: `${project.name} — Nassif Nassif` }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const imageUrls: string[] = (project.images ?? []).map((img: any) => urlForImage(img))

  return (
    <>
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
          ) : imageUrls.length > 0 ? (
            <ProjectGallery
              images={imageUrls}
              name={project.name}
              classes={{
                gallery: styles.gallery,
                galleryMain: styles.galleryMain,
                arrowLeft: styles.arrowLeft,
                arrowRight: styles.arrowRight,
                galleryThumbs: styles.galleryThumbs,
                thumb: styles.thumb,
                thumbActive: styles.thumbActive,
                dots: styles.dots,
                dot: styles.dot,
                dotActive: styles.dotActive,
              }}
            />
          ) : (
            <div className={styles.noImage}>// photos coming soon</div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.desc}>
            {project.body?.length > 0
              ? <PortableText value={project.body} />
              : <p>{project.desc}</p>
            }
          </div>

          {project.stack.length > 0 && (
            <div className={styles.stack}>
              {project.stack.map(t => <span key={t} className={styles.pill}>{t}</span>)}
            </div>
          )}

          {project.privacyPolicy && (
            <a href={project.privacyPolicy} className={styles.link}>
              Privacy Policy
            </a>
          )}

          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {project.linkLabel}
            </a>
          )}

          {(project.appStoreLink || project.androidComingSoon) && (
            <div className={styles.storeLinks}>
              {project.appStoreLink && (
                <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer" className={styles.storeBtn}>
                  <FaApple className={styles.storeIcon} />
                  <span className={styles.storeMeta}>
                    <span className={styles.storeSmall}>Download on the</span>
                    <span className={styles.storeBig}>App Store</span>
                  </span>
                </a>
              )}
              {project.androidComingSoon && (
                <div className={styles.storeBtnDisabled}>
                  <FaGooglePlay className={styles.storeIcon} />
                  <span className={styles.storeMeta}>
                    <span className={styles.storeSmall}>Coming soon on</span>
                    <span className={styles.storeBig}>Google Play</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.cta}>
        <div className={styles.ctaText}>
          <span className={styles.ctaLabel}>// got a similar idea?</span>
          <p className={styles.ctaHeading}>Let&apos;s build something together.</p>
        </div>
        <a
          href={`mailto:n_nassif@icloud.com?subject=Re: ${encodeURIComponent(project.name)}`}
          className={styles.ctaBtn}
        >
          Contact me →
        </a>
      </div>
    </main>
    </>
  )
}
