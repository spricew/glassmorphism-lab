import { $, $$ } from "../lib/utils.js";
import { bgUrl } from "../lib/backgrounds.js";
import { state, UI } from "../lib/state.js";
import type { SegKey } from "../lib/state.js";
import { eff, styleGL } from "../lib/glass.js";
import { panelHTML } from "./panels.js";
import { styleSteps } from "./steps.js";
import { genCSS, hilite } from "../lib/code.js";

export function render(): void {
  const p = eff(),
    dark = state.mode === "dark",
    L = state.layers,
    naive = state.view === "naive" || state.hold;
  document.documentElement.style.setProperty("--bgimg", bgUrl(state.bg));
  $("#bg").classList.toggle("still", !state.animate);

  const panel = $("#panel"),
    bar = $("#bar");
  styleGL(panel, p, dark, false);
  styleGL(bar, p, dark, true);
  bar.hidden = !state.bar;
  $(".gl-content", panel).innerHTML = panelHTML(
    naive
      ? "Solo blur"
      : state.material === "custom"
        ? "Personalizado"
        : state.material,
    dark ? "Apariencia oscura" : "Apariencia clara",
    [
      ["Desenfoque", p.blur + " px"],
      ["Saturación", p.sat + " %"],
      ["Tinte", Math.round(p.tint) + " %"],
    ],
    "Arrastra el panel sobre el fondo",
  );
  $("#matName").textContent =
    state.material === "custom" ? "personalizado" : state.material;
  $("#chipState").textContent = naive ? "Solo blur" : "Receta completa";
  const hold = $("#hold");
  hold.setAttribute("aria-pressed", state.hold ? "true" : "false");
  hold.textContent = state.hold
    ? "Mostrando solo blur"
    : "Mantén para ver solo blur";

  /* inspector */
  UI.gFill.forEach(function (f) {
    const rg = $<HTMLInputElement>("#rg-" + f.k);
    rg.value = String(L[f.k].v);
    rg.setAttribute("aria-valuetext", L[f.k].v + f.unit);
    $("#val-" + f.k).textContent = L[f.k].v + f.unit;
  });
  const rad = $<HTMLInputElement>("#rg-radius");
  rad.value = String(state.radius);
  rad.setAttribute("aria-valuetext", state.radius + " px");
  $("#val-radius").textContent = state.radius + " px";
  (Object.keys(L) as Array<keyof typeof L>).forEach(function (k) {
    const cb = $<HTMLInputElement>("#on-" + k);
    cb.checked = !!L[k].on;
    const row = cb.closest<HTMLElement>(".layer");
    if (row) row.dataset.on = L[k].on ? "true" : "false";
  });
  $<HTMLInputElement>("#animate").checked = state.animate;
  $<HTMLInputElement>("#showbar").checked = state.bar;
  $$<HTMLElement>(".seg").forEach(function (sg) {
    const key = sg.dataset.seg as SegKey;
    const btns = $$<HTMLButtonElement>('button[role="radio"]', sg);
    let current = -1;
    btns.forEach(function (b, i) {
      if (String(state[key]) === b.dataset.v) current = i;
    });
    btns.forEach(function (b, i) {
      const on = i === current || (current < 0 && i === 0);
      b.setAttribute("aria-checked", String(i === current));
      b.tabIndex = on ? 0 : -1;
    });
  });

  /* pasos */
  styleSteps(dark);

  /* código (de la receta real, no de la vista naive) */
  $("#code").innerHTML = hilite(genCSS(p, dark));
}