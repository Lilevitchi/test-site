document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const footer = document.querySelector(".md-footer");

    /* --- 1. GESTION DE LA HAUTEUR DYNAMIQUE --- */
    const updateHeight = () => {
        if (!footer) return;
        // Calcul de l'espace occupé par le footer à l'écran
        const visibleHeight = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
        root.style.setProperty("--footer-visible-height", `${visibleHeight}px`);
    };
    
    // Optimisation du scroll avec requestAnimationFrame
    window.addEventListener("scroll", () => window.requestAnimationFrame(updateHeight), { passive: true });

    /* --- 2. RECONSTRUCTION DE LA SIDEBAR DROITE --- */
    const buildSidebar = () => {
        const tocList = document.querySelector('.md-sidebar--secondary .md-nav__list');
        const sidebarInner = document.querySelector('.md-sidebar--secondary .md-sidebar__inner');
        
        if (!tocList || !sidebarInner) return;

        // --- A. INJECTION DU TITRE DE LA PAGE (FAUX TITRE) ---
        // On récupère le texte du H1 ou du premier H2
        const pageName = document.querySelector('h1, h2')?.innerText || "Sommaire";
        
        // On vérifie si le titre existe déjà pour éviter les doublons au rafraîchissement
        let fakeTitle = document.querySelector('.sidebar-fake-title');
        if (!fakeTitle) {
            fakeTitle = document.createElement('div');
            fakeTitle.className = "sidebar-fake-title";
            sidebarInner.prepend(fakeTitle);
        }
        fakeTitle.innerText = pageName;

        // --- B. SUPPRESSION DU LIEN "HOME" / "TABLE OF CONTENTS" ---
        // On cible tous les liens pour trouver celui qui pointe vers le haut de page (#)
        const allLinks = tocList.querySelectorAll('.md-nav__link');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            const text = link.innerText.trim().toLowerCase();
            
            // Si le lien pointe vers "#" ou s'appelle "home", on cache le parent (li)
            if (href === "#" || href === "" || text === "home") {
                // On vérifie qu'il ne s'agit pas d'un de nos H3 injectés
                if (!link.parentElement.classList.contains('nav-item-card-h3')) {
                    link.parentElement.style.display = "none";
                }
            }
        });

        // --- C. INJECTION DES H3 DES CARTES PERSONNALISÉES ---
        // Nettoyage des injections précédentes pour éviter les doublons
        document.querySelectorAll('.nav-item-card-h3').forEach(el => el.remove());

        const cards = document.querySelectorAll('.custom-card h3');
        cards.forEach(h3 => {
            const li = document.createElement('li');
            li.className = 'md-nav__item nav-item-card-h3';
            li.innerHTML = `<a class="md-nav__link"><span>${h3.innerText}</span></a>`;

            // Trouver le H2 (chapitre) qui précède la carte
            let prevH2 = h3.closest('.custom-card').previousElementSibling;
            while (prevH2 && prevH2.tagName !== 'H2') {
                prevH2 = prevH2.previousElementSibling;
            }

            if (prevH2) {
                const targetText = prevH2.innerText.trim().toLowerCase();
                
                allLinks.forEach(link => {
                    const linkText = link.innerText.replace(/\s+/g, ' ').trim().toLowerCase();
                    if (linkText === targetText) {
                        link.parentElement.appendChild(li);
                    }
                });
            }
        });
    };

    /* --- 3. SURVEILLANCE DES MISES À JOUR (MUTATION OBSERVER) --- */
    // MkDocs reconstruit la sidebar lors du défilement, l'observer permet de ré-appliquer nos scripts
    const targetNode = document.querySelector('.md-sidebar--secondary');
    if (targetNode) {
        const observer = new MutationObserver(() => {
            observer.disconnect(); // On coupe pour éviter une boucle infinie pendant la modif
            buildSidebar();
            observer.observe(targetNode, { childList: true, subtree: true });
        });
        observer.observe(targetNode, { childList: true, subtree: true });
    }

    // Lancement initial
    buildSidebar();
    updateHeight();
});
