import { $, $$ } from "../lib/utils.js";
import { bgUrl } from "../lib/backgrounds.js";
import type { AppState, Effect, Material, SegKey } from "../lib/material.js";
import { panelHTML } from "./panels.js";
import { styleSteps } from "./steps.js";
import { hilite } from "../lib/hilite.js";

function currentSeg(state: AppState, key: SegKey): string {
  switch (key) {
    case "mode":
      return state.mode;
    case "material":
      return state.presetId;
    case "bg":
      return state.bg;
    case "view":
      return state.view;
  }
}

export function render<E extends Effect>(mat: Material<E>): void {
  const state = mat.state;
  const p = mat.buildEffect();
  const dark = state.mode === "dark";
  const L = state.layers;
  const naive = state.view === "naive" || state.hold;
  document.documentElement.style.setProperty("--bgimg", bgUrl(state.bg));
  $("#bg").classList.toggle("still", !state.animate);

  const panel = $("#panel");
  const bar = $("#bar");
  mat.apply(panel, p, dark, false);
  mat.apply(bar, p, dark, true);
  bar.hidden = !state.bar;
  $(".gl-content", panel).innerHTML = panelHTML(
    naive
      ? "Solo blur"
      : state.presetId === "custom"
        ? "Personalizado"
        : state.presetId,
    dark ? "Apariencia oscura" : "Apariencia clara",
    mat.panelRows(p, dark),
    "Arrastra el panel sobre el fondo",
  );
  $("#matName").textContent =
    state.presetId === "custom" ? "personalizado" : state.presetId;
  $("#chipState").textContent = naive ? "Solo blur" : "Receta completa";
  const hold = $("#hold");
  hold.setAttribute("aria-pressed", state.hold ? "true" : "false");
  hold.textContent = state.hold
    ? "Mostrando solo blur"
    : "Mantén para ver solo blur";

  /* inspector */
  mat.inspectorGroups
    .flatMap(function (g) {
      return g.items;
    })
    .filter(function (f) {
      return f.min !== undefined;
    })
    .forEach(function (f) {
      const rg = $<HTMLInputElement>("#rg-" + f.k);
      const v = L[f.k].v ?? 0;
      rg.value = String(v);
      rg.setAttribute("aria-valuetext", v + (f.unit ?? ""));
      $("#val-" + f.k).textContent = v + (f.unit ?? "");
    });
  const rad = $<HTMLInputElement>("#rg-radius");
  rad.value = String(state.radius);
  rad.setAttribute("aria-valuetext", state.radius + " px");
  $("#val-radius").textContent = state.radius + " px";
  Object.keys(L).forEach(function (k) {
    const cb = $<HTMLInputElement>("#on-" + k);
    if (!cb) return;
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
      if (currentSeg(state, key) === b.dataset.v) current = i;
    });
    btns.forEach(function (b, i) {
      const on = i === current || (current < 0 && i === 0);
      b.setAttribute("aria-checked", String(i === current));
      b.tabIndex = on ? 0 : -1;
    });
  });

  /* pasos */
  styleSteps(mat, dark);

  /* código (de la receta real, no de la vista naive) */
  $("#code").innerHTML = hilite(mat.genCSS(p, dark));
}
