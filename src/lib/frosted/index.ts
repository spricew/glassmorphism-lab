import type { Material, Preset } from "../material.js";
import { getDict, type Lang } from "../i18n.js";
import { state, MATERIALS, MATERIAL_KEYS, inspectorGroups } from "./state.js";
import type { MaterialId } from "./state.js";
import { eff, styleGL } from "./glass.js";
import type { FrostedEffect } from "./glass.js";
import { genCSS } from "./code.js";
import { steps } from "./steps.js";

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

export function makeFrosted(lang: Lang): Material<FrostedEffect> {
  const d = getDict(lang);
  return {
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
    inspectorGroups: inspectorGroups(lang),
    mini: {
      title: d.panel.title,
      sub: d.panel.sub,
      rows: d.panel.rows,
      foot: d.panel.foot,
    },
    buildEffect: eff,
    apply: styleGL,
    genCSS,
    panelRows(p) {
      return [
        [d.panel.rowBlur, p.blur + " px"],
        [d.panel.rowSat, p.sat + " %"],
        [d.panel.rowTint, Math.round(p.tint) + " %"],
      ];
    },
    steps: steps(lang),
  };
}
