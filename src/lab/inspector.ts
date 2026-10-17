import { $, SUPPORTS_SQ } from "../lib/utils.js";
import { currentLang, getDict } from "../lib/i18n.js";
import type { Effect, LayerUI, Material } from "../lib/material.js";

function layerRow(L: LayerUI, radiusLabel: string, sqNote: string): string {
  const isSlider = L.min !== undefined;
  let h =
    `<div class="layer" data-k="${L.k}" data-on="true"><div class="lh"><label class="sw"><input type="checkbox" role="switch" data-on="${L.k}" id="on-${L.k}" checked><span class="trk" aria-hidden="true"></span><span class="nm">${L.name}</span></label>` +
    (isSlider ? `<output class="val" id="val-${L.k}"></output>` : "") +
    "</div>";
  if (isSlider) {
    h += `<input type="range" id="rg-${L.k}" data-rg="${L.k}" min="${L.min}" max="${L.max}" step="${L.step}" aria-label="${L.name}">`;
  }
  if (L.radius)
    h +=
      `<div class="lh" style="margin-top:2px"><span class="nm" style="font-size:13px;font-weight:500">${radiusLabel}</span><output class="val" id="val-radius"></output></div><input type="range" id="rg-radius" min="0" max="48" step="1" aria-label="${radiusLabel}">`;
  h +=
    `<p class="hint">${L.hint}` +
    (L.k === "sq" && !SUPPORTS_SQ ? sqNote : "") +
    "</p></div>";
  return h;
}

export function buildInspector<E extends Effect>(mat: Material<E>): void {
  const d = getDict(currentLang()).inspector;
  mat.inspectorGroups.forEach(function (g) {
    const el = $<HTMLElement>("#" + g.id);
    el.insertAdjacentHTML(
      "beforeend",
      g.items.map((item) => layerRow(item, d.radius, d.sqNoSupport)).join(""),
    );
  });
  if (!SUPPORTS_SQ) {
    const onSq = document.querySelector<HTMLInputElement>("#on-sq");
    if (onSq) onSq.disabled = true;
  }
}
