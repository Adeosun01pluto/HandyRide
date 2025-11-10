// src/utils/clientKeyHelpers.js

export const clientKeyStorageKey = (orderId) =>
  `rideOrder:${orderId}:clientKey`;

export function getClientKeyFor(orderId) {
  if (!orderId) return null;
  try {
    return localStorage.getItem(clientKeyStorageKey(orderId)) || null;
  } catch {
    return null;
  }
}

export function setClientKeyFor(orderId, key) {
  if (!orderId || !key) return;
  try {
    localStorage.setItem(clientKeyStorageKey(orderId), key);
  } catch {}
}

export function getLocalActive() {
  try {
    const v = JSON.parse(localStorage.getItem("rideOrder:active"));
    return v && typeof v === "object" ? v : null;
  } catch {
    return null;
  }
}

export function keepActive(order) {
  try {
    const cache = {
      id: order.id,
      trackingNumber: order.trackingNumber,
      clientKey: getClientKeyFor(order.id),
      status: order.status,
      pickup: order.pickup,
      destination: order.destination || order.dropoff,
      originalFare: order.originalFare,
      bid: order.bid || null,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("rideOrder:active", JSON.stringify(cache));
  } catch {}
}

export function clearActive(orderId) {
  try {
    const active = getLocalActive();
    if (active?.id === orderId) localStorage.removeItem("rideOrder:active");
  } catch {}
}

/** Generate a >=16-char random client key, once at booking time */
export function genClientKey() {
  try {
    if (crypto?.randomUUID) return crypto.randomUUID().replace(/-/g, "");
    // fallback
    return (
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2)
    ).slice(0, 24);
  } catch {
    return (
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2)
    ).slice(0, 24);
  }
}
