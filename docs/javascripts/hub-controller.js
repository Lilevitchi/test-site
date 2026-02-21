function runHub() {
    const games = {
        fo4: { bg: "assets/fo4.jpg", robot: "assets/lile-bot-fo4.png", title: "Bienvenue dans le Commonwealth", text: "fallout4/intro/", video: "https://youtu.be/..." },
        london: { bg: "assets/london.jpg", robot: "assets/lile-bot-london.png", title: "Bienvenue à London", text: "fallout-london/intro/", video: "#" },
        newvegas: { bg: "assets/newvegas.jpg", robot: "assets/lile-bot-newvegas.png", title: "Bienvenue à New Vegas", text: "fnv/intro/", video: "#" },
        ttw: { bg: "assets/ttw.jpg", robot: "assets/lile-bot-ttw.png", title: "Bienvenue dans TTW", text: "ttw/intro/", video: "#" },
        cyberpunk: { bg: "assets/cyberpunk.jpg", robot: "assets/lile-bot-cyberpunk.png", title: "Bienvenue à Night City", text: "cyberpunk/intro/", video: "#" }
    };

    const robotImg = document.getElementById("hub-bot");
    const titleEl = document.getElementById("game-title");
    const actionBox = document.getElementById("action-buttons");
    const cards = document.querySelectorAll(".mini-card");

    if (!robotImg || cards.length === 0) return;

    cards.forEach(card => {
        card.onclick = function() {
            const data = games[this.dataset.game];
            
            // Appliquer les changements immédiatement
            document.getElementById("hub-bg").style.backgroundImage = `url('${data.bg}')`;
            robotImg.src = data.robot;
            titleEl.textContent = data.title;
            
            document.getElementById("guide-text").href = data.text;
            document.getElementById("guide-video").href = data.video;

            // Gestion des classes
            cards.forEach(c => c.classList.remove("active"));
            this.classList.add("active");
            actionBox.classList.add("visible");
            
            console.log("Jeu sélectionné : " + data.title);
        };
    });
}

// Sécurité MkDocs
document$.subscribe(() => {
    setTimeout(runHub, 100); // Petit délai pour laisser le HTML s'injecter
});
