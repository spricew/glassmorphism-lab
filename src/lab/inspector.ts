import { $, SUPPORTS_SQ } from "../lib/utils.js";
import { UI } from "../lib/state.js";
import type { SliderUI, LayerUI } from "../lib/state.js";

function layerRow(L: LayerUI): string {
  const isSlider = "min" in L;
  let h =
    `<div class="layer" data-k="${L.k}" data-on="true"><div class="lh"><label class="sw"><input type="checkbox" role="switch" data-on="${L.k}" id="on-${L.k}" checked><span class="trk" aria-hidden="true"></span><span class="nm">${L.name}</span></label>` +
    (isSlider ? `<output class="val" id="val-${L.k}"></output>` : "") +
    "</div>";
  if (isSlider) {
    const S = L as SliderUI;
    h +=
      `<input type="range" id="rg-${S.k}" data-rg="${S.k}" min="${S.min}" max="${S.max}" step="${S.step}" aria-label="${S.name}">`;
  }
  if ("radius" in L && L.radius)
    h +=
      '<div class="lh" style="margin-top:2px"><span class="nm" style="font-size:13px;font-weight:500">Radio de esquina</span><output class="val" id="val-radius"></output></div><input type="range" id="rg-radius" min="0" max="48" step="1" aria-label="Radio de esquina">';
  h +=
    `<p class="hint">${L.hint}` +
    (L.k === "sq" && !SUPPORTS_SQ
      ? " Tu navegador no soporta <code>corner-shape</code>, así que aquí se ve con arco circular."
      : "") +
    "</p></div>";
  return h;
}

export function buildInspector(): void {
  (Object.keys(UI) as Array<keyof typeof UI>).forEach(function (g) {
    const el = $<HTMLElement>("#" + g);
    el.insertAdjacentHTML("beforeend", UI[g].map(layerRow).join(""));
  });
  if (!SUPPORTS_SQ) {
    const onSq = $<HTMLInputElement>("#on-sq");
    onSq.disabled = true;
  }
}