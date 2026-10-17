import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site, url }) => {
  const base = import.meta.env.BASE_URL;
  const origin = site ?? new URL(url.origin);
  const es = new URL(base, origin).href;
  const en = new URL(base + "en/", origin).href;
  const lastmod = new Date().toISOString();

  const entry = (loc: string, priority: string) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${es}"/>
  </url>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entry(es, "1.0")}
${entry(en, "0.9")}
</urlset>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
