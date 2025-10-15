import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  type: 'document',
  title: 'Event',
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
      name: 'shortDescription',
      type: 'text',
      title: 'Short description',
      rows: 3,
    }),
    defineField({
      name: 'startDate',
      type: 'datetime',
      title: 'Start date & time',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'End date & time',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Event details',
    }),
    defineField({
      name: 'schedule',
      type: 'array',
      title: 'Program schedule',
      of: [{ type: 'scheduleItem' }],
    }),
    defineField({
      name: 'youtubeUrl',
      type: 'url',
      title: 'YouTube recording',
      description: 'Link to the event recording on YouTube.',
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'Monthly Program', value: 'monthly-program' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Special', value: 'special' },
        ],
      },
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Feature on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'isMonthlyProgram',
      type: 'boolean',
      title: 'Monthly program',
      description: 'Highlight as the current monthly baithak.',
      initialValue: false,
    }),
    defineField({
      name: 'cta',
      type: 'ctaBlock',
      title: 'Call to action',
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
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      startDate: 'startDate',
    },
    prepare({ title, media, startDate }: any) {
      return {
        title,
        subtitle: startDate ? new Date(startDate).toLocaleString() : undefined,
        media,
      };
    },
  },
});
