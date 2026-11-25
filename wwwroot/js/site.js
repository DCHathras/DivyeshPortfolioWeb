document.addEventListener("DOMContentLoaded", function () {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");
    const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
    const qrImage = document.querySelector(".whatsapp-qr-image");

    document.documentElement.classList.add("js");

    const animatedHeadings = document.querySelectorAll(
        ".hero h1, .page-hero h1, .section-intro h2, .section-heading h2, "
        + ".detail-lead h2, .contact-page-note h2, .whatsapp-contact-heading h2, "
        + ".project-info h2, .skill-category-heading h2"
    );
    if (!reducedMotion && window.gsap && animatedHeadings.length > 0) {
        window.gsap.to(animatedHeadings, {
            y: -2,
            duration: 3.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.12
        });
    }

    const typedTargets = Array.from(document.querySelectorAll("[data-typed-heading]"));
    if (!reducedMotion && window.Typed && typedTargets.length > 0) {
        const escapeHtml = function (text) {
            return text.replace(/[&<>"']/g, function (character) {
                return {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    "\"": "&quot;",
                    "'": "&#39;"
                }[character];
            });
        };

        const startTyping = function (target) {
            if (target.dataset.typedStarted === "true") {
                return;
            }

            const sentence = target.dataset.typedHeading.trim();
            if (!sentence) {
                return;
            }

            const emphasisPhrases = (target.dataset.typedEmphasis || "").split("|").filter(Boolean);
            let typedIndex = 0;
            const typedParts = [];
            emphasisPhrases.forEach(function (phrase) {
                const emphasisStart = sentence.indexOf(phrase, typedIndex);
                if (emphasisStart === -1) {
                    throw new Error("Typed heading emphasis must appear in its sentence.");
                }

                typedParts.push(escapeHtml(sentence.slice(typedIndex, emphasisStart)));
                typedParts.push("<span class=\"typed-heading-accent\">" + escapeHtml(phrase) + "</span>");
                typedIndex = emphasisStart + phrase.length;
            });
            typedParts.push(escapeHtml(sentence.slice(typedIndex)));
            const typedString = typedParts.join("");

            target.dataset.typedStarted = "true";
            const measuredElement = target.closest("h1, h2, p");
            if (measuredElement) {
                const measuredMarkup = measuredElement.innerHTML;
                const reserveHeadingSpace = function () {
                    const measurement = measuredElement.cloneNode(false);
                    measurement.innerHTML = measuredMarkup;
                    measurement.setAttribute("aria-hidden", "true");
                    measurement.style.position = "fixed";
                    measurement.style.left = "-10000px";
                    measurement.style.top = "0";
                    measurement.style.width = measuredElement.getBoundingClientRect().width + "px";
                    measurement.style.height = "auto";
                    measurement.style.minHeight = "0";
                    measurement.style.visibility = "hidden";
                    measurement.style.pointerEvents = "none";
                    const measurementTarget = measurement.querySelector("[data-typed-heading]");
                    if (measurementTarget) {
                        measurementTarget.removeAttribute("data-typed-heading");
                    }

                    measuredElement.after(measurement);
                    const height = measurement.getBoundingClientRect().height;
                    measurement.remove();
                    if (height > 0) {
                        measuredElement.style.minHeight = height + "px";
                    }
                };

                reserveHeadingSpace();
                window.addEventListener("resize", reserveHeadingSpace);
            }

            new window.Typed(target, {
                strings: [typedString],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1500,
                startDelay: 300,
                loop: true,
                showCursor: true,
                cursorChar: "|",
                autoInsertCss: false,
                smartBackspace: false,
                contentType: "html"
            });

            const typedCursor = target.parentElement.querySelector(".typed-cursor");
            if (typedCursor) {
                typedCursor.setAttribute("aria-hidden", "true");
            }
        };

        if ("IntersectionObserver" in window) {
            const typedHeadingObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        startTyping(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });

            typedTargets.forEach(function (target) {
                typedHeadingObserver.observe(target);
            });
        } else {
            typedTargets.forEach(startTyping);
        }
    }

    if (qrImage) {
        const showQrFallback = function () {
            qrImage.hidden = true;
            const fallback = qrImage.parentElement.querySelector(".whatsapp-qr-fallback");
            if (fallback) {
                fallback.hidden = false;
            }
        };

        qrImage.addEventListener("error", showQrFallback, { once: true });
        if (qrImage.complete && qrImage.naturalWidth === 0) {
            showQrFallback();
        }
    }

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

    const characterParallaxes = document.querySelectorAll(".background-character .character-parallax");
    if (characterParallaxes.length > 0 && supportsTilt && !reducedMotion) {
        window.addEventListener("pointermove", function (event) {
            if (event.pointerType !== "mouse") {
                return;
            }

            const x = (event.clientX / window.innerWidth - 0.5) * 8;
            const y = (event.clientY / window.innerHeight - 0.5) * 6;
            characterParallaxes.forEach(function (character) {
                character.style.setProperty("--character-shift-x", x + "px");
                character.style.setProperty("--character-shift-y", y + "px");
            });
        });
    }

    const portraitCarouselCleanups = new WeakMap();
    const initializePortraitCarousel = function (carousel) {
        const previousCleanup = portraitCarouselCleanups.get(carousel);
        if (previousCleanup) {
            previousCleanup();
        }

        const slides = Array.from(carousel.querySelectorAll(".portrait-slide"));
        const dots = Array.from(carousel.querySelectorAll(".portrait-dot"));
        const counter = carousel.querySelector(".portrait-index");
        const previousButton = carousel.querySelector(".portrait-arrow--previous");
        const nextButton = carousel.querySelector(".portrait-arrow--next");

        if (slides.length === 0) {
            return;
        }

        let currentIndex = slides.findIndex(function (slide) {
            return slide.classList.contains("is-active");
        });
        if (currentIndex < 0) {
            currentIndex = 0;
        }

        let autoplayTimer = null;
        let isHovered = false;
        let isFocused = false;
        let touchStart = null;
        const autoplayEnabled = slides.length > 1 && !reducedMotion;

        const pauseAutoplay = function () {
            if (autoplayTimer !== null) {
                window.clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        };

        const showSlide = function (index) {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach(function (slide, slideIndex) {
                const isActive = slideIndex === currentIndex;
                slide.classList.toggle("is-active", isActive);
                slide.setAttribute("aria-hidden", String(!isActive));
            });

            dots.forEach(function (dot, dotIndex) {
                const isActive = dotIndex === currentIndex;
                dot.classList.toggle("is-active", isActive);
                dot.setAttribute("aria-pressed", String(isActive));
            });

            if (counter) {
                counter.textContent = String(currentIndex + 1).padStart(2, "0")
                    + " / " + String(slides.length).padStart(2, "0");
            }
        };

        const resumeAutoplay = function () {
            if (autoplayEnabled && !isHovered && !isFocused
                && document.visibilityState !== "hidden" && autoplayTimer === null) {
                autoplayTimer = window.setInterval(function () {
                    showSlide(currentIndex + 1);
                }, 4500);
            }
        };

        const handleClick = function (event) {
            const target = event.target.closest("button");
            if (!target || !carousel.contains(target)) {
                return;
            }

            if (target === previousButton) {
                showSlide(currentIndex - 1);
            } else if (target === nextButton) {
                showSlide(currentIndex + 1);
            } else if (target.classList.contains("portrait-dot")) {
                showSlide(Number(target.getAttribute("data-slide-index")));
            }
        };

        const handleKeydown = function (event) {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                showSlide(currentIndex - 1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                showSlide(currentIndex + 1);
            }
        };

        const handlePointerDown = function (event) {
            if (event.pointerType === "touch") {
                touchStart = { x: event.clientX, y: event.clientY };
            }
        };

        const handlePointerUp = function (event) {
            if (!touchStart || event.pointerType !== "touch") {
                return;
            }

            const deltaX = event.clientX - touchStart.x;
            const deltaY = event.clientY - touchStart.y;
            touchStart = null;

            if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
                showSlide(currentIndex + (deltaX < 0 ? 1 : -1));
            }
        };

        const handlePointerCancel = function () {
            touchStart = null;
        };

        const handleFocusOut = function (event) {
            if (!carousel.contains(event.relatedTarget)) {
                isFocused = false;
                resumeAutoplay();
            }
        };

        const handleVisibilityChange = function () {
            if (document.visibilityState === "hidden") {
                pauseAutoplay();
            } else {
                resumeAutoplay();
            }
        };

        const handleMouseEnter = function () {
            isHovered = true;
            pauseAutoplay();
        };

        const handleMouseLeave = function () {
            isHovered = false;
            resumeAutoplay();
        };

        const handleFocusIn = function () {
            isFocused = true;
            pauseAutoplay();
        };

        carousel.addEventListener("click", handleClick);
        carousel.addEventListener("keydown", handleKeydown);
        carousel.addEventListener("pointerdown", handlePointerDown);
        carousel.addEventListener("pointerup", handlePointerUp);
        carousel.addEventListener("pointercancel", handlePointerCancel);
        carousel.addEventListener("mouseenter", handleMouseEnter);
        carousel.addEventListener("mouseleave", handleMouseLeave);
        carousel.addEventListener("focusin", handleFocusIn);
        carousel.addEventListener("focusout", handleFocusOut);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        showSlide(currentIndex);
        resumeAutoplay();

        const cleanup = function () {
            pauseAutoplay();
            carousel.removeEventListener("click", handleClick);
            carousel.removeEventListener("keydown", handleKeydown);
            carousel.removeEventListener("pointerdown", handlePointerDown);
            carousel.removeEventListener("pointerup", handlePointerUp);
            carousel.removeEventListener("pointercancel", handlePointerCancel);
            carousel.removeEventListener("mouseenter", handleMouseEnter);
            carousel.removeEventListener("mouseleave", handleMouseLeave);
            carousel.removeEventListener("focusin", handleFocusIn);
            carousel.removeEventListener("focusout", handleFocusOut);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };

        portraitCarouselCleanups.set(carousel, cleanup);
    };

    const visitPortraitCarousels = function (node, callback) {
        if (node.nodeType === 1 && node.matches("[data-portrait-carousel]")) {
            callback(node);
        }
        if (node.querySelectorAll) {
            node.querySelectorAll("[data-portrait-carousel]").forEach(callback);
        }
    };

    document.querySelectorAll("[data-portrait-carousel]").forEach(initializePortraitCarousel);

    const portraitCarouselObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.removedNodes.forEach(function (node) {
                visitPortraitCarousels(node, function (carousel) {
                    const cleanup = portraitCarouselCleanups.get(carousel);
                    if (cleanup) {
                        cleanup();
                        portraitCarouselCleanups.delete(carousel);
                    }
                });
            });

            mutation.addedNodes.forEach(function (node) {
                visitPortraitCarousels(node, initializePortraitCarousel);
            });
        });
    });
    portraitCarouselObserver.observe(document.body, { childList: true, subtree: true });
});
