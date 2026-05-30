import styles from './privacy.module.css'

export const metadata = {
  title: 'Privacy Policy — OneMore',
}

export default function OneMorePrivacy() {
  return (
    <main className={styles.page}>
      <a href="/projects/one-more" className={styles.back}>← oneMore</a>

      <header className={styles.header}>
        <span className={styles.label}>oneMore</span>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.date}>Last updated: May 10, 2026</p>
      </header>

      <div className={styles.body}>
        <p>OneMore is a personal habit tracking app. This policy explains how the app handles your data.</p>

        <h2>Data we collect</h2>
        <p>OneMore does not collect, transmit, or share any personal data. All data you enter (smoking logs, timestamps) is stored locally on your device only and never leaves it.</p>

        <h2>Notifications</h2>
        <p>The app may send you local push notifications as reminders. These are generated on-device and do not involve any external server.</p>

        <h2>Third parties</h2>
        <p>We do not use any third-party analytics, advertising, or tracking services.</p>

        <h2>Data deletion</h2>
        <p>You can delete all app data at any time by uninstalling the app.</p>

        <h2>Contact</h2>
        <p><a href="mailto:hello@nassif.pro">Get in touch</a></p>
      </div>
    </main>
  )
}
