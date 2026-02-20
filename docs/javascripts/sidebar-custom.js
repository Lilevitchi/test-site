/* --- B. RECONSTRUCTION DE LA SIDEBAR DROITE --- */
  const buildSidebar = () => {
    const tocList = document.querySelector('.md-sidebar--secondary .md-nav__list');
    if (!tocList) return;

    // 1. On force le style du premier élément pour qu'il ne soit plus "spécial"
    // On cherche le premier lien qui a souvent un style différent (le titre de page)
    const firstItem = tocList.querySelector('.md-nav__item');
    if (firstItem) {
        firstItem.style.display = "block"; // On s'assure qu'il est visible
    }

    // 2. Injection des H3 des custom-cards (le reste du code ne change pas)
    const cards = document.querySelectorAll('.custom-card h3');
    cards.forEach(h3 => {
      const li = document.createElement('li');
      li.className = 'md-nav__item nav-item-card-h3'; // On ajoute une classe propre
      li.innerHTML = `<a class="md-nav__link"><span>${h3.innerText}</span></a>`;

      let prevH2 = h3.closest('.custom-card').previousElementSibling;
      while (prevH2 && prevH2.tagName !== 'H2') prevH2 = prevH2.previousElementSibling;

      if (prevH2) {
        const links = tocList.querySelectorAll('.md-nav__link');
        links.forEach(link => {
          if (link.innerText.trim().toLowerCase() === prevH2.innerText.trim().toLowerCase()) {
            link.parentElement.appendChild(li);
          }
        });
      }
    });
  };
