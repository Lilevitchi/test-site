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
    // 1. Relance les astuces
    initRobotTips();

    // 2. Réveil forcé des scripts de layout
    // On attend un tout petit peu que MkDocs injecte le nouveau contenu
    setTimeout(() => {
        // Simule les événements attendus par tes deux premiers JS
        document.dispatchEvent(new Event("DOMContentLoaded"));
        window.dispatchEvent(new Event("scroll"));
        window.dispatchEvent(new Event("resize"));
    }, 100);
});
