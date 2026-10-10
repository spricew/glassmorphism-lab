import { $, $$ } from "./utils.js";
import { state, MATERIALS, MATERIAL_KEYS } from "./state.js";
import { render } from "./render.js";

export function bindEvents() {
  var insp = $(".inspector");
  insp.addEventListener("input", function (e) {
    var t = e.target,
      k = t.dataset.rg;
    if (k) {
      state.layers[k].v = +t.value;
      if (MATERIAL_KEYS.indexOf(k) >= 0) state.material = "custom";
    } else if (t.dataset.on) {
      state.layers[t.dataset.on].on = t.checked;
      if (MATERIAL_KEYS.indexOf(t.dataset.on) >= 0)
        state.material = "custom";
    } else if (t.id === "rg-radius") {
      state.radius = +t.value;
    }
    render();
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".seg button");
    if (!b) return;
    var key = b.parentNode.dataset.seg,
      v = b.dataset.v;
    if (key === "material") {
      var m = MATERIALS[v];
      state.material = v;
      state.view = "full";
      state.layers.blur.v = m.blur;
      state.layers.sat.v = m.sat;
      state.layers.tint.v = m.tint;
      state.layers.blur.on = state.layers.sat.on = state.layers.tint.on = true;
    } else {
      state[key] = v;
    }
    render();
  });

  /* navegación por teclado dentro de los grupos de selección */
  document.addEventListener("keydown", function (e) {
    var b = e.target.closest
      ? e.target.closest('.seg button[role="radio"]')
      : null;
    if (!b) return;
    var seg = b.parentNode,
      btns = $$('button[role="radio"]', seg),
      i = btns.indexOf(b),
      next = i;
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

  $("#animate").addEventListener("change", function (e) {
    state.animate = e.target.checked;
    render();
  });
  $("#showbar").addEventListener("change", function (e) {
    state.bar = e.target.checked;
    render();
  });

  var hold = $("#hold");
  function setHold(v) {
    if (state.hold !== v) {
      state.hold = v;
      render();
    }
  }
  hold.addEventListener("pointerdown", function (e) {
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
  var stage = $("#stage"),
    panel = $("#panel"),
    drag = null;
  function clampPanel(x, y) {
    var mx = Math.max(0, stage.clientWidth - panel.offsetWidth),
      my = Math.max(0, stage.clientHeight - panel.offsetHeight);
    return [Math.min(Math.max(0, x), mx), Math.min(Math.max(0, y), my)];
  }
  function movePanel(x, y) {
    var c = clampPanel(x, y);
    panel.style.left = c[0] + "px";
    panel.style.top = c[1] + "px";
  }
  panel.addEventListener("pointerdown", function (e) {
    drag = {
      dx: e.clientX - panel.offsetLeft,
      dy: e.clientY - panel.offsetTop,
    };
    panel.setPointerCapture(e.pointerId);
    panel.classList.add("drag");
  });
  panel.addEventListener("pointermove", function (e) {
    if (drag) movePanel(e.clientX - drag.dx, e.clientY - drag.dy);
  });
  ["pointerup", "pointercancel"].forEach(function (n) {
    panel.addEventListener(n, function () {
      drag = null;
      panel.classList.remove("drag");
    });
  });
  panel.addEventListener("keydown", function (e) {
    var d = {
      ArrowLeft: [-14, 0],
      ArrowRight: [14, 0],
      ArrowUp: [0, -14],
      ArrowDown: [0, 14],
    }[e.key];
    if (d) {
      e.preventDefault();
      movePanel(panel.offsetLeft + d[0], panel.offsetTop + d[1]);
    }
  });
  window.addEventListener("resize", function () {
    movePanel(panel.offsetLeft, panel.offsetTop);
  });

  /* copiar */
  $("#copy").addEventListener("click", function () {
    var btn = this,
      txt = $("#code").textContent;
    function done(ok) {
      btn.textContent = ok ? "Copiado" : "Selecciona y copia";
      $("#copyStatus").textContent = ok
        ? "CSS copiado al portapapeles"
        : "No se pudo copiar automáticamente; el CSS quedó seleccionado";
      setTimeout(function () {
        btn.textContent = "Copiar CSS";
        $("#copyStatus").textContent = "";
      }, 1600);
    }
    function fallback() {
      try {
        var r = document.createRange();
        r.selectNodeContents($("#code"));
        var s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
        done(false);
      } catch (e) {
        done(false);
      }
    }
    try {
      navigator.clipboard.writeText(txt).then(function () {
        done(true);
      }, fallback);
    } catch (e) {
      fallback();
    }
  });
}
