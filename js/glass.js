import { SUPPORTS_SQ } from "./utils.js";
import { state } from "./state.js";

export function eff() {
  var L = state.layers;
  var p = {
    blur: L.blur.on ? L.blur.v : 0,
    sat: L.sat.on ? L.sat.v : 100,
    tint: L.tint.on ? L.tint.v : 0,
    noise: L.noise.on ? L.noise.v : 0,
    hair: L.hair.on,
    hl: L.hl.on,
    shadow: L.shadow.on,
    sq: L.sq.on && SUPPORTS_SQ,
    vib: L.vib.on,
    radius: state.radius,
  };
  if (state.view === "naive" || state.hold) {
    p.blur = L.blur.v;
    p.sat = 100;
    p.tint = 0;
    p.noise = 0;
    p.hair = p.hl = p.shadow = p.sq = p.vib = false;
  }
  return p;
}
var _colorsCache = {
  l: {
    tint: "247, 247, 247",
    hair: "rgba(0, 0, 0, 0.14)",
    hl: "rgba(255, 255, 255, 0.75)",
    hl2: "rgba(255, 255, 255, 0.25)",
  },
  d: {
    tint: "28, 28, 30",
    hair: "rgba(255, 255, 255, 0.16)",
    hl: "rgba(255, 255, 255, 0.16)",
    hl2: "rgba(255, 255, 255, 0.04)",
  },
};
export function colors(dark) {
  return _colorsCache[dark ? "d" : "l"];
}
export function shadowParts(p, dark) {
  var c = colors(dark),
    a = [];
  if (p.hair) a.push("inset 0 0 0 0.5px " + c.hair);
  if (p.hl) a.push("inset 0 1px 0 " + c.hl, "inset 0 0 0 1px " + c.hl2);
  if (p.shadow)
    a.push(
      "0 10px 40px rgba(0, 0, 0, 0.20)",
      "0 2px 8px rgba(0, 0, 0, 0.10)",
    );
  return a;
}
export function styleGL(el, p, dark, bar) {
  var s = el.style,
    c = colors(dark),
    parts;
  s.setProperty("--blur", p.blur + "px");
  s.setProperty("--sat", p.sat + "%");
  s.setProperty(
    "--tint",
    "rgba(" + c.tint + ", " + (p.tint / 100).toFixed(3) + ")",
  );
  s.setProperty("--noise", ((p.noise / 100) * 0.35).toFixed(3));
  s.setProperty("--radius", (bar ? 0 : p.radius) + "px");
  if (bar) {
    parts = p.hair ? ["inset 0 0.5px 0 " + c.hair] : [];
  } else {
    parts = shadowParts(p, dark);
  }
  s.setProperty("--sh", parts.length ? parts.join(", ") : "none");
  el.classList.toggle("dark", dark);
  el.classList.toggle("sq", !!p.sq && !bar);
  el.classList.toggle("vib", !!p.vib);
}
