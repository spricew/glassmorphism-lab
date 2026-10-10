import { REDUCE } from "./utils.js";

export type MaterialId = "ultraThin" | "thin" | "regular" | "thick" | "ultraThick";
export type MaterialView = "full" | "naive";
export type BackgroundId = "mosaic" | "sunset" | "feed";
export type SegKey = "mode" | "material" | "bg" | "view";
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
export interface Layers {
  blur: SliderLayer;
  sat: SliderLayer;
  tint: SliderLayer;
  noise: SliderLayer;
  hair: ToggleLayer;
  hl: ToggleLayer;
  shadow: ToggleLayer;
  sq: ToggleLayer;
  vib: ToggleLayer;
}

export interface AppState {
  mode: "light" | "dark";
  material: MaterialId | "custom";
  view: MaterialView;
  bg: BackgroundId;
  animate: boolean;
  bar: boolean;
  hold: boolean;
  radius: number;
  layers: Layers;
}

export const state: AppState = {
  mode: "light",
  material: "regular",
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

export interface SliderUI {
  k: SliderLayerId;
  name: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  hint: string;
}
export interface ToggleUI {
  k: ToggleLayerId;
  name: string;
  hint: string;
  radius?: boolean;
}
export type LayerUI = SliderUI | ToggleUI;

export interface UIConfig {
  gFill: SliderUI[];
  gFinish: ToggleUI[];
  gShape: ToggleUI[];
  gText: ToggleUI[];
}

export const UI: UIConfig = {
  gFill: [
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
  gFinish: [
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
  gShape: [
    {
      k: "sq",
      name: "Esquinas continuas",
      hint: "La curva se funde con el lado recto, sin arco circular.",
      radius: true,
    },
  ],
  gText: [
    {
      k: "vib",
      name: "Vibrancy",
      hint: "Las etiquetas se mezclan con el fondo en lugar de ser gris plano.",
    },
  ],
};