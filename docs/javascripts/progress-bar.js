/* =====================================================
   PROGRESS BAR CONTROLLER
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  let ticking = false;

  const updateProgressBar = () => {
    // Calcule la hauteur totale scrollable
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Calcule le pourcentage (entre 0 et 100)
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    // On envoie la valeur brute à la racine CSS
    root.style.setProperty("--scroll-progress", `${scrolled}%`);
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressBar();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Init au chargement
  updateProgressBar();
});
