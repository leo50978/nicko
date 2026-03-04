import { renderInto } from "./dom.js";
import { buildUrl } from "./router-state.js";
import { getCurrency } from "./currency-store.js";
import Breadcrumb from "./breadcrumb.js";
import Stepper from "./stepper.js";
import AlertBox from "./alert-box.js";
import PaymentSummary from "./payment-summary.js";
import PaymentForm from "./payment-form.js";

export default class OrderPaymentPage {
  constructor(rootOrId, context = {}) {
    this.root = renderInto(rootOrId, "");
    this.service = context.service;
    this.orderId = context.query?.order || "ORD-2026-NEW";
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <section class="section-space-tight">
        <div class="container-shell grid gap-6">
          <div id="order-payment-breadcrumb-root"></div>
          <div id="order-payment-stepper-root"></div>
          <div id="order-payment-alert-root"></div>
          <div class="ui-grid-2">
            <div id="order-payment-form-root"></div>
            <div class="grid gap-4">
              <div class="ui-card p-6">
                <p class="ui-eyebrow text-[#6f7d92]">Resume de commande</p>
                <h1 class="mt-3 text-[30px] font-semibold text-[#0b1f3a]">${this.orderId}</h1>
                <p class="ui-body mt-3 text-[#3c4b64]">${this.service.slug.replaceAll("-", " ")} · ${this.service.subServices[0]}</p>
              </div>
              <div id="order-payment-summary-root"></div>
            </div>
          </div>
        </div>
      </section>
    `;

    new Breadcrumb(this.root.querySelector("#order-payment-breadcrumb-root"), [
      { label: "Accueil", href: "/index.html" },
      { label: "Commande", href: buildUrl("/create.html", { service: this.service.slug }) },
      { label: "Paiement", href: buildUrl("/payment.html", { service: this.service.slug, order: this.orderId }) },
    ]).render();
    new Stepper(this.root.querySelector("#order-payment-stepper-root"), ["Commande", "Paiement", "Suivi"], 1).render();
    new AlertBox(this.root.querySelector("#order-payment-alert-root"), {
      type: "warning",
      title: "Paiement simule",
      body: "Cette interface valide un paiement front-end uniquement, sans transaction bancaire reelle.",
    }).render();
    new PaymentForm(this.root.querySelector("#order-payment-form-root"), { amount: this.service.pricing.base, currency: getCurrency() }).render();
    new PaymentSummary(this.root.querySelector("#order-payment-summary-root"), {
      total: this.service.pricing.base,
      fees: Math.max(5, Math.round(this.service.pricing.base * 0.08)),
      pending: this.service.pricing.base,
      currency: getCurrency(),
    }).render();

    this.root.querySelector("[data-payment-confirm]")?.addEventListener("click", () => {
      window.location.href = buildUrl("/success.html", { service: this.service.slug, order: this.orderId });
    });
  }
}
