import { resolveRoot } from "./dom.js";
import SiteHeader from "./site-header.js";
import SiteFooter from "./site-footer.js";
import DashboardShell from "./dashboard-shell.js";

export default class AppShell {
  constructor(rootOrId, routeDefinition) {
    this.root = resolveRoot(rootOrId);
    this.routeDefinition = routeDefinition;
  }

  render() {
    if (!this.root) return null;

    if (this.routeDefinition.layout === "dashboard") {
      this.root.innerHTML = `
        <div class="app-page page-shell">
          <div id="site-header-root"></div>
          <main class="page-main">
            <div id="dashboard-shell-root"></div>
          </main>
          <div id="site-footer-root"></div>
        </div>
      `;

      new SiteHeader(this.root.querySelector("#site-header-root")).render();
      const dashboardShell = new DashboardShell(this.root.querySelector("#dashboard-shell-root"));
      const contentRoot = dashboardShell.render();
      new SiteFooter(this.root.querySelector("#site-footer-root")).render();
      return contentRoot;
    }

    this.root.innerHTML = `
      <div class="app-page page-shell">
        <div id="site-header-root"></div>
        <main class="page-main" id="page-content-root"></main>
        <div id="site-footer-root"></div>
      </div>
    `;

    new SiteHeader(this.root.querySelector("#site-header-root")).render();
    new SiteFooter(this.root.querySelector("#site-footer-root")).render();
    return this.root.querySelector("#page-content-root");
  }
}
