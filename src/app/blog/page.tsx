import styles from './blog.module.css'

export const metadata = { title: 'Writing — Nassif Nassif' }

export default function BlogPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>← nassif.io</a>
        <h1 className={styles.title}>Writing</h1>
        <p className={styles.sub}>Thoughts on politics, philosophy, tech, and whatever else.</p>
      </header>

      <div className={styles.empty}>
        <span className={styles.emptyLabel}>// nothing published yet</span>
        <p>Working on it. Writing takes longer than shipping.</p>
      </div>
    </main>
  )
}
