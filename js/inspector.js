import { $, SUPPORTS_SQ } from "./utils.js";
import { UI } from "./state.js";

function layerRow(L) {
  var h =
    `<div class="layer" data-k="${L.k}" data-on="true"><div class="lh"><label class="sw"><input type="checkbox" role="switch" data-on="${L.k}" id="on-${L.k}" checked><span class="trk" aria-hidden="true"></span><span class="nm">${L.name}</span></label>` +
    (L.min !== undefined ? `<output class="val" id="val-${L.k}"></output>` : "") +
    "</div>";
  if (L.min !== undefined)
    h +=
      `<input type="range" id="rg-${L.k}" data-rg="${L.k}" min="${L.min}" max="${L.max}" step="${L.step}" aria-label="${L.name}">`;
  if (L.radius)
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
export function buildInspector() {
  Object.keys(UI).forEach(function (g) {
    $("#" + g).insertAdjacentHTML("beforeend", UI[g].map(layerRow).join(""));
  });
  if (!SUPPORTS_SQ) {
    $("#on-sq").disabled = true;
  }
}
