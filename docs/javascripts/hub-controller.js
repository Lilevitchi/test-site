<script>
function initHub() {

  // ======================
  // Définition des jeux
  // ======================
  const games = {
    fo4: {
      bg: "assets/fo4.jpg",                 // Fond pour card et hub
      robot: "assets/lile-bot-fo4.png",     // Robot spécifique
      title: "Bienvenue dans le Commonwealth",
      textLink: "fallout4/intro/",
      videoLink: "https://youtu.be/m_CawhgGBGk"
    },
    london: {
      bg: "assets/london.jpg",
      robot: "assets/lile-bot-london.png",
      title: "Bienvenue à London",
      textLink: "fallout-london/intro/",
      videoLink: "#"
    },
    newvegas: {
      bg: "assets/newvegas.jpg",
      robot: "assets/lile-bot-newvegas.png",
      title: "Bienvenue à New Vegas",
      textLink: "fnv/intro/",
      videoLink: "#"
    },
    ttw: {
      bg: "assets/ttw.jpg",
      robot: "assets/lile-bot-ttw.png",
      title: "Bienvenue dans Tale of Two Wastelands",
      textLink: "ttw/intro/",
      videoLink: "#"
    },
    cyberpunk: {
      bg: "assets/cyberpunk.jpg",
      robot: "assets/lile-bot-cyberpunk.png",
      title: "Bienvenue à Night City",
      textLink: "cyberpunk/intro/",
      videoLink: "#"
    }
  };

  // ======================
  // Références DOM
  // ======================
  const hubBg      = document.getElementById("hub-bg");
  const hubRobot   = document.getElementById("hub-bot");
  const gameTitle  = document.getElementById("game-title");
  const guideText  = document.getElementById("guide-text");
  const guideVideo = document.getElementById("guide-video");
  const gamePanel  = document.getElementById("game-panel");

  // ======================
  // Événements sur les cards
  // ======================
  document.querySelectorAll(".game-card").forEach(card => {
    card.addEventListener("click", () => {

      const key = card.dataset.game;
      const game = games[key];
      if (!game) return;

      // Animation du robot avant changement
      hubRobot.style.opacity = "0";
      hubRobot.style.transform = "translateY(20px)";

      setTimeout(() => {

        // Changer le fond
        if (hubBg) hubBg.style.backgroundImage = `url(${game.bg})`;

        // Changer le robot
        if (hubRobot) hubRobot.src = game.robot;

        // Changer le titre
        if (gameTitle) gameTitle.textContent = game.title;

        // Mettre à jour les liens des boutons
        if (guideText) guideText.href = game.textLink;
        if (guideVideo) guideVideo.href = game.videoLink;

        // Animation retour du robot
        hubRobot.style.opacity = "1";
        hubRobot.style.transform = "translateY(0)";

      }, 200);

      // Ouvrir le rideau
      if (gamePanel) gamePanel.classList.add("active");

    });
  });

  // ======================
  // Fermeture du rideau
  // ======================
  window.closeGame = function() {
    if (gamePanel) gamePanel.classList.remove("active");

    // Optionnel : remettre fond et robot par défaut
    if (hubBg) hubBg.style.backgroundImage = `url('assets/Fond.png')`;
    if (hubRobot) hubRobot.src = "assets/lile-bot.png";
  };
}

// Compatible avec Material for MkDocs
document.addEventListener("DOMContentLoaded", initHub);
if (typeof document$ !== "undefined") {
  document$.subscribe(initHub);
}
</script>
