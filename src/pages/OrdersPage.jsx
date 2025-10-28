// src/pages/OrdersPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { doc, getDoc, updateDoc, serverTimestamp, getDocFromCache } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuthAdmin } from "../hooks/useAuthAdmin";
import { useAuthOwner } from "../hooks/useAuthOwner";

const STATUSES = ["new","accepted","preparing","ready","delivering","done","canceled"];

const normalizeOrderNo = (s) =>
  (s || "").trim().toUpperCase().replace(/\s+/g, "");

export default function OrdersPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const { isAdmin } = useAuthAdmin();
  const { restaurant: ownerRestaurant } = useAuthOwner();

  const canManage =
    (isAdmin && order) ||
    (ownerRestaurant && order && ownerRestaurant.id === order.restaurantId);

  // optional: prefill from ?id=HF-XXXX
  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (id) {
      setInput(id);
      // auto submit
      void onLookup(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currency = (n) => `₦${Number(n || 0).toLocaleString()}`;

  const onLookup = async (maybeValue) => {
    const orderNo = normalizeOrderNo(maybeValue ?? input);
    setMsg(""); setErr(""); setOrder(null); setRestaurant(null);

    if (!orderNo) {
      setErr("Enter your ORDER # (e.g., HF-84AB12-2G1).");
      return;
    }

    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "orders", orderNo));
      if (!snap.exists()) {
        setErr("Order not found. Check the number and try again.");
        return;
      }
      const data = snap.data();
      setOrder({ id: snap.id, ...data });

      if (data.restaurantId) {
        const rSnap = await getDoc(doc(db, "restaurants", data.restaurantId));
        if (rSnap.exists()) setRestaurant({ id: rSnap.id, ...rSnap.data() });
      }
    } catch (e) {
      setErr(e.message || "Failed to load order.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    if (!order) return;
    setErr(""); setMsg("");
    try {
      await updateDoc(doc(db, "orders", order.id), {
        status,
        updatedAt: serverTimestamp(),
      });
      setOrder((o) => ({ ...o, status }));
      setMsg("Status updated.");
    } catch (e) {
      setErr(e.message || "Failed to update status.");
    }
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-6">
      <h1 className="text-2xl font-bold mb-3">Find your order</h1>

      {/* Lookup form */}
      <form
        onSubmit={(e) => { e.preventDefault(); onLookup(); }}
        className="flex flex-col sm:flex-row gap-2 mb-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ORDER # (e.g., HF-841BS6-2G1)"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white rounded px-4 py-2 shrink-0"
        >
          {loading ? "Searching…" : "Check order"}
        </button>
      </form>

      {msg && <p className="text-green-700 text-sm mb-2">{msg}</p>}
      {err && <p className="text-red-600 text-sm mb-4">{err}</p>}

      {/* Order card */}
      {order && (
        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">ORDER #</div>
              <div className="font-mono text-lg">{order.id}</div>
            </div>
            <div>
              <span className="text-xs mr-2 text-gray-500">Status:</span>
              {canManage ? (
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  className="border p-1 rounded text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ) : (
                <span className="px-2 py-1 text-xs rounded bg-gray-100">{order.status}</span>
              )}
            </div>
          </div>

          <hr className="my-3" />

          <div className="mb-3">
            <div className="font-semibold">{restaurant?.name || "Unknown restaurant"}</div>
            {restaurant && (
              <div className="text-xs text-gray-500">/r/{restaurant.slug}</div>
            )}
          </div>

          <div className="space-y-2">
            {order.items.map((i) => (
              <div key={`${i.id}-${i.name}`} className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-xs text-gray-500">x{i.quantity}</div>
                </div>
                <div>{currency(i.price * i.quantity)}</div>
              </div>
            ))}
          </div>

          <hr className="my-3" />
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Total</div>
            <div className="font-bold">{currency(order.total)}</div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Share this page with: <code>/orders?id={order.id}</code>
          </p>
        </div>
      )}
    </div>
  );
}
