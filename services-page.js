import { renderInto } from "./dom.js";
import { cleanupSiteMotion, refreshSiteMotion } from "./motion.js";
import { SERVICE_CATALOG } from "./services.js";
import PageHero from "./page-hero.js";
import SearchBar from "./search-bar.js";
import FilterChips from "./filter-chips.js";
import ServiceGrid from "./service-grid.js";
import CtaBanner from "./cta-banner.js";

const CATEGORY_LABELS = {
  all: "Tous",
  "real-estate": "Immobilier",
  trade: "Import - Export",
  admin: "Administratif",
  tech: "Tech",
  finance: "Finance",
  documents: "Documents",
  logistics: "Logistique",
};

export default class ServicesPage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
    this.currentCategory = "all";
    this.searchValue = "";
  }

  getFilteredServices() {
    return SERVICE_CATALOG.filter((service) => {
      const categoryOk = this.currentCategory === "all" || service.categoryKey === this.currentCategory;
      const term = this.searchValue.toLowerCase();
      const text = `${service.slug} ${service.subServices.join(" ")}`.toLowerCase();
      return categoryOk && (!term || text.includes(term));
    });
  }

  renderGrid() {
    const services = this.getFilteredServices();
    new ServiceGrid(this.root.querySelector("#services-grid-root"), services).render();
  }

  render() {
    if (!this.root) return;
    cleanupSiteMotion(this.root);

    this.root.innerHTML = `
      <div id="services-hero-root"></div>
      <section class="section-space-tight">
        <div class="container-shell">
          <div class="grid gap-4">
            <div id="services-search-root"></div>
            <div id="services-filter-root"></div>
          </div>
          <div class="mt-8" id="services-grid-root"></div>
        </div>
      </section>
      <div id="services-cta-root"></div>
    `;

    new PageHero(this.root.querySelector("#services-hero-root"), {
      eyebrow: "Catalogue",
      title: "Toutes les plateformes de services",
      lead: "Filtrez, comparez et ouvrez chaque service avec le meme parcours de commande et de suivi.",
    }).render();

    new SearchBar(this.root.querySelector("#services-search-root"), {
      placeholder: "Rechercher un service ou un sous-service",
      value: this.searchValue,
    }).render();
    new FilterChips(this.root.querySelector("#services-filter-root"), {
      selected: this.currentCategory,
      items: Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label })),
    }).render();

    this.renderGrid();

    this.root.querySelector("[data-search-input]")?.addEventListener("input", (event) => {
      this.searchValue = event.target.value;
      this.renderGrid();
    });

    this.root.querySelectorAll("[data-filter-value]").forEach((button) => {
      button.addEventListener("click", () => {
        this.currentCategory = button.dataset.filterValue;
        this.render();
      });
    });

    new CtaBanner(this.root.querySelector("#services-cta-root"), {
      eyebrow: "Flux commun",
      title: "Chaque service mene vers une commande, un paiement et un suivi",
      description: "La meme structure front-end garantit une experience plus simple pour les clients et les equipes.",
      primaryHref: "/create.html",
      primaryLabel: "Voir maintenant",
      secondaryHref: "/dashboard.html",
      secondaryLabel: "Voir le dashboard",
    }).render();

    refreshSiteMotion(this.root);

  }
}
