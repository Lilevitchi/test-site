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

        // --- A. GESTION DU TITRE ET DU HOME ---
        const pageName = document.querySelector('h1, h2')?.innerText || "Sommaire";
        
        // On vérifie si le titre existe déjà pour ne pas le dupliquer
        if (!document.querySelector('.sidebar-fake-title')) {
            const fakeTitle = document.createElement('div');
            fakeTitle.className = "sidebar-fake-title";
            fakeTitle.innerText = pageName;
            sidebarInner.prepend(fakeTitle);
        }

        // Cacher l'élément "Home" (Table of contents) de MkDocs
        const firstLink = tocList.querySelector('.md-nav__link');
        if (firstLink && (firstLink.innerText.trim().toLowerCase() === "home" || firstLink.getAttribute('href') === "#")) {
            firstLink.parentElement.style.display = "none";
        }

        // --- B. INJECTION DES CARTES ---
        // On nettoie les anciennes injections pour éviter les doublons au refresh
        document.querySelectorAll('.nav-item-card-h3').forEach(el => el.remove());

        const cards = document.querySelectorAll('.custom-card h3');
        cards.forEach(h3 => {
            const li = document.createElement('li');
            li.className = 'md-nav__item nav-item-card-h3';
            li.innerHTML = `<a class="md-nav__link"><span>${h3.innerText}</span></a>`;

            // On cherche le H2 parent
            let prevH2 = h3.closest('.custom-card').previousElementSibling;
            while (prevH2 && prevH2.tagName !== 'H2') {
                prevH2 = prevH2.previousElementSibling;
            }

            if (prevH2) {
                const links = tocList.querySelectorAll('.md-nav__link');
                const targetText = prevH2.innerText.trim().toLowerCase();
                
                links.forEach(link => {
                    const linkText = link.innerText.replace(/\s+/g, ' ').trim().toLowerCase();
                    if (linkText === targetText) {
                        link.parentElement.appendChild(li);
                    }
                });
            }
        });
    };

    // --- 3. SURVEILLANCE DES CHANGEMENTS ---
    // MkDocs reconstruit souvent la sidebar, on surveille donc le conteneur
    const targetNode = document.querySelector('.md-sidebar--secondary');
    if (targetNode) {
        const observer = new MutationObserver(() => {
            // On déconnecte l'observer temporairement pour éviter une boucle infinie
            observer.disconnect();
            buildSidebar();
            observer.observe(targetNode, { childList: true, subtree: true });
        });
        observer.observe(targetNode, { childList: true, subtree: true });
    }

    buildSidebar();
    updateHeight();
});
