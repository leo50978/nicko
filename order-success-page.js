import { renderInto } from "./dom.js";
import { buildUrl } from "./router-state.js";
import Breadcrumb from "./breadcrumb.js";
import AlertBox from "./alert-box.js";

export default class OrderSuccessPage {
  constructor(rootOrId, context = {}) {
    this.root = renderInto(rootOrId, "");
    this.service = context.service;
    this.orderId = context.query?.order || "ORD-2026-NEW";
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <section class="section-space">
        <div class="container-shell grid gap-6">
          <div id="order-success-breadcrumb-root"></div>
          <div class="ui-card p-6 md:p-8">
            <p class="ui-eyebrow text-[#6f7d92]">Confirmation</p>
            <h1 class="ui-title mt-3">Commande confirmee</h1>
            <p class="ui-body mt-4 text-[#3c4b64]">La commande ${this.orderId} est enregistree. Vous pouvez la suivre immediatement ou continuer dans votre dashboard.</p>
            <div class="mt-6 grid gap-3 md:grid-cols-2">
              <a class="ui-button ui-button-primary" href="${buildUrl("/tracking.html", { tracking: "LG-TRACK-1001" })}">Suivre le dossier</a>
              <a class="ui-button ui-button-secondary" href="/dashboard.html">Aller au dashboard</a>
            </div>
          </div>
          <div id="order-success-alert-root"></div>
        </div>
      </section>
    `;
    new Breadcrumb(this.root.querySelector("#order-success-breadcrumb-root"), [
      { label: "Accueil", href: "/index.html" },
      { label: "Paiement", href: buildUrl("/payment.html", { service: this.service?.slug || "" }) },
      { label: "Succes", href: buildUrl("/success.html", { order: this.orderId }) },
    ]).render();
    new AlertBox(this.root.querySelector("#order-success-alert-root"), {
      type: "success",
      title: "Etapes suivantes",
      body: "Une notification et un document de confirmation seront visibles dans votre espace client.",
    }).render();
  }
}
