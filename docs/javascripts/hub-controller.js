<script>
function initHub() {

  const games = {
    fo4: {
      bg: "assets/fo4.jpg",
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
  };

  const hubBg      = document.getElementById("hub-bg");
  const hubRobot   = document.getElementById("hub-bot");
  const gameTitle  = document.getElementById("game-title");
  const guideText  = document.getElementById("guide-text");
  const guideVideo = document.getElementById("guide-video");
  const gamePanel  = document.getElementById("game-panel");

  document.querySelectorAll(".game-card").forEach(card => {

    card.addEventListener("click", () => {

      const key = card.dataset.game;
      const game = games[key];
      if (!game) return;

      hubRobot.style.opacity = "0";
      hubRobot.style.transform = "translateY(20px)";

      setTimeout(() => {

        if (hubBg) {
          hubBg.style.backgroundImage = `url(${game.bg})`;
        }

        if (hubRobot) {
          hubRobot.src = game.robot;
        }

        if (gameTitle) {
          gameTitle.textContent = game.title;
        }

        if (guideText) {
          guideText.href = game.textLink;
        }

        if (guideVideo) {
          guideVideo.href = game.videoLink;
        }

        hubRobot.style.opacity = "1";
        hubRobot.style.transform = "translateY(0)";

      }, 200);

      if (gamePanel) {
        gamePanel.classList.add("active");
      }

    });

  });

  window.closeGame = function() {
    if (gamePanel) {
      gamePanel.classList.remove("active");
    }
  };
}

/* Compatible Material for MkDocs */
document.addEventListener("DOMContentLoaded", initHub);
if (typeof document$ !== "undefined") {
  document$.subscribe(initHub);
}
</script>
