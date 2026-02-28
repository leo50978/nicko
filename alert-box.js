import { renderInto } from "./dom.js";

const TYPE_CLASS = {
  info: "border-[#dbe8ff] bg-[#f4f8ff] text-[#2452a3]",
  success: "border-[#dff7ea] bg-[#f1fbf6] text-[#1f7a55]",
  warning: "border-[#fff0d0] bg-[#fff9ec] text-[#8e5d00]",
};

export default class AlertBox {
  constructor(rootOrId, options = {}) {
    this.root = renderInto(rootOrId, "");
    this.options = options;
  }

  render() {
    if (!this.root) return;
    const tone = TYPE_CLASS[this.options.type] || TYPE_CLASS.info;
    this.root.innerHTML = `
      <div class="rounded-[20px] border p-4 ${tone}">
        <p class="text-[15px] font-semibold">${this.options.title || ""}</p>
        <p class="ui-meta mt-2">${this.options.body || ""}</p>
      </div>
    `;
  }
}
