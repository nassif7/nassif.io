import { getHomepage } from '@/lib/homepage'
import { SectionHeader } from './SectionHeader'
import shared from './section.module.css'
import styles from './Services.module.css'

export async function Services() {
  const homepage = await getHomepage()

  return (
    <section id="services" className={shared.band}>
      <div className="wrap">
        <SectionHeader
          num="02"
          eyebrow="Services"
          title={homepage.servicesSectionTitle}
          lead={homepage.servicesSectionLead}
        />
        <div className={styles.caps}>
          {homepage.services.map(cap => (
            <div key={cap.index} className={styles.cap}>
              <div className="meta-k">{cap.index}</div>
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
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
