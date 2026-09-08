export const dynamic = 'force-dynamic'

import { getPost, getAllPosts } from '@/lib/posts'
import { getSettings } from '@/lib/settings'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ProseBody } from '@/components/prose/ProseBody'
import { DarkCta } from '@/components/cta/DarkCta'
import { ProjectHeader } from '@/components/project-header/ProjectHeader'
import { PostHogPageView } from '@/components/analytics/PostHogPageView'
import { notFound } from 'next/navigation'
import page from '@/components/layout/SlugPage.module.css'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — Nassif Nassif` }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, settings] = await Promise.all([getPost(slug), getSettings()])

  if (!post || post.hidden) notFound()

  return (
    <main>
      <PostHogPageView event="post_viewed" properties={{ post_title: post.title, slug, tags: post.tags?.join(', ') }} />

      <ProjectHeader
        backHref="/blog"
        backLabel="Writing"
        eyebrowLabel={`${post.tags?.join(' · ') ?? ''} — ${new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`}
        title={post.title}
        lead={post.excerpt}
      />

      <div className={page.content}>
        <ProseBody>
          <RichText data={post.body} />
        </ProseBody>
      </div>

      <DarkCta
        eyebrow={settings.postCtaEyebrow}
        heading={settings.postCtaHeading}
        lead={settings.postCtaLead}
        email={settings.email}
        writeLabel="Send a comment"
        mailtoSubject={`Re: ${post.title}`}
      />
    </main>
  )
}
