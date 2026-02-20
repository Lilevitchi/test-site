document.addEventListener("DOMContentLoaded", () => {
    const mainInner = document.querySelector(".md-main__inner");
    const footer = document.querySelector(".md-footer");
    
    if (!mainInner || !footer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quand le footer est là, on ajoute une marge fixe au parent 
                // pour que les sidebars aient de la place pour s'arrêter
                mainInner.style.paddingBottom = "20px";
            } else {
                mainInner.style.paddingBottom = "0px";
            }
        });
    }, { threshold: 0.1 });

    observer.observe(footer);
});
