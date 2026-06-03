import { getProject, getAllProjects } from '@/lib/projects'
import { urlForImage } from '@/sanity/lib/image'
import { ProjectGallery } from '@/components/ProjectGallery'
import { PortableText } from '@portabletext/react'
import { ProseBody } from '@/components/prose/ProseBody'
import { CallToAction } from '@/components/cta/CallToAction'
import { SlugHeader } from '@/components/slug/SlugHeader'
import { BackLink } from '@/components/layout/BackLink'
import { PostHogPageView } from '@/components/analytics/PostHogPageView'
import { ProjectLinks } from '@/components/analytics/ProjectLinks'
import page from '@/components/layout/SlugPage.module.css'
import styles from './project.module.css'
import { notFound } from 'next/navigation'

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
    <main className={page.page}>
      <PostHogPageView event="project_viewed" properties={{ project_name: project.name, project_type: project.type, slug }} />

      <div className={page.content}>
        <BackLink href="/projects" label="All projects" />

        <SlugHeader
          type="project"
          category={project.type}
          title={project.name}
        />

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
              <ProseBody>
                {project.body?.length > 0
                  ? <PortableText value={project.body} />
                  : <p>{project.desc}</p>
                }
              </ProseBody>
            </div>

            {project.stack.length > 0 && (
              <div className={styles.stack}>
                {project.stack.map(t => <span key={t} className={styles.pill}>{t}</span>)}
              </div>
            )}

            <ProjectLinks
              projectName={project.name}
              link={project.link ?? undefined}
              linkLabel={project.linkLabel ?? undefined}
              privacyPolicy={project.privacyPolicy ?? undefined}
              appStoreLink={project.appStoreLink ?? undefined}
              androidComingSoon={project.androidComingSoon}
            />
          </div>
        </div>
      </div>

      <CallToAction
        label="got a similar idea?"
        heading="Let's build something together."
        href={`mailto:n_nassif@icloud.com?subject=Re: ${encodeURIComponent(project.name)}`}
        buttonText="Contact me →"
      />
    </main>
  )
}
