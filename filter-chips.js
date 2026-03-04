import { renderInto } from "./dom.js";

export default class FilterChips {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    const selected = this.options.selected || "all";
    this.root.innerHTML = `
      <div class="flex flex-wrap gap-2">
        ${this.options.items
          .map(
            (item) => `
              <button
                type="button"
                data-filter-value="${item.value}"
                class="ui-chip ${item.value === selected ? "!bg-[#0b1f3a] !text-white !border-transparent" : ""}"
              >
                ${item.label}
              </button>
            `
          )
          .join("")}
      </div>
    `;
  }
}
