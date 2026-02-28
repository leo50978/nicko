import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";
import { SERVICE_CATALOG } from "./services.js";
import { SERVICE_PROMISES } from "./mock-services.js";
import PageHero from "./page-hero.js";
import SectionTitle from "./section-title.js";
import FeatureList from "./feature-list.js";
import ServiceGrid from "./service-grid.js";
import StatStrip from "./stat-strip.js";
import CtaBanner from "./cta-banner.js";

export default class HomePage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    const featureVisual = SERVICE_CATALOG[0];

    this.root.innerHTML = `
      <div id="home-hero-root"></div>
      <section class="section-space">
        <div class="container-shell ui-grid-2">
          <div>
            <div id="home-reason-title-root"></div>
            <div class="mt-6" id="home-reason-list-root"></div>
          </div>
          <div class="glass-panel overflow-hidden p-3 md:p-4" data-motion-pop>
            <img
              src="${featureVisual.image}"
              alt="${featureVisual.imageAlt}"
              class="h-full min-h-[340px] w-full rounded-[28px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section class="section-space-tight">
        <div class="container-shell">
          <div id="home-services-title-root"></div>
          <div class="mt-8" id="home-services-grid-root"></div>
        </div>
      </section>
      <section class="section-space">
        <div class="container-shell">
          <div id="home-process-title-root"></div>
          <div class="mt-8" id="home-process-stats-root"></div>
        </div>
      </section>
      <section class="section-space-tight">
        <div class="container-shell ui-grid-2">
          <div class="glass-panel p-6 md:p-8" data-motion-pop>
            <p class="ui-eyebrow text-[#6f7d92]">${t("home.trustTitle")}</p>
            <h3 class="mt-3 text-[28px] font-semibold text-[#0b1f3a]">Dashboard, QR code, transactions et documents</h3>
            <p class="ui-body mt-4 text-[#3c4b64]">Le meme compte vous permet de suivre les paiements, les PDF disponibles, les notifications et les dossiers en cours.</p>
          </div>
          <div class="glass-panel p-6 md:p-8" data-motion-stagger>
            <div class="ui-grid-2">
              <div class="surface-tile p-5" data-motion-item><p class="ui-meta text-[#6f7d92]">Services actifs</p><p class="mt-2 text-[32px] font-semibold text-[#0b1f3a]">8</p></div>
              <div class="surface-tile p-5" data-motion-item><p class="ui-meta text-[#6f7d92]">Devises</p><p class="mt-2 text-[32px] font-semibold text-[#0b1f3a]">3</p></div>
              <div class="surface-tile p-5" data-motion-item><p class="ui-meta text-[#6f7d92]">Acces mobile</p><p class="mt-2 text-[32px] font-semibold text-[#0b1f3a]">24/7</p></div>
              <div class="surface-tile p-5" data-motion-item><p class="ui-meta text-[#6f7d92]">Compte unique</p><p class="mt-2 text-[32px] font-semibold text-[#0b1f3a]">1</p></div>
            </div>
          </div>
        </div>
      </section>
      <div id="home-cta-root"></div>
    `;

    new PageHero(this.root.querySelector("#home-hero-root"), {
      eyebrow: t("home.eyebrow"),
      title: t("home.title"),
      lead: t("home.lead"),
      actions: `
        <div class="mt-6 flex flex-wrap gap-3">
          <a class="ui-button ui-button-accent" href="/services.html">${t("cta.discover")}</a>
          <a class="ui-button ui-button-secondary" href="/dashboard.html">${t("cta.openDashboard")}</a>
        </div>
      `,
    }).render();

    new SectionTitle(this.root.querySelector("#home-reason-title-root"), {
      eyebrow: t("home.reasonTitle"),
      title: "Une plateforme unique pour orchestrer vos services",
      description: t("home.reasonLead"),
    }).render();

    new FeatureList(this.root.querySelector("#home-reason-list-root"), SERVICE_PROMISES).render();

    new SectionTitle(this.root.querySelector("#home-services-title-root"), {
      eyebrow: "Omni-services",
      title: "Huit plateformes, un seul point d'entree",
      description: "Chaque carte ouvre une page complete avec visuels, commande, paiement et suivi.",
      centered: true,
    }).render();

    new ServiceGrid(this.root.querySelector("#home-services-grid-root"), SERVICE_CATALOG).render();

    new SectionTitle(this.root.querySelector("#home-process-title-root"), {
      eyebrow: t("home.processTitle"),
      title: "Decouvrir, commander, payer, suivre",
      description: "Le parcours est standardise pour toutes les categories afin de limiter les frictions.",
      centered: true,
    }).render();

    new StatStrip(this.root.querySelector("#home-process-stats-root"), [
      { value: "01", label: "Decouvrir les services" },
      { value: "02", label: "Voir la plateforme" },
      { value: "03", label: "Payer en USD / HTG / DOP" },
      { value: "04", label: "Suivre et telecharger" },
    ]).render();

    new CtaBanner(this.root.querySelector("#home-cta-root"), {
      eyebrow: "Compte unique",
      title: "Ouvrez un espace client pour tout gerer au meme endroit",
      description: "Transactions, documents PDF, QR personnel et notifications restent synchronises sur le meme tableau de bord.",
      primaryHref: "/register.html",
      primaryLabel: t("cta.createAccount"),
      secondaryHref: "/create.html",
      secondaryLabel: t("cta.startOrder"),
    }).render();
  }
}
