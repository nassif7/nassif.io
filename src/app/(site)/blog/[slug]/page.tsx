import { getPost, getAllPosts } from '@/lib/posts'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
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
    <main className={styles.page}>
      <a href="/blog" className={styles.back}>← Writing</a>

      <header className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.tag}>{post.tags?.join(' · ')}</span>
          <span className={styles.date}>
            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>
      </header>

      <div className={styles.body}>
        <PortableText value={post.body} />
      </div>
    </main>
  )
}
