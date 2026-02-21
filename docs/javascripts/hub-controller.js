function initHub() {
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
    const actionButtons = document.getElementById("action-buttons");
    const cards = document.querySelectorAll(".mini-card");

    if (!hubRobot) return;

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const data = games[card.dataset.game];
            if (!data) return;

            // 1. Visuel des cartes
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            // 2. Transition rapide (on cache d'abord)
            hubRobot.style.opacity = "0";
            hubRobot.style.transform = "scale(0.95)";
            gameTitle.style.opacity = "0";

            // 3. Préchargement technique pour éviter les saccades
            const imgPreload = new Image();
            imgPreload.src = data.robot;
            
            imgPreload.onload = () => {
                hubBg.style.backgroundImage = `url('${data.bg}')`;
                hubRobot.src = data.robot;
                gameTitle.textContent = data.title; // Mise à jour du titre ici !
                
                document.getElementById("guide-text").href = data.textLink;
                document.getElementById("guide-video").href = data.videoLink;

                // 4. Affichage simultané
                gameTitle.style.opacity = "1";
                hubRobot.style.opacity = "1";
                hubRobot.style.transform = "scale(1)";
                actionButtons.classList.add("visible");
            };
        });
    });
}

// Support Navigation MkDocs Material
document$.subscribe(() => {
    initHub();
});
