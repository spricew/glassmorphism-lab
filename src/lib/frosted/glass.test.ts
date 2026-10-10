import { describe, it, expect, beforeEach } from "vitest";
import { eff, shadowParts, colors } from "./glass.js";
import type { FrostedEffect } from "./glass.js";
import { state } from "./state.js";

const defaults = structuredClone(state);

beforeEach(() => {
  const fresh = structuredClone(defaults);
  Object.assign(state, fresh);
  Object.assign(state.layers, fresh.layers);
});

describe("eff", () => {
  it("devuelve la receta completa por defecto", () => {
    const p = eff();
    expect(p.blur).toBe(24);
    expect(p.sat).toBe(180);
    expect(p.tint).toBe(56);
    expect(p.noise).toBe(14);
    expect(p.radius).toBe(28);
    expect(p.hair).toBe(true);
    expect(p.vib).toBe(true);
  });

  it("en vista naive solo conserva el blur", () => {
    state.view = "naive";
    const p = eff();
    expect(p.blur).toBe(24);
    expect(p.sat).toBe(100);
    expect(p.tint).toBe(0);
    expect(p.noise).toBe(0);
    expect(p.hair).toBe(false);
    expect(p.hl).toBe(false);
    expect(p.shadow).toBe(false);
    expect(p.vib).toBe(false);
  });

  it("hold se comporta igual que la vista naive", () => {
    state.hold = true;
    const p = eff();
    expect(p.sat).toBe(100);
    expect(p.tint).toBe(0);
    expect(p.hl).toBe(false);
  });

  it("apagar la saturación la deja en 100", () => {
    state.layers.sat.on = false;
    expect(eff().sat).toBe(100);
  });

  it("apagar el desenfoque lo deja en cero", () => {
    state.layers.blur.on = false;
    expect(eff().blur).toBe(0);
  });

  it("el tinte sigue el valor de la capa", () => {
    state.layers.tint.v = 0;
    expect(eff().tint).toBe(0);
  });

  it("sq solo se aplica si la capa está activa", () => {
    state.layers.sq.on = false;
    expect(eff().sq).toBe(false);
  });
});

describe("shadowParts", () => {
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

  it("sin capas devuelve una lista vacía", () => {
    expect(shadowParts(base, false)).toEqual([]);
  });

  it("con hairline solo emite el canto", () => {
    const parts = shadowParts({ ...base, hair: true }, false);
    expect(parts).toEqual(["inset 0 0 0 0.5px rgba(0, 0, 0, 0.14)"]);
  });

  it("en oscuro el hairline es claro", () => {
    const parts = shadowParts({ ...base, hair: true }, true);
    expect(parts[0]).toContain("rgba(255, 255, 255, 0.16)");
  });

  it("con brillo y sombra apila todas las capas", () => {
    const parts = shadowParts({ ...base, hl: true, shadow: true }, false);
    expect(parts).toHaveLength(4);
  });
});

describe("colors", () => {
  it("usa el tinte claro en light", () => {
    expect(colors(false).tint).toBe("247, 247, 247");
  });

  it("usa el tinte oscuro en dark", () => {
    expect(colors(true).tint).toBe("28, 28, 30");
  });
});
