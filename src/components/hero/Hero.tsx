import Image from 'next/image'
import styles from './Hero.module.css'

const FACTS = [
  { k: 'Based in', v: 'Berlin, Germany' },
  { k: 'Focus', v: 'Platform · Product · UX' },
  { k: 'Engagements', v: 'Contract · Full-time' },
  { k: 'Languages', v: 'EN C1 · DE B2 · AR native' },
]

const STATS = [
  { value: '8', label: 'Years building software' },
  { value: '3', label: 'Companies shipped for' },
  { value: '2', label: 'Apps in public stores' },
  { value: 'React · RN', label: 'Primary platforms' },
]

export function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.l}>
            <div className="eyebrow"><span className="n">01</span>Nassif Nassif — Software Engineer</div>
            <h1 className="display">Good software shouldn&apos;t need explanations.</h1>
            <p className="lead">
              A systems thinker with eight years building software across corporate platforms, startups,
              and independent projects. I work between design and engineering, turning complex problems
              into simple, intuitive solutions.
            </p>
            <div className={styles.actions}>
              <a href="/#work" className="btn">View work index</a>
              <a href="/cv" className="btn btn-ghost">Download CV</a>
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
              {FACTS.map(f => (
                <div key={f.k} className={styles.fact}>
                  <dt className="meta-k">{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className={styles.strip}>
          {STATS.map(s => (
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
