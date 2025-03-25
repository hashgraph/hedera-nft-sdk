import { z } from 'zod';

const socialLinkSchema = z.object({
  url: z.string(),
  label: z.string(),
  info: z.string().optional(),
});

export const CollectionMetadataSchema = z.object({
  description: z.string().max(500).optional(),
  creator: z.string().optional(),
  creatorDID: z.string().optional(),
  admin: z.string().optional(),
  website: z.string().optional(),
  whitepaper: z.string().optional(),
  discussion: z.string().optional(),
  properties: z.record(z.any()).optional(),
  socials: z.array(socialLinkSchema).optional(),
  lightLogo: z.string().optional(),
  lightLogoType: z.string().optional(),
  lightBanner: z.string().optional(),
  lightBannerType: z.string().optional(),
  lightFeaturedImage: z.string().optional(),
  lightFeaturedImageType: z.string().optional(),
  darkLogo: z.string().optional(),
  darkLogoType: z.string().optional(),
  darkBanner: z.string().optional(),
  darkBannerType: z.string().optional(),
  darkFeaturedImage: z.string().optional(),
  darkFeaturedImageType: z.string().optional(),
});
