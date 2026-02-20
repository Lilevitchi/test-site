document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  let ticking = false;

  const updateProgressBar = () => {
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    root.style.setProperty("--scroll-progress", `${scrolled}%`);

    // On récupère la valeur de ton radius proprement (ex: "8px")
    const radiusValue = getComputedStyle(root).getPropertyValue('--radius-md').trim();

    if (scrolled > 99) {
      // On injecte la valeur récupérée (ex: 8px)
      root.style.setProperty("--progress-radius", radiusValue);
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
