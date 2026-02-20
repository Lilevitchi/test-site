document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const footer = document.querySelector(".md-footer");

    /* --- 1. HAUTEUR DYNAMIQUE --- */
    const updateHeight = () => {
        if (!footer) return;
        const visibleHeight = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
        root.style.setProperty("--footer-visible-height", `${visibleHeight}px`);
    };
    window.addEventListener("scroll", () => window.requestAnimationFrame(updateHeight), { passive: true });

    /* --- 2. RECONSTRUCTION DE LA SIDEBAR --- */
    const buildSidebar = () => {
        const tocList = document.querySelector('.md-sidebar--secondary .md-nav__list');
        const sidebarInner = document.querySelector('.md-sidebar--secondary .md-sidebar__inner');
        if (!tocList || !sidebarInner) return;

        // On crée le "Faux Titre" (Nom de la page)
        // On va chercher le premier H2 ou H1 pour le nom
        const pageName = document.querySelector('h1, h2')?.innerText || "Sommaire";
        
        const fakeTitle = document.createElement('div');
        fakeTitle.className = "sidebar-fake-title";
        fakeTitle.innerText = pageName;

        // On l'insère tout en haut de la sidebar
        sidebarInner.prepend(fakeTitle);

        // Injection des H3 des custom-cards
        const cards = document.querySelectorAll('.custom-card h3');
        cards.forEach(h3 => {
            const li = document.createElement('li');
            li.className = 'md-nav__item nav-item-card-h3';
            li.innerHTML = `<a class="md-nav__link"><span>${h3.innerText}</span></a>`;

            let prevH2 = h3.closest('.custom-card').previousElementSibling;
            while (prevH2 && prevH2.tagName !== 'H2') prevH2 = prevH2.previousElementSibling;

            if (prevH2) {
                const links = tocList.querySelectorAll('.md-nav__link');
                links.forEach(link => {
                    if (link.innerText.trim().toLowerCase() === prevH2.innerText.trim().toLowerCase()) {
                        link.parentElement.appendChild(li);
                    }
                });
            }
        });
    };

    buildSidebar();
    updateHeight();
});
