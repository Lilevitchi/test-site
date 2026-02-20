document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const footer = document.querySelector(".md-footer");

    /* =====================================================
       1. HAUTEUR DYNAMIQUE (FOOTER AWARE)
       ===================================================== */
    const updateHeight = () => {
        if (!footer) return;
        const visibleHeight = Math.max(
            0,
            window.innerHeight - footer.getBoundingClientRect().top
        );
        root.style.setProperty(
            "--footer-visible-height",
            `${visibleHeight}px`
        );
    };

    window.addEventListener(
        "scroll",
        () => window.requestAnimationFrame(updateHeight),
        { passive: true }
    );

    /* =====================================================
       2. ENRICHISSEMENT DU TOC (CUSTOM CARDS)
       ===================================================== */
    const buildSidebar = () => {
        const tocList = document.querySelector(
            ".md-sidebar--secondary .md-nav__list"
        );
        if (!tocList) return;

        /* --- Nettoyage des anciennes injections --- */
        tocList
            .querySelectorAll(".nav-item-card-h3")
            .forEach(el => el.remove());

        /* --- Injection des H3 des custom cards --- */
        const cards = document.querySelectorAll(".custom-card h3");

        cards.forEach(h3 => {
            const card = h3.closest(".custom-card");

            /* Trouver le H2 parent logique */
            let prev = card.previousElementSibling;
            while (prev && prev.tagName !== "H2") {
                prev = prev.previousElementSibling;
            }
            if (!prev) return;

            const parentTitle = prev.innerText
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

            /* Trouver l’item TOC correspondant */
            const parentLink = [...tocList.querySelectorAll(".md-nav__link")]
                .find(link =>
                    link.innerText
                        .replace(/\s+/g, " ")
                        .trim()
                        .toLowerCase() === parentTitle
                );

            if (!parentLink) return;

            /* Créer l’entrée H3 */
            const li = document.createElement("li");
            li.className = "md-nav__item nav-item-card-h3";

            li.innerHTML = `
                <a class="md-nav__link">
                    <span>${h3.innerText}</span>
                </a>
            `;

            parentLink.parentElement.appendChild(li);
        });
    };

    /* =====================================================
       3. OBSERVER (MkDocs reconstruit le TOC)
       ===================================================== */
    const sidebar = document.querySelector(".md-sidebar--secondary");
    if (sidebar) {
        const observer = new MutationObserver(() => {
            observer.disconnect();
            buildSidebar();
            observer.observe(sidebar, { childList: true, subtree: true });
        });

        observer.observe(sidebar, { childList: true, subtree: true });
    }

    buildSidebar();
    updateHeight();
});
