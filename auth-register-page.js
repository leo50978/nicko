import { renderInto } from "./dom.js";
import { setSession } from "./session-store.js";
import { DEMO_SESSION } from "./mock-session.js";
import { t } from "./i18n-store.js";

export default class AuthRegisterPage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <section class="section-space">
        <div class="container-shell">
          <div class="mx-auto max-w-[620px] ui-card p-6 md:p-8">
            <p class="ui-eyebrow text-[#6f7d92]">Register</p>
            <h1 class="ui-title mt-3">${t("auth.registerTitle")}</h1>
            <form id="register-form" class="mt-6 grid gap-4">
              <input required class="rounded-[16px] border border-[#d9d7d2] px-4 py-3" placeholder="${t("forms.fullName")}" />
              <input required class="rounded-[16px] border border-[#d9d7d2] px-4 py-3" placeholder="${t("forms.email")}" />
              <select class="rounded-[16px] border border-[#d9d7d2] px-4 py-3">
                <option value="individual">Particulier</option>
                <option value="business">Entreprise</option>
              </select>
              <button type="submit" class="ui-button ui-button-primary">${t("nav.register")}</button>
            </form>
          </div>
        </div>
      </section>
    `;
    this.root.querySelector("#register-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const type = this.root.querySelector("select")?.value || "business";
      setSession({ ...DEMO_SESSION, userType: type });
      window.location.href = "/dashboard.html";
    });
  }
}
