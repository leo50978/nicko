import { renderInto } from "./dom.js";
import { MOCK_ORDERS } from "./mock-orders.js";
import { MOCK_DOCUMENTS } from "./mock-documents.js";
import Breadcrumb from "./breadcrumb.js";
import Stepper from "./stepper.js";
import StatusBadge from "./status-badge.js";
import DocumentList from "./document-list.js";

export default class OrderTrackingPage {
  constructor(rootOrId, context = {}) {
    this.root = renderInto(rootOrId, "");
    this.trackingCode = context.query?.tracking || "LG-TRACK-1001";
  }

  render() {
    if (!this.root) return;
    const order = MOCK_ORDERS.find((item) => item.trackingCode === this.trackingCode) || MOCK_ORDERS[0];
    const documents = MOCK_DOCUMENTS.filter((document) => order.documents.includes(document.id));
    this.root.innerHTML = `
      <section class="section-space-tight">
        <div class="container-shell grid gap-6">
          <div id="order-tracking-breadcrumb-root"></div>
          <div id="order-tracking-stepper-root"></div>
          <div class="ui-card p-6">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p class="ui-eyebrow text-[#6f7d92]">Tracking code</p>
                <h1 class="mt-3 text-[30px] font-semibold text-[#0b1f3a]">${order.trackingCode}</h1>
              </div>
              <div id="order-status-badge-root"></div>
            </div>
            <div class="mt-6 ui-grid-4">
              ${["Demande recue", "Verification", "Traitement", "Livraison"]
                .map((label, index) => `<div class="rounded-[20px] bg-[#f7f4ee] p-4"><p class="ui-meta text-[#6f7d92]">Etape ${index + 1}</p><p class="mt-2 font-semibold text-[#0b1f3a]">${label}</p></div>`)
                .join("")}
            </div>
          </div>
          <div>
            <h2 class="ui-title">Documents disponibles</h2>
            <div class="mt-6" id="order-tracking-docs-root"></div>
          </div>
        </div>
      </section>
    `;

    new Breadcrumb(this.root.querySelector("#order-tracking-breadcrumb-root"), [
      { label: "Accueil", href: "/index.html" },
      { label: "Suivi", href: "/tracking.html" },
      { label: order.trackingCode, href: `/tracking.html?tracking=${order.trackingCode}` },
    ]).render();
    new Stepper(this.root.querySelector("#order-tracking-stepper-root"), ["Commande", "Paiement", "Suivi"], 2).render();
    new StatusBadge(this.root.querySelector("#order-status-badge-root"), order.status).render();
    new DocumentList(this.root.querySelector("#order-tracking-docs-root"), documents).render();
  }
}
