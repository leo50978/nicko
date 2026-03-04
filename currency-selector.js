import { renderInto } from "./dom.js";
import { getCurrency, getSupportedCurrencies, setCurrency } from "./currency-store.js";

export default class CurrencySelector {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    const current = this.options.value || getCurrency();
    this.root.innerHTML = `
      <label class="grid gap-2">
        <span class="ui-meta font-semibold text-[#3c4b64]">${this.options.label || "Devise"}</span>
        <select data-currency-select class="rounded-[16px] border border-[#d9d7d2] bg-white px-4 py-3">
          ${getSupportedCurrencies().map((code) => `<option value="${code}" ${code === current ? "selected" : ""}>${code}</option>`).join("")}
        </select>
      </label>
    `;
    this.root.querySelector("[data-currency-select]")?.addEventListener("change", (event) => {
      const next = setCurrency(event.target.value);
      if (typeof this.options.onChange === "function") this.options.onChange(next);
    });
  }
}
