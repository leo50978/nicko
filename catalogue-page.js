import { renderInto } from "./dom.js";
import { cleanupSiteMotion, refreshSiteMotion } from "./motion.js";
import { PRODUCT_CATALOG, PRODUCT_CATEGORIES } from "./product-catalog.js";
import PageHero from "./page-hero.js";
import SearchBar from "./search-bar.js";
import FilterChips from "./filter-chips.js";
import ProductGrid from "./product-grid.js";
import CtaBanner from "./cta-banner.js";

export default class CataloguePage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
    this.currentCategory = "all";
    this.searchValue = "";
  }

  getFilteredProducts() {
    return PRODUCT_CATALOG.filter((product) => {
      const categoryOk = this.currentCategory === "all" || product.category === this.currentCategory;
      const term = this.searchValue.toLowerCase();
      const text = `${product.name} ${product.description}`.toLowerCase();
      return categoryOk && (!term || text.includes(term));
    });
  }

  renderGrid() {
    const products = this.getFilteredProducts();
    new ProductGrid(this.root.querySelector("#catalogue-grid-root"), products).render();
  }

  render() {
    if (!this.root) return;
    cleanupSiteMotion(this.root);

    this.root.innerHTML = `
      <div id="catalogue-hero-root"></div>
      <section class="section-space">
        <div class="container-shell">
          <div class="grid gap-4">
            <div id="catalogue-search-root"></div>
            <div id="catalogue-filter-root"></div>
          </div>
          <div class="mt-8" id="catalogue-grid-root"></div>
        </div>
      </section>
      <div id="catalogue-cta-root"></div>
    `;

    new PageHero(this.root.querySelector("#catalogue-hero-root"), {
      eyebrow: "Catalogue de produits",
      title: "Explorez les produits technologiques",
      lead: "Découvrez une sélection d'objets, systèmes et outils créés pour faciliter la vie humaine.",
    }).render();

    new SearchBar(this.root.querySelector("#catalogue-search-root"), {
      placeholder: "Rechercher un produit",
      value: this.searchValue,
    }).render();

    new FilterChips(this.root.querySelector("#catalogue-filter-root"), {
      selected: this.currentCategory,
      items: Object.entries(PRODUCT_CATEGORIES).map(([value, label]) => ({ value, label })),
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

    new CtaBanner(this.root.querySelector("#catalogue-cta-root"), {
      eyebrow: "Services associés",
      title: "Besoin d'un service pour vos produits ?",
      description: "Nous offrons des services d'installation, de maintenance et de support pour de nombreux produits technologiques.",
      primaryHref: "/services.html",
      primaryLabel: "Découvrir les services",
      secondaryHref: "/create.html",
      secondaryLabel: "Faire une demande",
    }).render();

    refreshSiteMotion(this.root);
  }
}