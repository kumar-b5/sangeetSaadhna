import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'donationOption',
  title: 'Donation Option',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Link / Payment URL',
    }),
    defineField({
      name: 'qrCode',
      type: 'image',
      title: 'QR code',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'link',
      media: 'qrCode',
    },
  },
});

