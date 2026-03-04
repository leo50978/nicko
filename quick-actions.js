import { renderInto } from "./dom.js";
import { appHref } from "./router-state.js";

export default class QuickActions {
  constructor(rootOrId, actions = []) {
    this.root = renderInto(rootOrId, "");
    this.actions = actions;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="ui-grid-3">
        ${this.actions
          .map(
            (action) => `
              <a href="${appHref(action.href)}" class="ui-card flex items-center gap-4 p-5">
                <span class="dashboard-icon grid h-12 w-12 place-items-center rounded-[18px] text-white"><i class="fa-solid ${action.icon}"></i></span>
                <span class="font-semibold text-[#0b1f3a]">${action.label}</span>
              </a>
            `
          )
          .join("")}
      </div>
    `;
  }
}
