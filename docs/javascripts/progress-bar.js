/* =====================================================
   PROGRESS BAR CONTROLLER
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  let ticking = false;

  const updateProgressBar = () => {
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    root.style.setProperty("--scroll-progress", `${scrolled}%`);

    // Gestion de l'arrondi final à droite (radius-md)
    // Si on dépasse 99%, on arrondit le coin pour épouser le header
    if (scrolled > 99) {
      root.style.setProperty("--progress-radius", "var(--radius-md)");
    } else {
      root.style.setProperty("--progress-radius", "0px");
    }
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

  updateProgressBar();
});
