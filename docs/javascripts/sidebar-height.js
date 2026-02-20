document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const footer = document.querySelector(".md-footer");
  const baseGap = 10; 

  const updateHeight = () => {
    if (!footer) return;

    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // On calcule combien de pixels du footer sont visibles
    const visibleFooterHeight = Math.max(0, viewportHeight - footerRect.top);
    
    // On met à jour la variable CSS
    // Si le footer n'est pas là, c'est 0. S'il monte, ça augmente.
    root.style.setProperty("--footer-visible-height", `${visibleFooterHeight}px`);
  };

  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateHeight);
  }, { passive: true });

  updateHeight();
});
