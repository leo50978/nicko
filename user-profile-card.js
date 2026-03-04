import { renderInto } from "./dom.js";

export default class UserProfileCard {
  constructor(rootOrId, user) {
    this.root = renderInto(rootOrId, "");
    this.user = user;
  }

  render() {
    if (!this.root || !this.user) return;
    this.root.innerHTML = `
      <div class="ui-card p-6">
        <div class="flex items-center gap-4">
          <div class="dashboard-icon grid h-14 w-14 place-items-center rounded-full text-white">
            <i class="fa-solid fa-user"></i>
          </div>
          <div>
            <p class="text-[20px] font-semibold text-[#0b1f3a]">${this.user.fullName}</p>
            <p class="ui-meta text-[#6f7d92]">${this.user.type}</p>
          </div>
        </div>
        <div class="mt-5 grid gap-3">
          <div class="ui-chip justify-between">${this.user.email}</div>
          <div class="ui-chip justify-between">${this.user.phone}</div>
          <div class="ui-chip justify-between">${this.user.locale.toUpperCase()} · ${this.user.currency}</div>
        </div>
      </div>
    `;
  }
}
