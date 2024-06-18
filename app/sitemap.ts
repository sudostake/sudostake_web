import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sudostake.com',
      lastModified: new Date()
    },
    {
      url: 'https://sudostake.com/liquidity_requests',
      lastModified: new Date()
    },
    {
      url: 'https://sudostake.com/governance',
      lastModified: new Date()
    },
  ]
}