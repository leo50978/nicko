import { renderInto } from "./dom.js";
import { cleanupSiteMotion, refreshSiteMotion } from "./motion.js";
import EmptyState from "./empty-state.js";
import ServiceCard from "./service-card.js";

export default class ServiceGrid {
  constructor(rootOrId, services = []) {
    this.root = renderInto(rootOrId, "");
    this.services = services;
  }

  teardownAutoScroll() {
    this.root?.__serviceCarouselCleanup?.();
    if (this.root) {
      delete this.root.__serviceCarouselCleanup;
    }
  }

  setupAutoScroll() {
    const gsap = typeof window !== "undefined" ? window.gsap : null;
    const viewport = this.root?.querySelector("[data-service-carousel-viewport]");
    const track = this.root?.querySelector("[data-service-carousel-track]");
    const prevButton = this.root?.querySelector("[data-service-carousel-prev]");
    const nextButton = this.root?.querySelector("[data-service-carousel-next]");

    if (!viewport || typeof window === "undefined") {
      return;
    }

    const autoScrollEnabled = this.services.length > 1 && !!gsap && !window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const loopDistance = this.services.length > 1 && track ? track.scrollWidth / 2 : Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    let resumeTimer = 0;
    let autoTween = null;
    let manualTween = null;
    let currentPosition = viewport.scrollLeft;
    const state = { value: currentPosition };

    const clearResumeTimer = () => {
      if (!resumeTimer) return;
      window.clearTimeout(resumeTimer);
      resumeTimer = 0;
    };

    const wrapPosition = (value) => {
      if (loopDistance <= 0) {
        return Math.max(0, value);
      }

      const wrapped = value % loopDistance;
      return wrapped < 0 ? wrapped + loopDistance : wrapped;
    };

    const applyPosition = (value) => {
      currentPosition = wrapPosition(value);
      viewport.scrollLeft = currentPosition;
      return currentPosition;
    };

    const killTweens = () => {
      autoTween?.kill();
      manualTween?.kill();
      autoTween = null;
      manualTween = null;
    };

    const pause = () => {
      autoTween?.pause();
      manualTween?.kill();
      manualTween = null;
      clearResumeTimer();
    };

    const resume = () => {
      if (!autoScrollEnabled) {
        return;
      }

      manualTween?.kill();
      manualTween = null;
      state.value = currentPosition;
      autoTween?.kill();
      autoTween = gsap.to(state, {
        value: currentPosition + loopDistance,
        duration: Math.max(loopDistance / 90, 8),
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          applyPosition(state.value);
        },
      });

      clearResumeTimer();
    };

    const resumeSoon = () => {
      if (!gsap || !autoScrollEnabled) {
        return;
      }

      clearResumeTimer();
      resumeTimer = window.setTimeout(() => {
        resume();
      }, 1200);
    };

    const onFocusOut = (event) => {
      if (!viewport.contains(event.relatedTarget)) {
        resumeSoon();
      }
    };

    const getScrollStep = () => {
      const firstItem = viewport.querySelector(".service-carousel-item");
      const itemWidth = firstItem?.getBoundingClientRect().width || viewport.clientWidth * 0.9;
      const gap = track ? Number.parseFloat(window.getComputedStyle(track).gap || "0") : 0;
      return itemWidth + gap;
    };

    const scrollByStep = (direction) => {
      const step = getScrollStep() * direction;
      pause();

      if (!gsap) {
        viewport.scrollBy({
          left: step,
          behavior: "smooth",
        });
        currentPosition = wrapPosition(viewport.scrollLeft + step);
        resumeSoon();
        return;
      }

      state.value = applyPosition(state.value);
      manualTween = gsap.to(state, {
        value: state.value + step,
        duration: 0.7,
        ease: "power2.out",
        onUpdate: () => {
          applyPosition(state.value);
        },
        onComplete: () => {
          manualTween = null;
          resumeSoon();
        },
      });
    };

    const onPrevClick = () => {
      scrollByStep(-1);
    };

    const onNextClick = () => {
      scrollByStep(1);
    };

    const syncPosition = () => {
      currentPosition = wrapPosition(viewport.scrollLeft);
      if (Math.abs(viewport.scrollLeft - currentPosition) > 1) {
        viewport.scrollLeft = currentPosition;
      }
      state.value = currentPosition;
    };

    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", onFocusOut);
    viewport.addEventListener("pointerdown", pause);
    viewport.addEventListener("pointerup", resumeSoon);
    viewport.addEventListener("touchstart", pause, { passive: true });
    viewport.addEventListener("touchend", resumeSoon);
    viewport.addEventListener("scroll", syncPosition, { passive: true });
    prevButton?.addEventListener("click", onPrevClick);
    nextButton?.addEventListener("click", onNextClick);

    if (autoScrollEnabled) {
      resume();
    }

    this.root.__serviceCarouselCleanup = () => {
      killTweens();
      clearResumeTimer();
      viewport.removeEventListener("focusin", pause);
      viewport.removeEventListener("focusout", onFocusOut);
      viewport.removeEventListener("pointerdown", pause);
      viewport.removeEventListener("pointerup", resumeSoon);
      viewport.removeEventListener("touchstart", pause);
      viewport.removeEventListener("touchend", resumeSoon);
      viewport.removeEventListener("scroll", syncPosition);
      prevButton?.removeEventListener("click", onPrevClick);
      nextButton?.removeEventListener("click", onNextClick);
    };
  }

  render() {
    if (!this.root) return;

    cleanupSiteMotion(this.root);
    this.teardownAutoScroll();

    if (!this.services.length) {
      new EmptyState(this.root, {
        title: "Aucun service trouve",
        description: "Essayez un autre mot-cle ou une autre categorie pour relancer le carousel.",
      }).render();
      return;
    }

    const visibleServices = this.services.length > 1 ? [...this.services, ...this.services] : [...this.services];

    this.root.innerHTML = `
      <div class="service-carousel glass-panel p-4 md:p-5" data-motion-stagger>
        ${
          this.services.length > 1
            ? `
              <div class="service-carousel-toolbar">
                <button type="button" class="service-carousel-control ui-button ui-button-secondary" data-motion-item data-service-carousel-prev aria-label="Defiler vers la gauche">
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button type="button" class="service-carousel-control ui-button ui-button-secondary" data-motion-item data-service-carousel-next aria-label="Defiler vers la droite">
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            `
            : ""
        }
        <div class="service-carousel-viewport" data-service-carousel-viewport role="region" aria-label="Carousel des services">
          <div class="service-carousel-track" data-service-carousel-track>
            ${visibleServices.map((_, index) => `<div class="service-carousel-item" id="service-card-${index}"></div>`).join("")}
          </div>
        </div>
      </div>
    `;

    visibleServices.forEach((service, index) => new ServiceCard(this.root.querySelector(`#service-card-${index}`), service).render());
    this.setupAutoScroll();
    refreshSiteMotion(this.root);
  }
}
