import { renderInto } from "./dom.js";
import { appHref } from "./router-state.js";
import { setSession } from "./session-store.js";
import { DEMO_SESSION } from "./mock-session.js";
import { t } from "./i18n-store.js";

export default class AuthLoginPage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <section class="section-space">
        <div class="container-shell">
          <div class="mx-auto max-w-[560px] ui-card p-6 md:p-8">
            <p class="ui-eyebrow text-[#6f7d92]">Login</p>
            <h1 class="ui-title mt-3">${t("auth.loginTitle")}</h1>
            <form id="login-form" class="mt-6 grid gap-4">
              <input required class="rounded-[16px] border border-[#d9d7d2] px-4 py-3" placeholder="${t("forms.email")}" />
              <input required type="password" class="rounded-[16px] border border-[#d9d7d2] px-4 py-3" placeholder="Mot de passe" />
              <button type="submit" class="ui-button ui-button-primary">${t("nav.login")}</button>
            </form>
            <div class="mt-4 flex flex-wrap gap-3">
              <a class="ui-meta font-semibold text-[#0b1f3a]" href="${appHref("/register.html")}">${t("nav.register")}</a>
              <a class="ui-meta font-semibold text-[#0b1f3a]" href="${appHref("/forgot-password.html")}">Mot de passe oublie</a>
            </div>
          </div>
        </div>
      </section>
    `;
    this.root.querySelector("#login-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      setSession(DEMO_SESSION);
      window.location.href = appHref("/dashboard.html");
    });
  }
}
