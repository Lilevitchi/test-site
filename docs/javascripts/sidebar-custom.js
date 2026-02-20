document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const footer = document.querySelector(".md-footer");

    const updateHeight = () => {
        if (!footer) return;
        const visibleHeight = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
        root.style.setProperty("--footer-visible-height", `${visibleHeight}px`);
    };
    window.addEventListener("scroll", () => window.requestAnimationFrame(updateHeight), { passive: true });

    const buildSidebar = () => {
        const tocList = document.querySelector('.md-sidebar--secondary .md-nav__list');
        const sidebarInner = document.querySelector('.md-sidebar--secondary .md-sidebar__inner');
        if (!tocList || !sidebarInner) return;

        // --- A. GESTION DU TITRE ET DU HOME ---
        const pageName = document.querySelector('h1, h2')?.innerText || "Sommaire";
        
        // Création du faux titre
        if (!document.querySelector('.sidebar-fake-title')) {
            const fakeTitle = document.createElement('div');
            fakeTitle.className = "sidebar-fake-title";
            fakeTitle.innerText = pageName;
            sidebarInner.prepend(fakeTitle);
        }

        // Cacher l'élément "Home" s'il existe dans la liste
        const firstLink = tocList.querySelector('.md-nav__link');
        if (firstLink && (firstLink.innerText.trim().toLowerCase() === "home" || firstLink.getAttribute('href') === "#")) {
            firstLink.parentElement.style.display = "none";
        }

        // --- B. INJECTION DES CARTES ---
        const cards = document.querySelectorAll('.custom-card h3');
        cards.forEach(h3 => {
            const li = document.createElement('li');
            li.className = 'md-nav__item nav-item-card-h3';
            li.innerHTML = `<a class="md-nav__link"><span>${h3.innerText}</span></a>`;

            let prevH2 = h3.closest('.custom-card').previousElementSibling;
            while (prevH2 && prevH2.tagName !== 'H2') prevH2 = prevH2.previousElementSibling;

            if (prevH2) {
                const links = tocList.querySelectorAll('.md-nav__link');
                const targetText = prevH2.innerText.trim().toLowerCase();
                
                links.forEach(link => {
                    // Nettoyage du texte du lien (on enlève les espaces en trop)
                    const linkText = link.innerText.replace(/\s+/g, ' ').trim().toLowerCase();
                    if (linkText === targetText) {
                        link.parentElement.appendChild(li);
                    }
                });
            }
        });
    };

    buildSidebar();
    updateHeight();
});
