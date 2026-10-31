import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL('/', siteUrl).href }, ...projects.map(project => ({ url: new URL(`/projects/${project.slug}`, siteUrl).href }))];
}
