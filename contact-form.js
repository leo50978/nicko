import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";

export default class ContactForm {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <form class="ui-card grid gap-4 p-5">
        <input class="rounded-[16px] border border-[#d9d7d2] px-4 py-3" placeholder="${t("forms.fullName")}" />
        <input class="rounded-[16px] border border-[#d9d7d2] px-4 py-3" placeholder="${t("forms.email")}" />
        <textarea class="min-h-[120px] rounded-[16px] border border-[#d9d7d2] px-4 py-3" placeholder="${t("forms.notes")}"></textarea>
        <button type="button" class="ui-button ui-button-primary">${t("forms.submit")}</button>
      </form>
    `;
  }
}
