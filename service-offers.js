import { renderInto } from "./dom.js";

export default class ServiceOffers {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  renderOfferCard(offer) {
    return `
      <div class="ui-card service-offer-card p-5 md:p-6" data-motion-item>
        <p class="text-[20px] font-semibold text-[#0b1f3a]">${offer.title}</p>
        <p class="ui-body mt-3 text-[#6f7d92]">${offer.description}</p>
        ${
          offer.bullets?.length
            ? `
              <div class="mt-5 grid gap-2">
                ${offer.bullets
                  .map(
                    (item) => `
                      <div class="service-offer-bullet">
                        <span class="service-offer-bullet-dot"></span>
                        <span>${item}</span>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            `
            : ""
        }
      </div>
    `;
  }

  render() {
    if (!this.root || !this.service) return;

    const offers =
      this.service.offerCards ||
      this.service.subServices.map((item) => ({
        title: item,
        description: "Processus cadre, suivi et point d'avancement inclus.",
      }));

    this.root.innerHTML = `
      <div class="ui-grid-3" data-motion-stagger>
        ${offers.map((offer) => this.renderOfferCard(offer)).join("")}
      </div>
    `;
  }
}
