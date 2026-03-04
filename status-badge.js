import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";

const CLASS_MAP = {
  pending: "bg-[#fff3d8] text-[#8e5d00]",
  in_progress: "bg-[#dde9ff] text-[#2452a3]",
  paid: "bg-[#dff7ea] text-[#1f7a55]",
  delivered: "bg-[#e6f6ef] text-[#176344]",
  cancelled: "bg-[#fde6e7] text-[#9b2d30]",
};

export default class StatusBadge {
  constructor(rootOrId, status) {
    this.root = renderInto(rootOrId, "");
    this.status = status;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `<span class="inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${CLASS_MAP[this.status] || CLASS_MAP.pending}">${t(`status.${this.status}`)}</span>`;
  }
}
