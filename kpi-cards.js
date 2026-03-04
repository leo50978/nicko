import { renderInto } from "./dom.js";

export default class KpiCards {
  constructor(rootOrId, items = []) {
    this.root = renderInto(rootOrId, "");
    this.items = items;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="ui-grid-4">
        ${this.items.map((item) => `<div class="surface-tile p-5"><p class="ui-meta text-[#6f7d92]">${item.label}</p><p class="mt-2 text-[30px] font-semibold text-[#0b1f3a]">${item.value}</p></div>`).join("")}
      </div>
    `;
  }
}
