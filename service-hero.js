import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";

export default class ServiceHero {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  render() {
    if (!this.root || !this.service) return;

    const title = t(this.service.titleKey);
    const description = t(this.service.descriptionKey);

    this.root.innerHTML = `
      <section class="section-space">
        <div class="container-shell">
          <div class="hero-surface panel p-6 md:p-10" data-motion-stagger>
            <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-center">
              <div data-motion-item>
                <div class="ui-chip !min-h-[38px]">${this.service.currencies.join(" / ")}</div>
                <h1 class="ui-display mt-4">${title}</h1>
                <p class="ui-subtitle mt-5 max-w-[800px] text-[#3c4b64]">${description}</p>
              </div>
              <div class="hero-media-frame" data-motion-item>
                <img
                  src="${this.service.image || ""}"
                  alt="${this.service.imageAlt || title}"
                  class="hero-media-image"
                  loading="lazy"
                />
                <div class="hero-media-overlay">
                  <p class="ui-eyebrow">Plateforme</p>
                  <p class="mt-2 text-[18px] font-semibold text-[#0b1f3a]">${this.service.subServices.slice(0, 2).join(" · ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
