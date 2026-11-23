document.addEventListener("DOMContentLoaded", function () {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");
    const navLinks = Array.from(document.querySelectorAll(".nav-links a"));

    document.documentElement.classList.add("js");

    if (menuButton && navigation) {
        const closeMenu = function () {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
            navigation.classList.remove("is-open");
        };

        menuButton.addEventListener("click", function () {
            const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!isExpanded));
            menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
            navigation.classList.toggle("is-open", !isExpanded);
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    const setActiveLink = function (activeLink) {
        navLinks.forEach(function (link) {
            const isActive = link === activeLink;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const updateActiveLink = function () {
        const currentPath = window.location.pathname.toLowerCase();
        const isHomePage = currentPath === "/" || currentPath.endsWith("/home/index");
        const activeHash = window.location.hash || (isHomePage ? "#home" : "");
        const currentRouteSection = currentPath.split("/").pop();
        const activeLink = navLinks.find(function (link) {
            const linkUrl = new URL(link.href);
            return activeHash
                ? linkUrl.pathname.toLowerCase() === currentPath && link.hash === activeHash
                : linkUrl.pathname.toLowerCase() === currentPath
                    || (!isHomePage && link.hash === "#" + currentRouteSection);
        });

        setActiveLink(activeLink);
    };

    updateActiveLink();
    window.addEventListener("hashchange", updateActiveLink);
    window.addEventListener("popstate", updateActiveLink);

    const revealItems = document.querySelectorAll(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });
    }

    const tiltCard = document.querySelector("[data-tilt]");
    const supportsTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (tiltCard && supportsTilt && !reducedMotion) {
        tiltCard.addEventListener("pointermove", function (event) {
            const bounds = tiltCard.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            const y = (event.clientY - bounds.top) / bounds.height;
            const rotateX = (0.5 - y) * 7;
            const rotateY = (x - 0.5) * 7;

            tiltCard.style.setProperty("--pointer-x", (x * 100) + "%");
            tiltCard.style.setProperty("--pointer-y", (y * 100) + "%");
            tiltCard.style.transform = "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
        });

        tiltCard.addEventListener("pointerleave", function () {
            tiltCard.style.transform = "";
            tiltCard.style.setProperty("--pointer-x", "50%");
            tiltCard.style.setProperty("--pointer-y", "45%");
        });
    }
});
