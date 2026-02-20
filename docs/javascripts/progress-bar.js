document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  let ticking = false;

  const updateProgressBar = () => {
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
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

  updateProgressBar();
});
