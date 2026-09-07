import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type Settings = {
  email: string
  location: string
  timezone: string
  availability: string
  role: string
  seoTitle: string
  seoDescription: string
  github: string | null
  linkedin: string | null
  footerTagline: string
  footerJoke: string
  caseStudyCtaEyebrow: string
  caseStudyCtaHeading: string
  caseStudyCtaLead: string
}

export const getSettings = cache(async (): Promise<Settings> => {
  const payload = await getPayload({ config: configPromise })
  const doc = await payload.findGlobal({ slug: 'settings' })
  return {
    email: doc.email,
    location: doc.location,
    timezone: doc.timezone,
    availability: doc.availability,
    role: doc.role,
    seoTitle: doc.seoTitle ?? '',
    seoDescription: doc.seoDescription ?? '',
    github: doc.github ?? null,
    linkedin: doc.linkedin ?? null,
    footerTagline: doc.footerTagline ?? '',
    footerJoke: doc.footerJoke ?? '',
    caseStudyCtaEyebrow: doc.caseStudyCtaEyebrow ?? '',
    caseStudyCtaHeading: doc.caseStudyCtaHeading ?? '',
    caseStudyCtaLead: doc.caseStudyCtaLead ?? '',
  }
})
