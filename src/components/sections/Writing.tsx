import shared from './section.module.css'
import styles from './Writing.module.css'

const ARTICLES = [
  { tag: 'Politics',   title: 'On the politics of interface design', excerpt: 'Every button is a decision. Every form is a stance. Design is never neutral.', date: 'Mar 2025', href: '/blog/on-the-politics-of-interface-design' },
  { tag: 'Philosophy', title: 'What it means to finish something',   excerpt: 'I have a graveyard of half-built things. I think most developers do.',           date: 'Feb 2025', href: '/blog/what-it-means-to-finish-something' },
  { tag: 'Tech',       title: 'The frontend is never just frontend', excerpt: "You can't separate the UI from the system it lives in.",                           date: 'Jan 2025', href: '/blog/the-frontend-is-never-just-frontend' },
]

export function Writing() {
  return (
    <section id="writing" className={shared.section}>
      <div className={shared.sectionHeader}>
        <span className={shared.label}>Writing</span>
        <a href="/blog" className={shared.seeAll}>All posts →</a>
      </div>
      <h2 className={shared.heading}>Things I think about.</h2>
      <p className={shared.intro}>Politics, philosophy, tech, and the occasional rant. Honest opinions, written slowly.</p>

      <div className={styles.list}>
        {ARTICLES.map((a, i) => (
          <a key={a.title} href={a.href} className={styles.row}>
            <span className={styles.num}>0{i + 1}</span>
            <div className={styles.rowMain}>
              <span className={styles.title}>{a.title}</span>
              <span className={styles.excerpt}>{a.excerpt}</span>
            </div>
            <div className={styles.rowMeta}>
              <span className={styles.tag}>{a.tag}</span>
              <span className={styles.date}>{a.date}</span>
            </div>
            <span className={styles.arrow}>↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
