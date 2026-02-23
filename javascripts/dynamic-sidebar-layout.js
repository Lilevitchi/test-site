/**
 * Layout Controller
 * Compatible navigation.instant
 */
document$.subscribe(function () {

  const root = document.documentElement;
  let lastFooterHeight = 0;
  let ticking = false;
  let observer = null;
  let footerObserver = null;

  /* =====================================================
     1. FOOTER AWARE HEIGHT DYNAMIQUE
     ===================================================== */
  const updateFooterHeight = () => {
    const footer = document.querySelector(".md-footer");
    if (!footer) {
      // Footer absent → reset variable
      if (lastFooterHeight !== 0) {
        root.style.setProperty("--footer-visible-height", `0px`);
        lastFooterHeight = 0;
      }
      return;
    }

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

    const sidebar = document.querySelector(".md-sidebar--secondary");
    if (!sidebar) return;

    const tocList = sidebar.querySelector(".md-nav__list");
    if (!tocList) return;

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
     3. OBSERVER SIDEBAR (Rebind propre)
     ===================================================== */
  const initObserver = () => {
    const sidebar = document.querySelector(".md-sidebar--secondary");
    if (!sidebar) return;

    if (observer) observer.disconnect();

    observer = new MutationObserver(() => {
      buildSidebar();
    });

    observer.observe(sidebar, { childList: true, subtree: true });
  };

  /* =====================================================
     4. SCROLL HANDLER UNIQUE
     ===================================================== */
  const scrollHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateFooterHeight();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.removeEventListener("scroll", scrollHandler);
  window.addEventListener("scroll", scrollHandler, { passive: true });

  /* =====================================================
     5. FOOTER OBSERVER DYNAMIQUE (resize + apparition/disparition)
     ===================================================== */
  const initFooterObserver = () => {
    const footer = document.querySelector(".md-footer");
    if (!footer) return;

    if (footerObserver) footerObserver.disconnect();

    footerObserver = new ResizeObserver(() => {
      updateFooterHeight();
    });

    footerObserver.observe(footer);
  };

  /* =====================================================
     INIT
     ===================================================== */
  updateFooterHeight();
  buildSidebar();
  initObserver();
  initFooterObserver();

  // Recalcul périodique en cas de footer animés ou apparitions tardives
  setInterval(updateFooterHeight, 200);

});
