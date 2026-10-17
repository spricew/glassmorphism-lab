import { REDUCE } from "../utils.js";
import { getDict, type Lang } from "../i18n.js";
import type { AppState, InspectorGroup } from "../material.js";

export type MaterialId =
  | "ultraThin"
  | "thin"
  | "regular"
  | "thick"
  | "ultraThick";
export type SliderLayerId = "blur" | "sat" | "tint" | "noise";
export type ToggleLayerId = "hair" | "hl" | "shadow" | "sq" | "vib";

export interface MaterialDef {
  blur: number;
  tint: number;
  sat: number;
}

export const MATERIALS: Record<MaterialId, MaterialDef> = {
  ultraThin: { blur: 14, tint: 18, sat: 180 },
  thin: { blur: 18, tint: 36, sat: 180 },
  regular: { blur: 24, tint: 56, sat: 180 },
  thick: { blur: 30, tint: 72, sat: 180 },
  ultraThick: { blur: 38, tint: 86, sat: 180 },
};

export interface SliderLayer {
  on: boolean;
  v: number;
}
export interface ToggleLayer {
  on: boolean;
}
export type FrostedLayers = {
  blur: SliderLayer;
  sat: SliderLayer;
  tint: SliderLayer;
  noise: SliderLayer;
  hair: ToggleLayer;
  hl: ToggleLayer;
  shadow: ToggleLayer;
  sq: ToggleLayer;
  vib: ToggleLayer;
};
export type FrostedState = AppState & { layers: FrostedLayers };

export const state: FrostedState = {
  mode: "light",
  presetId: "regular",
  view: "full",
  bg: "mosaic",
  animate: !REDUCE,
  bar: true,
  hold: false,
  radius: 28,
  layers: {
    blur: { on: true, v: 24 },
    sat: { on: true, v: 180 },
    tint: { on: true, v: 56 },
    noise: { on: true, v: 14 },
    hair: { on: true },
    hl: { on: true },
    shadow: { on: true },
    sq: { on: true },
    vib: { on: true },
  },
};

/* capas cuyo ajuste manual marca el material como personalizado */
export const MATERIAL_KEYS: SliderLayerId[] = ["blur", "sat", "tint"];

/* estructura del inspector: rangos y unidades viven aquí; los textos, en i18n */
interface LayerSpec {
  k: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  radius?: boolean;
}
interface GroupSpec {
  id: string;
  items: LayerSpec[];
}

const INSPECTOR_SPEC: GroupSpec[] = [
  {
    id: "gFill",
    items: [
      { k: "blur", unit: " px", min: 0, max: 60, step: 1 },
      { k: "sat", unit: " %", min: 100, max: 260, step: 5 },
      { k: "tint", unit: " %", min: 0, max: 95, step: 1 },
      { k: "noise", unit: "", min: 0, max: 100, step: 1 },
    ],
  },
  {
    id: "gFinish",
    items: [{ k: "hair" }, { k: "hl" }, { k: "shadow" }],
  },
  {
    id: "gShape",
    items: [{ k: "sq", radius: true }],
  },
  {
    id: "gText",
    items: [{ k: "vib" }],
  },
];

export function inspectorGroups(lang: Lang): InspectorGroup[] {
  const d = getDict(lang).inspector;
  return INSPECTOR_SPEC.map(function (group) {
    return {
      id: group.id,
      label: d.groups[group.id] ?? group.id,
      items: group.items.map(function (item) {
        const text = d.layers[item.k];
        return {
          k: item.k,
          name: text.name,
          hint: text.hint,
          unit: item.unit,
          min: item.min,
          max: item.max,
          step: item.step,
          radius: item.radius,
        };
      }),
    };
  });
}
