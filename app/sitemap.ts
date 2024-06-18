import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.sudostake.com',
      lastModified: new Date()
    },
    {
      url: 'https://www.sudostake.com/liquidity_requests',
      lastModified: new Date()
    },
    {
      url: 'https://www.sudostake.com/governance',
      lastModified: new Date()
    },
  ]
}