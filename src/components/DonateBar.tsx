import styles from './DonateBar.module.css'

interface Props {
  text: string
}

export function DonateBar({ text }: Props) {
  return (
    <div className={styles.donateBar}>
      <div className={styles.donate}>
        <p className={styles.donateText}>{text}</p>
        <a href="https://ko-fi.com/nn498137" target="_blank" rel="noopener noreferrer" className={styles.kofi}>
          Support me on Ko-fi
        </a>
      </div>
    </div>
  )
}
