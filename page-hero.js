import { renderInto } from "./dom.js";

export default class PageHero {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;

    this.root.innerHTML = `
      <section class="section-space">
        <div class="container-shell">
          <div class="hero-surface panel p-6 md:p-10" style="color: white;" data-motion-stagger>
            <p class="ui-eyebrow text-white/70" data-motion-item>${this.options.eyebrow || ""}</p>
            <h1 class="ui-display mt-3 max-w-[840px]" data-motion-item>${this.options.title || ""}</h1>
            <p class="ui-subtitle mt-5 max-w-[760px] text-white/80" data-motion-item>${this.options.lead || ""}</p>
            ${this.options.actions ? `<div data-motion-item>${this.options.actions}</div>` : ""}
          </div>
        </div>
      </section>
    `;
  }
}
