export function resolveRoot(rootOrId) {
  if (typeof rootOrId === "string") {
    return document.getElementById(rootOrId);
  }

  return rootOrId || null;
}

export function renderInto(rootOrId, html) {
  const root = resolveRoot(rootOrId);

  if (!root) {
    return null;
  }

  root.innerHTML = html;
  return root;
}

export function createMarkupList(items, formatter) {
  return items.map((item, index) => formatter(item, index)).join("");
}
