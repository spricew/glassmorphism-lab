export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "es";

export interface FaqEntry {
  q: string;
  a: string;
}

export interface TryEntry {
  t: string;
  d: string;
}

export interface StepText {
  t: string;
  d: string;
}

/**
 * Español (idioma principal). Es la fuente de verdad del diccionario:
 * el resto de idiomas se tipan a partir de esta forma con `typeof es`.
 */
const es = {
  code: "es",
  short: "ES",
  name: "Español",
  ogLocale: "es_ES",

  a11y: {
    skip: "Saltar al contenido",
    nav: "Navegación principal",
    github: "Abrir el proyecto en GitHub (se abre en una pestaña nueva)",
    langSwitch: "Cambiar a inglés",
  },

  home: {
    title: "Glassmorphism Lab · desglose del backdrop-filter de iOS",
    description:
      "Laboratorio del vidrio esmerilado (frosted glass) de iOS: apila backdrop-filter, saturación, tinte, borde y brillo capa por capa y mira cómo cambia cada paso.",
    ogAlt:
      "Panel de vidrio esmerilado de Glassmorphism Lab sobre un fondo de mosaico con formas y colores vivos.",
    eyebrow: "Material translúcido clásico · iOS 7 a iOS 18",
    lede: "El vidrio esmerilado de Apple es una pila de capas, no un blur. Arrastra el panel sobre el fondo, apaga las capas una por una y mira qué se pierde.",
  },

  notFound: {
    title: "Página no encontrada · Glassmorphism Lab",
    description:
      "No encontramos esta página. Vuelve al laboratorio para desglosar el vidrio esmerilado de iOS capa por capa.",
    eyebrow: "Error 404",
    heading: "Esta página se desvaneció",
    lede: "No encontramos lo que buscabas. Puede que el enlace esté roto o que el panel se haya movido de sitio.",
    back: "Volver al laboratorio",
  },

  footer: {
    madeBy: "Hecho por",
    github:
      "Abrir el perfil de spricew en GitHub (se abre en una pestaña nueva)",
  },

  lab: {
    region: "Laboratorio",
    chipFull: "Receta completa",
    chipNaive: "Solo blur",
    hold: "Mantén para ver solo blur",
    holdActive: "Mostrando solo blur",
    panelHint:
      "Puedes mover el panel con las teclas de flecha cuando está enfocado.",
    panel: "Panel de vidrio arrastrable",
    panelTitleCustom: "Personalizado",
    panelDark: "Apariencia oscura",
    panelLight: "Apariencia clara",
    panelFoot: "Arrastra el panel sobre el fondo",
    matNameCustom: "personalizado",
  },

  stage: {
    bg: "Fondo",
    bgOptions: {
      mosaic: "Mosaico",
      sunset: "Paisaje",
      feed: "App",
      lake: "Lago",
      forest: "Bosque",
    } as Record<string, string>,
    animate: "Mover el fondo",
    bar: "Barra de pestañas",
  },

  inspector: {
    title: "Capas del material",
    appearance: "Apariencia",
    thickness: "Grosor",
    view: "Vista",
    modeOptions: { light: "Claro", dark: "Oscuro" } as Record<string, string>,
    viewOptions: {
      full: "Receta completa",
      naive: "Solo blur",
    } as Record<string, string>,
    groups: {
      gFill: "Relleno",
      gFinish: "Acabado",
      gShape: "Forma",
      gText: "Texto",
    } as Record<string, string>,
    layers: {
      blur: { name: "Desenfoque", hint: "Gaussiano sobre lo que hay detrás." },
      sat: {
        name: "Saturación",
        hint: "Devuelve el color que el blur apaga.",
      },
      tint: {
        name: "Tinte",
        hint: "Capa clara u oscura que fija el contraste.",
      },
      noise: { name: "Grano", hint: "Ruido fino contra el banding." },
      hair: {
        name: "Hairline de 0,5 px",
        hint: "Canto casi invisible que separa el panel del fondo.",
      },
      hl: {
        name: "Brillo interior",
        hint: "Luz en el borde superior que sugiere grosor.",
      },
      shadow: {
        name: "Sombra en capas",
        hint: "Una difusa y una cercana, ambas de baja opacidad.",
      },
      sq: {
        name: "Esquinas continuas",
        hint: "La curva se funde con el lado recto, sin arco circular.",
      },
      vib: {
        name: "Vibrancy",
        hint: "Las etiquetas se mezclan con el fondo en lugar de ser gris plano.",
      },
    } as Record<string, { name: string; hint: string }>,
    radius: "Radio de esquina",
    sqNoSupport:
      " Tu navegador no soporta <code>corner-shape</code>, así que aquí se ve con arco circular.",
  },

  css: {
    eyebrow: "CSS resultante",
    copy: "Copiar CSS",
    copied: "Copiado",
    copyManual: "Selecciona y copia",
    copiedOk: "CSS copiado al portapapeles",
    copiedFail:
      "No se pudo copiar automáticamente; el CSS quedó seleccionado",
    comments: {
      noBackdrop: "  /* sin backdrop-filter */",
      squircle:
        "  corner-shape: squircle; /* si no hay soporte, queda el radio */",
      grain: ".glass::after { /* grano */",
      vibrancy:
        ".glass .content { /* vibrancy: vive fuera del elemento con backdrop-filter */",
    },
  },

  build: {
    title: "Construcción capa por capa",
    lede: "El mismo panel sumando una capa por celda. Usa la apariencia y el fondo que elegiste arriba, así puedes ver cómo cambia cada paso según lo que hay detrás.",
    tryTitle: "Cosas para probar",
    faqTitle: "Preguntas frecuentes",
  },

  panel: {
    title: "Panel",
    sub: "iOS 7 → 18",
    rows: [
      ["Desenfoque", "24 px"],
      ["Saturación", "180 %"],
    ] as Array<[string, string]>,
    foot: "",
    rowBlur: "Desenfoque",
    rowSat: "Saturación",
    rowTint: "Tinte",
  },

  steps: [
    {
      t: "Original",
      d: "Sin material. El texto compite con el fondo y casi no se lee.",
    },
    {
      t: "Desenfoque",
      d: "Gaussiano de 24 px. Quita el detalle, pero el resultado queda gris y lavado.",
    },
    {
      t: "Saturación 180 %",
      d: "El blur mezcla colores vecinos y los desatura. Subir la saturación devuelve la vida.",
    },
    {
      t: "Tinte",
      d: "Una capa clara (u oscura) fija el contraste base y hace legible el texto.",
    },
    {
      t: "Grano",
      d: "Ruido fino que rompe el banding de los degradados difuminados.",
    },
    {
      t: "Borde y brillo",
      d: "Hairline de 0,5 px y una línea de luz en el canto superior.",
    },
    {
      t: "Sombra y esquinas",
      d: "Sombra en dos capas y esquinas continuas en lugar de arco circular.",
    },
    {
      t: "Vibrancy",
      d: "El texto se mezcla con el fondo (multiply en claro, plus-lighter en oscuro) y toma su color.",
    },
  ] as StepText[],

  tabs: ["Fotos", "Álbumes", "Buscar", "Ajustes"],

  bg: {
    feed: {
      today: "Hoy",
      date: "jueves 8 de octubre",
      cards: [
        ["Oaxaca", "3 días · 124 fotos"],
        ["Coyoacán", "Sábado · 6 p. m."],
        ["Tren Maya", "Salida 07:40"],
      ] as Array<[string, string]>,
      rows: [
        ["Mensajes", "Ana: ¿nos vemos a las 6?"],
        ["Recordatorios", "Comprar boletos de tren"],
        ["Fotos", "124 nuevas de Oaxaca"],
        ["Notas", "Ideas para el viaje"],
        ["Mapas", "Ruta a Coyoacán · 24 min"],
      ] as Array<[string, string]>,
    },
  },

  tries: [
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
  ] as TryEntry[],

  faq: [
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
  ] as FaqEntry[],

  ld: {
    appName: "Glassmorphism Lab",
    appDescription:
      "Glassmorphism Lab es un laboratorio interactivo para desglosar el vidrio esmerilado (frosted glass) de iOS capa por capa: backdrop-filter, saturación, tinte, borde y brillo.",
    browserRequirements: "Requiere JavaScript",
    howToName: "Cómo recrear el vidrio esmerilado de iOS con CSS",
    howToDescription:
      "Reconstruye el material translúcido de iOS apilando capas de CSS y ajustando cada una hasta obtener el efecto deseado.",
    howToSteps: [
      {
        name: "Aplica el desenfoque",
        text: "Usa backdrop-filter: blur() para difuminar lo que hay detrás del panel.",
      },
      {
        name: "Añade saturación",
        text: "Combinar blur() con saturate() evita que el color de fondo se vuelva gris apagado.",
      },
      {
        name: "Aplica el tinte",
        text: "Añade un relleno translúcido con background-color en rgba para garantizar el contraste del texto.",
      },
      {
        name: "Remata con borde y brillo",
        text: "Un borde sutil y un brillo interior definen el canto del panel para que se lea como un objeto.",
      },
    ],
  },
};

