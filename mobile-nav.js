import { renderInto } from "./dom.js";
import { PUBLIC_NAV } from "./navigation.js";
import { t } from "./i18n-store.js";
import { appHref } from "./router-state.js";

export default class MobileNav {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;

    this.root.innerHTML = `
      <div data-mobile-panel class="mobile-nav-overlay fixed inset-0 z-[60] hidden p-4 lg:hidden">
        <div class="mobile-nav-panel panel ml-auto max-w-[320px] p-5">
          <div class="flex items-center justify-between">
            <strong class="site-brand text-[18px] font-semibold">${t("nav.services")}</strong>
            <button type="button" data-mobile-close class="ui-button ui-button-secondary !min-h-[40px] !px-3">X</button>
          </div>
          <nav class="mt-5 grid gap-3">
            ${PUBLIC_NAV.map((item) => `<a class="ui-chip justify-start" href="${item.href}">${t(item.key)}</a>`).join("")}
            <a class="ui-button ui-button-primary mt-2" href="${appHref("/login.html")}">${t("nav.login")}</a>
          </nav>
        </div>
      </div>
    `;

    const panel = this.root.querySelector("[data-mobile-panel]");
    document.querySelectorAll("[data-mobile-nav-toggle]").forEach((button) => {
      button.addEventListener("click", () => panel?.classList.remove("hidden"));
    });
    this.root.querySelector("[data-mobile-close]")?.addEventListener("click", () => panel?.classList.add("hidden"));
    panel?.addEventListener("click", (event) => {
      if (event.target === panel) {
        panel.classList.add("hidden");
      }
    });
  }
}
