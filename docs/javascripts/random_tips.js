document$.subscribe(function() {

  // === HUB CLASS ET ROBOT TIPS ===
  const isHub = document.querySelector('.hub-wrapper');
  if (isHub) {
    document.body.classList.add("is-hub");

    // Robot tips
    const tipElement = document.getElementById("lile-bot-tip");
    if (tipElement) {
      let category = "general";
      const url = window.location.href.toLowerCase();
      if (url.includes("fallout4")) category = "fo4";
      else if (url.includes("fallout-london")) category = "london";
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
        fo4: [
          "Pour Fallout 4, le Buffout 4 est indispensable pour stabiliser votre jeu.",
          "Attention au 'Previsibines' : modifier les décors peut casser vos FPS !",
          "Le script extender (F4SE) doit toujours être lancé en mode administrateur."
        ],
        london: [
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

  // === JEUX ACTIFS (animation + selection) ===
  const games = document.querySelectorAll('.game-card');

  // Reset à l'ouverture
  games.forEach(card => card.classList.remove('active-game'));

  // Défaut si tu veux mettre Fallout 4 actif
  const defaultGame = document.querySelector('.game-card[href="fallout4/"]');
  if (defaultGame) defaultGame.classList.add('active-game');

  // Animation au clic
  games.forEach(card => {
    card.addEventListener('click', () => {
      const current = document.querySelector('.game-card.active-game');
      if (current === card) return;

      if (current) {
        current.classList.remove('active-game');
        // reset z-index après animation inverse
        setTimeout(() => current.style.zIndex = '', 400);
      }

      card.style.zIndex = 10;
      card.classList.add('active-game');
    });
  });

  // === BURGER HUB ===
  const burger = document.getElementById("hubBurgerToggle");
  const burgerMenu = document.getElementById("hubBurgerMenu");

  if (burger && burgerMenu) {
    // Affiche le burger sur mobile si jamais le style CSS le masque
    burger.style.display = 'block';

    burger.addEventListener("click", () => {
      burgerMenu.classList.toggle("open");
    });
  }

  // === COPYRIGHT MOBILE (supprimer sur petit écran) ===
  const hideCopyrightMobile = () => {
    if (window.innerWidth <= 768) {
      const copyright = document.querySelector('.md-footer-meta__inner .md-copyright');
      if (copyright) copyright.style.display = 'none';
    } else {
      const copyright = document.querySelector('.md-footer-meta__inner .md-copyright');
      if (copyright) copyright.style.display = '';
    }
  };
  hideCopyrightMobile();
  window.addEventListener('resize', hideCopyrightMobile);

});
