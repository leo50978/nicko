import { appHref } from "./router-state.js";

export const MOCK_DOCUMENTS = [
  {
    id: "doc-001",
    title: "Mandat de gestion",
    type: "PDF",
    relatedOrderId: "ORD-2026-001",
    fileName: "sample-document.pdf",
    downloadUrl: appHref("/sample-document.pdf"),
    createdAt: "2026-02-25",
  },
  {
    id: "doc-002",
    title: "Facture client",
    type: "PDF",
    relatedOrderId: "ORD-2026-002",
    fileName: "sample-document.pdf",
    downloadUrl: appHref("/sample-document.pdf"),
    createdAt: "2026-02-24",
  },
  {
    id: "doc-003",
    title: "Bordereau de livraison",
    type: "PDF",
    relatedOrderId: "ORD-2026-003",
    fileName: "sample-document.pdf",
    downloadUrl: appHref("/sample-document.pdf"),
    createdAt: "2026-02-22",
  },
];
