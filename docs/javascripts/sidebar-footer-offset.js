document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const footer = document.querySelector(".md-footer");
    const baseGap = 10; // Ton gap de 10px souhaité

    const updateSidebarOffset = () => {
        if (!footer) return;

        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // On calcule l'espace que le footer occupe réellement à l'écran
        const footerVisibleHeight = Math.max(0, viewportHeight - footerRect.top);
        
        // Offset = Taille visible du footer + les 10px de gap
        const totalOffset = footerVisibleHeight + baseGap;

        root.style.setProperty("--sidebar-footer-offset", `${totalOffset}px`);
    };

    // On écoute le scroll et le resize avec une performance maximale
    window.addEventListener("scroll", updateSidebarOffset, { passive: true });
    window.addEventListener("resize", updateSidebarOffset, { passive: true });
    
    // Premier calcul au chargement
    updateSidebarOffset();
});
