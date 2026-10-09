import type { CollectionConfig } from 'payload'
import { revalidateContent } from '@/lib/content/revalidate'

// Editable option lists used by the Projects dropdowns.
const group = 'Project options'

export const Roles: CollectionConfig = {
  slug: 'roles',
  labels: { singular: 'Role', plural: 'Roles' },
  admin: { group, useAsTitle: 'name', description: 'Options for "Role" on a project, e.g. "Lead frontend"' },
  hooks: { afterChange: [revalidateContent], afterDelete: [revalidateContent] },
  defaultSort: 'name',
  fields: [{ name: 'name', type: 'text', required: true, unique: true }],
}

export const Topics: CollectionConfig = {
  slug: 'topics',
  labels: { singular: 'Topic', plural: 'Topics' },
  admin: { group: 'Writing options', useAsTitle: 'name', description: 'Options for "Topic" on a post. These are the filter chips on /writing' },
  hooks: { afterChange: [revalidateContent], afterDelete: [revalidateContent] },
  defaultSort: 'name',
  fields: [{ name: 'name', type: 'text', required: true, unique: true }],
}

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  labels: { singular: 'Technology', plural: 'Technologies' },
  admin: { group, useAsTitle: 'name', description: 'Options for "Stack" on a project, e.g. "React Native"' },
  hooks: { afterChange: [revalidateContent], afterDelete: [revalidateContent] },
  defaultSort: 'name',
  fields: [{ name: 'name', type: 'text', required: true, unique: true }],
}

export const Statuses: CollectionConfig = {
  slug: 'statuses',
  labels: { singular: 'Status', plural: 'Statuses' },
  admin: { group, useAsTitle: 'label', defaultColumns: ['label', 'live'], description: 'Options for "Status" on a project, e.g. "Live · App Store"' },
  hooks: { afterChange: [revalidateContent], afterDelete: [revalidateContent] },
  defaultSort: 'label',
  fields: [
    { name: 'label', type: 'text', required: true, unique: true },
    { name: 'live', type: 'checkbox', defaultValue: false, admin: { description: 'Shows the green/accent dot next to the status' } },
  ],
}
