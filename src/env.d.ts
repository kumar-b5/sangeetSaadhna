/// <reference path="../.astro/types.d.ts" />

declare module 'sanity' {
  export const defineConfig: (...args: any[]) => any;
  export const defineField: (...args: any[]) => any;
  export const defineType: (...args: any[]) => any;
  export const defineArrayMember: (...args: any[]) => any;
}

declare module 'sanity/structure' {
  export const structureTool: (...args: any[]) => any;
}

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID?: string;
  readonly SANITY_DATASET?: string;
  readonly SANITY_API_VERSION?: string;
  readonly SANITY_READ_TOKEN?: string;
  readonly FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly YOUTUBE_API_KEY?: string;
  readonly YOUTUBE_CHANNEL_ID?: string;
  readonly SENDGRID_API_KEY?: string;
  readonly RSVP_INBOX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
