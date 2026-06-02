import styles from './Hero.module.css'

interface HeroNameProps {
  firstName: string
  lastName: string
  slogan: string
}

export function HeroName({ firstName, lastName, slogan }: HeroNameProps) {
  return (
    <div className={styles.headline}>
      <h1 className={styles.name}>
        <span className={styles.nameFirst}>{firstName}</span> {lastName}
      </h1>
      <p className={styles.deck}>{slogan}</p>
    </div>
  )
}
