export function getPageKey() {
  return document.body.dataset.page || "home";
}

export function getServiceSlug() {
  return document.body.dataset.service || new URLSearchParams(window.location.search).get("service") || "";
}

export function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

export function appHref(path = "") {
  if (!path) {
    return path;
  }

  if (
    path.startsWith("./") ||
    path.startsWith("../") ||
    path.startsWith("#") ||
    path.startsWith("?") ||
    /^[a-z]+:/i.test(path) ||
    path.startsWith("//")
  ) {
    return path;
  }

  return path.startsWith("/") ? `.${path}` : `./${path}`;
}

export function buildUrl(path, params = {}) {
  const search = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  const normalizedPath = appHref(path);
  return search ? `${normalizedPath}?${search}` : normalizedPath;
}
