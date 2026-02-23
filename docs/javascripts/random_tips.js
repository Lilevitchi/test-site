function initRobotTips() {
    const tipElement = document.getElementById("lile-bot-tip");
    if (!tipElement) return;

    const url = window.location.href;
    let category = "general"; 

    if (url.includes("fallout4")) category = "fo4";
    else if (url.includes("fallout-london")) category = "london";

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
        ]
    };

    const tips = allTips[category] || allTips["general"];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipElement.innerText = randomTip;
}
document$.subscribe(function() {

    initRobotTips();

    const isHub = document.querySelector('.hub-wrapper');

    if (isHub) {
        document.body.classList.add("is-hub");
    } else {
        document.body.classList.remove("is-hub");
    }

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
    } else {
      const copyright = document.querySelector('.md-footer-meta__inner .md-copyright');
      if (copyright) copyright.style.display = '';
    }
  };
  hideCopyrightMobile();
  window.addEventListener('resize', hideCopyrightMobile);
    
});
