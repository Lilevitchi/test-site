document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const baseOffset = 10;

  const updateOffset = () => {
    const footer = document.querySelector(".md-footer");
    if (!footer) return;

    // On calcule la position du footer par rapport à la zone d'affichage
    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // L'offset est soit 10px, soit (si le footer est visible) 
    // la hauteur visible du footer + 10px
    const visibleFooterHeight = Math.max(0, viewportHeight - footerRect.top);
    const offsetValue = baseOffset + visibleFooterHeight;

    // On applique la variable sans changer la structure de la page
    root.style.setProperty("--sidebar-footer-offset", `${offsetValue}px`);
  };

  // Utilisation de requestAnimationFrame pour une fluidité totale au scroll
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateOffset();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", updateOffset);
  
  // Surveillance des changements de page MkDocs
  const observer = new MutationObserver(updateOffset);
  observer.observe(document.body, { childList: true, subtree: true });

  updateOffset();
});
