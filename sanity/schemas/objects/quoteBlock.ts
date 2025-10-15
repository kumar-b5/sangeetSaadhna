import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'quoteBlock',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'attribution',
      type: 'string',
      title: 'Attribution',
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role / Relation',
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      subtitle: 'attribution',
    },
    prepare({ title, subtitle }: any) {
      return {
        title: title?.slice(0, 80) ?? 'Quote',
        subtitle: subtitle,
      };
    },
  },
});

