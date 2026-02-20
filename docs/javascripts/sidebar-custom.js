document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const footer = document.querySelector(".md-footer");

    // A. HAUTEUR DYNAMIQUE
    const updateHeight = () => {
        if (!footer) return;
        const visibleHeight = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
        root.style.setProperty("--footer-visible-height", `${visibleHeight}px`);
    };
    window.addEventListener("scroll", () => window.requestAnimationFrame(updateHeight), { passive: true });

    // B. INJECTION DES TITRES DE CARTES (H3)
    const tocList = document.querySelector('.md-sidebar--secondary .md-nav__list');
    const cards = document.querySelectorAll('.custom-card h3');

    if (tocList && cards.length > 0) {
        cards.forEach(cardTitle => {
            const li = document.createElement('li');
            li.className = 'md-nav__item';
            // On applique 25px d'indentation pour que les H3 soient bien sous les H2
            li.innerHTML = `
                <a class="md-nav__link" style="padding-left: 25px !important; opacity: 0.8;">
                    <span>${cardTitle.innerText}</span>
                </a>
            `;

            // On cherche le titre H2 qui précède
            let prev = cardTitle.closest('.custom-card').previousElementSibling;
            while (prev && prev.tagName !== 'H2') prev = prev.previousElementSibling;

            if (prev) {
                const links = tocList.querySelectorAll('.md-nav__link');
                links.forEach(link => {
                    if (link.innerText.trim().toLowerCase() === prev.innerText.trim().toLowerCase()) {
                        link.parentElement.appendChild(li);
                    }
                });
            }
        });
    }
    updateHeight();
});
