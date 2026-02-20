document.addEventListener("DOMContentLoaded", () => {
    // 1. On récupère le titre principal de la page (H1)
    const pageTitle = document.querySelector('h1');
    // 2. On cible le titre de la sidebar de droite
    const tocTitle = document.querySelector('.md-sidebar--secondary .md-nav__title');

    if (tocTitle && pageTitle) {
        // On remplace "Table des matières" par le texte du H1
        tocTitle.innerText = pageTitle.innerText;
    }
});
