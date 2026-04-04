import { getAllPosts } from '@/lib/posts'
import styles from './blog.module.css'

export const metadata = { title: 'Writing — Nassif Nassif' }

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>← nassif.dev</a>
        <h1 className={styles.title}>Writing</h1>
        <p className={styles.sub}>Thoughts on politics, philosophy, tech, and whatever else.</p>
      </header>

      <div className={styles.list}>
        {posts.map((post, i) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className={styles.row}>
            <span className={styles.num}>0{i + 1}</span>
            <div className={styles.rowMain}>
              <span className={styles.postTitle}>{post.title}</span>
              <span className={styles.excerpt}>{post.excerpt}</span>
            </div>
            <div className={styles.rowMeta}>
              <span className={styles.tag}>{post.tag}</span>
              <span className={styles.date}>{new Date(post.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
            </div>
            <span className={styles.arrow}>↗</span>
          </a>
        ))}
      </div>
    </main>
  )
}
