import { resolveRoot } from "./dom.js";
import { DASHBOARD_SECTIONS } from "./dashboard.js";
import { t } from "./i18n-store.js";
import { appHref } from "./router-state.js";

export default class DashboardShell {
  constructor(rootOrId) {
    this.root = resolveRoot(rootOrId);
  }

  render() {
    if (!this.root) return null;
    const pageKey = document.body.dataset.page || "";
    this.root.innerHTML = `
      <section class="dashboard-main">
        <div class="container-shell py-8">
          <div class="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
            <aside class="dashboard-nav-shell ui-card hidden p-5 lg:block">
              <p class="ui-eyebrow text-[#6f7d92]">${t("dashboard.title")}</p>
              <nav class="mt-5 grid gap-2">
                ${DASHBOARD_SECTIONS.map((item) => {
                  const active = pageKey.toLowerCase().includes(item.id) || (item.id === "overview" && pageKey === "dashboardHome");
                  return `<a class="dashboard-nav-link flex items-center gap-3 rounded-[18px] px-4 py-3 ${active ? "is-active" : ""}" href="${item.route}">
                    <i class="fa-solid ${item.icon}"></i><span class="ui-meta font-semibold">${t(`nav.${item.id === "overview" ? "dashboard" : item.id}`)}</span>
                  </a>`;
                }).join("")}
              </nav>
            </aside>
            <div>
              <div class="dashboard-mobile-bar ui-card mb-4 flex items-center justify-between gap-3 p-4 lg:hidden">
                <span class="text-[18px] font-semibold text-[#0b1f3a]">${t("dashboard.title")}</span>
                <a class="ui-button ui-button-secondary" href="${appHref("/profile.html")}"><i class="fa-solid fa-user"></i></a>
              </div>
              <div id="dashboard-content-root"></div>
            </div>
          </div>
        </div>
      </section>
    `;
    return this.root.querySelector("#dashboard-content-root");
  }
}
