function initSplitHub() {
    const games = {
        fo4: { bg: "assets/fo4.jpg", robot: "assets/lile-bot-fo4.png", title: "Bienvenue dans le Commonwealth", textLink: "fallout4/intro/", videoLink: "https://youtu.be/m_CawhgGBGk" },
        london: { bg: "assets/london.jpg", robot: "assets/lile-bot-london.png", title: "Bienvenue à London", textLink: "fallout-london/intro/", videoLink: "#" },
        newvegas: { bg: "assets/newvegas.jpg", robot: "assets/lile-bot-newvegas.png", title: "Bienvenue à New Vegas", textLink: "fnv/intro/", videoLink: "#" },
        ttw: { bg: "assets/ttw.jpg", robot: "assets/lile-bot-ttw.png", title: "Bienvenue dans TTW", textLink: "ttw/intro/", videoLink: "#" },
        cyberpunk: { bg: "assets/cyberpunk.jpg", robot: "assets/lile-bot-cyberpunk.png", title: "Bienvenue à Night City", textLink: "cyberpunk/intro/", videoLink: "#" }
    };

    const hubBg = document.getElementById("hub-bg");
    const hubRobot = document.getElementById("hub-bot");
    const gameTitle = document.getElementById("game-title");
    const actionButtons = document.getElementById("action-buttons");
    const cards = document.querySelectorAll(".mini-card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const key = card.dataset.game;
            const game = games[key];
            if (!game) return;

            // Gestion de l'état actif sur les cartes
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            // Transition de sortie
            hubRobot.style.opacity = "0";
            hubRobot.style.transform = "translateY(20px)";
            
            setTimeout(() => {
                // Mise à jour des contenus
                hubBg.style.backgroundImage = `url('${game.bg}')`;
                hubRobot.src = game.robot;
                gameTitle.textContent = game.title;
                document.getElementById("guide-text").href = game.textLink;
                document.getElementById("guide-video").href = game.videoLink;

                // Affichage du panneau de boutons
                actionButtons.classList.add("visible");

                // Transition d'entrée
                hubRobot.style.opacity = "1";
                hubRobot.style.transform = "translateY(0)";
            }, 300);
        });
    });
}

// Support Navigation MkDocs
document$.subscribe(() => {
    if (document.querySelector('.split-layout')) {
        initSplitHub();
    }
});
