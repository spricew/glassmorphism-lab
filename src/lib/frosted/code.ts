import { colors, shadowParts } from "./glass.js";
import type { FrostedEffect } from "./glass.js";
import { currentLang, getDict, type Lang } from "../i18n.js";

export function genCSS(
  p: FrostedEffect,
  dark: boolean,
  lang: Lang = currentLang(),
): string {
  const comments = getDict(lang).css.comments;
  const c = colors(dark);
  const L: string[] = [];
  L.push(".glass {");
  L.push(`  background: rgba(${c.tint}, ${(p.tint / 100).toFixed(2)});`);
  if (p.blur > 0 || p.sat !== 100) {
    const f: string[] = [];
    if (p.blur > 0) f.push(`blur(${p.blur}px)`);
    if (p.sat !== 100) f.push(`saturate(${p.sat}%)`);
    L.push("  -webkit-backdrop-filter: " + f.join(" ") + ";");
    L.push("  backdrop-filter: " + f.join(" ") + ";");
  } else L.push(comments.noBackdrop);
  L.push(`  border-radius: ${p.radius}px;`);
  if (p.sq) L.push(comments.squircle);
  const sh = shadowParts(p, dark);
  if (sh.length) {
    L.push("  box-shadow:");
    sh.forEach(function (x, i) {
      L.push("    " + x + (i < sh.length - 1 ? "," : ";"));
    });
  }
  L.push("}");
  if (p.noise > 0) {
    L.push("");
    L.push(comments.grain);
    L.push('  content: ""; position: absolute; inset: 0;');
    L.push("  border-radius: inherit; pointer-events: none;");
    L.push("  background: url(noise-128.png);");
    L.push(`  opacity: ${((p.noise / 100) * 0.35).toFixed(2)};`);
    L.push("}");
  }
  if (p.vib) {
    L.push("");
    L.push(comments.vibrancy);
    L.push(`  mix-blend-mode: ${dark ? "plus-lighter" : "multiply"};`);
    L.push(
      "  color: " +
        (dark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.92)") +
        ";",
    );
    L.push("}");
  }
  return L.join("\n");
}
