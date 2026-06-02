import styles from './ProseBody.module.css'

export function ProseBody({ children }: { children: React.ReactNode }) {
  return <div className={styles.body}>{children}</div>
}
