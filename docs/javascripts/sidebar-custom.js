document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const footer = document.querySelector(".md-footer");

    /* --- FONCTION 1 : HAUTEUR DYNAMIQUE (ANTI-SACCADE) --- */
    const updateHeight = () => {
        if (!footer) return;

        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // On calcule la partie visible du footer
        const visibleFooterHeight = Math.max(0, viewportHeight - footerRect.top);
        
        // On met à jour la variable CSS --footer-visible-height
        root.style.setProperty("--footer-visible-height", `${visibleFooterHeight}px`);
    };

    // Synchronisation avec le scroll
    window.addEventListener("scroll", () => {
        window.requestAnimationFrame(updateHeight);
    }, { passive: true });

    /* --- FONCTION 2 : TITRE DYNAMIQUE (STYLE MIDNIGHT) --- */
    const pageTitle = document.querySelector('h1');
    const tocTitle = document.querySelector('.md-sidebar--secondary .md-nav__title');

    if (tocTitle && pageTitle) {
        // Remplace "Table des matières" par le titre H1 de la page
        tocTitle.innerText = pageTitle.innerText;
    }

    // Calcul initial au chargement
    updateHeight();
});
