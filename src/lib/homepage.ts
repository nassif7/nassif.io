import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type Fact = { label: string; value: string }
export type Stat = { value: string; label: string }
export type Service = { index: string; title: string; description: string; items: string[] }

export type Homepage = {
  heroEyebrow: string
  heroHeading: string
  heroLead: string
  heroPrimaryButton: string
  heroSecondaryButton: string
  facts: Fact[]
  stats: Stat[]
  servicesSectionTitle: string
  servicesSectionLead: string
  services: Service[]
  workSectionTitle: string
  workSectionLead: string
  indexSectionTitle: string
  trackSectionTitle: string
  writingSectionTitle: string
  writingSectionLead: string
  ctaEyebrow: string
  ctaHeading: string
  ctaLead: string
}

export const getHomepage = cache(async (): Promise<Homepage> => {
  const payload = await getPayload({ config: configPromise })
  const doc = await payload.findGlobal({ slug: 'homepage' })
  return {
    heroEyebrow: doc.heroEyebrow,
    heroHeading: doc.heroHeading,
    heroLead: doc.heroLead,
    heroPrimaryButton: doc.heroPrimaryButton ?? '',
    heroSecondaryButton: doc.heroSecondaryButton ?? '',
    facts: (doc.facts ?? []).map((f: any) => ({ label: f.label, value: f.value })),
    stats: (doc.stats ?? []).map((s: any) => ({ value: s.value, label: s.label })),
    servicesSectionTitle: doc.servicesSectionTitle ?? '',
    servicesSectionLead: doc.servicesSectionLead ?? '',
    services: (doc.services ?? []).map((s: any) => ({
      index: s.index,
      title: s.title,
      description: s.description,
      items: (s.items ?? []).map((i: any) => i.text),
    })),
    workSectionTitle: doc.workSectionTitle ?? '',
    workSectionLead: doc.workSectionLead ?? '',
    indexSectionTitle: doc.indexSectionTitle ?? '',
    trackSectionTitle: doc.trackSectionTitle ?? '',
    writingSectionTitle: doc.writingSectionTitle ?? '',
    writingSectionLead: doc.writingSectionLead ?? '',
    ctaEyebrow: doc.ctaEyebrow ?? '',
    ctaHeading: doc.ctaHeading,
    ctaLead: doc.ctaLead,
  }
})
