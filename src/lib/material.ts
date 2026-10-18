export type BackgroundId =
  | "mosaic"
  | "sunset"
  | "feed"
  | "lake"
  | "forest";
export type SegKey = "mode" | "material" | "bg" | "view";

export interface LayerState {
  on: boolean;
  v?: number;
}
export type LayerStates = Record<string, LayerState>;

export interface AppState {
  mode: "light" | "dark";
  presetId: string;
  view: "full" | "naive";
  bg: BackgroundId;
  animate: boolean;
  bar: boolean;
  hold: boolean;
  radius: number;
  layers: LayerStates;
}

export interface LayerUI {
  k: string;
  name: string;
  hint: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  radius?: boolean;
}

export interface InspectorGroup {
  id: string;
  label: string;
  items: LayerUI[];
}

export interface Preset {
  id: string;
  label: string;
  name: string;
  apply(s: AppState): void;
}

export interface MiniPanel {
  title: string;
  sub: string;
  rows: Array<[string, string]>;
  foot: string;
}

export type Effect = Record<string, number | boolean>;

export interface StepDef<E extends Effect = Effect> {
  t: string;
  d: string;
  p: E;
}

export interface Material<E extends Effect = Effect> {
  id: string;
  state: AppState;
  presets: Preset[];
  presetKeys: string[];
  inspectorGroups: InspectorGroup[];
  mini: MiniPanel;
  buildEffect(): E;
  apply(el: HTMLElement, p: E, dark: boolean, bar: boolean): void;
  genCSS(p: E, dark: boolean): string;
  panelRows(p: E, dark: boolean): Array<[string, string]>;
  steps: StepDef<E>[];
}