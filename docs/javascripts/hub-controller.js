<script>
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
  // ajoute les autres jeux ici
};

document.querySelectorAll(".game-card").forEach(card => {
  card.addEventListener("click", () => {
    const game = games[card.dataset.game];

    document.getElementById("dynamicBg").style.backgroundImage =
      `url(${game.bg})`;

    document.getElementById("dynamicRobot").src = game.robot;
    document.getElementById("dynamicTitle").textContent = game.title;
    document.getElementById("guideText").href = game.textLink;
    document.getElementById("guideVideo").href = game.videoLink;

    document.getElementById("hubPanel").classList.add("active");
    document.getElementById("gamePanel").classList.add("active");
  });
});

function closePanel() {
  document.getElementById("hubPanel").classList.remove("active");
  document.getElementById("gamePanel").classList.remove("active");
}
</script>
