/* =====================================================
   PROGRESS BAR CONTROLLER (Header Sync)
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  let ticking = false;

  const updateProgressBar = () => {
    // 1. Calcul de la progression du scroll
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    // 2. Mise à jour de la largeur de la barre orange
    root.style.setProperty("--scroll-progress", `${scrolled}%`);

    // 3. Gestion dynamique de l'arrondi (Border Radius)
    // On récupère la valeur actuelle de ton radius (ex: 8px)
    const radiusStyle = getComputedStyle(root).getPropertyValue('--radius-md').trim() || '8px';

    if (scrolled > 99) {
      // Arrivé au bout : on applique l'arrondi à droite
      root.style.setProperty("--progress-radius", radiusStyle);
    } else {
      // En cours de route : bord droit vertical net
      root.style.setProperty("--progress-radius", "0px");
    }
  };

  // Optimisation via requestAnimationFrame pour la performance
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressBar();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Exécution immédiate pour gérer le cas où on charge la page déjà scrollée
  updateProgressBar();
});
