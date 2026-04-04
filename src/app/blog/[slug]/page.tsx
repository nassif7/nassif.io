import { getPost, getAllPosts } from '@/lib/posts'
import styles from './post.module.css'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  return { title: `${post.title} — Nassif Nassif` }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <main className={styles.page}>
      <a href="/blog" className={styles.back}>← Writing</a>

      <header className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.tag}>{post.tag}</span>
          <span className={styles.date}>
            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>
      </header>

      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  )
}
