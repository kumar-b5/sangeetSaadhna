export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  tagline,
  primaryEmail,
  contactPhone,
  location,
  mapLink,
  socialLinks,
  donationOptions[]{
    title,
    description,
    link,
    "qrCode": qrCode.asset->url
  },
  newsletterCta,
  heroVideoUrl,
  "defaultSeoImage": defaultSeoImage.asset->url
}`;

export const navigationPagesQuery = `*[_type == "page" && showInNav == true] | order(order asc, title asc){
  title,
  "slug": slug.current
}`;

export const upcomingEventsQuery = `*[_type == "event" && dateTime(startDate) >= now()] | order(dateTime(startDate) asc){
  title,
  "slug": slug.current,
  startDate,
  endDate,
  location,
  shortDescription,
  isFeatured,
  isMonthlyProgram,
  categories,
  heroImage{
    asset->{
      url,
      metadata { lqip, dimensions }
    }
  }
}`;

export const pastEventsQuery = `*[_type == "event" && dateTime(startDate) < now()] | order(dateTime(startDate) desc){
  title,
  "slug": slug.current,
  startDate,
  endDate,
  location,
  shortDescription,
  youtubeUrl,
  categories,
  heroImage{
    asset->{
      url,
      metadata { lqip, dimensions }
    }
  }
}`;

export const eventBySlugQuery = `*[_type == "event" && slug.current == $slug][0]{
  title,
  startDate,
  endDate,
  location,
  shortDescription,
  body,
  schedule,
  youtubeUrl,
  gallery[]{
    asset->{
      url,
      metadata { lqip, dimensions }
    },
    caption
  },
  categories,
  isMonthlyProgram,
  heroImage{
    asset->{
      url,
      metadata { lqip, dimensions }
    }
  },
  seoTitle,
  seoDescription
}`;

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  heroTitle,
  heroSubtitle,
  heroImage{
    asset->{
      url,
      metadata { lqip, dimensions }
    }
  },
  blocks,
  cta,
  seoTitle,
  seoDescription,
  "seoImage": seoImage.asset->url
}`;
