import { renderInto } from "./dom.js";

export default class SectionTitle {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="section-heading ${this.options.centered ? "text-center" : ""}" data-motion-stagger>
        ${this.options.eyebrow ? `<p class="ui-eyebrow text-[#6f7d92]" data-motion-item>${this.options.eyebrow}</p>` : ""}
        <h2 class="ui-title mt-3" data-motion-item>${this.options.title || ""}</h2>
        ${this.options.description ? `<p class="ui-subtitle mt-4 text-[#3c4b64]" data-motion-item>${this.options.description}</p>` : ""}
      </div>
    `;
  }
}
