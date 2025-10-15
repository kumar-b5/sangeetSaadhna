import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import schemas from './schemas';

export default defineConfig({
  name: 'default',
  title: 'SangeetSaadhna',
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  schema: {
    types: schemas,
  },
  plugins: [structureTool()],
});

