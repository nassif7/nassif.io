import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type ExperienceEntry = {
  id: string
  title: string
  tag: string
  year: string
  cvWhen: string
  description: string
  bullets: string[]
  showInTrackRecord: boolean
  showInCV: boolean
  current: boolean
  order: number
}

function normalizeExperience(doc: any): ExperienceEntry {
  return {
    id: doc.id,
    title: doc.title,
    tag: doc.tag ?? '',
    year: doc.year,
    cvWhen: doc.cvWhen || doc.year,
    description: doc.description ?? '',
    bullets: doc.bullets?.map((b: { text: string }) => b.text) ?? [],
    showInTrackRecord: doc.showInTrackRecord ?? true,
    showInCV: doc.showInCV ?? true,
    current: doc.current ?? false,
    order: doc.order ?? 0,
  }
}

export async function getAllExperience(): Promise<ExperienceEntry[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'experience',
    sort: 'order',
    depth: 0,
    limit: 100,
  })
  return docs.map(normalizeExperience)
}
