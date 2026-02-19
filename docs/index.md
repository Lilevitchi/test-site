# 🧪 Test des Cartes Personnalisées

Ici, nous testons l'insertion de blocs `.custom-card` à l'intérieur du conteneur central qui n'a pas de padding.

<div class="custom-card">
  <h3>📦 Carte de Présentation</h3>
  <p>Cette carte utilise la couleur <code>--bg-surface</code>. Elle doit ressortir légèrement sur le fond <code>--bg-card</code> de ton conteneur central.</p>
</div>

<div class="custom-card">
  <h3>🛠️ Statistiques du Serveur</h3>
  <ul>
    <li><strong>CPU:</strong> 12%</li>
    <li><strong>RAM:</strong> 4GB / 16GB</li>
    <li><strong>Status:</strong> Opérationnel</li>
  </ul>
</div>

## 📜 Contenu Classique (Hors Carte)
Ce texte est directement dans le conteneur central. Comme tu as mis <code>padding: 0</code> sur <code>.md-content</code>, ce texte doit toucher les bords du cadre jaune (debug).

<div class="custom-card">
  <h3>🚀 Pourquoi utiliser des cartes ?</h3>
  <p>Les cartes permettent de structurer l'information de manière modulaire. Comme ton conteneur central n'a pas de padding, les cartes occupent 100% de la largeur, créant un effet de "sections" très propre.</p>
</div>

## 📑 Scroll et Remplissage
On ajoute du texte pour tester le scroll et ton JS de rétractation :

$(Répétition pour le scroll)$
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

<div class="custom-card">
  <p>💡 <strong>Astuce :</strong> Tu peux même mettre des images ou du code à l'intérieur de ces divs !</p>
</div>

$(Encore plus de texte...)$
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. 

<div class="custom-card">
  <h3>🏁 Fin de la zone de test</h3>
  <p>Si tu scrolle plus bas, cette carte doit remonter avec tout le reste du conteneur central quand le footer apparaît.</p>
</div>
