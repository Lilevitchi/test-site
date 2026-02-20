document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const footer = document.querySelector(".md-footer");
    const gap = 10; // Ta marge de sécurité de 10px

    const updateHeight = () => {
        if (!footer) return;

        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // On calcule la partie visible du footer
        const visibleFooterHeight = Math.max(0, viewportHeight - footerRect.top);
        
        // On envoie la valeur (Footer visible + gap) au CSS
        // Si le footer est caché, la variable vaudra 0 + 10 = 10px.
        root.style.setProperty("--footer-visible-offset", (visibleFooterHeight + gap) + "px");
    };

    // On utilise requestAnimationFrame pour une fluidité totale sans saccades
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeight();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener("resize", updateHeight);
    updateHeight(); // Calcul initial
});
