import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site, url }) => {
  const base = import.meta.env.BASE_URL;
  const origin = site ?? new URL(url.origin);
  const icon = (file: string) => new URL(base + file, origin).href;
  const start = new URL(base, origin).href;

  const manifest = {
    name: "Glassmorphism Lab",
    short_name: "Glass Lab",
    description:
      "Laboratorio interactivo del vidrio esmerilado (frosted glass) de iOS, capa por capa.",
    lang: "es",
    start_url: start,
    scope: start,
    display: "standalone",
    background_color: "#0c0e12",
    theme_color: "#0c0e12",
    icons: [
      {
        src: icon("favicon-192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: icon("favicon-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: icon("favicon.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  });
};
