import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      title: 'Platform',
      validation: (rule: any) => rule.required(),
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Email', value: 'email' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (rule: any) => rule.required().uri({ allowRelative: false }),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'platform',
    },
  },
});

