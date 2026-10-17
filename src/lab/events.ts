import { $, $$ } from "../lib/utils.js";
import { currentLang, getDict } from "../lib/i18n.js";
import type {
  AppState,
  BackgroundId,
  Effect,
  Material,
  SegKey,
} from "../lib/material.js";
import { render } from "./render.js";

export function bindEvents<E extends Effect>(mat: Material<E>): void {
  const state = mat.state;
  const insp = $<HTMLElement>(".inspector");
  insp.addEventListener("input", function (e) {
    const t = e.target as HTMLElement;
    const k = t.dataset.rg;
    if (k) {
      state.layers[k].v = +((t as HTMLInputElement).value);
      if (mat.presetKeys.includes(k)) state.presetId = "custom";
    } else if (t.dataset.on) {
      const key = t.dataset.on;
      const cb = t as HTMLInputElement;
      state.layers[key].on = cb.checked;
      if (mat.presetKeys.includes(key)) state.presetId = "custom";
    } else if (t.id === "rg-radius") {
      state.radius = +((t as HTMLInputElement).value);
    }
    render(mat);
  });

  document.addEventListener("click", function (e) {
    const b = (e.target as Element).closest<HTMLButtonElement>(".seg button");
    if (!b) return;
    const key = (b.parentElement as HTMLElement).dataset.seg as SegKey;
    const v = b.dataset.v;
    if (!v) return;
    if (key === "material") {
      const preset = mat.presets.find(function (p) {
        return p.id === v;
      });
      if (!preset) return;
      state.presetId = preset.id;
      preset.apply(state);
    } else if (key === "mode") {
      state.mode = v as AppState["mode"];
    } else if (key === "bg") {
      state.bg = v as BackgroundId;
    } else if (key === "view") {
      state.view = v as AppState["view"];
    }
    render(mat);
  });

  /* navegación por teclado dentro de los grupos de selección */
  document.addEventListener("keydown", function (e) {
    const target = e.target as Element | null;
    if (!(target instanceof Element)) return;
    const b = target.closest<HTMLButtonElement>('.seg button[role="radio"]');
    if (!b) return;
    const seg = b.parentElement as HTMLElement;
    const btns = $$<HTMLButtonElement>('button[role="radio"]', seg);
    const i = btns.indexOf(b);
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = (i + 1) % btns.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (i - 1 + btns.length) % btns.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = btns.length - 1;
    else return;
    e.preventDefault();
    if (next === i) return;
    btns[next].focus();
    btns[next].click();
  });

  const animate = $<HTMLInputElement>("#animate");
  animate.addEventListener("change", function (e) {
    state.animate = (e.target as HTMLInputElement).checked;
    render(mat);
  });
  const showbar = $<HTMLInputElement>("#showbar");
  showbar.addEventListener("change", function (e) {
    state.bar = (e.target as HTMLInputElement).checked;
    render(mat);
  });

  const hold = $<HTMLButtonElement>("#hold");
  function setHold(v: boolean): void {
    if (state.hold !== v) {
      state.hold = v;
      render(mat);
    }
  }
  hold.addEventListener("pointerdown", function (e: PointerEvent) {
    hold.setPointerCapture && hold.setPointerCapture(e.pointerId);
    setHold(true);
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (n) {
    hold.addEventListener(n, function () {
      setHold(false);
    });
  });
  hold.addEventListener("keydown", function (e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setHold(true);
    }
  });
  hold.addEventListener("keyup", function (e) {
    if (e.key === " " || e.key === "Enter") {
      setHold(false);
    }
  });
  hold.addEventListener("blur", function () {
    setHold(false);
  });

  /* arrastre del panel (left/top, sin transform: así el vibrancy sigue mezclando con el escenario) */
  const stage = $<HTMLElement>("#stage"),
    panel = $<HTMLElement>("#panel");
  let drag: { dx: number; dy: number } | null = null;
  function clampPanel(x: number, y: number): [number, number] {
    const mx = Math.max(0, stage.clientWidth - panel.offsetWidth),
      my = Math.max(0, stage.clientHeight - panel.offsetHeight);
    return [Math.min(Math.max(0, x), mx), Math.min(Math.max(0, y), my)];
  }
  function movePanel(x: number, y: number): void {
    const c = clampPanel(x, y);
    panel.style.left = c[0] + "px";
    panel.style.top = c[1] + "px";
  }
  panel.addEventListener("pointerdown", function (e: PointerEvent) {
    drag = {
      dx: e.clientX - panel.offsetLeft,
      dy: e.clientY - panel.offsetTop,
    };
    panel.setPointerCapture(e.pointerId);
    panel.classList.add("drag");
  });
  panel.addEventListener("pointermove", function (e: PointerEvent) {
    if (drag) movePanel(e.clientX - drag.dx, e.clientY - drag.dy);
  });
  ["pointerup", "pointercancel"].forEach(function (n) {
    panel.addEventListener(n, function () {
      drag = null;
      panel.classList.remove("drag");
    });
  });
  panel.addEventListener("keydown", function (e) {
    const d = {
      ArrowLeft: [-14, 0],
      ArrowRight: [14, 0],
      ArrowUp: [0, -14],
      ArrowDown: [0, 14],
    }[e.key] as [number, number] | undefined;
    if (d) {
      e.preventDefault();
      movePanel(panel.offsetLeft + d[0], panel.offsetTop + d[1]);
    }
  });
  window.addEventListener("resize", function () {
    movePanel(panel.offsetLeft, panel.offsetTop);
  });

  /* copiar */
  const copy = $<HTMLButtonElement>("#copy");
  let copyTimer: number | undefined;
  copy.addEventListener("click", function () {
    const btn = this;
    const d = getDict(currentLang()).css;
    const txt = $<HTMLPreElement>("#code").textContent ?? "";
    function done(ok: boolean): void {
      btn.textContent = ok ? d.copied : d.copyManual;
      btn.classList.toggle("done", ok);
      const status = $<HTMLSpanElement>("#copyStatus");
      status.textContent = ok ? d.copiedOk : d.copiedFail;
      window.clearTimeout(copyTimer);
      copyTimer = window.setTimeout(function () {
        btn.textContent = d.copy;
        btn.classList.remove("done");
        status.textContent = "";
      }, 1600);
    }
    function fallback(): void {
      try {
        const r = document.createRange();
        r.selectNodeContents($<HTMLPreElement>("#code"));
        const s = getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
        done(false);
      } catch {
        done(false);
      }
    }
    try {
      navigator.clipboard.writeText(txt).then(
        function () {
          done(true);
        },
        function () {
          fallback();
        },
      );
    } catch {
      fallback();
    }
  });
}