/** Inglés. Debe cubrir exactamente la misma forma que `es`. */
const en: typeof es = {
  code: "en",
  short: "EN",
  name: "English",
  ogLocale: "en_US",

  a11y: {
    skip: "Skip to content",
    nav: "Main navigation",
    github: "Open the project on GitHub (opens in a new tab)",
    langSwitch: "Switch to Spanish",
  },

  home: {
    title: "Glassmorphism Lab · breaking down iOS backdrop-filter",
    description:
      "An iOS frosted glass lab: stack backdrop-filter, saturation, tint, border and highlight layer by layer, and watch how each step changes the result.",
    ogAlt:
      "Glassmorphism Lab's frosted glass panel over a mosaic background with vivid shapes and colors.",
    eyebrow: "Classic translucent material · iOS 7 to iOS 18",
    lede: "Apple's frosted glass is a stack of layers, not a blur. Drag the panel over the background, turn the layers off one by one, and watch what gets lost.",
  },

  notFound: {
    title: "Page not found · Glassmorphism Lab",
    description:
      "We couldn't find this page. Head back to the lab to break down iOS frosted glass layer by layer.",
    eyebrow: "Error 404",
    heading: "This page faded away",
    lede: "We couldn't find what you were looking for. The link may be broken, or the panel may have moved.",
    back: "Back to the lab",
  },

  footer: {
    madeBy: "Made by",
    github: "Open spricew's profile on GitHub (opens in a new tab)",
  },

  lab: {
    region: "Lab",
    chipFull: "Full recipe",
    chipNaive: "Blur only",
    hold: "Hold to see blur only",
    holdActive: "Showing blur only",
    panelHint: "You can move the panel with the arrow keys when it is focused.",
    panel: "Draggable glass panel",
    panelTitleCustom: "Custom",
    panelDark: "Dark appearance",
    panelLight: "Light appearance",
    panelFoot: "Drag the panel over the background",
    matNameCustom: "custom",
  },

  stage: {
    bg: "Background",
    bgOptions: {
      mosaic: "Mosaic",
      sunset: "Landscape",
      feed: "App",
      lake: "Lake",
      forest: "Forest",
    } as Record<string, string>,
    animate: "Animate the background",
    bar: "Tab bar",
  },

  inspector: {
    title: "Material layers",
    appearance: "Appearance",
    thickness: "Thickness",
    view: "View",
    modeOptions: { light: "Light", dark: "Dark" } as Record<string, string>,
    viewOptions: {
      full: "Full recipe",
      naive: "Blur only",
    } as Record<string, string>,
    groups: {
      gFill: "Fill",
      gFinish: "Finish",
      gShape: "Shape",
      gText: "Text",
    } as Record<string, string>,
    layers: {
      blur: { name: "Blur", hint: "Gaussian blur on what lies behind." },
      sat: {
        name: "Saturation",
        hint: "Brings back the color the blur washes out.",
      },
      tint: {
        name: "Tint",
        hint: "A light or dark layer that locks in contrast.",
      },
      noise: { name: "Grain", hint: "Fine noise to fight banding." },
      hair: {
        name: "0.5 px hairline",
        hint: "A barely visible edge that separates the panel from the background.",
      },
      hl: {
        name: "Inner highlight",
        hint: "Light along the top edge that hints at thickness.",
      },
      shadow: {
        name: "Layered shadow",
        hint: "One soft and one close, both at low opacity.",
      },
      sq: {
        name: "Continuous corners",
        hint: "The curve blends into the straight side, with no circular arc.",
      },
      vib: {
        name: "Vibrancy",
        hint: "Labels blend with the background instead of staying flat gray.",
      },
    } as Record<string, { name: string; hint: string }>,
    radius: "Corner radius",
    sqNoSupport:
      " Your browser doesn't support <code>corner-shape</code>, so here it renders with a circular arc.",
  },

  css: {
    eyebrow: "Resulting CSS",
    copy: "Copy CSS",
    copied: "Copied",
    copyManual: "Select and copy",
    copiedOk: "CSS copied to clipboard",
    copiedFail: "Couldn't copy automatically; the CSS was selected instead",
    comments: {
      noBackdrop: "  /* no backdrop-filter */",
      squircle:
        "  corner-shape: squircle; /* falls back to the radius without support */",
      grain: ".glass::after { /* grain */",
      vibrancy:
        ".glass .content { /* vibrancy: lives outside the backdrop-filter element */",
    },
  },

  build: {
    title: "Built layer by layer",
    lede: "The same panel adding one layer per cell. It uses the appearance and background you picked above, so you can see how each step changes with what's behind it.",
    tryTitle: "Things to try",
    faqTitle: "Frequently asked questions",
  },

  panel: {
    title: "Panel",
    sub: "iOS 7 → 18",
    rows: [
      ["Blur", "24 px"],
      ["Saturation", "180 %"],
    ] as Array<[string, string]>,
    foot: "",
    rowBlur: "Blur",
    rowSat: "Saturation",
    rowTint: "Tint",
  },

  steps: [
    {
      t: "Original",
      d: "No material. The text competes with the background and is barely readable.",
    },
    {
      t: "Blur",
      d: "A 24 px gaussian. It strips the detail, but the result looks gray and washed out.",
    },
    {
      t: "180 % saturation",
      d: "The blur mixes neighboring colors and desaturates them. Raising saturation brings it back to life.",
    },
    {
      t: "Tint",
      d: "A light (or dark) layer locks in the base contrast and makes the text readable.",
    },
    {
      t: "Grain",
      d: "Fine noise that breaks the banding of blurred gradients.",
    },
    {
      t: "Border and highlight",
      d: "A 0.5 px hairline and a line of light along the top edge.",
    },
    {
      t: "Shadow and corners",
      d: "A two-layer shadow and continuous corners instead of a circular arc.",
    },
    {
      t: "Vibrancy",
      d: "The text blends with the background (multiply in light, plus-lighter in dark) and takes on its color.",
    },
  ] as StepText[],

  tabs: ["Photos", "Albums", "Search", "Settings"],

  bg: {
    feed: {
      today: "Today",
      date: "Thursday, October 8",
      cards: [
        ["Oaxaca", "3 days · 124 photos"],
        ["Coyoacán", "Saturday · 6 p.m."],
        ["Maya Train", "Departs 07:40"],
      ] as Array<[string, string]>,
      rows: [
        ["Messages", "Ana: see you at 6?"],
        ["Reminders", "Buy train tickets"],
        ["Photos", "124 new from Oaxaca"],
        ["Notes", "Trip ideas"],
        ["Maps", "Route to Coyoacán · 24 min"],
      ] as Array<[string, string]>,
    },
  },

  tries: [
    {
      t: "Turn saturation off in Landscape",
      d: "Without it the blur turns the sky a dull gray. At 180 % the sun's orange survives the blur.",
    },
    {
      t: "Drop the tint to zero in App",
      d: "The text behind stays almost readable through the glass. The tint isn't decoration; it's what guarantees contrast.",
    },
    {
      t: "Turn on Vibrancy in dark",
      d: "Labels stop being flat gray and take on the background's color. Easiest to see over Mosaic.",
    },
    {
      t: "Remove the border and highlight",
      d: "Each one weighs little on its own, but without them the panel loses its edge and reads as a smudge instead of an object.",
    },
  ] as TryEntry[],

  faq: [
    {
      q: "What is glassmorphism?",
      a: "It's a UI style that mimics frosted glass: translucent panels that blur what's behind them, with a subtle tint, a thin border and an inner highlight. Apple popularized it in iOS 7 and it's still present in iOS 18, macOS and visionOS.",
    },
    {
      q: "How do you create the frosted glass effect in CSS?",
      a: "With the backdrop-filter property. The minimal recipe is backdrop-filter: blur(24px) saturate(180%) plus a translucent background-color in rgba for the tint, and a 0.5 px border with an inner highlight to define the panel's edge.",
    },
    {
      q: "Which browsers support backdrop-filter?",
      a: "All modern browsers: Chrome, Edge, Safari (with the -webkit- prefix) and Firefox. In older browsers the panel shows without the blur, so make sure the tint alone guarantees text contrast in case the filter isn't applied.",
    },
    {
      q: "Why isn't my backdrop-filter showing?",
      a: "Almost always because of the stacking context. If an ancestor has transform, opacity below 1, filter or z-index, Chromium treats that element as the backdrop root and the blur stops seeing what's behind. Avoid those values in the panel's ancestor chain.",
    },
  ] as FaqEntry[],

  ld: {
    appName: "Glassmorphism Lab",
    appDescription:
      "Glassmorphism Lab is an interactive lab for breaking down iOS frosted glass layer by layer: backdrop-filter, saturation, tint, border and highlight.",
    browserRequirements: "Requires JavaScript",
    howToName: "How to recreate iOS frosted glass with CSS",
    howToDescription:
      "Rebuild iOS's translucent material by stacking CSS layers and tuning each one until you get the effect you want.",
    howToSteps: [
      {
        name: "Apply the blur",
        text: "Use backdrop-filter: blur() to blur what's behind the panel.",
      },
      {
        name: "Add saturation",
        text: "Combining blur() with saturate() keeps the background color from turning dull gray.",
      },
      {
        name: "Apply the tint",
        text: "Add a translucent fill with background-color in rgba to guarantee text contrast.",
      },
      {
        name: "Finish with border and highlight",
        text: "A subtle border and an inner highlight define the panel's edge so it reads as an object.",
      },
    ],
  },
};

export const dict: Record<Lang, typeof es> = { es, en };

export function getDict(lang: Lang): typeof es {
  return dict[lang];
}

export function isLang(value: string | undefined | null): value is Lang {
  return value === "es" || value === "en";
}

/** Idioma de la página a partir del `lang` del documento (solo cliente). */
export function currentLang(): Lang {
  if (typeof document === "undefined") return DEFAULT_LANG;
  const lang = document.documentElement.lang.trim().toLowerCase();
  return lang.startsWith("en") ? "en" : "es";
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}

/**
 * Ruta equivalente en el otro idioma, respetando el `base` del sitio.
 * `/glassmorphism-lab/` → `/glassmorphism-lab/en/` y viceversa.
 */
export function altLocalePath(
  pathname: string,
  base: string,
  to: Lang,
): string {
  const prefix = base.endsWith("/") ? base : base + "/";
  const relative = pathname.startsWith(prefix)
    ? pathname.slice(prefix.length)
    : pathname.replace(/^\//, "");
  const rest = relative.replace(/^en\//, "");
  return prefix + (to === DEFAULT_LANG ? "" : to + "/") + rest;
}
