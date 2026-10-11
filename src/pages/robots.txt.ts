import type { APIRoute } from 'astro';
import { business } from '../data/business';
export const GET: APIRoute = () => new Response(import.meta.env.PUBLIC_INDEXABLE === 'false' ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${business.site}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
