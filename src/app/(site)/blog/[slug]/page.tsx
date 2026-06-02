import { getPost, getAllPosts } from '@/lib/posts'
import { PortableText } from '@portabletext/react'
import { ProseBody } from '@/components/prose/ProseBody'
import { notFound } from 'next/navigation'
import layout from '@/app/(site)/projects/[slug]/project.module.css'
import styles from './post.module.css'

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
    <main className={layout.page}>
      <a href="/blog" className={layout.back}>← Writing</a>

      <header className={layout.header}>
        <span className={layout.label}>
          {post.tags?.join(' · ')} — {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <h1 className={layout.name}>{post.title}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>
      </header>

      <ProseBody>
        <PortableText value={post.body} />
      </ProseBody>

      <div className={layout.cta}>
        <div className={layout.ctaText}>
          <span className={layout.ctaLabel}>// have something to say?</span>
          <p className={layout.ctaHeading}>Send me your thoughts.</p>
        </div>
        <a
          href={`mailto:n_nassif@icloud.com?subject=Re: ${encodeURIComponent(post.title)}`}
          className={layout.ctaBtn}
        >
          Write me →
        </a>
      </div>
    </main>
  )
}
