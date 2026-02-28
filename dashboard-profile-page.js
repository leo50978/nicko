import { renderInto } from "./dom.js";
import { getCurrentUser } from "./session-store.js";
import UserProfileCard from "./user-profile-card.js";
import ContactForm from "./contact-form.js";

export default class DashboardProfilePage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    const user = getCurrentUser();
    this.root.innerHTML = `
      <section class="grid gap-6">
        <div class="ui-card p-6 md:p-8">
          <p class="ui-eyebrow text-[#6f7d92]">Profil</p>
          <h1 class="ui-title mt-3">Preferences et informations client</h1>
          <p class="ui-body mt-4 text-[#3c4b64]">Mettez a jour vos contacts, votre type de compte, votre langue et vos preferences de notification.</p>
        </div>
        <div class="ui-grid-2">
          <div id="dashboard-profile-card-root"></div>
          <div id="dashboard-profile-form-root"></div>
        </div>
      </section>
    `;
    new UserProfileCard(this.root.querySelector("#dashboard-profile-card-root"), user).render();
    new ContactForm(this.root.querySelector("#dashboard-profile-form-root")).render();
  }
}
