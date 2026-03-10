import { appHref } from "./router-state.js";

export const PUBLIC_NAV = [
  { key: "nav.home", href: appHref("/index.html") },
  { key: "nav.services", href: appHref("/services.html") },
  { key: "nav.catalogue", href: appHref("/catalogue.html") },
  { key: "nav.orders", href: appHref("/create.html") },
  { key: "nav.dashboard", href: appHref("/dashboard.html") },
];

export const FOOTER_LINKS = [
  { key: "nav.services", href: appHref("/services.html") },
  { key: "nav.transactions", href: appHref("/transactions.html") },
  { key: "nav.documents", href: appHref("/documents.html") },
  { key: "nav.payments", href: appHref("/payments.html") },
  { key: "nav.contact", href: appHref("/register.html") },
];
