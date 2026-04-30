import styles from './privacy.module.css'

export const metadata = {
  title: 'Privacy Policy — bookmarX',
}

export default function BookmarXPrivacy() {
  return (
    <main className={styles.page}>
      <a href="/projects/bookmarx" className={styles.back}>← bookmarX</a>

      <header className={styles.header}>
        <span className={styles.label}>bookmarX</span>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.date}>Last updated: April 29, 2026</p>
      </header>

      <div className={styles.body}>
        <p>bookmarX is a Chrome extension that turns your X bookmarks into a local, searchable knowledge base. This policy explains what data is stored, where it lives, and what never happens to it.</p>

        <h2>No data leaves your device</h2>
        <p>Everything bookmarX stores lives exclusively in Chrome's built-in extension storage (<code>chrome.storage.local</code>). Nothing is transmitted to any server, third party, or external service. There is no backend, no account, and no analytics.</p>

        <h2>What is stored locally</h2>
        <ul>
          <li>Your X bookmarks: tweet text, author name, handle, media URLs</li>
          <li>Collections you create and their keyword rules</li>
          <li>Your preferences: theme and accent color</li>
        </ul>
        <p>All of this can be deleted at any time by removing the extension or clearing its storage via Chrome settings.</p>

        <h2>Permissions</h2>
        <p>bookmarX requests the following browser permissions:</p>
        <ul>
          <li><code>storage</code>: to save bookmarks and settings locally</li>
          <li>Access to <code>x.com</code>: to intercept the browser's own GraphQL responses when you run a sync from the bookmarks page</li>
        </ul>
        <p>No other sites or pages are accessed.</p>

        <h2>Third parties</h2>
        <p>bookmarX has no external dependencies. No tracking, no advertising, no analytics of any kind.</p>

        <h2>Contact</h2>
        <p><a href="mailto:hello@nassif.pro">Get in touch</a></p>
      </div>
    </main>
  )
}
