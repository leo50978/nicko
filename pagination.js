import { renderInto } from "./dom.js";

export default class Pagination {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    const current = this.options.current || 1;
    const total = this.options.total || 1;
    this.root.innerHTML = `
      <div class="flex items-center justify-between gap-3">
        <button type="button" class="ui-button ui-button-secondary" ${current <= 1 ? "disabled" : ""}>Precedent</button>
        <span class="ui-meta font-semibold text-[#3c4b64]">Page ${current} / ${total}</span>
        <button type="button" class="ui-button ui-button-secondary" ${current >= total ? "disabled" : ""}>Suivant</button>
      </div>
    `;
  }
}
