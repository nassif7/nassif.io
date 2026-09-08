import Image from 'next/image'
import { getHomepage } from '@/lib/homepage'
import styles from './Hero.module.css'

export async function Hero() {
  const homepage = await getHomepage()

  return (
    <section className={styles.hero} id="home">
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.l}>
            <div className="eyebrow"><span className="n">01</span>{homepage.heroEyebrow}</div>
            <h1 className="display">{homepage.heroHeading}</h1>
            <p className="lead">{homepage.heroLead}</p>
            <div className={styles.actions}>
              <a href="/#work" className="btn">{homepage.heroPrimaryButton}</a>
              <a href="/nassif-nassif-cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{homepage.heroSecondaryButton}</a>
            </div>
          </div>

          <div className={styles.r}>
            <Image
              src="/avatar.png"
              alt="Nassif Nassif"
              width={340}
              height={340}
              className={styles.portrait}
              priority
            />
            <dl className={styles.facts}>
              {homepage.facts.map(f => (
                <div key={f.label} className={styles.fact}>
                  <dt className="meta-k">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className={styles.strip}>
          {homepage.stats.map(s => (
            <div key={s.label}>
              <strong className={/^\d+$/.test(s.value) ? 'tnum' : undefined}>{s.value}</strong>
              <span className="meta-k">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
