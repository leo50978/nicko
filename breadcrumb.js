import { renderInto } from "./dom.js";
import { appHref } from "./router-state.js";

export default class Breadcrumb {
  constructor(rootOrId, items = []) {
    this.root = renderInto(rootOrId, "");
    this.items = items;
  }

  render() {
    if (!this.root) return;

    this.root.innerHTML = `
      <nav aria-label="Breadcrumb" class="ui-meta flex flex-wrap items-center gap-2 text-[#6f7d92]">
        ${this.items
          .map((item, index) => {
            const last = index === this.items.length - 1;
            return `${index > 0 ? '<span>/</span>' : ""}${last ? `<span class="font-semibold text-[#0b1f3a]">${item.label}</span>` : `<a href="${appHref(item.href)}">${item.label}</a>`}`;
          })
          .join("")}
      </nav>
    `;
  }
}
