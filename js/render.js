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
    var rg = $("#rg-" + f.k);
    rg.value = L[f.k].v;
    rg.setAttribute("aria-valuetext", L[f.k].v + f.unit);
    $("#val-" + f.k).textContent = L[f.k].v + f.unit;
  });
  var rad = $("#rg-radius");
  rad.value = state.radius;
  rad.setAttribute("aria-valuetext", state.radius + " px");
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
    var key = sg.dataset.seg,
      btns = $$('button[role="radio"]', sg),
      current = -1;
    btns.forEach(function (b, i) {
      if (state[key] === b.dataset.v) current = i;
    });
    btns.forEach(function (b, i) {
      var on = i === current || (current < 0 && i === 0);
      b.setAttribute("aria-checked", String(i === current));
      b.tabIndex = on ? 0 : -1;
    });
  });

  /* pasos */
  styleSteps(dark);

  /* código (de la receta real, no de la vista naive) */
  $("#code").innerHTML = hilite(genCSS(p, dark));
}
