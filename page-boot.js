import { PAGE_DEFINITIONS } from "./routes.js";
import { findServiceBySlug } from "./services.js";
import { getLocale } from "./i18n-store.js";
import { refreshSiteMotion } from "./motion.js";
import { isAuthenticated } from "./session-store.js";
import { appHref, getPageKey, getQueryParam, getServiceSlug } from "./router-state.js";
import AppShell from "./app-shell.js";
import HomePage from "./home-page.js";
import ServicesPage from "./services-page.js";
import ServiceDetailPage from "./service-detail-page.js";
import OrderCreatePage from "./order-create-page.js";
import OrderPaymentPage from "./order-payment-page.js";
import OrderTrackingPage from "./order-tracking-page.js";
import OrderSuccessPage from "./order-success-page.js";
import DashboardHomePage from "./dashboard-home-page.js";
import DashboardTransactionsPage from "./dashboard-transactions-page.js";
import DashboardDocumentsPage from "./dashboard-documents-page.js";
import DashboardPaymentsPage from "./dashboard-payments-page.js";
import DashboardQrPage from "./dashboard-qr-page.js";
import DashboardNotificationsPage from "./dashboard-notifications-page.js";
import DashboardProfilePage from "./dashboard-profile-page.js";
import AuthLoginPage from "./auth-login-page.js";
import AuthRegisterPage from "./auth-register-page.js";
import AuthForgotPage from "./auth-forgot-page.js";

const PAGE_CLASS_MAP = {
  home: HomePage,
  services: ServicesPage,
  serviceDetail: ServiceDetailPage,
  orderCreate: OrderCreatePage,
  orderPayment: OrderPaymentPage,
  orderTracking: OrderTrackingPage,
  orderSuccess: OrderSuccessPage,
  dashboardHome: DashboardHomePage,
  dashboardTransactions: DashboardTransactionsPage,
  dashboardDocuments: DashboardDocumentsPage,
  dashboardPayments: DashboardPaymentsPage,
  dashboardQr: DashboardQrPage,
  dashboardNotifications: DashboardNotificationsPage,
  dashboardProfile: DashboardProfilePage,
  login: AuthLoginPage,
  register: AuthRegisterPage,
  forgotPassword: AuthForgotPage,
};

function resolveContext(pageKey) {
  return {
    pageKey,
    query: {
      service: getQueryParam("service"),
      order: getQueryParam("order"),
      tracking: getQueryParam("tracking"),
    },
    service: findServiceBySlug(getServiceSlug()),
  };
}

function mountPage(contentRoot, pageKey) {
  const PageClass = PAGE_CLASS_MAP[pageKey] || HomePage;
  const page = new PageClass(contentRoot, resolveContext(pageKey));
  page.render();
}

export function boot() {
  const pageKey = getPageKey();
  const route = PAGE_DEFINITIONS[pageKey] || PAGE_DEFINITIONS.home;

  document.documentElement.lang = getLocale();

  if (route.requiresAuth && !isAuthenticated()) {
    window.location.href = appHref("/login.html");
    return;
  }

  const shell = new AppShell("app-shell", route);
  const contentRoot = shell.render();
  mountPage(contentRoot, pageKey);
  refreshSiteMotion(document);
}

if (typeof document !== "undefined") {
  boot();
}
