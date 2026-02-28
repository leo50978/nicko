import { renderInto } from "./dom.js";

export default class ServiceProcess {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <div class="ui-grid-4" data-motion-stagger>
        ${this.service.process
          .map(
            (item, index) => `
              <div class="ui-card p-5" data-motion-item>
                <span class="ui-chip !min-h-[34px] !bg-[#0b1f3a] !text-white !border-transparent">${index + 1}</span>
                <p class="mt-4 font-semibold text-[#0b1f3a]">${item}</p>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }
}
