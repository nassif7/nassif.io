import styles from './ListItem.module.css'

interface PostItem {
  type: 'post'
  href: string
  num: number
  title: string
  excerpt: string
  tags: string
  date: string
}

interface ProjectItem {
  type: 'project'
  href: string
  num: number
  title: string
  excerpt: string
  category: string
  stack: string
  wip?: boolean
}

type ListItemProps = PostItem | ProjectItem

export function ListItem(props: ListItemProps) {
  const { href, num, title, excerpt } = props

  const tag = props.type === 'post' ? props.tags : props.category
  const meta = props.type === 'post' ? props.date : props.stack
  const arrow = props.type === 'project' && props.wip ? '…' : '↗'

  return (
    <a href={href} className={styles.row}>
      <span className={styles.num}>{String(num).padStart(2, '0')}</span>
      <div className={styles.main}>
        <span className={styles.title}>{title}</span>
        <span className={styles.excerpt}>{excerpt}</span>
        <div className={styles.meta}>
          <span className={styles.tag}>{tag}</span>
          {meta && <span className={styles.aside}>{meta}</span>}
        </div>
      </div>
      <span className={styles.arrow}>{arrow}</span>
    </a>
  )
}
