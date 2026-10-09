import type { CollectionConfig } from 'payload'
import { revalidateContent } from '@/lib/content/revalidate'

/** The ONLY filter on /projects. Add values here and nowhere else. */
export const PROJECT_TYPES = [
  'Mobile app',
  'Browser extension',
  'Website',
  'Dev tool',
  'Editor theme',
  'Concept',
] as const

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'year', 'kind', 'featured', 'draft', 'updatedAt'],
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
    beforeValidate: [
      async ({ data, req, originalDoc }) => {
        // exactly one featured project
        if (data?.featured) {
          const others = await req.payload.find({
            collection: 'projects',
            where: { and: [{ featured: { equals: true } }, { id: { not_equals: originalDoc?.id ?? 0 } }] },
            limit: 1,
            depth: 0,
            req,
          })
          if (others.totalDocs > 0) {
            throw new Error(`"${others.docs[0].name}" is already featured. Un-feature it first.`)
          }
        }
        // case studies need at least one section
        if (data?.kind === 'case-study' && !(data?.sections?.length > 0)) {
          throw new Error('A case study needs at least one section.')
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'entry',
      options: [
        { label: 'Project entry', value: 'entry' },
        { label: 'Case study', value: 'case-study' },
      ],
      admin: { description: 'Picks the detail-page layout' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: PROJECT_TYPES.map(t => ({ label: t, value: t })),
    },
    { name: 'year', type: 'number', required: true, admin: { description: 'List sort (newest first) and meta' } },
    {
      name: 'role',
      type: 'relationship',
      relationTo: 'roles',
      validate: (v: unknown) => (v ? true : 'Pick a role (add new ones under Project options → Roles)'),
      admin: { description: 'Pick one. Edit the options under Project options → Roles' },
    },
    { name: 'client', type: 'text', admin: { description: 'Client work only' } },
    { name: 'platform', type: 'text', admin: { description: 'e.g. "iOS · Android"' } },
    {
      name: 'stack',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
      admin: { description: 'Pick several. Edit the options under Project options → Technologies. Display only, not filtered' },
    },
    {
      name: 'status',
      type: 'relationship',
      relationTo: 'statuses',
      validate: (v: unknown) => (v ? true : 'Pick a status (add new ones under Project options → Statuses)'),
      admin: { description: 'Pick one. Edit the options (and the "live" dot) under Project options → Statuses' },
    },
    { name: 'summary', type: 'textarea', required: true, maxLength: 160, admin: { description: 'One line, used in the list and on Home' } },
    { name: 'lede', type: 'textarea', required: true, admin: { description: 'Detail page intro' } },
    { name: 'cover', type: 'upload', relationTo: 'media', admin: { description: 'List preview, Home card and detail side image. Alt text comes from the media item.' } },
    { name: 'coverUrl', type: 'text', admin: { description: 'Fallback when there is no upload: a site path (/projects/…) or full URL' } },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Chrome Web Store", "Privacy policy"' } },
        { name: 'href', type: 'text', required: true, admin: { description: 'Full URL, or a site path like /projects/one-more/privacy' } },
      ],
    },
    { name: 'body', type: 'richText', admin: { description: 'Entries only: 1–3 short paragraphs', condition: (d) => d?.kind !== 'case-study' } },
    {
      name: 'sections',
      type: 'array',
      admin: { description: 'Case studies only', condition: (d) => d?.kind === 'case-study' },
      fields: [
        { name: 'sectionId', type: 'text', required: true, admin: { description: 'Anchor, e.g. "brief"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'Rail + eyebrow, e.g. "The brief"' } },
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'richText', required: true },
        { name: 'pull', type: 'textarea', admin: { description: 'Optional pull quote' } },
        {
          name: 'figure',
          type: 'group',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'caption', type: 'text' },
          ],
        },
        {
          name: 'outcomes',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "2"' } },
            { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Platforms, one codebase"' } },
          ],
        },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Exactly one: shown on Home' } },
    { name: 'draft', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Hidden on the site' } },
    { name: 'order', type: 'number', admin: { position: 'sidebar', description: 'Optional manual override of the year sort (lower = first)' } },
  ],
}
