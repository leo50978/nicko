import { renderInto } from "./dom.js";
import { formatMoney } from "./currency-store.js";

export default class PaymentSummary {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="ui-card p-5">
        <p class="ui-eyebrow text-[#6f7d92]">Paiements</p>
        <div class="mt-4 grid gap-3">
          <div class="flex items-center justify-between"><span class="ui-meta">Total du mois</span><strong>${formatMoney(this.options.total || 0, this.options.currency || "USD")}</strong></div>
          <div class="flex items-center justify-between"><span class="ui-meta">Frais estimes</span><strong>${formatMoney(this.options.fees || 0, this.options.currency || "USD")}</strong></div>
          <div class="flex items-center justify-between"><span class="ui-meta">En attente</span><strong>${formatMoney(this.options.pending || 0, this.options.currency || "USD")}</strong></div>
        </div>
      </div>
    `;
  }
}
