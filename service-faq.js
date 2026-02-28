import { renderInto } from "./dom.js";

export default class ServiceFaq {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <div class="grid gap-3" data-motion-stagger>
        ${this.service.faq
          .map(
            (item) => `
              <details class="ui-card p-5" data-motion-item>
                <summary class="cursor-pointer font-semibold text-[#0b1f3a]">${item}</summary>
                <p class="ui-body mt-3 text-[#6f7d92]">Une reponse detaillee vous est fournie dans votre dossier et votre suivi client.</p>
              </details>
            `
          )
          .join("")}
      </div>
    `;
  }
}
