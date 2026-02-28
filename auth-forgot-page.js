import { renderInto } from "./dom.js";
import AlertBox from "./alert-box.js";

export default class AuthForgotPage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    this.root.innerHTML = `
      <section class="section-space">
        <div class="container-shell">
          <div class="mx-auto max-w-[560px] grid gap-5">
            <div class="ui-card p-6 md:p-8">
              <p class="ui-eyebrow text-[#6f7d92]">Recovery</p>
              <h1 class="ui-title mt-3">Reprenez l'acces a votre compte</h1>
              <form class="mt-6 grid gap-4">
                <input class="rounded-[16px] border border-[#d9d7d2] px-4 py-3" placeholder="Adresse email" />
                <button type="button" class="ui-button ui-button-primary">Recevoir un lien</button>
              </form>
            </div>
            <div id="forgot-alert-root"></div>
          </div>
        </div>
      </section>
    `;
    new AlertBox(this.root.querySelector("#forgot-alert-root"), {
      type: "info",
      title: "Simulation front-end",
      body: "Cette page illustre le parcours de recuperation sans envoi d'email reel.",
    }).render();
  }
}
