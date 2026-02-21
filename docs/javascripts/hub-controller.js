<script>
function initHub() {
  // Définition des jeux
  const games = {
    fo4: {
      bg: "assets/Fond.png",             // fond par défaut ou image spécifique
      robot: "assets/lile-bot-fo4.png",
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
    }
    // Ajoute d'autres jeux ici
  };

  // Récupération des éléments du DOM
  const hubBg      = document.getElementById("hub-bg");
  const hubRobot   = document.getElementById("hub-bot");
  const gameTitle  = document.getElementById("game-title");
  const guideText  = document.getElementById("guide-text");
  const guideVideo = document.getElementById("guide-video");
  const gamePanel  = document.getElementById("game-panel");

  // Ajout de l'écouteur sur chaque carte
  document.querySelectorAll(".game-card").forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.game;
      const game = games[key];
      if (!game) return;

      // Animation du robot
      hubRobot.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      hubRobot.style.opacity = "0";
      hubRobot.style.transform = "translateY(20px)";

      setTimeout(() => {
        // Mise à jour du fond
        if (hubBg) hubBg.style.backgroundImage = `url(${game.bg})`;

        // Mise à jour du robot
        if (hubRobot) hubRobot.src = game.robot;

        // Mise à jour du titre
        if (gameTitle) gameTitle.textContent = game.title;

        // Mise à jour des liens
        if (guideText) guideText.href = game.textLink;
        if (guideVideo) guideVideo.href = game.videoLink;

        // Remise du robot en place
        hubRobot.style.opacity = "1";
        hubRobot.style.transform = "translateY(0)";
      }, 200);

      // Ouverture du panel rideau
      if (gamePanel) gamePanel.classList.add("active");
    });
  });

  // Fermeture du panel
  window.closeGame = function() {
    if (gamePanel) gamePanel.classList.remove("active");
  };
}

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", initHub);
if (typeof document$ !== "undefined") {
  document$.subscribe(initHub);
}
</script>
