import { renderInto } from "./dom.js";

export default class CtaBanner {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <section class="section-space-tight">
        <div class="container-shell">
          <div class="cta-surface panel p-6 md:p-8" data-motion-stagger>
            <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div class="max-w-[760px]" data-motion-item>
                <p class="ui-eyebrow">${this.options.eyebrow || ""}</p>
                <h2 class="ui-title mt-3">${this.options.title || ""}</h2>
                <p class="ui-body mt-4 text-[#3c4b64]">${this.options.description || ""}</p>
              </div>
              <div class="ui-link-row" data-motion-item>
                ${this.options.primaryHref ? `<a class="ui-button ui-button-accent" href="${this.options.primaryHref}">${this.options.primaryLabel}</a>` : ""}
                ${this.options.secondaryHref ? `<a class="ui-button ui-button-secondary" href="${this.options.secondaryHref}">${this.options.secondaryLabel}</a>` : ""}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
