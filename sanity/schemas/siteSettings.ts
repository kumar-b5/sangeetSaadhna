import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Site title',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      type: 'text',
      title: 'Tagline',
      rows: 2,
    }),
    defineField({
      name: 'primaryEmail',
      type: 'string',
      title: 'Primary email',
    }),
    defineField({
      name: 'contactPhone',
      type: 'string',
      title: 'Contact phone',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location description',
    }),
    defineField({
      name: 'mapLink',
      type: 'url',
      title: 'Google Maps link',
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social links',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'donationOptions',
      type: 'array',
      title: 'Donation options',
      of: [{ type: 'donationOption' }],
    }),
    defineField({
      name: 'newsletterCta',
      type: 'ctaBlock',
      title: 'Newsletter CTA',
    }),
    defineField({
      name: 'heroVideoUrl',
      type: 'url',
      title: 'Hero background video (YouTube)',
    }),
    defineField({
      name: 'defaultSeoImage',
      type: 'image',
      title: 'Default share image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
    },
  },
});
