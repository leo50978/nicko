import { DEMO_SESSION } from "./mock-session.js";
import { MOCK_USERS } from "./mock-user.js";

const SESSION_KEY = "lgov-session";

export function getSession() {
  const raw = window.localStorage.getItem(SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function setSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return getSession();
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return Boolean(getSession());
}

export function getCurrentUser() {
  const session = getSession();

  if (!session) {
    return null;
  }

  return session.userType === "individual" ? MOCK_USERS.individual : MOCK_USERS.business;
}

export function ensureDemoSession() {
  if (!getSession()) {
    setSession(DEMO_SESSION);
  }
}
