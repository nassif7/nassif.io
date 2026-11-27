import clsx from 'clsx'
import styles from './list.module.css'

type Chip = { value: string; count: number }

export function Chips({
  label,
  chips,
  total,
  active,
  onChange,
  className,
  showLabel = true,
}: {
  label: string
  chips: Chip[]
  total: number
  active: string | null
  onChange: (value: string | null) => void
  className?: string
  showLabel?: boolean
}) {
  return (
    <div className={clsx(styles.filters, className)} role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
      {showLabel && <span className={clsx(styles.fl, 'k')}>{label}</span>}
      <div className={clsx(styles.chips, 'k')}>
        <button type="button" className={styles.chip} aria-pressed={active === null} onClick={() => onChange(null)}>
          All<sup>{total}</sup>
        </button>
        {chips.map(c => (
          <button key={c.value} type="button" className={styles.chip} aria-pressed={active === c.value} onClick={() => onChange(c.value)}>
            {c.value}<sup>{c.count}</sup>
          </button>
        ))}
      </div>
    </div>
  )
}
