import { SERVICE_CATALOG } from "./services.js";
import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";
import Breadcrumb from "./breadcrumb.js";
import SectionTitle from "./section-title.js";
import FeatureList from "./feature-list.js";
import ServiceHero from "./service-hero.js";
import ServiceOverview from "./service-overview.js";
import ServiceOffers from "./service-offers.js";
import ServiceProcess from "./service-process.js";
import ServicePricing from "./service-pricing.js";
import ServiceFaq from "./service-faq.js";
import ServiceCta from "./service-cta.js";

const DEMO_VIDEO = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default class ServiceDetailPage {
  constructor(rootOrId, context = {}) {
    this.root = renderInto(rootOrId, "");
    this.service = context.service;
  }

  getServiceName() {
    return t(this.service.titleKey);
  }

  getGalleryItems() {
    const currentIndex = SERVICE_CATALOG.findIndex((item) => item.id === this.service.id);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const gallery = [
      {
        src: this.service.image,
        alt: this.service.imageAlt,
        label: "Vue principale",
      },
    ];

    for (let offset = 1; offset <= 3; offset += 1) {
      const related = SERVICE_CATALOG[(safeIndex + offset) % SERVICE_CATALOG.length];
      gallery.push({
        src: related.image,
        alt: related.imageAlt,
        label: related.subServices[0],
      });
    }

    return gallery;
  }

  renderMediaShowcase() {
    return `
      <section class="section-space-tight">
        <div class="container-shell">
          <div class="panel overflow-hidden" data-motion-stagger>
            <div class="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)]">
              <div class="p-6 md:p-10" data-motion-item>
                <p class="ui-eyebrow text-[#6f7d92]">Plateforme complete</p>
                <h2 class="ui-title mt-3">Une experience visuelle pour ${this.getServiceName()}</h2>
                <p class="ui-body mt-4 text-[#3c4b64]">Cette page rassemble la presentation du service, les offres disponibles, les etapes de traitement et les points de verification avant validation.</p>
                <div class="mt-6 grid gap-3 sm:grid-cols-2">
                  ${[
                    { label: "Sous-services", value: this.service.subServices.length },
                    { label: "Etapes", value: this.service.process.length },
                    { label: "Devises", value: this.service.currencies.length },
                    { label: "Documents", value: this.service.requiredDocs.length },
                  ]
                    .map(
                      (item) => `
                        <div class="surface-tile p-5">
                          <p class="ui-meta text-[#6f7d92]">${item.label}</p>
                          <p class="mt-2 text-[30px] font-semibold text-[#0b1f3a]">${item.value}</p>
                        </div>
                      `
                    )
                    .join("")}
                </div>
                <div class="mt-6 flex flex-wrap gap-2">
                  ${this.service.highlights.map((item) => `<span class="ui-chip !min-h-[36px]">${item}</span>`).join("")}
                </div>
              </div>
              <div class="relative min-h-[360px] bg-[#08172b] p-4 md:p-5" data-motion-item>
                <video class="h-full w-full rounded-[28px] object-cover" controls autoplay muted loop playsinline poster="${this.service.image}">
                  <source src="${DEMO_VIDEO}" type="video/mp4" />
                </video>
                <div class="pointer-events-none absolute inset-x-8 bottom-8 rounded-[24px] border border-white/10 bg-[#04101f]/80 p-4 text-white backdrop-blur">
                  <p class="ui-eyebrow text-white/55">Apercu video</p>
                  <p class="mt-2 text-[18px] font-semibold text-white">${this.service.process.join(" · ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderVisualGallery() {
    const gallery = this.getGalleryItems();
    const lead = gallery[0];
    const stack = gallery.slice(1);

    return `
      <section class="section-space-tight">
        <div class="container-shell">
          <div class="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]" data-motion-stagger>
            <div class="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-3 shadow-[0_30px_80px_rgba(11,31,58,0.08)]" data-motion-item>
              <img
                src="${lead.src}"
                alt="${lead.alt}"
                class="h-full min-h-[460px] w-full rounded-[28px] object-cover"
                loading="lazy"
              />
              <div class="absolute inset-x-7 bottom-7 rounded-[24px] bg-white/88 p-5 backdrop-blur">
                <p class="ui-eyebrow text-[#6f7d92]">${lead.label}</p>
                <p class="mt-2 text-[24px] font-semibold text-[#0b1f3a]">${this.getServiceName()}</p>
                <p class="ui-body mt-2 text-[#3c4b64]">${this.service.subServices.join(" · ")}</p>
              </div>
            </div>
            <div class="grid gap-5">
              ${stack
                .map(
                  (item, index) => `
                    <div class="overflow-hidden rounded-[28px] border border-white/60 bg-white/70 p-3 shadow-[0_24px_60px_rgba(11,31,58,0.08)]" data-motion-item>
                      <img
                        src="${item.src}"
                        alt="${item.alt}"
                        class="h-[140px] w-full rounded-[22px] object-cover md:h-[180px]"
                        loading="lazy"
                      />
                      <div class="mt-4 flex items-center justify-between gap-3">
                        <span class="ui-chip !min-h-[34px]">${item.label}</span>
                        <span class="ui-meta font-semibold text-[#6f7d92]">0${index + 2}</span>
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderUseCases() {
    const gallery = this.getGalleryItems();
    const supportVisual = gallery[1] || gallery[0];

    return `
      <section class="section-space-tight">
        <div class="container-shell ui-grid-2" data-motion-stagger>
          <div class="panel overflow-hidden p-3 md:p-4" data-motion-item>
            <img
              src="${supportVisual.src}"
              alt="${supportVisual.alt}"
              class="h-full min-h-[360px] w-full rounded-[28px] object-cover"
              loading="lazy"
            />
          </div>
          <div class="grid gap-4">
            <div class="panel p-6 md:p-8" data-motion-item>
              <p class="ui-eyebrow text-[#6f7d92]">Cas d'usage</p>
              <h2 class="ui-title mt-3">Des blocs clairs pour chaque intervention</h2>
              <p class="ui-body mt-4 text-[#3c4b64]">Chaque sous-service est relie a une etape concrete pour garder une lecture simple sur desktop comme sur mobile.</p>
            </div>
            ${this.service.subServices
              .map(
                (item, index) => `
                  <div class="surface-tile p-5" data-motion-item>
                    <p class="ui-meta font-semibold text-[#6f7d92]">0${index + 1}</p>
                    <p class="mt-2 text-[22px] font-semibold text-[#0b1f3a]">${item}</p>
                    <p class="ui-body mt-3 text-[#3c4b64]">${this.service.process[index] || this.service.process[this.service.process.length - 1]}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  render() {
    if (!this.root || !this.service) return;
    this.root.innerHTML = `
      <section class="section-space-tight">
        <div class="container-shell"><div id="service-breadcrumb-root"></div></div>
      </section>
      <div id="service-hero-root"></div>
      ${this.renderMediaShowcase()}
      ${this.renderVisualGallery()}
      <section class="section-space-tight">
        <div class="container-shell"><div id="service-overview-root"></div></div>
      </section>
      <section class="section-space">
        <div class="container-shell">
          <div id="service-offers-title-root"></div>
          <div class="mt-8" id="service-offers-root"></div>
        </div>
      </section>
      ${this.renderUseCases()}
      <section class="section-space-tight">
        <div class="container-shell">
          <div id="service-process-title-root"></div>
          <div class="mt-8" id="service-process-root"></div>
        </div>
      </section>
      <section class="section-space-tight">
        <div class="container-shell ui-grid-2">
          <div>
            <div id="service-docs-title-root"></div>
            <div class="mt-6" id="service-docs-root"></div>
          </div>
          <div id="service-pricing-root"></div>
        </div>
      </section>
      <section class="section-space-tight">
        <div class="container-shell">
          <div id="service-faq-title-root"></div>
          <div class="mt-6" id="service-faq-root"></div>
        </div>
      </section>
      <section class="section-space-tight">
        <div class="container-shell"><div id="service-cta-root"></div></div>
      </section>
    `;

    new Breadcrumb(this.root.querySelector("#service-breadcrumb-root"), [
      { label: "Accueil", href: "/index.html" },
      { label: "Services", href: "/services.html" },
      { label: this.service.slug.replaceAll("-", " "), href: this.service.route },
    ]).render();

    new ServiceHero(this.root.querySelector("#service-hero-root"), this.service).render();
    new ServiceOverview(this.root.querySelector("#service-overview-root"), this.service).render();

    new SectionTitle(this.root.querySelector("#service-offers-title-root"), {
      eyebrow: "Sous-services",
      title: "Une plateforme dediee a votre besoin",
      description: "Choisissez le sous-service adapte, puis poursuivez sur un flux standardise.",
    }).render();
    new ServiceOffers(this.root.querySelector("#service-offers-root"), this.service).render();

    new SectionTitle(this.root.querySelector("#service-process-title-root"), {
      eyebrow: "Processus",
      title: "Le service avance par etapes claires",
      description: "Chaque dossier reste visible depuis le suivi et le dashboard.",
    }).render();
    new ServiceProcess(this.root.querySelector("#service-process-root"), this.service).render();

    new SectionTitle(this.root.querySelector("#service-docs-title-root"), {
      eyebrow: "Documents requis",
      title: "Preparez les pieces utiles",
      description: "Les elements suivants sont generalement demandes pour accelerer la prise en charge.",
    }).render();
    new FeatureList(this.root.querySelector("#service-docs-root"), this.service.requiredDocs).render();
    new ServicePricing(this.root.querySelector("#service-pricing-root"), this.service).render();

    new SectionTitle(this.root.querySelector("#service-faq-title-root"), {
      eyebrow: "Questions frequentes",
      title: "Anticipez les points sensibles avant de commander",
    }).render();
    new ServiceFaq(this.root.querySelector("#service-faq-root"), this.service).render();

    new ServiceCta(this.root.querySelector("#service-cta-root"), this.service).render();
  }
}
