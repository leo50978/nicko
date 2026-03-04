import { renderInto } from "./dom.js";

export default class SearchBar {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <label class="panel flex items-center gap-3 px-4 py-3">
        <i class="fa-solid fa-magnifying-glass text-[#6f7d92]"></i>
        <input type="search" data-search-input value="${this.options.value || ""}" class="w-full bg-transparent outline-none" placeholder="${this.options.placeholder || "Rechercher"}" />
      </label>
    `;
  }
}
