import { renderInto } from "./dom.js";
import { MOCK_TRANSACTIONS } from "./mock-transactions.js";
import SearchBar from "./search-bar.js";
import FilterChips from "./filter-chips.js";
import TransactionTable from "./transaction-table.js";
import Pagination from "./pagination.js";
import EmptyState from "./empty-state.js";

export default class DashboardTransactionsPage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
    this.searchValue = "";
    this.statusFilter = "all";
  }

  getItems() {
    return MOCK_TRANSACTIONS.filter((item) => {
      const matchesSearch = !this.searchValue || item.label.toLowerCase().includes(this.searchValue.toLowerCase());
      const matchesStatus = this.statusFilter === "all" || item.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  renderTable() {
    const items = this.getItems();
    if (!items.length) {
      new EmptyState(this.root.querySelector("#dashboard-transactions-table-root"), {
        title: "Aucune transaction",
        description: "Modifiez vos filtres pour afficher des donnees.",
      }).render();
      return;
    }
    new TransactionTable(this.root.querySelector("#dashboard-transactions-table-root"), items).render();
  }

  bindFilters() {
    this.root.querySelector("[data-search-input]")?.addEventListener("input", (event) => {
      this.searchValue = event.target.value;
      this.renderTable();
    });
    this.root.querySelectorAll("[data-filter-value]").forEach((button) => {
      button.addEventListener("click", () => {
        this.statusFilter = button.dataset.filterValue;
        this.render();
      });
    });
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <section class="grid gap-6">
        <div class="ui-card p-6 md:p-8">
          <p class="ui-eyebrow text-[#6f7d92]">Transactions</p>
          <h1 class="ui-title mt-3">Historique des mouvements</h1>
          <p class="ui-body mt-4 text-[#3c4b64]">Filtrez par statut ou recherchez un libelle pour retrouver rapidement un paiement.</p>
        </div>
        <div id="dashboard-transactions-search-root"></div>
        <div id="dashboard-transactions-filter-root"></div>
        <div id="dashboard-transactions-table-root"></div>
        <div id="dashboard-transactions-pagination-root"></div>
      </section>
    `;
    new SearchBar(this.root.querySelector("#dashboard-transactions-search-root"), {
      placeholder: "Rechercher une transaction",
      value: this.searchValue,
    }).render();
    new FilterChips(this.root.querySelector("#dashboard-transactions-filter-root"), {
      selected: this.statusFilter,
      items: [
        { value: "all", label: "Tous" },
        { value: "pending", label: "Recu" },
        { value: "paid", label: "Paye" },
        { value: "delivered", label: "Livre" },
      ],
    }).render();
    this.renderTable();
    new Pagination(this.root.querySelector("#dashboard-transactions-pagination-root"), { current: 1, total: 1 }).render();
    this.bindFilters();
  }
}
