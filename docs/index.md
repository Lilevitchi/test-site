<div class="hub-wrapper">

  <!-- Background dynamique -->
  <div class="hub-bg" id="hub-bg"></div>

  <div class="hub-main-container">

    <!-- Robot -->
  <img src="assets/lile-bot.png"
         class="hub-bot"
         id="hub-bot"
         alt="Robot mascotte">

  <div class="hub-content">

  <h1 class="hub-title">Choisis ton jeu</h1>

  <div class="game-grid">

        <!-- Fallout 4 -->
  <div class="game-card" data-game="fo4">
          <div class="game-card-bg"
               style="background-image:url('assets/fo4.jpg')">
          </div>
          <h2>Fallout 4</h2>
        </div>

        <!-- Fallout London -->
  <div class="game-card" data-game="london">
          <div class="game-card-bg"
               style="background-image:url('assets/london.jpg')">
          </div>
          <h2>Fallout London</h2>
        </div>

        <!-- Ajoute d'autres jeux ici -->
        <!--
  <div class="game-card" data-game="newvegas">
          <div class="game-card-bg"
               style="background-image:url('assets/fnv.jpg')">
          </div>
          <h2>New Vegas</h2>
        </div>
        -->

  </div>
  </div>
  </div>
</div>


<!-- ============================================================
     PANEL JEU (Rideau)
============================================================ -->

<div class="game-panel" id="game-panel">

  <div class="game-panel-content">

  <h1 id="game-title"></h1>

  <div class="hub-buttons-gap">
      <a id="guide-video" class="btn-hub-large btn-orange" target="_blank">
        Guide Vidéo
      </a>

  <a id="guide-text" class="btn-hub-large btn-red">
        Guide Écrit
      </a>
    </div>

<button class="btn-back" onclick="closeGame()">
      Retour
    </button>

  </div>
</div>
