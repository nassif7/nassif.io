import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.left}>n|N · Nassif Nassif · Berlin · {new Date().getFullYear()}</span>
      <span className={styles.right}>Professional button-maker.</span>
    </footer>
  )
}
