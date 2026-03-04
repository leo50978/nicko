import { renderInto } from "./dom.js";

export default class DocumentList {
  constructor(rootOrId, items = []) {
    this.root = renderInto(rootOrId, "");
    this.items = items;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="grid gap-3">
        ${this.items
          .map(
            (item) => `
              <div class="ui-card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="font-semibold text-[#0b1f3a]">${item.title}</p>
                  <p class="ui-meta mt-1 text-[#6f7d92]">${item.createdAt} · ${item.relatedOrderId}</p>
                </div>
                <a class="ui-button ui-button-secondary" href="${item.downloadUrl}" download="${item.fileName}">Telecharger</a>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }
}
