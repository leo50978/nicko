import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";
import { SERVICE_CATALOG } from "./services.js";
import { SERVICE_PROMISES } from "./mock-services.js";
import SectionTitle from "./section-title.js";
import FeatureList from "./feature-list.js";
import ServiceGrid from "./service-grid.js";
import StatStrip from "./stat-strip.js";
import CtaBanner from "./cta-banner.js";
import { appHref } from "./router-state.js";

export default class HomePage {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;
    const heroVisual = SERVICE_CATALOG.find((service) => service.id === "administratif") || SERVICE_CATALOG[0];
    const trustVisual = SERVICE_CATALOG.find((service) => service.id === "microfinance-credit") || SERVICE_CATALOG[1];
    const videoVisual = SERVICE_CATALOG.find((service) => service.id === "logistique-livraison") || SERVICE_CATALOG[2];
    const galleryVisuals = SERVICE_CATALOG.slice(0, 4);

    this.root.innerHTML = `
      <section class="section-space home-stage">
        <div class="container-shell">
          <div class="home-hero-shell" data-motion-stagger>
            <div class="home-hero-copy">
              <p class="ui-eyebrow" data-motion-item>${t("home.eyebrow")}</p>
              <h1 class="ui-display home-hero-title mt-4" data-motion-item>${t("home.title")}</h1>
              <p class="ui-subtitle mt-5 max-w-[620px] text-[#3c4b64]" data-motion-item>${t("home.lead")}</p>
              <div class="mt-7 flex flex-wrap gap-3" data-motion-item>
                <a class="ui-button ui-button-primary" href="${appHref("/services.html")}">${t("cta.discover")}</a>
                <a class="ui-button ui-button-secondary" href="${appHref("/dashboard.html")}">${t("cta.openDashboard")}</a>
              </div>
              <div class="home-hero-metrics mt-8">
                <div class="home-hero-stat" data-motion-item>
                  <span class="home-hero-stat-value">8</span>
                  <span class="home-hero-stat-label">services centralises</span>
                </div>
                <div class="home-hero-stat" data-motion-item>
                  <span class="home-hero-stat-value">3</span>
                  <span class="home-hero-stat-label">devises supportees</span>
                </div>
                <div class="home-hero-stat" data-motion-item>
                  <span class="home-hero-stat-value">24/7</span>
                  <span class="home-hero-stat-label">suivi client</span>
                </div>
              </div>
            </div>
            <div class="home-hero-visual" data-motion-item>
              <img
                src="${heroVisual.image}"
                alt="${heroVisual.imageAlt}"
                class="home-hero-image"
                loading="lazy"
              />
              <div class="home-hero-caption">
                <p class="ui-eyebrow">Service en avant</p>
                <p class="mt-2 text-[18px] font-semibold text-[#0b1f3a]">${t(heroVisual.titleKey)}</p>
                <p class="ui-meta mt-2 text-[#6f7d92]">${heroVisual.subServices.join(" · ")}</p>
              </div>
              <div class="home-floating-pill home-floating-pill-top">
                <i class="fa-solid fa-coins"></i>
                <span>${heroVisual.currencies.join(" / ")}</span>
              </div>
              <div class="home-floating-pill home-floating-pill-bottom">
                <i class="fa-solid fa-shield-halved"></i>
                <span>Suivi centralise</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-space">
        <div class="container-shell">
          <div id="home-services-title-root"></div>
          <div class="mt-8" id="home-services-grid-root"></div>
        </div>
      </section>
      <section class="section-space-tight">
        <div class="container-shell">
          <div class="home-proof-shell">
            <div>
              <div id="home-catalogue-title-root"></div>
              <div class="mt-7" data-motion-item>
                <a class="ui-button ui-button-primary" href="${appHref("/catalogue.html")}">Visiter le catalogue</a>
              </div>
            </div>
            <div class="home-proof-visual" data-motion-stagger>
              <div class="home-proof-image" data-motion-item>
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
                  alt="Catalogue de produits technologiques"
                  class="home-proof-image-media"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-space-tight">
        <div class="container-shell">
          <div id="home-media-title-root"></div>
          <div class="home-media-shell mt-8">
            <a class="home-video-showcase" href="${videoVisual.route}" data-motion-pop>
              <img
                src="${videoVisual.image}"
                alt="${videoVisual.imageAlt}"
                class="home-video-image"
                loading="lazy"
              />
              <div class="home-video-overlay">
                <span class="home-play-button" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
                <div>
                  <p class="ui-eyebrow">Apercu video</p>
                  <p class="mt-2 text-[24px] font-semibold leading-tight text-[#0b1f3a] md:text-[32px]">
                    Visualisez ${t(videoVisual.titleKey).toLowerCase()} dans un format plus immersif
                  </p>
                  <p class="ui-body mt-3 text-[#3c4b64]">
                    Un bloc media plus riche pour montrer le service, les etapes et l'environnement client.
                  </p>
                </div>
              </div>
            </a>
            <div class="home-gallery-grid" data-motion-stagger>
              ${galleryVisuals
                .map(
                  (service, index) => `
                    <a class="home-gallery-card ${index === 0 ? "is-large" : ""}" href="${service.route}" data-motion-item>
                      <img
                        src="${service.image}"
                        alt="${service.imageAlt}"
                        class="home-gallery-image"
                        loading="lazy"
                      />
                      <div class="home-gallery-label">
                        <p class="ui-eyebrow">Image</p>
                        <p class="mt-2 text-[18px] font-semibold text-[#0b1f3a]">${t(service.titleKey)}</p>
                      </div>
                    </a>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>
      <section class="section-space-tight">
        <div class="container-shell">
          <div class="home-proof-shell">
            <div>
              <div id="home-reason-title-root"></div>
              <div class="mt-6" id="home-reason-list-root"></div>
            </div>
            <div class="home-proof-visual" data-motion-stagger>
              <div class="home-testimonial-card panel p-6 md:p-7" data-motion-item>
                <div class="home-stars" aria-hidden="true">★★★★★</div>
                <p class="mt-4 text-[24px] font-semibold leading-tight text-[#0b1f3a] md:text-[30px]">
                  Un compte unique pour piloter paiements, documents et demandes.
                </p>
                <p class="ui-body mt-4 text-[#3c4b64]">
                  Dashboard, QR code, transactions et notifications restent synchronises pour chaque service.
                </p>
                <p class="ui-meta mt-5 text-[#6f7d92]">Espace client LE GOUVERNEUR</p>
              </div>
              <div class="home-proof-image" data-motion-item>
                <img
                  src="${trustVisual.image}"
                  alt="${trustVisual.imageAlt}"
                  class="home-proof-image-media"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-space">
        <div class="container-shell">
          <div class="home-process-panel panel p-6 md:p-8">
            <div id="home-process-title-root"></div>
            <div class="mt-8" id="home-process-stats-root"></div>
          </div>
        </div>
      </section>
      <section class="section-space-tight">
        <div class="container-shell">
          <div class="home-platform-panel ui-grid-2">
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
        </div>
      </section>
      <div id="home-cta-root"></div>
    `;

    new SectionTitle(this.root.querySelector("#home-services-title-root"), {
      eyebrow: "Omni-services",
      title: "Tous les services, une seule experience",
      description: "Chaque carte ouvre une page complete avec le meme parcours de commande, paiement, suivi et telechargement.",
    }).render();

    new ServiceGrid(this.root.querySelector("#home-services-grid-root"), SERVICE_CATALOG).render();

    new SectionTitle(this.root.querySelector("#home-catalogue-title-root"), {
      eyebrow: "Catalogue de produits",
      title: "Explorez nos produits technologiques",
      description: "Une sélection d'outils et d'appareils pour la communication, le transport, la maison et plus encore.",
    }).render();

    new SectionTitle(this.root.querySelector("#home-media-title-root"), {
      eyebrow: "Media",
      title: "Des images fortes pour remplir la page et mieux raconter le service",
      description: "La page d'accueil gagne un bloc visuel plus dense avec apercu video, galerie et acces direct aux plateformes.",
    }).render();

    new SectionTitle(this.root.querySelector("#home-reason-title-root"), {
      eyebrow: t("home.reasonTitle"),
      title: "Une plateforme claire pour centraliser vos operations",
      description: t("home.reasonLead"),
    }).render();

    new FeatureList(this.root.querySelector("#home-reason-list-root"), SERVICE_PROMISES).render();

    new SectionTitle(this.root.querySelector("#home-process-title-root"), {
      eyebrow: t("home.processTitle"),
      title: "Decouvrir, commander, payer, suivre",
      description: "Le parcours reste identique sur toutes les categories pour limiter les frictions et garder un suivi lisible.",
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
