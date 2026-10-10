function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function hilite(code: string): string {
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