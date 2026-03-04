import { renderInto } from "./dom.js";

export default class FeatureList {
  constructor(rootOrId, items = []) {
    this.root = renderInto(rootOrId, "");
    this.items = items;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="ui-list" data-motion-stagger>
        ${this.items
          .map(
            (item) => `
              <div class="feature-card ui-card flex items-start gap-3 p-4" data-motion-item>
                <span class="feature-icon mt-1 grid h-9 w-9 place-items-center rounded-full text-white">
                  <i class="fa-solid fa-check"></i>
                </span>
                <p class="ui-body text-[#3c4b64]">${item}</p>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }
}
