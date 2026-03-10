import { renderInto } from "./dom.js";
import { cleanupSiteMotion, refreshSiteMotion } from "./motion.js";
import EmptyState from "./empty-state.js";
import ProductCard from "./product-card.js";

export default class ProductGrid {
  constructor(rootOrId, products = []) {
    this.root = renderInto(rootOrId, "");
    this.products = products;
  }

  render() {
    if (!this.root) return;

    cleanupSiteMotion(this.root);

    if (!this.products.length) {
      new EmptyState(this.root, {
        title: "Aucun produit trouvé",
        description: "Essayez un autre mot-clé ou une autre catégorie.",
      }).render();
      return;
    }

    this.root.innerHTML = `
      <div class="ui-grid-3" data-motion-stagger>${this.products.map((_, index) => `<div id="product-card-${index}"></div>`).join("")}</div>
    `;

    this.products.forEach((product, index) => new ProductCard(this.root.querySelector(`#product-card-${index}`), product).render());
    refreshSiteMotion(this.root);
  }
}