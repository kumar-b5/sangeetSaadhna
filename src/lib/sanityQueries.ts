import { sanityClient } from './sanityClient';

import {
  eventBySlugQuery,
  navigationPagesQuery,
  pageBySlugQuery,
  pastEventsQuery,
  siteSettingsQuery,
  upcomingEventsQuery,
} from '../../sanity/queries';

export const fetchSiteSettings = async () =>
  sanityClient.fetch(siteSettingsQuery);

export const fetchNavigationPages = async () =>
  sanityClient.fetch(navigationPagesQuery);

export const fetchUpcomingEvents = async () =>
  sanityClient.fetch(upcomingEventsQuery);

export const fetchPastEvents = async () =>
  sanityClient.fetch(pastEventsQuery);

export const fetchEventBySlug = async (slug: string) =>
  sanityClient.fetch(eventBySlugQuery, { slug });

export const fetchPageBySlug = async (slug: string) =>
  sanityClient.fetch(pageBySlugQuery, { slug });

