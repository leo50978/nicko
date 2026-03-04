import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";
import { buildUrl } from "./router-state.js";

export default class ServiceCard {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  render() {
    if (!this.root || !this.service) return;

    const title = t(this.service.titleKey);
    const shortDescription = t(this.service.shortKey);
    const longDescription = t(this.service.descriptionKey);

    this.root.innerHTML = `
      <article class="service-card ui-card h-full p-6" data-motion-item>
        <div class="service-card-media-shell">
          <img
            src="${this.service.image || ""}"
            alt="${this.service.imageAlt || title}"
            class="service-card-media"
            loading="lazy"
          />
          <span class="service-card-badge ui-chip !min-h-[36px]">${this.service.currencies.join(" / ")}</span>
        </div>
        <div class="flex items-start justify-between gap-4">
          <span class="service-card-icon grid h-14 w-14 place-items-center rounded-[18px] text-[22px] text-white">
            <i class="fa-solid ${this.service.icon}"></i>
          </span>
          <span class="ui-meta font-semibold text-[#6f7d92]">${this.service.subServices.length} offres</span>
        </div>
        <h3 class="mt-5 text-[24px] font-semibold tracking-[-0.02em] text-[#0b1f3a]">${title}</h3>
        <p class="ui-body mt-3 text-[#3c4b64]">${shortDescription}</p>
        <p class="ui-meta mt-3 text-[#6f7d92]">${longDescription}</p>
        <div class="mt-5 flex flex-wrap gap-2">
          ${this.service.subServices.slice(0, 3).map((item) => `<span class="ui-chip !min-h-[34px]">${item}</span>`).join("")}
        </div>
        <div class="mt-6 flex flex-wrap gap-3">
          <a class="ui-button ui-button-primary" href="${this.service.route}">${t("cta.viewDetails")}</a>
          <a class="ui-button ui-button-secondary" href="${buildUrl("/create.html", { service: this.service.slug })}">${t("cta.startOrder")}</a>
        </div>
      </article>
    `;
  }
}
