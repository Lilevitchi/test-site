document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const footer = document.querySelector(".md-footer");
  
  // Variables pour stabiliser le calcul
  let lastHeight = 0;
  let ticking = false;

  const updateHeight = () => {
    if (!footer) return;

    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // 1. Calcul de la hauteur brute
    const rawVisibleHeight = Math.max(0, viewportHeight - footerRect.top);
    
    // 2. Arrondi au pixel entier pour éviter que le texte ne saute
    const roundedHeight = Math.round(rawVisibleHeight);

    // 3. Seuil de tolérance : on ne met à jour que si le changement est > 1px
    // Cela évite les micro-calculs qui font vibrer la sidebar en remontant
    if (Math.abs(roundedHeight - lastHeight) > 1) {
      root.style.setProperty("--footer-visible-height", `${roundedHeight}px`);
      lastHeight = roundedHeight;
    }
  };

  // Utilisation d'un flag (ticking) pour ne pas saturer le processeur
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeight();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Exécution immédiate pour caler la sidebar au chargement
  updateHeight();
});
