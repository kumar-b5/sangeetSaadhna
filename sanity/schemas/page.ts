import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      type: 'string',
      title: 'Hero title',
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'text',
      title: 'Hero subtitle',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'showInNav',
      type: 'boolean',
      title: 'Show in navigation',
      initialValue: false,
    }),
    defineField({
      name: 'blocks',
      type: 'blockContent',
      title: 'Page content',
    }),
    defineField({
      name: 'cta',
      type: 'ctaBlock',
      title: 'Page call to action',
    }),
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO title',
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'SEO description',
      rows: 2,
    }),
    defineField({
      name: 'seoImage',
      type: 'image',
      title: 'SEO share image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'heroImage',
    },
  },
});
