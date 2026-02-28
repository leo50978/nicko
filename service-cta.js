import { renderInto } from "./dom.js";
import { buildUrl } from "./router-state.js";

export default class ServiceCta {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <div class="panel p-6 md:p-8" style="background: linear-gradient(135deg, rgba(11,31,58,0.96), rgba(23,58,106,0.9)); color: white;" data-motion-stagger>
        <h2 class="ui-title" data-motion-item>Passez a l'action sur la plateforme ${this.service.subServices[0].toLowerCase()}</h2>
        <p class="ui-body mt-4 max-w-[760px] text-white/78" data-motion-item>Le formulaire, le paiement, le suivi et les documents restent relies au meme espace client.</p>
        <div class="mt-5 flex flex-wrap gap-3" data-motion-item>
          <a class="ui-button ui-button-accent" href="${buildUrl("/create.html", { service: this.service.slug })}">Voir</a>
          <a class="ui-button ui-button-secondary" href="/dashboard.html">Voir le dashboard</a>
        </div>
      </div>
    `;
  }
}
