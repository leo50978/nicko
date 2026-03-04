import { renderInto } from "./dom.js";
import { formatMoney } from "./currency-store.js";

export default class ServicePricing {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <div class="ui-card p-6" data-motion-pop>
        <p class="ui-eyebrow text-[#6f7d92]">Tarification</p>
        <p class="mt-3 text-[36px] font-semibold text-[#0b1f3a]">${formatMoney(this.service.pricing.base, this.service.pricing.currency)}</p>
        <p class="ui-body mt-3 text-[#3c4b64]">${this.service.pricing.note}</p>
      </div>
    `;
  }
}
