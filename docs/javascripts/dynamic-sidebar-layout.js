document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const footer = document.querySelector(".md-footer");
  const sidebar = document.querySelector(".md-sidebar--secondary");

  let lastFooterHeight = 0;
  let ticking = false;

  /* =====================================================
     1. FOOTER AWARE HEIGHT
     ===================================================== */
  const updateFooterHeight = () => {
    if (!footer) return;

    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const raw = Math.max(0, viewportHeight - footerRect.top);
    const rounded = Math.round(raw);

    if (Math.abs(rounded - lastFooterHeight) > 1) {
      root.style.setProperty("--footer-visible-height", `${rounded}px`);
      lastFooterHeight = rounded;
    }
  };

  /* =====================================================
     2. SIDEBAR TOC + CUSTOM CARDS
     ===================================================== */
  const buildSidebar = () => {
    const tocList = sidebar?.querySelector(".md-nav__list");
    if (!tocList) return;

    // Nettoyage
    tocList.querySelectorAll(".nav-item-card-h3").forEach(el => el.remove());

    const cards = document.querySelectorAll(".custom-card h3");

    cards.forEach(h3 => {
      if (!h3.id) {
        h3.id = h3.innerText
          .toLowerCase()
          .replace(/[^\w]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }

      let prev = h3.closest(".custom-card")?.previousElementSibling;
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
     3. OBSERVER SIDEBAR (MkDocs)
     ===================================================== */
  if (sidebar) {
    const observer = new MutationObserver(() => {
      observer.disconnect();
      buildSidebar();
      observer.observe(sidebar, { childList: true, subtree: true });
    });
    observer.observe(sidebar, { childList: true, subtree: true });
  }

  /* =====================================================
     4. SCROLL HANDLER UNIQUE
     ===================================================== */
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateFooterHeight();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Init
  updateFooterHeight();
  buildSidebar();
});
