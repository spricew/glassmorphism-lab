import { $, $$ } from "../lib/utils.js";
import type { Effect, Material } from "../lib/material.js";

/* El markup de los pasos se genera en el servidor (index.astro);
   en cliente solo se aplica el estilo del material a cada miniatura. */
export function styleSteps<E extends Effect>(
  mat: Material<E>,
  dark: boolean,
): void {
  const stepsEl = $("#steps");
  $$<HTMLElement>(".mini", stepsEl).forEach(function (m) {
    const i = Number(m.dataset.i ?? 0);
    const g = $<HTMLElement>(".gl", m);
    mat.apply(g, mat.steps[i].p, dark, false);
  });
}
