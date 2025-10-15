import { createClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;
const apiVersion = import.meta.env.SANITY_API_VERSION || '2023-10-01';

if (!projectId || !dataset) {
  throw new Error('Missing Sanity project configuration. Check environment variables.');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: import.meta.env.SANITY_READ_TOKEN,
});
