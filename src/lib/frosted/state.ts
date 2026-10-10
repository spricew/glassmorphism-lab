import { REDUCE } from "../utils.js";
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

export const INSPECTOR: InspectorGroup[] = [
  {
    id: "gFill",
    label: "Relleno",
    items: [
      {
        k: "blur",
        name: "Desenfoque",
        unit: " px",
        min: 0,
        max: 60,
        step: 1,
        hint: "Gaussiano sobre lo que hay detrás.",
      },
      {
        k: "sat",
        name: "Saturación",
        unit: " %",
        min: 100,
        max: 260,
        step: 5,
        hint: "Devuelve el color que el blur apaga.",
      },
      {
        k: "tint",
        name: "Tinte",
        unit: " %",
        min: 0,
        max: 95,
        step: 1,
        hint: "Capa clara u oscura que fija el contraste.",
      },
      {
        k: "noise",
        name: "Grano",
        unit: "",
        min: 0,
        max: 100,
        step: 1,
        hint: "Ruido fino contra el banding.",
      },
    ],
  },
  {
    id: "gFinish",
    label: "Acabado",
    items: [
      {
        k: "hair",
        name: "Hairline de 0,5 px",
        hint: "Canto casi invisible que separa el panel del fondo.",
      },
      {
        k: "hl",
        name: "Brillo interior",
        hint: "Luz en el borde superior que sugiere grosor.",
      },
      {
        k: "shadow",
        name: "Sombra en capas",
        hint: "Una difusa y una cercana, ambas de baja opacidad.",
      },
    ],
  },
  {
    id: "gShape",
    label: "Forma",
    items: [
      {
        k: "sq",
        name: "Esquinas continuas",
        hint: "La curva se funde con el lado recto, sin arco circular.",
        radius: true,
      },
    ],
  },
  {
    id: "gText",
    label: "Texto",
    items: [
      {
        k: "vib",
        name: "Vibrancy",
        hint: "Las etiquetas se mezclan con el fondo en lugar de ser gris plano.",
      },
    ],
  },
];
