import { renderInto } from "./dom.js";

export default class ProductCard {
  constructor(rootOrId, product) {
    this.root = renderInto(rootOrId, "");
    this.product = product;
  }

  render() {
    if (!this.root || !this.product) return;

    this.root.innerHTML = `
      <article class="ui-card h-full p-5" data-motion-item>
        <div class="aspect-video overflow-hidden rounded-[18px] bg-[#f7f4ee]">
          <img src="${this.product.image || ""}" alt="${this.product.imageAlt || this.product.name}" class="h-full w-full object-cover" loading="lazy" />
        </div>
        <h3 class="mt-4 text-[20px] font-semibold text-[#0b1f3a]">${this.product.name}</h3>
        <p class="ui-body mt-2 text-[#6f7d92]">${this.product.description}</p>
      </article>
    `;
  }
}