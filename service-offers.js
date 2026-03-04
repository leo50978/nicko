import { renderInto } from "./dom.js";

export default class ServiceOffers {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <div class="ui-grid-3" data-motion-stagger>
        ${this.service.subServices
          .map(
            (item) => `
              <div class="ui-card p-5" data-motion-item>
                <p class="text-[20px] font-semibold text-[#0b1f3a]">${item}</p>
                <p class="ui-body mt-3 text-[#6f7d92]">Processus cadre, suivi et point d'avancement inclus.</p>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }
}
