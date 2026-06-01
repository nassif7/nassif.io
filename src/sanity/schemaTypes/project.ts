import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: Rule => Rule.required() }),
    defineField({ name: 'type', type: 'string' }),
    defineField({ name: 'num', type: 'string' }),
    defineField({ name: 'desc', type: 'text', rows: 2 }),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'stack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'link', type: 'url' }),
    defineField({ name: 'linkLabel', type: 'string' }),
    defineField({ name: 'appStoreLink', type: 'url' }),
    defineField({ name: 'androidComingSoon', type: 'boolean', initialValue: false }),
    defineField({ name: 'privacyPolicy', type: 'string' }),
    defineField({ name: 'wip', type: 'boolean', initialValue: false }),
    defineField({ name: 'brainstorm', type: 'boolean', initialValue: false }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
  ],
  orderings: [
    { title: 'Number', name: 'numAsc', by: [{ field: 'num', direction: 'asc' }] },
  ],
})
