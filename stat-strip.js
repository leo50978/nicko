import { renderInto } from "./dom.js";

export default class StatStrip {
  constructor(rootOrId, stats = []) {
    this.root = renderInto(rootOrId, "");
    this.stats = stats;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="ui-grid-4" data-motion-stagger>
        ${this.stats
          .map(
            (stat) => `
              <div class="surface-tile p-5 text-center" data-motion-item>
                <p class="text-[30px] font-semibold text-[#0b1f3a]">${stat.value}</p>
                <p class="ui-meta mt-2 text-[#6f7d92]">${stat.label}</p>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }
}
