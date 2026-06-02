import styles from './Hero.module.css'
import { HeroName } from './HeroName'

export function Hero() {

  return (
    <section className={styles.hero} id="home">
      <span className={styles.roleTag}>Built with intention, shipped with hope.</span>

      {/* logoMark — kept for later use
      <div className={styles.logoMark} aria-hidden="true">
        <div className={styles.logoText}>
          <span className={styles.logoLetter}>{upper ? 'N' : 'n'}</span>
          <span className={styles.logoPipe} />
          <span className={styles.logoLetter}>{upper ? 'n' : 'N'}</span>
        </div>
        <p className={styles.logoTime}>— kept for later —</p>
      </div>
      */}

        <HeroName
          firstName="nassif"
          lastName="Nassif"
          slogan="Professional button-maker. Powered by coffee and boredom."
        />

        <div className={styles.rule} />

        <div className={styles.article}>
          <div className={styles.body}>
            <p>
              Frontend engineer with a thing for <strong>detail</strong>, a low tolerance for bad UX,
              and a high tolerance for ambiguity. I've been doing this long enough to know the rules,
              which ones to follow, and which ones to break on purpose.
            </p>
            <p>
              I work at the intersection of design and engineering. I care about <strong>how things feel</strong>,
              not just how they function. The invisible half-pixel. The transition that's 20ms too slow.
              The copy that's technically correct but feels wrong.
            </p>
            <p>
              Syrian, based in Berlin. Still more curious than tired.
            </p>
            <p>Still growing. Still figuring it out. That's probably not changing.</p>
          </div>
        </div>

    </section>
  )
}
