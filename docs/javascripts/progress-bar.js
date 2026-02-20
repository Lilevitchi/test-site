/* =====================================================
   PROGRESS BAR CONTROLLER
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  let ticking = false;

  const updateProgressBar = () => {
    // Calcul de la progression
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    // Envoi de la largeur au CSS
    root.style.setProperty("--scroll-progress", `${scrolled}%`);

    // Gestion de l'arrondi final (Radius)
    // On applique le radius seulement quand on touche presque le bord droit
    if (scrolled > 99.5) {
      root.style.setProperty("--progress-radius", "var(--radius-md)");
    } else {
      root.style.setProperty("--progress-radius", "0px");
    }
  };

  // Performance : on n'écoute le scroll que quand c'est nécessaire
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressBar();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Lancement initial
  updateProgressBar();
});
