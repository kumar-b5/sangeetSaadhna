import type { PortableTextBlock } from '@portabletext/types';
import { toHTML } from '@portabletext/to-html';

const components = {
  types: {
    ctaBlock: ({ value }: any) => {
      if (!value?.heading) return '';
      const button =
        value?.buttonLabel && value?.buttonHref
          ? `<p><a class="btn" href="${value.buttonHref}">${value.buttonLabel}</a></p>`
          : '';

      return `<div class="portable-cta"><h3>${value.heading}</h3>${
        value.body ? `<p>${value.body}</p>` : ''
      }${button}</div>`;
    },
    quoteBlock: ({ value }: any) => {
      const body = value?.quote ? `<p>${value.quote}</p>` : '';
      const attribution = value?.attribution
        ? `<footer>${value.attribution}${value.role ? `, <span>${value.role}</span>` : ''}</footer>`
        : '';
      return `<blockquote class="portable-quote">${body}${attribution}</blockquote>`;
    },
  },
  marks: {},
};

export const renderPortableText = (value: PortableTextBlock[] = []) =>
  toHTML(value, { components });

