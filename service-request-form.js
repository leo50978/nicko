import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";
import FileUpload from "./file-upload.js";

export default class ServiceRequestForm {
  constructor(rootOrId, service) {
    this.root = renderInto(rootOrId, "");
    this.service = service;
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <form class="grid gap-5">
        <div class="ui-grid-2">
          <label class="grid gap-2">
            <span class="ui-meta font-semibold text-[#3c4b64]">${t("forms.fullName")}</span>
            <input class="rounded-[16px] border border-[#d9d7d2] bg-white px-4 py-3" placeholder="${t("forms.fullName")}" />
          </label>
          <label class="grid gap-2">
            <span class="ui-meta font-semibold text-[#3c4b64]">${t("forms.phone")}</span>
            <input class="rounded-[16px] border border-[#d9d7d2] bg-white px-4 py-3" placeholder="${t("forms.phone")}" />
          </label>
        </div>
        <label class="grid gap-2">
          <span class="ui-meta font-semibold text-[#3c4b64]">${t("forms.service")}</span>
          <select class="rounded-[16px] border border-[#d9d7d2] bg-white px-4 py-3">
            ${this.service.subServices.map((item) => `<option>${item}</option>`).join("")}
          </select>
        </label>
        <label class="grid gap-2">
          <span class="ui-meta font-semibold text-[#3c4b64]">${t("forms.details")}</span>
          <textarea class="min-h-[140px] rounded-[16px] border border-[#d9d7d2] bg-white px-4 py-3" placeholder="${t("forms.details")}"></textarea>
        </label>
        <div id="file-upload-root"></div>
      </form>
    `;
    new FileUpload(this.root.querySelector("#file-upload-root"), ["piece-identite.pdf"]).render();
  }
}
