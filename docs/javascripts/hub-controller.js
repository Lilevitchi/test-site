<script>
document.addEventListener("DOMContentLoaded", function() {

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

  document.querySelectorAll(".game-card").forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.game;
      if (!games[key]) return;
      const game = games[key];

      hubRobot.style.opacity = 0;
      hubRobot.style.transform = "translateY(20px)";

      setTimeout(() => {
        hubBg.style.backgroundImage = `url(${game.bg})`;
        hubRobot.src = game.robot;
        gameTitle.textContent = game.title;
        guideText.href = game.textLink;
        guideVideo.href = game.videoLink;

        hubRobot.style.opacity = 1;
        hubRobot.style.transform = "translateY(0)";
      }, 200);

      gamePanel.classList.add("active");
    });
  });

  window.closeGame = function() {
    gamePanel.classList.remove("active");
  };
});
</script>
