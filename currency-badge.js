import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";

export default class CurrencyBadge {
  constructor(rootOrId, code) {
    this.root = renderInto(rootOrId, "");
    this.code = code;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `<span class="ui-chip !min-h-[34px] !bg-[#f7f4ee]">${this.code} · ${t(`currencies.${this.code.toLowerCase()}`)}</span>`;
  }
}
