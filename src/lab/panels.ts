import { $ } from "../lib/utils.js";

const GLYPH =
  '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></svg>';

export function panelHTML(
  title: string,
  sub: string,
  rows: Array<[string, string]>,
  foot: string,
): string {
  return (
    `<div class="gc-head l1">${GLYPH}<div><div class="gc-title l1">${title}</div><div class="gc-sub l2">${sub}</div></div></div>` +
    '<div class="gc-rows">' +
    rows
      .map(function (r) {
        return `<div class="gc-row"><span class="l1">${r[0]}</span><span class="l2">${r[1]}</span></div>`;
      })
      .join("") +
    "</div>" +
    (foot ? '<div class="gc-foot l3">' + foot + "</div>" : "")
  );
}

export function shell(inner: string): string {
  return '<div class="gl-surface"></div><div class="gl-content">' + inner + "</div>";
}

const TAB =
  '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const TABS: Array<[string, string, string]> = [
  [
    " on",
    '<rect x="3.5" y="5" width="17" height="14" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m4 17 5-4 4 3 3-2 4 3"/>',
    "Fotos",
  ],
  ["", '<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M7 4.5h10"/>', "Álbumes"],
  ["", '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2"/>', "Buscar"],
  [
    "",
    '<path d="M4 8h9M17 8h3M4 16h3M11 16h9"/><circle cx="15" cy="8" r="2"/><circle cx="9" cy="16" r="2"/>',
    "Ajustes",
  ],
];

export function initPanels(): void {
  $("#bar").innerHTML = shell(
    TABS.map(function (t) {
      return `<div class="tab${t[0]}">${TAB}${t[1]}</svg><span>${t[2]}</span></div>`;
    }).join(""),
  );
  $("#panel").innerHTML = shell("");
}