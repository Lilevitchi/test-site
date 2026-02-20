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
       2. RECONSTRUCTION SIDEBAR DROITE
       ===================================================== */
    const buildSidebar = () => {
        const sidebar = document.querySelector(".md-sidebar--secondary");
        const sidebarInner = sidebar?.querySelector(".md-sidebar__inner");
        const tocList = sidebar?.querySelector(".md-nav__list");

        if (!sidebarInner || !tocList) return;

        /* ---------- A. SUPPRESSION DÉFINITIVE DU "HOME" ---------- */
        tocList.querySelectorAll(".md-nav__item").forEach(item => {
            const link = item.querySelector(".md-nav__link");
            if (!link) return;

            const text = link.innerText.trim().toUpperCase();
            const href = link.getAttribute("href") || "";

            const isHome =
                text === "HOME" &&
                (href === "" || href === "#" || href === "#__toc");

            if (isHome) {
                item.remove();
            }
        });

        /* ---------- B. FAUX TITRE ---------- */
        const pageTitle =
            document.querySelector("h1")?.innerText ||
            document.querySelector("h2")?.innerText ||
            "Sommaire";

        let fakeTitle = sidebarInner.querySelector(".sidebar-fake-title");
        if (!fakeTitle) {
            fakeTitle = document.createElement("div");
            fakeTitle.className = "sidebar-fake-title";
            sidebarInner.prepend(fakeTitle);
        }
        fakeTitle.textContent = pageTitle;

        /* ---------- C. NETTOYAGE DES H3 INJECTÉS ---------- */
        tocList
            .querySelectorAll(".nav-item-card-h3")
            .forEach(el => el.remove());

        /* ---------- D. INJECTION DES H3 DES CARTES ---------- */
        const cards = document.querySelectorAll(".custom-card h3");

        cards.forEach(h3 => {
            const li = document.createElement("li");
            li.className = "md-nav__item nav-item-card-h3";

            li.innerHTML = `
                <a class="md-nav__link">
                    <span>${h3.innerText}</span>
                </a>
            `;

            let prevH2 = h3.closest(".custom-card")?.previousElementSibling;
            while (prevH2 && prevH2.tagName !== "H2") {
                prevH2 = prevH2.previousElementSibling;
            }

            if (!prevH2) return;

            const target = prevH2.innerText.trim().toLowerCase();

            tocList.querySelectorAll(".md-nav__link").forEach(link => {
                const linkText = link.innerText
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase();

                if (linkText === target) {
                    link.parentElement.appendChild(li);
                }
            });
        });
    };

    /* =====================================================
       3. OBSERVER (MkDocs reconstruit la sidebar)
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
