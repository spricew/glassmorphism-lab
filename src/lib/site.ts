export interface FaqItem {
  q: string;
  a: string;
}

export interface TryItem {
  t: string;
  d: string;
}

export const faq: FaqItem[] = [
  {
    q: "¿Qué es el glassmorphism?",
    a: "Es un estilo de interfaz que imita el vidrio esmerilado: paneles translúcidos que difuminan lo que hay detrás, con un tinte sutil, un borde fino y un brillo interior. Apple lo popularizó en iOS 7 y sigue presente en iOS 18, macOS y visionOS.",
  },
  {
    q: "¿Cómo se hace el efecto de vidrio esmerilado en CSS?",
    a: "Con la propiedad backdrop-filter. La receta mínima es backdrop-filter: blur(24px) saturate(180%) más un fondo translúcido con background-color en rgba para el tinte, y un borde de 0,5 px con un brillo interior para definir el canto del panel.",
  },
  {
    q: "¿Qué navegadores soportan backdrop-filter?",
    a: "Todos los navegadores modernos: Chrome, Edge, Safari (con el prefijo -webkit-) y Firefox. En navegadores antiguos el panel se muestra sin desenfoque, así que conviene garantizar el contraste del texto con el tinte por si el filtro no se aplica.",
  },
  {
    q: "¿Por qué mi backdrop-filter no se ve?",
    a: "Casi siempre por el contexto de apilamiento. Si un ancestro tiene transform, opacity menor que 1, filter o z-index, Chromium trata ese elemento como raíz del fondo y el blur deja de ver lo que hay detrás. Evita esos valores en la cadena de ancestros del panel.",
  },
];

export const tries: TryItem[] = [
  {
    t: "Apaga la saturación en Paisaje",
    d: "Sin ella el blur deja el cielo en un gris apagado. Con 180 % el naranja del sol sobrevive al difuminado.",
  },
  {
    t: "Baja el tinte a cero en App",
    d: "El texto de atrás sigue casi legible a través del vidrio. El tinte no es decoración, es lo que garantiza el contraste.",
  },
  {
    t: "Activa Vibrancy en oscuro",
    d: "Las etiquetas dejan de ser un gris plano y toman el color del fondo. Se aprecia mejor sobre Mosaico.",
  },
  {
    t: "Quita borde y brillo",
    d: "Cada uno pesa poco, pero sin ellos el panel pierde canto y se lee como una mancha en lugar de un objeto.",
  },
];

export interface BuildLdInput {
  canonical: string;
  ogImage: string;
}

/* datos estructurados de schema.org; la FAQ se arma desde la misma lista que ve el usuario */
export function buildLd({
  canonical,
  ogImage,
}: BuildLdInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonical}#website`,
        url: canonical,
        name: "Glassmorphism Lab",
        inLanguage: "es",
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
        browserRequirements: "Requiere JavaScript",
        inLanguage: "es",
        author: { "@id": `${canonical}#author` },
        description:
          "Glassmorphism Lab es un laboratorio interactivo para desglosar el vidrio esmerilado (frosted glass) de iOS capa por capa: backdrop-filter, saturación, tinte, borde y brillo.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      },
      {
        "@type": "HowTo",
        "@id": `${canonical}#howto`,
        name: "Cómo recrear el vidrio esmerilado de iOS con CSS",
        inLanguage: "es",
        description:
          "Reconstruye el material translúcido de iOS apilando capas de CSS y ajustando cada una hasta obtener el efecto deseado.",
        step: [
          {
            "@type": "HowToStep",
            name: "Aplica el desenfoque",
            text: "Usa backdrop-filter: blur() para difuminar lo que hay detrás del panel.",
          },
          {
            "@type": "HowToStep",
            name: "Añade saturación",
            text: "Combinar blur() con saturate() evita que el color de fondo se vuelva gris apagado.",
          },
          {
            "@type": "HowToStep",
            name: "Aplica el tinte",
            text: "Añade un relleno translúcido con background-color en rgba para garantizar el contraste del texto.",
          },
          {
            "@type": "HowToStep",
            name: "Remata con borde y brillo",
            text: "Un borde sutil y un brillo interior definen el canto del panel para que se lea como un objeto.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        inLanguage: "es",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
