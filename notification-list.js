import { renderInto } from "./dom.js";

export default class NotificationList {
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
              <article class="ui-card p-5 ${item.read ? "" : "ring-2 ring-[#dbe8ff]"}">
                <div class="flex items-center justify-between gap-3">
                  <p class="font-semibold text-[#0b1f3a]">${item.title}</p>
                  <span class="ui-chip !min-h-[32px]">${item.type}</span>
                </div>
                <p class="ui-body mt-3 text-[#3c4b64]">${item.body}</p>
                <p class="ui-meta mt-3 text-[#6f7d92]">${item.date}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }
}
