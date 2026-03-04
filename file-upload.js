import { renderInto } from "./dom.js";

export default class FileUpload {
  constructor(rootOrId, files = []) {
    this.root = renderInto(rootOrId, "");
    this.files = files;
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <div class="ui-card p-5">
        <label class="ui-meta mb-3 block font-semibold text-[#3c4b64]">Pieces jointes</label>
        <input type="file" class="block w-full rounded-[16px] border border-dashed border-[#c79b45] px-4 py-4" />
        ${this.files.length ? `<div class="mt-4 grid gap-2">${this.files.map((file) => `<div class="ui-chip justify-between">${file}</div>`).join("")}</div>` : ""}
      </div>
    `;
  }
}
