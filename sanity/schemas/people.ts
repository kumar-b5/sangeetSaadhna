import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'person',
  type: 'document',
  title: 'Community Member / Team',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role / Title',
    }),
    defineField({
      name: 'bio',
      type: 'blockContent',
      title: 'Bio',
    }),
    defineField({
      name: 'headshot',
      type: 'image',
      title: 'Headshot',
      options: { hotspot: true },
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social / Contact links',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display order',
      description: 'Lower numbers appear first in team listings.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'headshot',
    },
  },
  orderings: [
    {
      title: 'Order Asc',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
