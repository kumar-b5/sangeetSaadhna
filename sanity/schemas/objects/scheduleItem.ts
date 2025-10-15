import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'scheduleItem',
  title: 'Schedule Item',
  type: 'object',
  fields: [
    defineField({
      name: 'startTime',
      type: 'string',
      title: 'Start time',
      description: 'Example: 6:30 PM',
    }),
    defineField({
      name: 'endTime',
      type: 'string',
      title: 'End time',
      description: 'Example: 8:00 PM',
    }),
    defineField({
      name: 'artist',
      type: 'string',
      title: 'Artist / Speaker',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role / Instrument',
    }),
    defineField({
      name: 'notes',
      type: 'text',
      title: 'Notes',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'artist',
      startTime: 'startTime',
      endTime: 'endTime',
    },
    prepare({ title, startTime, endTime }: any) {
      return {
        title,
        subtitle: [startTime, endTime].filter(Boolean).join(' – '),
      };
    },
  },
});

