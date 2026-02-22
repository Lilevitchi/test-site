function initRobotTips() {
    const tipElement = document.getElementById("lile-bot-tip");
    if (!tipElement) return;

    // Détection du jeu via l'URL
    const url = window.location.href;
    let category = "general"; // Par défaut

    if (url.includes("fallout4")) category = "fo4";
    else if (url.includes("fallout-london")) category = "london";
    // Ajoute tes autres jeux ici...

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

    // Sélection des astuces selon la catégorie
    const tips = allTips[category] || allTips["general"];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Injection (sans titre)
    tipElement.innerText = randomTip;
}

document$.subscribe(function() {
    // 1. Initialise les tips aléatoires (si sur un Index)
    initRobotTips();

    // 2. Gestion immédiate des sidebars
    const sidebars = document.querySelectorAll('.md-sidebar');
    const isHub = document.querySelector('.hub-wrapper');

    if (isHub) {
        sidebars.forEach(s => s.style.display = 'none');
    } else {
        sidebars.forEach(s => s.style.display = 'block');

        // FORCE LE RENDU IMMÉDIAT
        // On attend 50ms pour être sûr que MkDocs a fini d'injecter le HTML
        setTimeout(() => {
            // Simule un scroll pour activer la barre de progression
            window.dispatchEvent(new Event("scroll"));
            // Simule un resize pour forcer le Layout Controller à dessiner la sidebar de droite
            window.dispatchEvent(new Event("resize"));
            
            // Si tes autres scripts ont des fonctions accessibles, on les appelle
            if (typeof updateFooterHeight === "function") updateFooterHeight();
            if (typeof buildSidebar === "function") buildSidebar();
        }, 50);
    }
});
