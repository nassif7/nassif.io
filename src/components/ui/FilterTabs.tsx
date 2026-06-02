import styles from './FilterTabs.module.css'

interface FilterTabsProps {
  allHref: string
  allActive: boolean
  items: Array<{ label: string; href: string; active: boolean }>
}

export function FilterTabs({ allHref, allActive, items }: FilterTabsProps) {
  return (
    <div className={styles.filters}>
      <a href={allHref} className={`${styles.filter} ${allActive ? styles.active : ''}`}>All</a>
      {items.map(item => (
        <a key={item.href} href={item.href} className={`${styles.filter} ${item.active ? styles.active : ''}`}>
          {item.label}
        </a>
      ))}
    </div>
  )
}
