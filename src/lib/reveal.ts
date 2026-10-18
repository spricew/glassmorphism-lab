/**
 * Revelado al hacer scroll. Las secciones marcadas con `data-reveal` empiezan
 * ocultas (solo si el documento lleva la clase `js` y el usuario no prefiere
 * menos movimiento; el CSS decide) y al asomarse la primera vez reciben
 * `data-reveal="in"` para entrar con la misma subida del hero.
 */
export function initReveal(): void {
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]"),
  );
  if (targets.length === 0) return;

  /* Sin IntersectionObserver no hay revelado: se muestran de una para no
     dejar contenido perdido. */
  if (typeof IntersectionObserver === "undefined") {
    for (const el of targets) el.dataset.reveal = "in";
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = "in";
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -30% 0px" },
  );
  for (const el of targets) io.observe(el);
}
