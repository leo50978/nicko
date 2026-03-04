import { renderInto } from "./dom.js";
import { appHref } from "./router-state.js";

export default class QrPanel {
  constructor(rootOrId, qrCode) {
    this.root = renderInto(rootOrId, "");
    this.qrCode = qrCode;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="ui-card p-6 text-center">
        <div class="qr-code-surface mx-auto grid h-[220px] w-[220px] place-items-center">
          <div class="grid grid-cols-5 gap-2">
            ${Array.from({ length: 25 })
              .map((_, index) => `<span class="h-6 w-6 rounded-[6px] ${index % 3 === 0 ? "qr-code-cell" : "qr-code-cell qr-code-cell-soft"}"></span>`)
              .join("")}
          </div>
        </div>
        <p class="mt-5 text-[18px] font-semibold text-[#0b1f3a]">${this.qrCode}</p>
        <div class="mt-4 flex flex-wrap justify-center gap-3">
          <button type="button" class="ui-button ui-button-primary">Partager</button>
          <a class="ui-button ui-button-secondary" href="${appHref("/sample-document.pdf")}" download="client-qr.pdf">Telecharger</a>
        </div>
      </div>
    `;
  }
}
