const GSAP_CDN = "https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js";
const SCROLL_TRIGGER_CDN = "https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js";

let motionReadyPromise = null;
let pluginRegistered = false;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

function loadScript(src, isReady) {
  if (typeof document === "undefined") {
    return Promise.resolve(false);
  }

  if (isReady()) {
    return Promise.resolve(true);
  }

  const existing = Array.from(document.querySelectorAll("script")).find((script) => script.src === src);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => resolve(true), { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.append(script);
  });
}

function registerPlugin() {
  if (pluginRegistered || typeof window === "undefined" || !window.gsap || !window.ScrollTrigger) {
    return;
  }

  window.gsap.registerPlugin(window.ScrollTrigger);
  pluginRegistered = true;
}

function getScope(root) {
  if (root instanceof Element || root instanceof Document) {
    return root;
  }

  return document;
}

function markAnimated(elements, key) {
  elements.forEach((element) => {
    element.dataset[key] = "true";
  });
}

function animateStaggerGroup(group) {
  const gsap = window.gsap;
  const items = Array.from(group.querySelectorAll("[data-motion-item]")).filter((item) => item.dataset.motionItemReady !== "true");

  if (!items.length) {
    group.dataset.motionGroupReady = "true";
    return;
  }

  markAnimated(items, "motionItemReady");
  group.dataset.motionGroupReady = "true";

  gsap.set(items, {
    opacity: 0,
    y: 28,
    scale: 0.985,
  });

  gsap.to(items, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.9,
    stagger: 0.12,
    ease: "power2.out",
    clearProps: "opacity,transform",
    scrollTrigger: {
      trigger: group,
      start: "top 84%",
      once: true,
    },
  });
}

function animateSoloElement(element) {
  const gsap = window.gsap;

  element.dataset.motionSoloReady = "true";

  gsap.set(element, {
    opacity: 0,
    y: 34,
    scale: 0.99,
  });

  gsap.to(element, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.95,
    ease: "power2.out",
    clearProps: "opacity,transform",
    scrollTrigger: {
      trigger: element,
      start: "top 88%",
      once: true,
    },
  });
}

function isInsideAnimatedGroup(element) {
  const parentGroup = element.closest("[data-motion-stagger]");
  return !!parentGroup;
}

export async function ensureMotionLibraries() {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return false;
  }

  if (window.gsap && window.ScrollTrigger) {
    registerPlugin();
    return true;
  }

  if (!motionReadyPromise) {
    motionReadyPromise = (async () => {
      await loadScript(GSAP_CDN, () => !!window.gsap);
      await loadScript(SCROLL_TRIGGER_CDN, () => !!window.ScrollTrigger);
      registerPlugin();
      return !!(window.gsap && window.ScrollTrigger);
    })().catch(() => false);
  }

  return motionReadyPromise;
}

export function cleanupSiteMotion(root = document) {
  if (typeof window === "undefined") {
    return;
  }

  const scope = getScope(root);

  if (window.ScrollTrigger) {
    window.ScrollTrigger.getAll().forEach((trigger) => {
      const triggerElement = trigger.trigger;
      if (triggerElement instanceof Element && scope.contains(triggerElement)) {
        trigger.kill();
      }
    });
  }

  if (window.gsap) {
    scope
      .querySelectorAll("[data-motion-item], [data-motion-pop], .panel, .glass-panel, .ui-card, .surface-tile")
      .forEach((element) => {
        window.gsap.killTweensOf(element);
      });
  }
}

export async function refreshSiteMotion(root = document) {
  const motionReady = await ensureMotionLibraries();
  if (!motionReady) {
    return;
  }

  const scope = getScope(root);

  window.requestAnimationFrame(() => {
    const groups = Array.from(scope.querySelectorAll("[data-motion-stagger]")).filter(
      (group) => group.dataset.motionGroupReady !== "true"
    );
    groups.forEach(animateStaggerGroup);

    const soloSelectors = [
      "[data-motion-pop]",
      ".panel",
      ".glass-panel",
      ".ui-card",
      ".surface-tile",
      ".hero-media-frame",
    ];

    const soloElements = Array.from(scope.querySelectorAll(soloSelectors.join(", "))).filter((element) => {
      if (element.dataset.motionSoloReady === "true") {
        return false;
      }

      if (element.dataset.motionGroupReady === "true") {
        return false;
      }

      if (isInsideAnimatedGroup(element) && !element.hasAttribute("data-motion-pop")) {
        return false;
      }

      return true;
    });

    soloElements.forEach(animateSoloElement);
    window.ScrollTrigger?.refresh();
  });
}
