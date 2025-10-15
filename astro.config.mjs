import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
  srcDir: './src',
  output: 'static',
  server: {
    port: 4321,
  },
  compressHTML: true,
});
