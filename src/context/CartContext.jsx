import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const STORAGE_KEY = "hf_cart_v1";
const ORDER_KEY = "hf_cart_order_id";

function generateOrderId() {
  // Example: HF-8K3ZP2-MLA
  const a = Date.now().toString(36).toUpperCase().slice(-6);
  const b = Math.random().toString(36).toUpperCase().slice(2,5);
  return `HF-${a}-${b}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [orderId, setOrderId] = useState(() => {
    try {
      return localStorage.getItem(ORDER_KEY) || generateOrderId();
    } catch {
      return generateOrderId();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(ORDER_KEY, orderId);
  }, [orderId]);

  const addToCart = (item) => {
    // item = { id, restaurantId, name, price, quantity, image }
    setItems((prev) => {
      const idx = prev.findIndex(
        (x) => x.id === item.id && x.restaurantId === item.restaurantId
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + (item.quantity || 1) };
        return next;
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const decrementFromCart = (id, restaurantId) => {
    setItems((prev) =>
      prev.flatMap((x) => {
        if (x.id === id && x.restaurantId === restaurantId) {
          const q = x.quantity - 1;
          return q > 0 ? [{ ...x, quantity: q }] : [];
        }
        return [x];
      })
    );
  };

  const removeFromCart = (id, restaurantId) => {
    setItems((prev) => prev.filter((x) => !(x.id === id && x.restaurantId === restaurantId)));
  };

  const clearCart = () => setItems([]);

  const refreshOrderId = () => setOrderId(generateOrderId());

  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);
  const itemsCount = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        decrementFromCart,
        removeFromCart,
        clearCart,
        total,
        itemsCount,
        orderId,
        refreshOrderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
