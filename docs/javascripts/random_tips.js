document.addEventListener("DOMContentLoaded", function() {
    const tipElement = document.getElementById("lile-bot-tip");
    const titleElement = document.getElementById("lile-bot-title");

    if (tipElement && titleElement) {
        const tips = [
            {
                title: "La règle d'or",
                text: "Lisez toujours la description d'un mod en entier. 90% des bugs viennent d'une consigne ignorée !"
            },
            {
                title: "Patience est vertu",
                text: "N'installez pas 50 mods d'un coup. Testez votre jeu tous les 5 à 10 mods pour isoler les problèmes."
            },
            {
                title: "Sauvegardes propres",
                text: "Évitez de désinstaller des mods scriptés en pleine partie. Votre sauvegarde pourrait ne pas apprécier sur le long terme."
            },
            {
                title: "Les profils Vortex",
                text: "Utilisez les profils sur Vortex pour tester des configurations différentes sans risquer de casser votre installation principale."
            },
        ];

        // Choix aléatoire
        const randomTip = tips[Math.floor(Math.random() * tips.length)];

        // Injection dans la page
        titleElement.innerText = randomTip.title;
        tipElement.innerText = randomTip.text;
    }
});
