<div class="hub-stage">

  <!-- BACKGROUND dynamique -->
  <div class="dynamic-bg" id="dynamicBg"></div>

  <!-- PANNEAU HUB -->
  <div class="hub-panel" id="hubPanel">
    <h1 class="hub-title">Choisissez votre jeu</h1>

  <div class="game-grid">
      <button class="game-card" data-game="fo4">
        <div class="game-card-bg" style="background-image:url('assets/fo4.jpg')"></div>
        <h2>Fallout 4</h2>
      </button>

  <button class="game-card" data-game="london">
        <div class="game-card-bg" style="background-image:url('assets/london.jpg')"></div>
        <h2>Fallout London</h2>
      </button>

  <button class="game-card" data-game="fnv">
        <div class="game-card-bg" style="background-image:url('assets/fnv.jpg')"></div>
        <h2>New Vegas</h2>
      </button>

   <button class="game-card" data-game="ttw">
        <div class="game-card-bg" style="background-image:url('assets/ttw.jpg')"></div>
        <h2>TTW</h2>
      </button>

  <button class="game-card" data-game="cyberpunk">
        <div class="game-card-bg" style="background-image:url('assets/cyberpunk.jpg')"></div>
        <h2>Cyberpunk 2077</h2>
      </button>
    </div>
  </div>

  <!-- PANNEAU JEU -->
  <div class="game-panel" id="gamePanel">
    <img id="dynamicRobot" class="hub-bot">
    <h1 id="dynamicTitle"></h1>

  <div class="hub-buttons-gap">
      <a id="guideText" class="btn-hub-large btn-orange">Guide Écrit</a>
      <a id="guideVideo" class="btn-hub-large btn-red" target="_blank">Guide Vidéo</a>
    </div>

  <button class="back-btn" onclick="closePanel()">Retour</button>
  </div>

</div>
