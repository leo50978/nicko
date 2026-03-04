import { resolveRoot } from "./dom.js";
import { FOOTER_LINKS } from "./navigation.js";
import { appHref } from "./router-state.js";
import { SERVICE_CATALOG } from "./services.js";
import { t } from "./i18n-store.js";

export default class SiteFooter {
  constructor(rootOrId) {
    this.root = resolveRoot(rootOrId);
  }

  render() {
    if (!this.root) return;

    this.root.innerHTML = `
      <footer class="site-footer-shell mt-10">
        <div class="container-shell section-space">
          <div class="site-footer-top panel p-6 md:p-8">
            <div class="ui-grid-3">
              <div>
                <a href="${appHref("/index.html")}" class="site-footer-brand" aria-label="${t("nav.brand")}">
                  <img src="./logo.jpeg" alt="${t("nav.brand")}" class="site-footer-brand-logo" loading="lazy" decoding="async" />
                </a>
                <h2 class="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#0b1f3a]">${t("home.title")}</h2>
                <p class="ui-body mt-4 text-[#3c4b64]">${t("home.lead")}</p>
                <div class="mt-6">
                  <a class="ui-button ui-button-primary" href="${appHref("/register.html")}">${t("cta.createAccount")}</a>
                </div>
              </div>
              <div>
                <p class="ui-eyebrow">${t("nav.services")}</p>
                <div class="mt-4 grid gap-3">
                  ${SERVICE_CATALOG.slice(0, 4)
                    .map((service) => `<a class="ui-meta text-[#3c4b64] transition hover:text-[#0b1f3a]" href="${service.route}">${t(service.titleKey)}</a>`)
                    .join("")}
                </div>
              </div>
              <div>
                <p class="ui-eyebrow">Navigation</p>
                <div class="mt-4 grid gap-3">
                  ${FOOTER_LINKS.map((item) => `<a class="ui-meta text-[#3c4b64] transition hover:text-[#0b1f3a]" href="${item.href}">${t(item.key)}</a>`).join("")}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 flex flex-col gap-3 border-t border-black/10 pt-5 text-[13px] text-[#7b6a53] md:flex-row md:items-center md:justify-between">
            <span>© 2026 LE GOUVERNEUR OMNI-SERVICES</span>
            <span>USD / HTG / DOP · Acces mobile</span>
          </div>
        </div>
      </footer>
    `;
  }
}
