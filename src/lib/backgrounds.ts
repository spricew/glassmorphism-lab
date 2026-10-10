import type { BackgroundId } from "./material.js";

/* fondos (SVG en data URI, con bordes nítidos para que el blur se note) */
const SVG_OPEN =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">';
const FONT = 'font-family="Helvetica, Arial, sans-serif"';

function mosaicSVG(): string {
  return (
    SVG_OPEN +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b1055"/><stop offset=".55" stop-color="#7b2ff7"/><stop offset="1" stop-color="#f107a3"/></linearGradient>' +
    '<pattern id="st" width="64" height="64" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="32" height="64" fill="#fff"/><rect x="32" width="32" height="64" fill="#0b0b10"/></pattern>' +
    '<pattern id="dt" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="7" fill="#fff"/></pattern></defs>' +
    '<rect width="1600" height="900" fill="url(#g)"/>' +
    '<circle cx="260" cy="250" r="200" fill="#ff9f0a"/><circle cx="830" cy="560" r="270" fill="#ff375f"/>' +
    '<circle cx="1330" cy="240" r="180" fill="#30d158"/><circle cx="1180" cy="720" r="140" fill="#64d2ff"/>' +
    '<circle cx="520" cy="760" r="110" fill="#ffd60a"/>' +
    '<rect x="-60" y="370" width="1720" height="150" fill="url(#st)" transform="rotate(-8 800 445)"/>' +
    '<rect x="900" y="60" width="380" height="220" fill="url(#dt)"/>' +
    '<rect x="80" y="610" width="260" height="190" rx="30" fill="#0a84ff"/>' +
    '<g fill="none" stroke="#fff" stroke-width="5"><circle cx="830" cy="560" r="335"/><circle cx="260" cy="250" r="250"/></g>' +
    '<path d="M0 880 L1600 836" stroke="#fff" stroke-width="7"/>' +
    `<text x="110" y="150" font-size="130" font-weight="800" fill="#fff" ${FONT}>Aa Gg 42</text>` +
    `<text x="1000" y="860" font-size="84" font-weight="700" fill="#0b0b10" ${FONT}>Glass</text>` +
    "</svg>"
  );
}
function sunsetSVG(): string {
  let s = 7;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  let stars = "";
  let trees = "";
  let i: number;
  for (i = 0; i < 90; i++) {
    stars +=
      `<circle cx="${(rnd() * 1600) | 0}" cy="${(rnd() * 330) | 0}" r="${(1 + rnd() * 2.4).toFixed(1)}" fill="#fff" fill-opacity="${(0.5 + rnd() * 0.5).toFixed(2)}"/>`;
  }
  for (i = 0; i < 34; i++) {
    const x = i * 50 - 10;
    const h = 90 + ((i * 37) % 5) * 18;
    trees += `<polygon points="${x},900 ${x + 25},${900 - h} ${x + 50},900"/>`;
  }
  return (
    SVG_OPEN +
    '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14123f"/><stop offset=".3" stop-color="#4b2a85"/><stop offset=".55" stop-color="#d4418e"/><stop offset=".75" stop-color="#ff8a4c"/><stop offset="1" stop-color="#ffd27a"/></linearGradient></defs>' +
    '<rect width="1600" height="900" fill="url(#sky)"/>' +
    stars +
    '<circle cx="1050" cy="560" r="230" fill="#ffd27a" fill-opacity=".35"/><circle cx="1050" cy="560" r="135" fill="#fff3c4"/>' +
    '<polygon fill="#6a2f8e" points="0,640 120,510 230,590 360,440 480,580 600,480 740,620 880,490 1000,610 1130,460 1260,590 1380,500 1500,600 1600,530 1600,760 0,760"/>' +
    '<polygon fill="#3d1d62" points="0,720 160,610 300,680 460,580 620,700 800,620 960,710 1120,620 1300,720 1460,640 1600,710 1600,800 0,800"/>' +
    '<polygon fill="#1f1040" points="0,840 200,760 420,820 640,750 880,830 1120,760 1360,830 1600,770 1600,900 0,900"/>' +
    `<g fill="#0c0620">${trees}</g>` +
    '<g fill="#fff" fill-opacity=".9"><path d="M300 150 l14 -8 l14 8 l-14 -3z"/><path d="M380 190 l11 -6 l11 6 l-11 -2z"/><path d="M450 130 l9 -5 l9 5 l-9 -2z"/></g>' +
    "</svg>"
  );
}
function feedSVG(): string {
  const ff = FONT;
  let out = "";
  let i: number;
  const rows: Array<[string, string, string]> = [
    ["Mensajes", "Ana: ¿nos vemos a las 6?", "#34c759"],
    ["Recordatorios", "Comprar boletos de tren", "#ff9500"],
    ["Fotos", "124 nuevas de Oaxaca", "#ff2d55"],
    ["Notas", "Ideas para el viaje", "#ffcc00"],
    ["Mapas", "Ruta a Coyoacán · 24 min", "#0a84ff"],
  ];
  const cards: Array<[string, string, number]> = [
    ["Oaxaca", "3 días · 124 fotos", 0],
    ["Coyoacán", "Sábado · 6 p. m.", 1],
    ["Tren Maya", "Salida 07:40", 2],
  ];
  let defs =
    '<linearGradient id="c0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff512f"/><stop offset="1" stop-color="#f09819"/></linearGradient>' +
    '<linearGradient id="c1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0575e6"/><stop offset="1" stop-color="#00f260"/></linearGradient>' +
    '<linearGradient id="c2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8e2de2"/><stop offset="1" stop-color="#ff6a9a"/></linearGradient>';
  const tiles = [
    "#ff9a9e",
    "#a18cd1",
    "#84fab0",
    "#fccb90",
    "#8fd3f4",
    "#f6d365",
  ];
  for (i = 0; i < 6; i++) {
    defs +=
      `<linearGradient id="t${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tiles[i]}"/><stop offset="1" stop-color="${tiles[(i + 2) % 6]}"/></linearGradient>`;
  }
  out += '<rect width="1600" height="900" fill="#f2f2f7"/>';
  out += `<text x="60" y="130" font-size="112" font-weight="800" fill="#111" ${ff}>Hoy</text>`;
  out += `<text x="64" y="186" font-size="34" fill="#8e8e93" ${ff}>jueves 8 de octubre</text>`;
  cards.forEach(function (c, k) {
    const x = 60 + k * 500;
    out += `<rect x="${x}" y="226" width="470" height="270" rx="40" fill="url(#c${c[2]})"/>`;
    out += `<text x="${x + 36}" y="310" font-size="48" font-weight="700" fill="#fff" ${ff}>${c[0]}</text>`;
    out += `<text x="${x + 36}" y="356" font-size="28" fill="#fff" fill-opacity=".85" ${ff}>${c[1]}</text>`;
    out += `<rect x="${x + 36}" y="420" width="150" height="14" rx="7" fill="#fff" fill-opacity=".55"/>`;
    out += `<rect x="${x + 36}" y="450" width="230" height="14" rx="7" fill="#fff" fill-opacity=".35"/>`;
  });
  rows.forEach(function (r, k) {
    const y = 540 + k * 66;
    out += `<circle cx="94" cy="${y + 30}" r="24" fill="${r[2]}"/>`;
    out += `<text x="140" y="${y + 26}" font-size="29" font-weight="600" fill="#111" ${ff}>${r[0]}</text>`;
    out += `<text x="140" y="${y + 56}" font-size="23" fill="#6b6b70" ${ff}>${r[1]}</text>`;
    out += `<rect x="140" y="${y + 64}" width="660" height="1.5" fill="#d1d1d6"/>`;
  });
  for (i = 0; i < 6; i++) {
    const gx = 870 + (i % 3) * 226,
      gy = 540 + Math.floor(i / 3) * 170;
    out += `<rect x="${gx}" y="${gy}" width="210" height="154" rx="22" fill="url(#t${i})"/>`;
    out += `<circle cx="${gx + 150}" cy="${gy + 50}" r="22" fill="#fff" fill-opacity=".8"/>`;
  }
  return SVG_OPEN + "<defs>" + defs + "</defs>" + out + "</svg>";
}

const BGS: Record<BackgroundId, () => string> = {
  mosaic: mosaicSVG,
  sunset: sunsetSVG,
  feed: feedSVG,
};
const bgCache: Partial<Record<BackgroundId, string>> = {};
export function bgUrl(k: BackgroundId): string {
  if (!bgCache[k])
    bgCache[k] =
      'url("data:image/svg+xml;utf8,' + encodeURIComponent(BGS[k]()) + '")';
  return bgCache[k];
}