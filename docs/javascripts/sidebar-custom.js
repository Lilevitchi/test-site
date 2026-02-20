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

        /* Nettoyage des injections précédentes */
        tocList
            .querySelectorAll(".nav-item-card-h3")
            .forEach(el => el.remove());

        const cards = document.querySelectorAll(".custom-card h3");

        cards.forEach(h3 => {
            /* ---------- A. ANCRE STABLE ---------- */
            if (!h3.id) {
                h3.id = h3.innerText
                    .toLowerCase()
                    .replace(/[^\w]+/g, "-")
                    .replace(/(^-|-$)/g, "");
            }

            const card = h3.closest(".custom-card");

            /* ---------- B. TROUVER LE H2 PARENT ---------- */
            let prev = card.previousElementSibling;
            while (prev && prev.tagName !== "H2") {
                prev = prev.previousElementSibling;
            }
            if (!prev) return;

            const parentTitle = prev.innerText
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

            const parentLink = [...tocList.querySelectorAll(".md-nav__link")]
                .find(link =>
                    link.innerText
                        .replace(/\s+/g, " ")
                        .trim()
                        .toLowerCase() === parentTitle
                );

            if (!parentLink) return;

            /* ---------- C. LIEN ANCRE NATIF ---------- */
            const li = document.createElement("li");
            li.className = "md-nav__item nav-item-card-h3";

            li.innerHTML = `
                <a class="md-nav__link" href="#${h3.id}">
                    <span>${h3.innerText}</span>
                </a>
            `;

            parentLink.parentElement.appendChild(li);
        });
    };

    /* =====================================================
       3. OBSERVER (MKDOCS RECONSTRUIT LE TOC)
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
