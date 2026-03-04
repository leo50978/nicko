import { renderInto } from "./dom.js";
import { getCurrentUser } from "./session-store.js";
import QrPanel from "./qr-panel.js";

export default class DashboardQrPage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    const user = getCurrentUser();
    this.root.innerHTML = `
      <section class="grid gap-6">
        <div class="ui-card p-6 md:p-8">
          <p class="ui-eyebrow text-[#6f7d92]">QR code</p>
          <h1 class="ui-title mt-3">Votre identifiant client</h1>
          <p class="ui-body mt-4 text-[#3c4b64]">Ce QR personnel peut servir de reference rapide pour vos suivis, paiements et recuperations de documents.</p>
        </div>
        <div id="dashboard-qr-panel-root"></div>
      </section>
    `;
    new QrPanel(this.root.querySelector("#dashboard-qr-panel-root"), user?.qrCode || "LGOV-CLI-0001").render();
  }
}
