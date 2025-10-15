import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaBlock',
  title: 'Call To Action',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'text',
      title: 'Body',
    }),
    defineField({
      name: 'buttonLabel',
      type: 'string',
      title: 'Button label',
    }),
    defineField({
      name: 'buttonHref',
      type: 'url',
      title: 'Button link',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'buttonLabel',
    },
  },
});

