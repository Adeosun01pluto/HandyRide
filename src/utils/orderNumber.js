// src/utils/orderNumber.js
export function generateOrderNumber(prefix = "HF") {
  const rand = () => Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(2, 6);
  const part1 = rand();                      // 4–5 chars
  const part2 = (Date.now().toString(36).toUpperCase()).slice(-3); // time-based 3 chars
  return `${prefix}-${part1}-${part2}`;
}
