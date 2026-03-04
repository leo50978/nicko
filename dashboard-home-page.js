import { renderInto } from "./dom.js";
import { getCurrentUser } from "./session-store.js";
import { MOCK_DOCUMENTS } from "./mock-documents.js";
import { MOCK_NOTIFICATIONS } from "./mock-notifications.js";
import KpiCards from "./kpi-cards.js";
import QuickActions from "./quick-actions.js";
import DocumentList from "./document-list.js";
import NotificationList from "./notification-list.js";

export default class DashboardHomePage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    const user = getCurrentUser();
    this.root.innerHTML = `
      <section class="grid gap-6">
        <div class="ui-card p-6 md:p-8">
          <p class="ui-eyebrow text-[#6f7d92]">Dashboard</p>
          <h1 class="ui-title mt-3">Bienvenue ${user ? user.fullName : ""}</h1>
          <p class="ui-body mt-4 text-[#3c4b64]">Retrouvez vos commandes, paiements, documents, QR code et notifications depuis ce meme espace client.</p>
        </div>
        <div id="dashboard-home-kpis-root"></div>
        <div>
          <h2 class="ui-title">Actions rapides</h2>
          <div class="mt-6" id="dashboard-home-actions-root"></div>
        </div>
        <div class="ui-grid-2">
          <div>
            <h2 class="ui-title">Documents recents</h2>
            <div class="mt-6" id="dashboard-home-docs-root"></div>
          </div>
          <div>
            <h2 class="ui-title">Notifications</h2>
            <div class="mt-6" id="dashboard-home-notifications-root"></div>
          </div>
        </div>
      </section>
    `;
    new KpiCards(this.root.querySelector("#dashboard-home-kpis-root"), [
      { label: "Dossiers actifs", value: "03" },
      { label: "Documents disponibles", value: "06" },
      { label: "Paiements en attente", value: "02" },
      { label: "Notifications non lues", value: "01" },
    ]).render();
    new QuickActions(this.root.querySelector("#dashboard-home-actions-root"), [
      { label: "Nouvelle commande", href: "/create.html", icon: "fa-plus" },
      { label: "Payer", href: "/payments.html", icon: "fa-credit-card" },
      { label: "Voir le QR", href: "/qr-code.html", icon: "fa-qrcode" },
    ]).render();
    new DocumentList(this.root.querySelector("#dashboard-home-docs-root"), MOCK_DOCUMENTS.slice(0, 2)).render();
    new NotificationList(this.root.querySelector("#dashboard-home-notifications-root"), MOCK_NOTIFICATIONS.slice(0, 2)).render();
  }
}
