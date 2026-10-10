export const $ = <T extends Element = HTMLElement>(
  selector: string,
  root: Document | ParentNode = document,
): T => root.querySelector<T>(selector) as T;

export const $$ = <T extends Element = HTMLElement>(
  selector: string,
  root: Document | ParentNode = document,
): T[] => Array.from(root.querySelectorAll<T>(selector));

export const SUPPORTS_SQ = !!(
  window.CSS &&
  CSS.supports &&
  CSS.supports("corner-shape", "squircle")
);

export const REDUCE =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* grano: ruido gris generado una vez en un canvas */
export function initNoise(): void {
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const x = c.getContext("2d");
    if (!x) return;
    const d = x.createImageData(128, 128);
    let i: number;
    let v: number;
    /* grano neutro sin mix-blend-mode: puntos blancos o negros con alfa aleatorio, promedio ~0 */
    for (i = 0; i < d.data.length; i += 4) {
      v = Math.random() * 255;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v > 127.5 ? 255 : 0;
      d.data[i + 3] = Math.abs(v - 127.5) * 2;
    }
    x.putImageData(d, 0, 0);
    document.documentElement.style.setProperty(
      "--noise-img",
      "url(" + c.toDataURL() + ")",
    );
  } catch {
    /* el grano es decorativo; sin canvas el material sigue funcionando */
  }
}