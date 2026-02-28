export function getPageKey() {
  return document.body.dataset.page || "home";
}

export function getServiceSlug() {
  return document.body.dataset.service || new URLSearchParams(window.location.search).get("service") || "";
}

export function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

export function buildUrl(path, params = {}) {
  const search = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  return search ? `${path}?${search}` : path;
}
