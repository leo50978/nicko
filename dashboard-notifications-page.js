import { renderInto } from "./dom.js";
import { MOCK_NOTIFICATIONS } from "./mock-notifications.js";
import NotificationList from "./notification-list.js";

export default class DashboardNotificationsPage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <section class="grid gap-6">
        <div class="ui-card p-6 md:p-8">
          <p class="ui-eyebrow text-[#6f7d92]">Notifications</p>
          <h1 class="ui-title mt-3">Restez alerte sur vos dossiers</h1>
          <p class="ui-body mt-4 text-[#3c4b64]">Les evenements de paiement, de livraison et de documents sont centralises ici.</p>
        </div>
        <div id="dashboard-notifications-list-root"></div>
      </section>
    `;
    new NotificationList(this.root.querySelector("#dashboard-notifications-list-root"), MOCK_NOTIFICATIONS).render();
  }
}
