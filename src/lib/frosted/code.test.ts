import { describe, it, expect } from "vitest";
import { genCSS } from "./code.js";
import type { FrostedEffect } from "./glass.js";
import { hilite } from "../hilite.js";

const base: FrostedEffect = {
  blur: 0,
  sat: 100,
  tint: 0,
  noise: 0,
  hair: false,
  hl: false,
  shadow: false,
  sq: false,
  vib: false,
  radius: 0,
};

describe("genCSS", () => {
  it("receta completa con blur, saturación y tinte", () => {
    const css = genCSS(
      { ...base, blur: 24, sat: 180, tint: 56, radius: 28 },
      false,
    );
    expect(css).toContain("background: rgba(247, 247, 247, 0.56);");
    expect(css).toContain("-webkit-backdrop-filter: blur(24px) saturate(180%);");
    expect(css).toContain("backdrop-filter: blur(24px) saturate(180%);");
    expect(css).toContain("border-radius: 28px;");
  });

  it("sin blur ni saturación emite el comentario sin backdrop-filter", () => {
    const css = genCSS({ ...base, blur: 0, sat: 100 }, false);
    expect(css).toContain("/* sin backdrop-filter */");
    expect(css).not.toContain("backdrop-filter:");
  });

  it("emite el grano cuando hay noise", () => {
    const css = genCSS({ ...base, noise: 50 }, false);
    expect(css).toContain(".glass::after");
    expect(css).toContain('content: ""; position: absolute; inset: 0;');
    expect(css).toContain("opacity: " + ((50 / 100) * 0.35).toFixed(2) + ";");
  });

  it("vibrancy usa plus-lighter en oscuro y multiply en claro", () => {
    const cssDark = genCSS({ ...base, vib: true }, true);
    expect(cssDark).toContain("mix-blend-mode: plus-lighter;");
    const cssLight = genCSS({ ...base, vib: true }, false);
    expect(cssLight).toContain("mix-blend-mode: multiply;");
  });

  it("escribe corner-shape cuando sq está activo", () => {
    const css = genCSS({ ...base, sq: true }, false);
    expect(css).toContain("corner-shape: squircle;");
  });

  it("apila las sombras con saltos de línea", () => {
    const css = genCSS({ ...base, hair: true, hl: true, shadow: true }, false);
    expect(css).toContain("box-shadow:");
    expect(css).toContain("inset 0 0 0 0.5px");
    expect(css).toContain("0 10px 40px rgba(0, 0, 0, 0.20)");
  });
});

describe("hilite", () => {
  it("escapa los caracteres HTML", () => {
    const out = hilite(".a > .b < :hover {");
    expect(out).toContain("&lt;");
    expect(out).toContain("&gt;");
  });

  it("resalta selector, propiedad y comentario", () => {
    const out = hilite(".glass {\n  backdrop-filter: blur(24px); /* grano */\n}");
    expect(out).toContain('<span class="s">.glass</span>');
    expect(out).toContain('<span class="k">backdrop-filter</span>');
    expect(out).toContain('<span class="c">/* grano */</span>');
  });
});
