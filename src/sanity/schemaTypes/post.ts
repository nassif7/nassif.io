import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'date', type: 'date', validation: Rule => Rule.required() }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'collections', type: 'array', of: [{ type: 'reference', to: [{ type: 'collection' }] }] }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'hidden', type: 'boolean', initialValue: false }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
  ],
  orderings: [
    { title: 'Date, newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
})
