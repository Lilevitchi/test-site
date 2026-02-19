# 🧪 Test de Stress du Layout

Cette page est volontairement très longue pour tester le scroll global du navigateur et le comportement dynamique du JS sur les sidebars et le contenu central.

## 📐 1. Test d'alignement (Bord à Bord)
Puisque le padding est à `0`, ce texte doit toucher directement le bord gauche et droit du bloc sombre. C'est l'endroit idéal pour vérifier tes marges de `10px`.

---

## 📁 2. Remplissage de la Sidebar Gauche
*Cette section crée des titres H2 pour peupler la navigation.*

### 2.1 Sous-section
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.

### 2.2 Sous-section
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

---

## 🛠️ 3. Test des Blocs (Admonitions)
Vérifie si les blocs d'alerte touchent aussi les bords.

!!! info "Information sans bordure"
    Le bloc bleu doit s'étendre sur toute la largeur de la colonne centrale.

!!! danger "Attention au débordement"
    Vérifie que la scrollbar reste bien celle du navigateur à droite, et non une scrollbar interne au bloc central.

---

## 📜 4. Grand Volume de Texte
*On génère du scroll ici...*

$(30 \text{ paragraphes de remplissage})$

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.

Praesent varius ultrices velit. Mauris sem lorem, varius ut tempus eu, porttitor at libero. Cras varius, nisi nec suscipit interdum, turpis est hendrerit tellus, pretium elementum arcu neque ut purus.

$(Imagine ici encore 20 paragraphes identiques...)$

## 🏗️ 5. Test des Tableaux
Les tableaux sont souvent responsables de débordements horizontaux.

| Composant | Espacement | État |
| :--- | :--- | :--- |
| Header / Contenu | 10px | Fixe |
| Sidebar / Contenu | 10px | Fixe |
| Footer / Contenu | 10px | Dynamique (JS) |

---

## 🚀 6. Zone de Rapprochement du Footer
**C'est ici que le test devient crucial.** En scrollant vers les sections suivantes, surveille bien :
1. Le bas de la **Sidebar Gauche**.
2. Le bas du **Contenu Central** (ton texte).
3. Le bas de la **Sidebar Droite**.

Ils doivent tous s'arrêter net à 10px du bord de l'écran, puis remonter ensemble quand le bloc gris du footer apparaîtra.

### 6.1 Test final de hauteur
Contenu pour forcer le footer à être bien plus bas...

### 6.2 Test final de hauteur
Contenu pour forcer le footer à être bien plus bas...

### 6.3 Test final de hauteur
Contenu pour forcer le footer à être bien plus bas...

## 🏁 7. Fin de Page
Le footer est juste en dessous de cette ligne. Si tu es ici, les trois blocs du dessus (Rouge/Jaune en debug) doivent avoir rétréci pour laisser la place au footer + 10px.
