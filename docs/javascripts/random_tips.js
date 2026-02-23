document$.subscribe(function() {

  // === HUB CLASS ET ROBOT TIPS ===
  const isHub = document.querySelector('.hub-wrapper');
  if (isHub) {
    document.body.classList.add("is-hub");

    // Robot tips
    const tipElement = document.getElementById("lile-bot-tip");
    if (tipElement) {
      let category = "general";
      const url = window.location.href;
      if (url.includes("fallout4")) category = "fallout4";
      else if (url.includes("fallout-london")) category = "fallout-london";
      else if (url.includes("fnv")) category = "fnv";
      else if (url.includes("ttw")) category = "ttw";
      else if (url.includes("cyberpunk")) category = "cyberpunk";

      const allTips = {
        general: [
          "Lisez toujours la description d'un mod en entier. 90% des bugs viennent d'une consigne ignorée !",
          "N'installez pas 50 mods d'un coup. Testez votre jeu tous les 5 à 10 mods pour isoler les problèmes.",
          "Utilisez les profils sur Vortex pour tester des configurations sans risque.",
          "Évitez de désinstaller des mods scriptés en pleine partie."
        ],
        fallout4: [
          "Pour Fallout 4, le Buffout 4 est indispensable pour stabiliser votre jeu.",
          "Attention au 'Previsibines' : modifier les décors peut casser vos FPS !",
          "Le script extender (F4SE) doit toujours être lancé en mode administrateur."
        ],
        "fallout-london": [
          "Fallout London nécessite une version 'downgradée' de Fallout 4.",
          "Pensez à vider votre dossier de sauvegardes avant de commencer London."
        ],
        fnv: ["New Vegas : attention aux conflits entre mods."],
        ttw: ["TTW combine Fallout 3 et 4 : vérifiez compatibilité mods."],
        cyberpunk: ["Cyberpunk 2077 : sauvegardez avant les mods scriptés."]
      };

      const tips = allTips[category] || allTips.general;
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      tipElement.innerText = randomTip;
    }

  } else {
    document.body.classList.remove("is-hub");
  }

  // === JEUX ACTIFS (animation + sélection) ===
  const games = document.querySelectorAll('.game-card');
  const burgerItems = document.querySelectorAll('.burger-item');

  // fonction pour définir le jeu actif
  const setActiveGame = (slug) => {
    games.forEach(card => {
      const href = card.getAttribute('href');
      if (href.includes(slug)) {
        card.classList.add('active-game');
        // animation visible
        card.style.transform = 'translateY(-15px)';
        card.style.transition = 'transform 0.5s ease-out';
        setTimeout(() => card.style.transform = '', 500);
      } else {
        card.classList.remove('active-game');
      }
    });
    burgerItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href.includes(slug)) item.classList.add('active-game');
      else item.classList.remove('active-game');
    });
  };

  // === détecter page actuelle pour activer le jeu correspondant ===
  const url = window.location.href;
  let currentSlug = "fallout4"; // fallback par défaut
  if (url.includes("fallout-london")) currentSlug = "fallout-london";
  else if (url.includes("fnv")) currentSlug = "fnv";
  else if (url.includes("ttw")) currentSlug = "ttw";
  else if (url.includes("cyberpunk")) currentSlug = "cyberpunk";
  else if (url.includes("fallout4")) currentSlug = "fallout4";

  setActiveGame(currentSlug);

  // === clic sur les cartes ===
  games.forEach(card => {
    card.addEventListener('click', () => {
      const href = card.getAttribute('href');
      // extraire slug du href
      const slug = href.replace(/\/$/, '').split('/').pop();
      setActiveGame(slug);
    });
  });

  // === BURGER HUB ===
  const burger = document.getElementById("hubBurgerToggle");
  const burgerMenu = document.getElementById("hubBurgerMenu");
  if (burger && burgerMenu) {
    burger.addEventListener("click", () => {
      burgerMenu.classList.toggle("open");
    });
  }

  // === COPYRIGHT MOBILE (supprimer sur petit écran) ===
  const hideCopyrightMobile = () => {
    if (window.innerWidth <= 768) {
      const copyright = document.querySelector('.md-footer-meta__inner .md-copyright');
      if (copyright) copyright.style.display = 'none';
    }
  };
  hideCopyrightMobile();
  window.addEventListener('resize', hideCopyrightMobile);

});
