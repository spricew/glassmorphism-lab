import { $, $$ } from "./utils.js";
import { bgUrl } from "./backgrounds.js";
import { state, UI } from "./state.js";
import { eff, styleGL } from "./glass.js";
import { panelHTML } from "./panels.js";
import { styleSteps } from "./steps.js";
import { genCSS, hilite } from "./code.js";

export function render() {
  var p = eff(),
    dark = state.mode === "dark",
    L = state.layers,
    naive = state.view === "naive" || state.hold;
  document.documentElement.style.setProperty("--bgimg", bgUrl(state.bg));
  $("#bg").classList.toggle("still", !state.animate);

  var panel = $("#panel"),
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
  var hold = $("#hold");
  hold.setAttribute("aria-pressed", state.hold ? "true" : "false");
  hold.textContent = state.hold
    ? "Mostrando solo blur"
    : "Mantén para ver solo blur";

  /* inspector */
  UI.gFill.forEach(function (f) {
    $("#rg-" + f.k).value = L[f.k].v;
    $("#val-" + f.k).textContent = L[f.k].v + f.unit;
  });
  $("#rg-radius").value = state.radius;
  $("#val-radius").textContent = state.radius + " px";
  Object.keys(L).forEach(function (k) {
    var cb = $("#on-" + k);
    cb.checked = !!L[k].on;
    var row = cb.closest(".layer");
    row.dataset.on = L[k].on ? "true" : "false";
  });
  $("#animate").checked = state.animate;
  $("#showbar").checked = state.bar;
  $$(".seg").forEach(function (sg) {
    var key = sg.dataset.seg;
    $$("button", sg).forEach(function (b) {
      b.setAttribute("aria-pressed", String(state[key] === b.dataset.v));
    });
  });

  /* pasos */
  styleSteps(dark);

  /* código (de la receta real, no de la vista naive) */
  $("#code").innerHTML = hilite(genCSS(p, dark));
}
