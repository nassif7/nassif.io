import shared from './section.module.css'
import styles from './Writing.module.css'

const ARTICLES = [
  { tag: 'Politics',    title: 'On the politics of interface design',  date: 'Mar 2025', href: '/blog' },
  { tag: 'Philosophy',  title: 'What it means to finish something',    date: 'Feb 2025', href: '/blog' },
  { tag: 'Tech',        title: 'The frontend is never just frontend',  date: 'Jan 2025', href: '/blog' },
]

export function Writing() {
  return (
    <section id="writing" className={shared.section}>
      <div className={shared.sectionHeader}>
        <span className={shared.label}>Writing</span>
        <a href="/blog" className={shared.seeAll}>All posts →</a>
      </div>

      <div className={styles.grid}>
        {ARTICLES.map(a => (
          <a key={a.title} href={a.href} className={styles.card}>
            <span className={styles.tag}>{a.tag}</span>
            <span className={styles.title}>{a.title}</span>
            <span className={styles.date}>{a.date}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
