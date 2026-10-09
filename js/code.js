import { colors, shadowParts } from "./glass.js";

export function genCSS(p, dark) {
  var c = colors(dark),
    L = [];
  L.push(".glass {");
  L.push(`  background: rgba(${c.tint}, ${(p.tint / 100).toFixed(2)});`);
  if (p.blur > 0 || p.sat !== 100) {
    var f = [];
    if (p.blur > 0) f.push(`blur(${p.blur}px)`);
    if (p.sat !== 100) f.push(`saturate(${p.sat}%)`);
    L.push("  -webkit-backdrop-filter: " + f.join(" ") + ";");
    L.push("  backdrop-filter: " + f.join(" ") + ";");
  } else L.push("  /* sin backdrop-filter */");
  L.push(`  border-radius: ${p.radius}px;`);
  if (p.sq)
    L.push(
      "  corner-shape: squircle; /* si no hay soporte, queda el radio */",
    );
  var sh = shadowParts(p, dark);
  if (sh.length) {
    L.push("  box-shadow:");
    sh.forEach(function (x, i) {
      L.push("    " + x + (i < sh.length - 1 ? "," : ";"));
    });
  }
  L.push("}");
  if (p.noise > 0) {
    L.push("");
    L.push(".glass::after { /* grano */");
    L.push('  content: ""; position: absolute; inset: 0;');
    L.push("  border-radius: inherit; pointer-events: none;");
    L.push("  background: url(noise-128.png);");
    L.push(`  opacity: ${((p.noise / 100) * 0.35).toFixed(2)};`);
    L.push("}");
  }
  if (p.vib) {
    L.push("");
    L.push(
      ".glass .content { /* vibrancy: vive fuera del elemento con backdrop-filter */",
    );
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
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
export function hilite(code) {
  return esc(code)
    .split("\n")
    .map(function (l) {
      if (/^\s*\/\*/.test(l)) return '<span class="c">' + l + "</span>";
      l = l.replace(/(\/\*.*?\*\/)/g, '<span class="c">$1</span>');
      if (/^\./.test(l))
        return l.replace(
          /^(\.[^ {]+(?:::after)?(?: [^{]+)?)( \{)/,
          '<span class="s">$1</span>$2',
        );
      return l.replace(
        /^(\s*)([a-z-]+)(:)/,
        '$1<span class="k">$2</span>$3',
      );
    })
    .join("\n");
}
