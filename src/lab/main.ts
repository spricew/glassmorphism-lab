import { initNoise } from "../lib/utils.js";
import type { Effect, Material } from "../lib/material.js";
import { buildInspector } from "./inspector.js";
import { initPanels } from "./panels.js";
import { bindEvents } from "./events.js";
import { render } from "./render.js";

export function initLab<E extends Effect>(mat: Material<E>): void {
  initNoise();
  buildInspector(mat);
  initPanels();
  bindEvents(mat);
  render(mat);
}
