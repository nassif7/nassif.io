import styles from './About.module.css'
import shared from './section.module.css'

export function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={shared.label}>Who</div>
      <div className={styles.right}>
        <h2 className={shared.heading}>A mix of contradictions<br />and clean code.</h2>
        <div className={styles.body}>
          <p>
            Frontend engineer with a thing for <strong>detail</strong>, a low tolerance for bad UX,
            and a high tolerance for ambiguity. I&apos;ve been doing this long enough to know the rules —
            which ones to follow, and which ones to break on purpose.
          </p>
          <p>
            I work at the intersection of design and engineering. I care about <strong>how things feel</strong>,
            not just how they function. The invisible half-pixel. The transition that&apos;s 20ms too slow.
            The copy that&apos;s technically correct but feels wrong.
          </p>
          <p>Still growing. Still figuring it out. That&apos;s probably not changing.</p>
        </div>
      </div>
    </section>
  )
}
