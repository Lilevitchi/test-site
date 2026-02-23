document$.subscribe(function() {
  const isHub = document.querySelector('.hub-wrapper');
  if (!isHub) return;

  const pathname = window.location.pathname.toLowerCase();

  const games = document.querySelectorAll('.game-card');
  const burgerItems = document.querySelectorAll('#hubBurgerMenu .burger-item');

  games.forEach(card => {
    const href = card.getAttribute('href').toLowerCase();

    if (pathname.endsWith(href) || pathname.includes(href)) {
      // Active la carte et laisse CSS gérer l'animation
      card.classList.add('active-game');

      // Si tu veux une entrée animée plus douce au chargement
      card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
    } else {
      card.classList.remove('active-game');
      card.style.transition = ''; // reset
    }
  });

  // Active le burger correspondant
  burgerItems.forEach(item => {
    const href = item.getAttribute('href').toLowerCase();
    if (pathname.endsWith(href) || pathname.includes(href)) {
      item.classList.add('active-game');
    } else {
      item.classList.remove('active-game');
    }
  });
});
