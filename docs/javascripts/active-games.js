document$.subscribe(function() {

  const isHub = document.querySelector('.hub-wrapper');
  if (!isHub) return;

  // Déterminer le jeu actif selon l'URL
  const pathname = window.location.pathname.toLowerCase();
  const games = document.querySelectorAll('.game-card');
  const burgerItems = document.querySelectorAll('#hubBurgerMenu .burger-item');

  games.forEach(card => {
    const href = card.getAttribute('href').toLowerCase();
    if (pathname.endsWith(href) || pathname.includes(href)) {
      card.classList.add('active-game');

      // Animation pour faire "monter" la carte active
      card.style.transform = 'translateY(-10px)';
      card.style.transition = 'transform 0.5s ease-out';
      setTimeout(() => {
        card.style.transform = '';
      }, 500);

    } else {
      card.classList.remove('active-game');
    }
  });

  // Si tu veux aussi activer le burger
  burgerItems.forEach(item => {
    const href = item.getAttribute('href').toLowerCase();
    if (pathname.endsWith(href) || pathname.includes(href)) {
      item.classList.add('active-game');
    } else {
      item.classList.remove('active-game');
    }
  });

});
