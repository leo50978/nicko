import { renderInto } from "./dom.js";
import { buildUrl } from "./router-state.js";
import PaymentSummary from "./payment-summary.js";

export default class DashboardPaymentsPage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <section class="grid gap-6">
        <div class="ui-card p-6 md:p-8">
          <p class="ui-eyebrow text-[#6f7d92]">Paiements</p>
          <h1 class="ui-title mt-3">Suivi des paiements multi-devises</h1>
          <p class="ui-body mt-4 text-[#3c4b64]">Visualisez vos totaux en cours et relancez les paiements encore ouverts.</p>
        </div>
        <div class="ui-grid-2">
          <div id="dashboard-payments-summary-root"></div>
          <div class="ui-card p-6">
            <p class="ui-eyebrow text-[#6f7d92]">Paiements en attente</p>
            <div class="mt-4 grid gap-3">
              <div class="rounded-[18px] border border-[#ece8df] p-4">
                <p class="font-semibold text-[#0b1f3a]">ORD-2026-004</p>
                <p class="ui-meta mt-1 text-[#6f7d92]">Microfinance / Credit · USD 180.00</p>
                <a class="ui-button ui-button-primary mt-4" href="${buildUrl("/payment.html", { service: "microfinance-credit", order: "ORD-2026-004" })}">Payer maintenant</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    new PaymentSummary(this.root.querySelector("#dashboard-payments-summary-root"), {
      total: 422,
      fees: 29,
      pending: 180,
      currency: "USD",
    }).render();
  }
}
