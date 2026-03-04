import { renderInto } from "./dom.js";

export default class AmountInput {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <label class="grid gap-2">
        <span class="ui-meta font-semibold text-[#3c4b64]">${this.options.label || "Montant"}</span>
        <input type="number" min="0" step="0.01" value="${this.options.value || ""}" class="rounded-[16px] border border-[#d9d7d2] bg-white px-4 py-3" />
      </label>
    `;
  }
}
