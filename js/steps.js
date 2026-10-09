import { $, $$, SUPPORTS_SQ } from "./utils.js";
import { styleGL } from "./glass.js";
import { panelHTML, shell } from "./panels.js";

/* ---------- construcción paso a paso ---------- */
var BASE = {
  blur: 24,
  sat: 100,
  tint: 0,
  noise: 0,
  hair: false,
  hl: false,
  shadow: false,
  sq: false,
  vib: false,
  radius: 22,
};
function step(o) {
  return Object.assign({}, BASE, o);
}
var FILL = { sat: 180, tint: 56, noise: 14 };
var EDGED = { ...FILL, hair: true, hl: true };
var FRAMED = { ...EDGED, shadow: true, sq: SUPPORTS_SQ };
var STEPS = [
  {
    t: "Original",
    d: "Sin material. El texto compite con el fondo y casi no se lee.",
    p: step({ blur: 0 }),
  },
  {
    t: "Desenfoque",
    d: "Gaussiano de 24 px. Quita el detalle, pero el resultado queda gris y lavado.",
    p: step({}),
  },
  {
    t: "Saturación 180 %",
    d: "El blur mezcla colores vecinos y los desatura. Subir la saturación devuelve la vida.",
    p: step({ sat: 180 }),
  },
  {
    t: "Tinte",
    d: "Una capa clara (u oscura) fija el contraste base y hace legible el texto.",
    p: step({ sat: 180, tint: 56 }),
  },
  {
    t: "Grano",
    d: "Ruido fino que rompe el banding de los degradados difuminados.",
    p: step(FILL),
  },
  {
    t: "Borde y brillo",
    d: "Hairline de 0,5 px y una línea de luz en el canto superior.",
    p: step(EDGED),
  },
  {
    t: "Sombra y esquinas",
    d: "Sombra en dos capas y esquinas continuas en lugar de arco circular.",
    p: step(FRAMED),
  },
  {
    t: "Vibrancy",
    d: "El texto se mezcla con el fondo (multiply en claro, plus-lighter en oscuro) y toma su color.",
    p: step({ ...FRAMED, vib: true }),
  },
];
var stepsEl = $("#steps");
export function buildSteps() {
  stepsEl.innerHTML = STEPS.map(function (s, i) {
    return (
      `<article class="step"><div class="mini" data-i="${i}"><div class="gl">` +
      shell(
        panelHTML(
          "Panel",
          "iOS 7 → 18",
          [
            ["Desenfoque", "24 px"],
            ["Saturación", "180 %"],
          ],
          "",
        ),
      ) +
      "</div></div>" +
      `<div><h3><span>${i}</span>${s.t}</h3><p>${s.d}</p></div></article>`
    );
  }).join("");
}
export function styleSteps(dark) {
  $$(".mini", stepsEl).forEach(function (m) {
    var i = +m.dataset.i,
      g = $(".gl", m);
    styleGL(g, STEPS[i].p, dark, false);
  });
}
