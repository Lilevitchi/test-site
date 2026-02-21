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
    const cards = document.querySelectorAll(".mini-card");

    if (!hubRobot || cards.length === 0) return;

    cards.forEach(card => {
    card.addEventListener("click", () => {
        const key = card.dataset.game;
        const data = games[key];
        if (!data) return;

        // Activer la carte
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        // Masquer robot et titre
        hubRobot.style.transition = "all 0.4s ease";
        hubRobot.style.opacity = 0;
        hubRobot.style.transform = "scale(0.9)";
        gameTitle.style.opacity = 0;

        // Quand la transition est terminée
        hubRobot.addEventListener("transitionend", function handler() {
            hubRobot.removeEventListener("transitionend", handler);

            // Changer fond, robot, titre et liens
            hubBg.style.backgroundImage = `url('${data.bg}')`;
            hubRobot.src = data.robot;
            gameTitle.textContent = data.title;
            document.getElementById("guide-text").href = data.textLink;
            document.getElementById("guide-video").href = data.videoLink;

            // Afficher boutons et robot
            actionButtons.classList.add("visible");
            hubRobot.style.opacity = 1;
            hubRobot.style.transform = "scale(1)";
            gameTitle.style.opacity = 1;
        }, { once: true });
    });
});
}
document.getElementById("guide-text").addEventListener("click", e => {
    e.preventDefault();
    const url = e.target.href;
    fetch(url)
        .then(r => r.text())
        .then(html => {
            document.querySelector(".md-content").innerHTML = html;
        });
});
