// src/lib/orders.js
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { generateOrderNumber } from "../utils/orderNumber";

export async function createOrderFromCart({ items, total }) {
  if (!items?.length) throw new Error("Cart is empty.");

  // assume single-restaurant cart:
  const restaurantId = items[0]?.restaurantId || null;

  const orderNo = generateOrderNumber(); // e.g. HF-841BS6-2G1
  const payload = {
    orderNo,
    restaurantId,
    items: items.map(i => ({
      id: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image || "",
    })),
    total,
    status: "new",           // new | accepted | preparing | ready | delivering | done | canceled
    public: true,            // allow public lookup by # (no PII stored here)
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, "orders", orderNo), payload);
  return orderNo;
}
