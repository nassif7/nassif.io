import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'
import styles from './Services.module.css'

const CAPS = [
  {
    num: '01 / Web',
    title: 'Product interfaces',
    desc: 'Application UI, dashboards, and marketing surfaces built to hold up as the product grows — not just as the first screen ships.',
    items: ['Next.js & React builds', 'Component libraries', 'Accessibility & performance', 'CMS integration'],
  },
  {
    num: '02 / Systems',
    title: 'Design systems & tooling',
    desc: 'Consistency enforced by the type system rather than left to convention. Systems that make the correct thing the easiest thing to build.',
    items: ['Token architecture', 'Typed component APIs', 'Generation tooling', 'Documentation & adoption'],
  },
  {
    num: '03 / Mobile',
    title: 'Mobile applications',
    desc: 'Cross-platform iOS and Android products from first screen to store listing, including the parts nobody enjoys: auth, push, review.',
    items: ['React Native & Expo', 'Real-time data', 'Push notifications', 'App Store submission'],
  },
]

export function Services() {
  return (
    <section id="services" className={shared.band}>
      <div className="wrap">
        <SectionHeader
          num="02"
          eyebrow="Services"
          title="What I'm hired for."
          lead="Three kinds of work, all the same discipline: reduce complexity, decide well, know what to leave out."
        />
        <div className={styles.caps}>
          {CAPS.map(cap => (
            <div key={cap.num} className={styles.cap}>
              <div className="meta-k">{cap.num}</div>
              <h3>{cap.title}</h3>
              <p>{cap.desc}</p>
              <ul>
                {cap.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
