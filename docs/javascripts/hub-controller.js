function initHub() {

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
    const guideText = document.getElementById("guide-text");
    const guideVideo = document.getElementById("guide-video");
    const cards = document.querySelectorAll(".mini-card");

    if (!hubRobot || cards.length === 0) return;

    // 🔁 RESET quand on revient sur la page
    hubBg.style.backgroundImage = "url('assets/Fond.png')";
    hubRobot.src = "assets/lile-bot.png";
    gameTitle.textContent = "Choisis ton jeu";
    actionButtons.classList.remove("visible");
    cards.forEach(c => c.classList.remove("active"));

    cards.forEach(card => {

        // ⚠️ éviter doublons si initHub relancé
        card.replaceWith(card.cloneNode(true));
    });

    const freshCards = document.querySelectorAll(".mini-card");

    freshCards.forEach(card => {

        card.addEventListener("click", () => {

            const key = card.dataset.game;
            const data = games[key];
            if (!data) return;

            // Activer la carte
            freshCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            // Animation sortie
            hubRobot.style.transition = "all 0.4s ease";
            hubRobot.style.opacity = "0";
            hubRobot.style.transform = "scale(0.92)";
            gameTitle.style.opacity = "0";

            setTimeout(() => {

                // Changement données
                hubBg.style.backgroundImage = `url('${data.bg}')`;
                hubRobot.src = data.robot;
                gameTitle.textContent = data.title;
                guideText.href = data.textLink;
                guideVideo.href = data.videoLink;

                // Afficher boutons
                actionButtons.classList.add("visible");

                // Animation entrée
                hubRobot.style.opacity = "1";
                hubRobot.style.transform = "scale(1)";
                gameTitle.style.opacity = "1";

            }, 200);
        });

    });
}


// Compatible MkDocs Material (navigation.instant)
document$.subscribe(() => {
    initHub();
});
