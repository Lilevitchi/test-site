function initModernHub() {
    const games = {
        fo4: { bg: "assets/fo4.jpg", robot: "assets/lile-bot-fo4.png", title: "Bienvenue dans le Commonwealth", textLink: "fallout4/intro/", videoLink: "https://youtu.be/..." },
        london: { bg: "assets/london.jpg", robot: "assets/lile-bot-london.png", title: "Bienvenue à London", textLink: "fallout-london/intro/", videoLink: "#" },
        newvegas: { bg: "assets/newvegas.jpg", robot: "assets/lile-bot-newvegas.png", title: "Bienvenue à New Vegas", textLink: "fnv/intro/", videoLink: "#" },
        ttw: { bg: "assets/ttw.jpg", robot: "assets/lile-bot-ttw.png", title: "Bienvenue dans TTW", textLink: "ttw/intro/", videoLink: "#" },
        cyberpunk: { bg: "assets/cyberpunk.jpg", robot: "assets/lile-bot-cyberpunk.png", title: "Bienvenue à Night City", textLink: "cyberpunk/intro/", videoLink: "#" }
    };

    const hubBg = document.getElementById("hub-bg");
    const hubRobot = document.getElementById("hub-bot");
    const gameTitle = document.getElementById("game-title");
    const actionPanel = document.getElementById("action-buttons");
    const cards = document.querySelectorAll(".mini-card");

    if (!hubRobot || cards.length === 0) return;

    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault(); // Empêche tout comportement bizarre
            const key = card.dataset.game;
            const game = games[key];

            // 1. État Actif Visuel
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            // 2. Animation de transition (on réduit le délai pour moins de saccades)
            hubRobot.style.opacity = "0";
            
            setTimeout(() => {
                // Mise à jour image de fond (directement via style pour éviter les sauts)
                if(hubBg) hubBg.style.backgroundImage = `url('${game.bg}')`;
                
                hubRobot.src = game.robot;
                gameTitle.textContent = game.title;
                
                // On s'assure que les liens pointent au bon endroit
                document.getElementById("guide-text").setAttribute("href", game.textLink);
                document.getElementById("guide-video").setAttribute("href", game.videoLink);

                // On force l'apparition du panel de boutons
                actionPanel.classList.remove("hidden-action");
                actionPanel.classList.add("visible");
                
                hubRobot.style.opacity = "1";
            }, 150); 
        });
    });
}

// CRUCIAL : Relancer au chargement de MkDocs
document$.subscribe(function() {
    initModernHub();
});
