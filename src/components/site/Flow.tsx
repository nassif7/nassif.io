import { Header } from './Header'
import { Footer } from './Footer'
import styles from './flow.module.css'

/** Header + footer around a normally-scrolling page (no fixed sheet). */
export function Flow({ current, children }: { current?: string; children: React.ReactNode }) {
  return (
    <div className={styles.flow}>
      <Header current={current} />
      <div className={styles.main}>{children}</div>
      <Footer />
    </div>
  )
}
