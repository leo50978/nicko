import { renderInto } from "./dom.js";
import { formatMoney } from "./currency-store.js";

export default class TransactionTable {
  constructor(rootOrId, items = []) {
    this.root = renderInto(rootOrId, "");
    this.items = items;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="ui-card overflow-hidden">
        <div class="hidden md:block">
          <table class="w-full text-left">
            <thead class="bg-[#f7f4ee] text-[13px] uppercase tracking-[0.12em] text-[#6f7d92]">
              <tr><th class="px-5 py-4">Label</th><th class="px-5 py-4">Date</th><th class="px-5 py-4">Statut</th><th class="px-5 py-4">Montant</th></tr>
            </thead>
            <tbody>
              ${this.items
                .map(
                  (item) => `
                    <tr class="border-t border-[#ece8df]">
                      <td class="px-5 py-4"><p class="font-semibold text-[#0b1f3a]">${item.label}</p><p class="ui-meta text-[#6f7d92]">${item.type}</p></td>
                      <td class="px-5 py-4">${item.date}</td>
                      <td class="px-5 py-4">${item.status}</td>
                      <td class="px-5 py-4 font-semibold">${formatMoney(item.amount, item.currency)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="grid gap-3 p-4 md:hidden">
          ${this.items
            .map(
              (item) => `
                <div class="rounded-[18px] border border-[#ece8df] p-4">
                  <p class="font-semibold text-[#0b1f3a]">${item.label}</p>
                  <p class="ui-meta mt-1 text-[#6f7d92]">${item.date} · ${item.status}</p>
                  <p class="mt-3 font-semibold text-[#0b1f3a]">${formatMoney(item.amount, item.currency)}</p>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }
}
