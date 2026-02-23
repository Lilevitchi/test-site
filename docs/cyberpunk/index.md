---
title: Cyberpunk 2077
hide:
  - navigation
  - toc
---

<!-- Script pour ajouter is-hub dès le départ -->
<script>
  // ajoute is-hub sur le body immédiatement
  document.documentElement.classList.add('is-hub');
</script>

<div class="hub-wrapper">

  <div class="hub-bg" style="background-image: url('../assets/cyberpunk.jpg');"></div>

  <div class="hub-burger">
    <button id="hubBurgerToggle">Choisir un jeu</button>

  <div id="hubBurgerMenu" class="hub-burger-menu">

   <a href="../fallout4/" class="burger-item">Fallout 4</a>
      <a href="../fallout-london/" class="burger-item">Fallout London</a>
      <a href="../fnv/" class="burger-item">New Vegas</a>
      <a href="../ttw/" class="burger-item">TTW</a>
      <a href="../cyberpunk/" class="burger-item active-game">Cyberpunk 2077</a>

 </div>
  </div>

  <div class="split-layout">

   <div class="display-zone">
    <div class="hub-central-content">

  <div class="bot-bubble">
          <p id="lile-bot-tip">Chargement d'une astuce...</p>
        </div>

  <img src="../assets/lile-bot-cyberpunk.png"
             class="hub-bot"
             alt="Robot Cyberpunk">

   <div class="hub-overlay-content">

   <div class="custom-hub-title">
            Bienvenue à Night City
          </div>

  <div class="hub-buttons-gap">
               <a href="intro/"
               class="btn-hub-large btn-orange">
              Guide Écrit
            </a>

  <a href="https://youtu.be/m_CawhgGBGk?si=V8ovH2IEi1shkF6d"
               target="_blank"
               class="btn-hub-large btn-red">
              Guide Vidéo
            </a>
          </div>

  </div>

   </div> 
    </div>

 <div class="selection-zone">

  <div class="game-grid">

   <a href="../fallout4/" class="game-card">
          <div class="game-card-bg" style="background-image:url('../assets/fo4.jpg')"></div>
          <h2>Fallout 4</h2>
        </a>

   <a href="../fallout-london/" class="game-card">
          <div class="game-card-bg" style="background-image:url('../assets/london.jpg')"></div>
          <h2>Fallout London</h2>
        </a>

   <a href="../fnv/" class="game-card">
          <div class="game-card-bg" style="background-image:url('../assets/newvegas.jpg')"></div>
          <h2>New Vegas</h2>
        </a>

   <a href="../ttw/" class="game-card">
          <div class="game-card-bg" style="background-image:url('../assets/ttw.jpg')"></div>
          <h2>TTW</h2>
        </a>

  <a href="../cyberpunk/" class="game-card active-game">
          <div class="game-card-bg" style="background-image:url('../assets/cyberpunk.jpg')"></div>
          <h2>Cyberpunk 2077</h2>
        </a>

   </div>
    </div>

  </div>
</div>

<script>
document.getElementById("hubBurgerToggle")?.addEventListener("click", function () {
  document.getElementById("hubBurgerMenu")?.classList.toggle("open");
});
</script>
