import { renderInto } from "./dom.js";
import { buildUrl } from "./router-state.js";
import { t } from "./i18n-store.js";
import Breadcrumb from "./breadcrumb.js";
import Stepper from "./stepper.js";
import AlertBox from "./alert-box.js";
import ServiceRequestForm from "./service-request-form.js";

export default class OrderCreatePage {
  constructor(rootOrId, context = {}) {
    this.root = renderInto(rootOrId, "");
    this.service = context.service;
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <section class="section-space-tight">
        <div class="container-shell grid gap-6">
          <div id="order-create-breadcrumb-root"></div>
          <div id="order-create-stepper-root"></div>
          <div id="order-create-alert-root"></div>
          <div class="ui-grid-2">
            <div id="order-create-form-root"></div>
            <aside class="ui-card p-6">
              <p class="ui-eyebrow text-[#6f7d92]">${t("orders.createTitle")}</p>
              <h1 class="mt-3 text-[30px] font-semibold text-[#0b1f3a]">${this.service.slug.replaceAll("-", " ")}</h1>
              <p class="ui-body mt-4 text-[#3c4b64]">Renseignez les informations de base, ajoutez les pieces utiles puis poursuivez vers le paiement.</p>
              <div class="mt-6 grid gap-3">
                <div class="ui-chip justify-between">${this.service.subServices[0]}</div>
                <div class="ui-chip justify-between">${this.service.currencies.join(" / ")}</div>
                <div class="ui-chip justify-between">Suivi active</div>
              </div>
              <a class="ui-button ui-button-primary mt-6 w-full" href="${buildUrl("/payment.html", { service: this.service.slug, order: "ORD-2026-NEW" })}">Continuer vers le paiement</a>
            </aside>
          </div>
        </div>
      </section>
    `;

    new Breadcrumb(this.root.querySelector("#order-create-breadcrumb-root"), [
      { label: "Accueil", href: "/index.html" },
      { label: "Services", href: "/services.html" },
      { label: t("orders.createTitle"), href: buildUrl("/create.html", { service: this.service.slug }) },
    ]).render();
    new Stepper(this.root.querySelector("#order-create-stepper-root"), ["Commande", "Paiement", "Suivi"], 0).render();
    new AlertBox(this.root.querySelector("#order-create-alert-root"), {
      type: "info",
      title: "Dossier centralise",
      body: "Toutes les informations de cette demande seront ensuite disponibles dans votre dashboard.",
    }).render();
    new ServiceRequestForm(this.root.querySelector("#order-create-form-root"), this.service).render();
  }
}
