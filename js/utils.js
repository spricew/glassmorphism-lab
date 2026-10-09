export var $ = function (s, r) {
  return (r || document).querySelector(s);
};
export var $$ = function (s, r) {
  return Array.from((r || document).querySelectorAll(s));
};
export var SUPPORTS_SQ = !!(
  window.CSS &&
  CSS.supports &&
  CSS.supports("corner-shape", "squircle")
);
export var REDUCE =
  window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* grano: ruido gris generado una vez en un canvas */
export function initNoise() {
  try {
    var c = document.createElement("canvas");
    c.width = c.height = 128;
    var x = c.getContext("2d"),
      d = x.createImageData(128, 128),
      i,
      v;
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
  } catch (e) {}
}
