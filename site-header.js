import { resolveRoot } from "./dom.js";
import { PUBLIC_NAV } from "./navigation.js";
import { t } from "./i18n-store.js";
import { clearSession, isAuthenticated } from "./session-store.js";
import MobileNav from "./mobile-nav.js";

export default class SiteHeader {
  constructor(rootOrId, options = {}) {
    this.root = resolveRoot(rootOrId);
    this.options = options;
  }

  render() {
    if (!this.root) return;

    const authed = isAuthenticated();
    this.root.innerHTML = `
      <header class="site-header-shell sticky top-0 z-50">
        <div class="container-shell py-3 md:py-4">
          <div class="site-header-bar flex min-h-[84px] items-center justify-between gap-4 px-4 py-3 md:px-6">
            <a href="/index.html" class="site-brand site-brand-logo-shell site-brand-logo-shell-wide" aria-label="${t("nav.brand")}">
              <img src="./logo.jpeg" alt="${t("nav.brand")}" class="site-brand-logo site-brand-logo-wide" loading="eager" decoding="async" />
            </a>
            <nav class="hidden items-center gap-6 lg:flex">
              ${PUBLIC_NAV.map((item) => `<a class="site-nav-link ui-meta font-semibold transition" href="${item.href}">${t(item.key)}</a>`).join("")}
            </nav>
            <div class="hidden items-center gap-3 lg:flex">
              ${
                authed
                  ? `<button type="button" data-logout class="ui-button ui-button-secondary">${t("nav.logout")}</button>`
                  : `<a class="ui-button ui-button-secondary" href="/login.html">${t("nav.login")}</a>
                     <a class="ui-button ui-button-primary" href="/register.html">${t("nav.register")}</a>`
              }
            </div>
            <button type="button" data-mobile-nav-toggle class="ui-button ui-button-secondary lg:hidden" aria-label="Ouvrir le menu">
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
        <div id="mobile-nav-root"></div>
      </header>
    `;

    new MobileNav(this.root.querySelector("#mobile-nav-root")).render();

    this.root.querySelector("[data-logout]")?.addEventListener("click", () => {
      clearSession();
      window.location.href = "/index.html";
    });
  }
}
