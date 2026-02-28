import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";

export default class ServiceOverview {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <div class="ui-grid-2" data-motion-stagger>
        <div class="ui-card p-6" data-motion-item>
          <p class="ui-eyebrow text-[#6f7d92]">Resume</p>
          <h2 class="ui-title mt-3">${t(this.service.titleKey)}</h2>
          <p class="ui-body mt-4 text-[#3c4b64]">${t(this.service.shortKey)}</p>
        </div>
        <div class="ui-card p-6" data-motion-item>
          <p class="ui-eyebrow text-[#6f7d92]">Points forts</p>
          <div class="mt-4 grid gap-3">
            ${this.service.highlights.map((item) => `<div class="ui-chip justify-start">${item}</div>`).join("")}
          </div>
        </div>
      </div>
    `;
  }
}
