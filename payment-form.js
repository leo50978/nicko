import { renderInto } from "./dom.js";
import CurrencySelector from "./currency-selector.js";
import AmountInput from "./amount-input.js";

export default class PaymentForm {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;

    this.root.innerHTML = `
      <div class="ui-card grid gap-5 p-5">
        <div id="currency-selector-root"></div>
        <div id="amount-input-root"></div>
        <label class="grid gap-2">
          <span class="ui-meta font-semibold text-[#3c4b64]">Mode de paiement</span>
          <select class="rounded-[16px] border border-[#d9d7d2] bg-white px-4 py-3">
            <option>Carte</option>
            <option>Virement</option>
            <option>Depot agence</option>
          </select>
        </label>
        <button type="button" data-payment-confirm class="ui-button ui-button-primary">Confirmer le paiement</button>
      </div>
    `;

    new CurrencySelector(this.root.querySelector("#currency-selector-root"), { label: "Devise", value: this.options.currency }).render();
    new AmountInput(this.root.querySelector("#amount-input-root"), { label: "Montant", value: this.options.amount }).render();
  }
}
