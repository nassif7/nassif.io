import styles from './SlugHeader.module.css'

interface ProjectHeader {
  type: 'project'
  category: string
  title: string
}

interface PostHeader {
  type: 'post'
  tags: string
  date: string
  title: string
  excerpt: string
}

type SlugHeaderProps = ProjectHeader | PostHeader

export function SlugHeader(props: SlugHeaderProps) {
  const label = props.type === 'project'
    ? props.category
    : `${props.tags} — ${props.date}`

  return (
    <header className={styles.header}>
      <span className={styles.label}>{label}</span>
      <h1 className={styles.title}>{props.title}</h1>
      {props.type === 'post' && (
        <p className={styles.excerpt}>{props.excerpt}</p>
      )}
    </header>
  )
}
