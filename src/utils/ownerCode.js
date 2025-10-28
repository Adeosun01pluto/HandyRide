// src/utils/ownerCode.js
import { toSlug } from "./slug";

export function generateOwnerCode(restaurantName) {
  const slug = toSlug(restaurantName || "restaurant");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase(); // 4 chars
  const time = Date.now().toString(36).slice(-3).toUpperCase();      // 3 chars
  return `${slug}-${rand}${time}`; // e.g. amala-place-Q7FJ9M
}
