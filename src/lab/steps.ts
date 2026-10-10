import { $, $$ } from "../lib/utils.js";
import type { Effect, Material } from "../lib/material.js";
import { panelHTML, shell } from "./panels.js";

export function buildSteps<E extends Effect>(mat: Material<E>): void {
  const stepsEl = $<HTMLElement>("#steps");
  stepsEl.innerHTML = mat.steps
    .map(function (s, i) {
      return (
        `<article class="step"><div class="mini" data-i="${i}" aria-hidden="true"><div class="gl">` +
        shell(
          panelHTML(mat.mini.title, mat.mini.sub, mat.mini.rows, mat.mini.foot),
        ) +
        "</div></div>" +
        `<div><h3><span>${i}</span>${s.t}</h3><p>${s.d}</p></div></article>`
      );
    })
    .join("");
}

export function styleSteps<E extends Effect>(
  mat: Material<E>,
  dark: boolean,
): void {
  const stepsEl = $<HTMLElement>("#steps");
  $$<HTMLElement>(".mini", stepsEl).forEach(function (m) {
    const i = Number(m.dataset.i ?? 0);
    const g = $<HTMLElement>(".gl", m);
    mat.apply(g, mat.steps[i].p, dark, false);
  });
}
