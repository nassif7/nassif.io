import { getPost, getAllPosts } from '@/lib/posts'
import { PortableText } from '@portabletext/react'
import { ProseBody } from '@/components/prose/ProseBody'
import { CallToAction } from '@/components/cta/CallToAction'
import { SlugHeader } from '@/components/slug/SlugHeader'
import { BackLink } from '@/components/layout/BackLink'
import { notFound } from 'next/navigation'
import page from '@/components/layout/SlugPage.module.css'
import styles from '@/app/(site)/projects/[slug]/project.module.css'

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
  const post = await getPost(slug)

  if (!post || post.hidden) notFound()

  return (
    <main className={page.page}>
      <BackLink href="/blog" label="Writing" />

      <SlugHeader
        type="post"
        tags={post.tags?.join(' · ') ?? ''}
        date={new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        title={post.title}
        excerpt={post.excerpt}
      />

      <ProseBody>
        <PortableText value={post.body} />
      </ProseBody>

      <div className={styles.cta}>
        <CallToAction
          label="have something to say?"
          heading="Send me your thoughts."
          href={`mailto:n_nassif@icloud.com?subject=Re: ${encodeURIComponent(post.title)}`}
          buttonText="Write me →"
        />
      </div>
    </main>
  )
}
