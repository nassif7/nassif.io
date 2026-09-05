export const dynamic = 'force-dynamic'

import { getProject, getAllProjects } from '@/lib/projects'
import { ProjectGallery } from '@/components/ProjectGallery'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ProseBody } from '@/components/prose/ProseBody'
import { CallToAction } from '@/components/cta/CallToAction'
import { SlugHeader } from '@/components/slug/SlugHeader'
import { BackLink } from '@/components/layout/BackLink'
import { PostHogPageView } from '@/components/analytics/PostHogPageView'
import { ProjectLinks } from '@/components/analytics/ProjectLinks'
import { CaseStudy } from '@/components/case-study/CaseStudy'
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

  if (project.caseStudy) {
    return <CaseStudy project={project} />
  }

  const imageUrls: string[] = project.images ?? []

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
                {project.body?.root?.children?.length > 0
                  ? <RichText data={project.body} />
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
              links={project.links ?? []}
              privacyPolicy={project.privacyPolicy}
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
