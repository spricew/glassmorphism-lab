import { getDict, type Lang } from "./i18n.js";

export interface FaqItem {
  q: string;
  a: string;
}

export interface TryItem {
  t: string;
  d: string;
}

export function faq(lang: Lang): FaqItem[] {
  return getDict(lang).faq;
}

export function tries(lang: Lang): TryItem[] {
  return getDict(lang).tries;
}

export interface BuildLdInput {
  canonical: string;
  ogImage: string;
  lang: Lang;
}

/* datos estructurados de schema.org; la FAQ se arma desde la misma lista que ve el usuario */
export function buildLd({
  canonical,
  ogImage,
  lang,
}: BuildLdInput): Record<string, unknown> {
  const d = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonical}#website`,
        url: canonical,
        name: "Glassmorphism Lab",
        inLanguage: lang,
        publisher: { "@id": `${canonical}#author` },
        about: { "@id": `${canonical}#app` },
      },
      {
        "@type": "Person",
        "@id": `${canonical}#author`,
        name: "spricew",
        url: "https://github.com/spricew",
        sameAs: ["https://github.com/spricew/glassmorphism-lab"],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${canonical}#app`,
        name: "Glassmorphism Lab",
        url: canonical,
        image: ogImage,
        screenshot: ogImage,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        browserRequirements: d.ld.browserRequirements,
        inLanguage: lang,
        author: { "@id": `${canonical}#author` },
        description: d.ld.appDescription,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      },
      {
        "@type": "HowTo",
        "@id": `${canonical}#howto`,
        name: d.ld.howToName,
        inLanguage: lang,
        description: d.ld.howToDescription,
        step: d.ld.howToSteps.map((s) => ({
          "@type": "HowToStep",
          name: s.name,
          text: s.text,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        inLanguage: lang,
        mainEntity: d.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
