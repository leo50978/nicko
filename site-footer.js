import { resolveRoot } from "./dom.js";
import { FOOTER_LINKS } from "./navigation.js";
import { SERVICE_CATALOG } from "./services.js";
import { t } from "./i18n-store.js";

export default class SiteFooter {
  constructor(rootOrId) {
    this.root = resolveRoot(rootOrId);
  }

  render() {
    if (!this.root) return;

    this.root.innerHTML = `
      <footer class="site-footer-shell mt-10 text-white">
        <div class="container-shell section-space">
          <div class="ui-grid-3">
            <div class="glass-panel p-6">
              <p class="ui-eyebrow text-white/60">LE GOUVERNEUR</p>
              <h2 class="mt-3 text-[28px] font-semibold tracking-[-0.03em]">${t("home.title")}</h2>
              <p class="ui-body mt-4 text-white/75">${t("home.lead")}</p>
            </div>
            <div class="glass-panel p-6">
              <p class="ui-eyebrow text-white/60">${t("nav.services")}</p>
              <div class="mt-4 grid gap-3">
                ${SERVICE_CATALOG.slice(0, 4)
                  .map((service) => `<a class="ui-meta text-white/80 transition hover:text-white" href="${service.route}">${t(service.titleKey)}</a>`)
                  .join("")}
              </div>
            </div>
            <div class="glass-panel p-6">
              <p class="ui-eyebrow text-white/60">Navigation</p>
              <div class="mt-4 grid gap-3">
                ${FOOTER_LINKS.map((item) => `<a class="ui-meta text-white/80 transition hover:text-white" href="${item.href}">${t(item.key)}</a>`).join("")}
              </div>
            </div>
          </div>
          <div class="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-[13px] text-white/60 md:flex-row md:items-center md:justify-between">
            <span>© 2026 LE GOUVERNEUR OMNI-SERVICES</span>
            <span>USD / HTG / DOP · Acces mobile</span>
          </div>
        </div>
      </footer>
    `;
  }
}
