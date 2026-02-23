document$.subscribe(function() {
  const isHub = document.querySelector('.hub-wrapper');
  if (!isHub) return;

  // Récupère le path de la page actuelle
  const pathname = window.location.pathname.toLowerCase();

  // Liste des cartes et burger
  const games = document.querySelectorAll('.game-card');
  const burgerItems = document.querySelectorAll('#hubBurgerMenu .burger-item');

  // Détermine le jeu actif
  const setActive = (elementList) => {
    elementList.forEach(el => {
      const href = el.getAttribute('href').toLowerCase();
      if (pathname.endsWith(href) || pathname.includes(href)) {
        el.classList.add('active-game');
      } else {
        el.classList.remove('active-game');
      }
    });
  };

  setActive(games);
  setActive(burgerItems);
});
