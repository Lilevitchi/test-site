document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const baseOffset = 10; // Ta marge de 10px

  const updateOffset = () => {
    const footer = document.querySelector(".md-footer");
    const vh = window.innerHeight;
    let offsetValue = baseOffset;

    if (footer) {
      const rect = footer.getBoundingClientRect();
      // Si le haut du footer entre dans l'écran (rect.top est la distance entre le haut du footer et le haut de la fenêtre)
      if (rect.top < vh) {
        const visibleFooterHeight = vh - rect.top;
        offsetValue = visibleFooterHeight + baseOffset;
      }
    }
    // On met à jour la variable CSS
    root.style.setProperty("--sidebar-footer-offset", offsetValue + "px");
  };

  // 1. Surveillance du scroll et du redimensionnement
  window.addEventListener("scroll", updateOffset, { passive: true });
  window.addEventListener("resize", updateOffset);

  // 2. Surveillance des changements dans la page (pour MkDocs Material)
  const observer = new MutationObserver(updateOffset);
  observer.observe(document.body, { childList: true, subtree: true });

  // 3. Premier calcul immédiat
  updateOffset();
});
