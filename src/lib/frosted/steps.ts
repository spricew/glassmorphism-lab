import { SUPPORTS_SQ } from "../utils.js";
import { getDict, type Lang } from "../i18n.js";
import type { StepDef } from "../material.js";
import type { FrostedEffect } from "./glass.js";

/* ---------- construcción paso a paso ---------- */
const BASE: FrostedEffect = {
  blur: 24,
  sat: 100,
  tint: 0,
  noise: 0,
  hair: false,
  hl: false,
  shadow: false,
  sq: false,
  vib: false,
  radius: 22,
};
function step(o: Partial<FrostedEffect>): FrostedEffect {
  return Object.assign({}, BASE, o);
}
const FILL: Partial<FrostedEffect> = { sat: 180, tint: 56, noise: 14 };
const EDGED: Partial<FrostedEffect> = { ...FILL, hair: true, hl: true };
const FRAMED: Partial<FrostedEffect> = {
  ...EDGED,
  shadow: true,
  sq: SUPPORTS_SQ,
};

export const STEPS_SPEC: Array<FrostedEffect> = [
  step({ blur: 0 }),
  step({}),
  step({ sat: 180 }),
  step({ sat: 180, tint: 56 }),
  step(FILL),
  step(EDGED),
  step(FRAMED),
  step({ ...FRAMED, vib: true }),
];

export function steps(lang: Lang): StepDef<FrostedEffect>[] {
  const text = getDict(lang).steps;
  return STEPS_SPEC.map(function (p, i) {
    return { t: text[i].t, d: text[i].d, p };
  });
}
