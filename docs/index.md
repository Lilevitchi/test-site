---
title: Modding
hide:
  - navigation
  - toc
  - footer
---

<div class="master-hub" id="masterHub">
    <div class="hub-bg" id="dynamicBg"></div>

  <div class="hub-curtain">
        <img src="assets/lile-bot.png" class="hub-bot-small">
        <h1 class="hub-main-title" id="hubTitle">Choisissez votre univers</h1>
        
  <div class="game-selection-bar">
            <div class="game-card-mini" onclick="selectGame('fo4', 'Fallout 4', 'assets/fo4.jpg')">
                <img src="assets/fo4.jpg"><span>Fallout 4</span>
            </div>
            <div class="game-card-mini" onclick="selectGame('london', 'Fallout London', 'assets/london.jpg')">
                <img src="assets/london.jpg"><span>Fallout London</span>
            </div>
            <div class="game-card-mini" onclick="selectGame('nv', 'New Vegas', 'assets/fnv.jpg')">
                <img src="assets/fnv.jpg"><span>New Vegas</span>
            </div>
            <div class="game-card-mini" onclick="selectGame('ttw', 'Tale of Two Wastelands', 'assets/ttw.jpg')">
                <img src="assets/ttw.jpg"><span>TTW</span>
            </div>
            <div class="game-card-mini" onclick="selectGame('cp', 'Cyberpunk 2077', 'assets/cyberpunk.jpg')">
                <img src="assets/cyberpunk.jpg"><span>Cyberpunk 2077</span>
            </div>
        </div>

   <div class="game-options-area" id="optionsArea">
            <div class="hub-buttons-gap">
                <a href="#" id="linkWritten" class="btn-hub-large btn-orange">
                    <i class="fas fa-book"></i> Guide Écrit
                </a>
                <a href="#" id="linkVideo" target="_blank" class="btn-hub-large btn-red">
                    <i class="fab fa-youtube"></i> Guide Vidéo
                </a>
            </div>
            <button class="btn-back" onclick="resetHub()">← Retour au menu</button>
        </div>
    </div>
</div>
