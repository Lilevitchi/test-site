// Fonction principale du Hub
function initGameHub() {
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
    const guideText = document.getElementById("guide-text");
    const guideVideo = document.getElementById("guide-video");
    const gamePanel = document.getElementById("game-panel");
    const hubContent = document.querySelector(".hub-content"); // Pour cacher la grille

    if (!gamePanel) return; // Sécurité si on n'est pas sur l'index

    document.querySelectorAll(".game-card").forEach(card => {
        card.addEventListener("click", () => {
            const key = card.dataset.game;
            const game = games[key];
            if (!game) return;

            // 1. Animation de sortie de la mascotte et de la grille
            hubRobot.style.opacity = "0";
            hubRobot.style.transform = "translateY(30px)";
            hubContent.style.opacity = "0";
            hubContent.style.pointerEvents = "none";

            setTimeout(() => {
                // 2. Mise à jour des contenus
                hubBg.style.backgroundImage = `url('${game.bg}')`;
                hubRobot.src = game.robot;
                gameTitle.textContent = game.title;
                guideText.href = (window.location.origin + window.location.pathname).replace('index.html', '') + game.textLink;
                guideVideo.href = game.videoLink;

                // 3. Ouvrir le rideau
                gamePanel.classList.add("active");

                // 4. Animation d'entrée de la nouvelle mascotte
                setTimeout(() => {
                    hubRobot.style.opacity = "1";
                    hubRobot.style.transform = "translateY(0)";
                }, 100);
            }, 300);
        });
    });

    // Fonction de fermeture
    window.closeGame = function() {
        gamePanel.classList.remove("active");
        hubContent.style.opacity = "1";
        hubContent.style.pointerEvents = "all";
        
        // Reset optionnel du fond et du robot par défaut
        setTimeout(() => {
            hubBg.style.backgroundImage = "url('assets/Fond.png')";
            hubRobot.src = "assets/lile-bot.png";
        }, 500);
    };
}

// Compatibilité MkDocs Material (Navigation instantanée)
document$.subscribe(function() {
    initGameHub();
});
