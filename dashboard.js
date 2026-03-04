import { appHref } from "./router-state.js";

export const DASHBOARD_SECTIONS = [
  { id: "overview", route: appHref("/dashboard.html"), icon: "fa-chart-line" },
  { id: "transactions", route: appHref("/transactions.html"), icon: "fa-receipt" },
  { id: "documents", route: appHref("/documents.html"), icon: "fa-file-pdf" },
  { id: "payments", route: appHref("/payments.html"), icon: "fa-credit-card" },
  { id: "qr", route: appHref("/qr-code.html"), icon: "fa-qrcode" },
  { id: "notifications", route: appHref("/notifications.html"), icon: "fa-bell" },
  { id: "profile", route: appHref("/profile.html"), icon: "fa-user" },
];
