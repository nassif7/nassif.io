import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: Rule => Rule.required() }),
    defineField({ name: 'type', type: 'string' }),
    defineField({ name: 'desc', type: 'text', rows: 2 }),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'stack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{
        type: 'object',
        name: 'projectLink',
        fields: [
          defineField({
            name: 'platform',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
              list: [
                { title: 'Website', value: 'Website' },
                { title: 'App Store', value: 'App Store' },
                { title: 'Google Play', value: 'Google Play' },
                { title: 'Chrome Web Store', value: 'Chrome Web Store' },
                { title: 'VS Code Marketplace', value: 'VS Code Marketplace' },
                { title: 'GitHub', value: 'GitHub' },
                { title: 'npm', value: 'npm' },
              ],
            },
          }),
          defineField({ name: 'url', type: 'url' }),
          defineField({ name: 'comingSoon', type: 'boolean', initialValue: false }),
        ],
        preview: {
          select: { title: 'platform', subtitle: 'url' },
        },
      }],
    }),
    defineField({ name: 'privacyPolicy', type: 'url', title: 'Privacy Policy URL' }),
    defineField({ name: 'wip', type: 'boolean', initialValue: false }),
    defineField({ name: 'brainstorm', type: 'boolean', initialValue: false }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
  ],
})
