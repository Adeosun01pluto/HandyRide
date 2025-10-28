  // src/components/CartMini.jsx
  import React from "react";
  import { useCart } from "../contexts/CartContext";

  const CartMini = () => {
    const { items, total, clearCart, removeFromCart } = useCart();
    return (
      <div className="fixed bottom-4 right-4 bg-white shadow-xl rounded-xl p-4 w-80">
        <h3 className="font-bold mb-2">Cart</h3>
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Cart is empty</p>
        ) : (
          <>
            <ul className="max-h-48 overflow-auto space-y-2">
              {items.map((i) => (
                <li key={i.id} className="flex items-center justify-between text-sm">
                  <span className="line-clamp-1">{i.name} x{i.quantity}</span>
                  <div className="flex items-center gap-2">
                    <span>₦{(i.price * i.quantity).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(i.id)} className="text-red-600">x</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-bold">₦{total.toLocaleString()}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={clearCart} className="border px-3 py-1 rounded">Clear</button>
              {/* replace with your WhatsApp checkout flow as needed */}
              <a
                href={`https://wa.me/+2349118347755?text=${encodeURIComponent(
                  `Hello Handy! Here's my order:\n` +
                  items.map(i => `- ${i.name} x${i.quantity} = ₦${(i.price*i.quantity).toLocaleString()}`).join("\n") +
                  `\nTotal: ₦${total.toLocaleString()}`
                )}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Checkout via WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    );
  };

  export default CartMini;
