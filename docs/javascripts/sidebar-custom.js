document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const footer = document.querySelector(".md-footer");

    // 1. GESTION HAUTEUR FOOTER
    const updateHeight = () => {
        if (!footer) return;
        const visibleHeight = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
        root.style.setProperty("--footer-visible-height", `${visibleHeight}px`);
    };
    window.addEventListener("scroll", () => window.requestAnimationFrame(updateHeight), { passive: true });

    // 2. CHANGER LE TITRE DE LA SIDEBAR PAR LE PREMIER H2 (Au lieu de Home ou TOC)
    const firstH2 = document.querySelector('h2');
    const tocTitle = document.querySelector('.md-sidebar--secondary .md-nav__title');
    if (tocTitle && firstH2) {
        tocTitle.innerText = firstH2.innerText;
    }

    // 3. INJECTION DES H3 DES CARTES DANS LA SIDEBAR
    const tocList = document.querySelector('.md-sidebar--secondary > nav > ul');
    const cards = document.querySelectorAll('.custom-card h3');

    if (tocList && cards.length > 0) {
        cards.forEach(cardTitle => {
            // On crée l'élément de menu
            const li = document.createElement('li');
            li.className = 'md-nav__item';
            li.innerHTML = `
                <a class="md-nav__link" style="padding-left: 25px !important; opacity: 0.8; font-size: 10px;">
                    <span class="md-ellipsis">${cardTitle.innerText}</span>
                </a>
            `;

            // On trouve à quel H2 cette carte appartient
            let parentH2 = cardTitle.closest('.custom-card');
            while (parentH2 && parentH2.tagName !== 'H2') {
                parentH2 = parentH2.previousElementSibling;
                if (!parentH2) break;
            }

            if (parentH2) {
                // On cherche le lien correspondant dans la sidebar
                const links = tocList.querySelectorAll('.md-nav__link');
                links.forEach(link => {
                    if (link.innerText.trim() === parentH2.innerText.trim()) {
                        // On insère après le lien du H2
                        link.after(li);
                    }
                });
            }
        });
    }
    updateHeight();
});
