import { renderInto } from "./dom.js";

export default class EmptyState {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="ui-card p-8 text-center">
        <div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f7f4ee] text-[#0b1f3a]">
          <i class="fa-solid fa-inbox"></i>
        </div>
        <h3 class="mt-4 text-[22px] font-semibold">${this.options.title || "Aucun resultat"}</h3>
        <p class="ui-body mt-2 text-[#6f7d92]">${this.options.description || "Aucune donnee a afficher pour le moment."}</p>
      </div>
    `;
  }
}
