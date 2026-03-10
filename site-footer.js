import { renderInto } from "./dom.js";
import { t } from "./i18n-store.js";
import { appHref } from "./router-state.js";

export default class SiteFooter {
  constructor(rootOrId) {
    this.root = renderInto(rootOrId, "");
  }

  render() {
    if (!this.root) return;

    const address = "201, Rue Pétion, Saint Marc(HT4310), Artibonite";
    const encodedAddress = encodeURIComponent("201, Rue Pétion, Saint Marc, Artibonite, Haiti");

    this.root.innerHTML = `
      <footer class="site-footer section-space bg-[#0b1f3a] text-white">
        <div class="container-shell">
          <div class="grid md:grid-cols-4 gap-8">
            <div class="footer-brand md:col-span-1">
              <a class="ui-brand text-white" href="${appHref("/")}">${t("nav.brand")}</a>
              <p class="ui-body-small mt-4 text-[#a0aec0]">Une plateforme pour centraliser les services essentiels des particuliers et des entreprises.</p>
            </div>
            <div class="footer-links">
              <h3 class="ui-eyebrow text-[#718096]">Navigation</h3>
              <ul class="mt-4 space-y-2">
                <li><a href="${appHref("/")}" class="text-[#cbd5e0] hover:text-white hover:underline">${t("nav.home")}</a></li>
                <li><a href="${appHref("/services.html")}" class="text-[#cbd5e0] hover:text-white hover:underline">${t("nav.services")}</a></li>
                <li><a href="${appHref("/create.html")}" class="text-[#cbd5e0] hover:text-white hover:underline">${t("nav.orders")}</a></li>
                <li><a href="${appHref("/dashboard.html")}" class="text-[#cbd5e0] hover:text-white hover:underline">${t("nav.dashboard")}</a></li>
              </ul>
            </div>
            <div class="footer-contact md:col-span-2">
              <h3 class="ui-eyebrow text-[#718096]">Contactez-nous</h3>
              <address class="mt-4 space-y-3 not-italic">
                <div class="flex items-start">
                  <i class="fa-solid fa-map-marker-alt mt-1 w-5 text-[#718096] flex-shrink-0"></i>
                  <a href="https://www.google.com/maps/search/?api=1&query=${encodedAddress}" target="_blank" rel="noopener noreferrer" class="ml-2 text-[#cbd5e0] hover:text-white hover:underline">${address}</a>
                </div>
                <div class="flex items-center">
                  <i class="fa-solid fa-envelope w-5 text-[#718096] flex-shrink-0"></i>
                  <a href="mailto:infos@legouverneuros.com" class="ml-2 text-[#cbd5e0] hover:text-white hover:underline">infos@legouverneuros.com</a>
                </div>
                <div class="flex items-center">
                  <i class="fa-solid fa-phone w-5 text-[#718096] flex-shrink-0"></i>
                  <span class="ml-2 text-[#cbd5e0]">
                    <a href="tel:+(509)4419-3620" class="hover:text-white hover:underline">+(509) 4419-3620</a> / <a href="tel:+(509)3584-8439" class="hover:text-white hover:underline">3584-8439</a>
                  </span>
                </div>
              </address>
            </div>
          </div>
          <div class="mt-8 border-t border-[#2d3748] pt-6 flex flex-col md:flex-row justify-between items-center">
            <p class="ui-body-small text-[#a0aec0]">&copy; ${new Date().getFullYear()} ${t("nav.brand")}. Tous droits réservés.</p>
            <div class="flex space-x-4 mt-4 md:mt-0">
              <a href="#" aria-label="Facebook" class="text-[#a0aec0] hover:text-white"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter" class="text-[#a0aec0] hover:text-white"><i class="fa-brands fa-twitter"></i></a>
              <a href="#" aria-label="Instagram" class="text-[#a0aec0] hover:text-white"><i class="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}