import { initNoise } from "./utils.js";
import { buildInspector } from "./inspector.js";
import { initPanels } from "./panels.js";
import { buildSteps } from "./steps.js";
import { bindEvents } from "./events.js";
import { render } from "./render.js";

initNoise();
buildInspector();
initPanels();
buildSteps();
bindEvents();
render();
