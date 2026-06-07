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
              Frontend engineer focused on building products that are simple, clear, and reliable.
            </p>
            <p>
              I work between design and engineering, translating ideas into interfaces that people can
              understand without thinking about them. Good software shouldn't need explanations.
              It should feel obvious.
            </p>
            <p>
              Over the years I've learned that most problems aren't technical. They're usually about
              reducing complexity, making better decisions, and knowing what to leave out.
            </p>
          </div>
        </div>

    </section>
  )
}
