import { renderInto } from "./dom.js";

export default class Stepper {
  constructor(rootOrId, steps = [], activeIndex = 0) {
    this.root = renderInto(rootOrId, "");
    this.steps = steps;
    this.activeIndex = activeIndex;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="overflow-x-auto pb-2">
        <div class="flex min-w-max gap-3">
          ${this.steps
            .map(
              (step, index) => `
                <div class="flex items-center gap-3 rounded-full px-4 py-3 ${
                  index === this.activeIndex ? "bg-[#0b1f3a] text-white" : "bg-white text-[#3c4b64] border border-[#d9d7d2]"
                }">
                  <span class="grid h-8 w-8 place-items-center rounded-full ${index === this.activeIndex ? "bg-white/15" : "bg-[#f7f4ee]"} text-[12px] font-semibold">${index + 1}</span>
                  <span class="ui-meta font-semibold">${step}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }
}
