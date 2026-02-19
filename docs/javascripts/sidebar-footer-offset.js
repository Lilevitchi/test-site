document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".md-footer");
  const root = document.documentElement;
  const baseOffset = 10; // Marge de 10px souhaitée

  const update = () => {
    const vh = window.innerHeight;
    let offsetValue = baseOffset;

    if (footer) {
      const rect = footer.getBoundingClientRect();
      // Si le haut du footer entre dans l'écran
      if (rect.top < vh) {
        const visibleFooterHeight = vh - rect.top;
        offsetValue = visibleFooterHeight + baseOffset;
      }
    }
    root.style.setProperty("--sidebar-footer-offset", offsetValue + "px");
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update(); // Exécution immédiate au chargement
});
