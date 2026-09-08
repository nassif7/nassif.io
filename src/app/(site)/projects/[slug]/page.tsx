export const dynamic = 'force-dynamic'

import { getProject, getAllProjects } from '@/lib/projects'
import { getSettings } from '@/lib/settings'
import { ProjectGallery } from '@/components/ProjectGallery'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ProseBody } from '@/components/prose/ProseBody'
import { DarkCta } from '@/components/cta/DarkCta'
import { ProjectHeader } from '@/components/project-header/ProjectHeader'
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
  const [project, settings] = await Promise.all([getProject(slug), getSettings()])
  if (!project) notFound()

  const cta = {
    email: settings.email,
    eyebrow: settings.caseStudyCtaEyebrow,
    heading: settings.caseStudyCtaHeading,
    lead: settings.caseStudyCtaLead,
  }

  if (project.caseStudy) {
    return <CaseStudy project={project} cta={cta} />
  }

  const imageUrls: string[] = project.images ?? []

  return (
    <main>
      <PostHogPageView event="project_viewed" properties={{ project_name: project.name, project_type: project.type, slug }} />

      <ProjectHeader
        backHref="/projects"
        backLabel="Work index"
        eyebrowLabel={project.type}
        title={project.name}
        lead={project.desc}
        client={project.client}
        year={project.year}
        role={project.role}
        platforms={project.platforms}
        status={project.status}
      />

      <div className={page.content}>
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
            {project.body?.root?.children?.length > 0 && (
              <div className={styles.desc}>
                <ProseBody>
                  <RichText data={project.body} />
                </ProseBody>
              </div>
            )}

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

      <DarkCta
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        lead={cta.lead}
        email={cta.email}
      />
    </main>
  )
}
