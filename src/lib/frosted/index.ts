import type { Material, Preset } from "../material.js";
import { state, MATERIALS, MATERIAL_KEYS, INSPECTOR } from "./state.js";
import type { MaterialId } from "./state.js";
import { eff, styleGL } from "./glass.js";
import type { FrostedEffect } from "./glass.js";
import { genCSS } from "./code.js";
import { STEPS } from "./steps.js";

function makePreset(id: MaterialId, label: string): Preset {
  const m = MATERIALS[id];
  return {
    id,
    label,
    name: id,
    apply() {
      state.view = "full";
      state.layers.blur.v = m.blur;
      state.layers.sat.v = m.sat;
      state.layers.tint.v = m.tint;
      state.layers.blur.on = state.layers.sat.on = state.layers.tint.on = true;
    },
  };
}

export const frosted: Material<FrostedEffect> = {
  id: "frosted",
  state,
  presets: [
    makePreset("ultraThin", "XS"),
    makePreset("thin", "S"),
    makePreset("regular", "M"),
    makePreset("thick", "L"),
    makePreset("ultraThick", "XL"),
  ],
  presetKeys: MATERIAL_KEYS,
  inspectorGroups: INSPECTOR,
  mini: {
    title: "Panel",
    sub: "iOS 7 → 18",
    rows: [
      ["Desenfoque", "24 px"],
      ["Saturación", "180 %"],
    ],
    foot: "",
  },
  buildEffect: eff,
  apply: styleGL,
  genCSS,
  panelRows(p) {
    return [
      ["Desenfoque", p.blur + " px"],
      ["Saturación", p.sat + " %"],
      ["Tinte", Math.round(p.tint) + " %"],
    ];
  },
  steps: STEPS,
};
