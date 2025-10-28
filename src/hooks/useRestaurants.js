// src/hooks/useRestaurants.js
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where /*, orderBy*/ } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Start without orderBy to rule out index issues:
    const q = query(
      collection(db, "restaurants"),
      where("status", "==", "confirmed")
      , orderBy("name") // add back after index is created
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setRestaurants(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error("useRestaurants error:", err);
        setError(err.message || "Failed to load restaurants");
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return { restaurants, loading, error };
}
