document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const footer = document.querySelector(".md-footer");

  /* --- A. HAUTEUR DYNAMIQUE --- */
  const updateHeight = () => {
    if (!footer) return;
    const visibleHeight = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
    root.style.setProperty("--footer-visible-height", `${visibleHeight}px`);
  };
  window.addEventListener("scroll", () => window.requestAnimationFrame(updateHeight), { passive: true });

  /* --- B. RECONSTRUCTION DE LA SIDEBAR DROITE --- */
  const buildSidebar = () => {
    const tocList = document.querySelector('.md-sidebar--secondary .md-nav__list');
    if (!tocList) return;

    // 1. Créer le titre fixe en haut (Le titre de ton premier H2)
    const firstH2 = document.querySelector('h2');
    if (firstH2) {
      const titleElement = document.createElement('div');
      titleElement.style.cssText = "color:#fff; font-size:10px; font-weight:700; text-transform:uppercase; padding:10px; cursor:default;";
      titleElement.innerText = firstH2.innerText;
      tocList.parentElement.prepend(titleElement);
    }

    // 2. Injection des H3 des custom-cards
    const cards = document.querySelectorAll('.custom-card h3');
    cards.forEach(h3 => {
      // On crée le lien pour la sidebar
      const li = document.createElement('li');
      li.className = 'md-nav__item';
      li.innerHTML = `<a class="md-nav__link nav-item-h3"><span>${h3.innerText}</span></a>`;

      // On trouve le H2 parent
      let prevH2 = h3.closest('.custom-card').previousElementSibling;
      while (prevH2 && prevH2.tagName !== 'H2') prevH2 = prevH2.previousElementSibling;

      if (prevH2) {
        // On cherche le lien correspondant dans la sidebar pour insérer en dessous
        const links = tocList.querySelectorAll('.md-nav__link');
        links.forEach(link => {
          if (link.innerText.trim() === prevH2.innerText.trim()) {
            link.parentElement.appendChild(li);
          }
        });
      }
    });
  };

  buildSidebar();
  updateHeight();
});
