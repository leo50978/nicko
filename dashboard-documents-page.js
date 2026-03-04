import { renderInto } from "./dom.js";
import { MOCK_DOCUMENTS } from "./mock-documents.js";
import DocumentList from "./document-list.js";

export default class DashboardDocumentsPage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <section class="grid gap-6">
        <div class="ui-card p-6 md:p-8">
          <p class="ui-eyebrow text-[#6f7d92]">Documents</p>
          <h1 class="ui-title mt-3">Vos PDF telechargeables</h1>
          <p class="ui-body mt-4 text-[#3c4b64]">Tous les documents generes ou lies a vos commandes restent accessibles depuis cette liste.</p>
        </div>
        <div id="dashboard-documents-list-root"></div>
      </section>
    `;
    new DocumentList(this.root.querySelector("#dashboard-documents-list-root"), MOCK_DOCUMENTS).render();
  }
}
