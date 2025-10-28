// src/hooks/useAuthOwner.js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";

export function useAuthOwner() {
  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  // access flags used by OwnerRoute
  const [canAccess, setCanAccess] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/owner-login");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u || null);
      setOwner(null);
      setRestaurant(null);
      setCanAccess(false);
      setMessage("");
      setRedirectTo("/owner-login");

      if (!u) {
        setLoading(false);
        return;
      }

      try {
        // fetch owner profile
        const ownerDoc = await getDoc(doc(db, "owners", u.uid));
        if (!ownerDoc.exists()) {
          setMessage("No owner profile found. Please register first.");
          setRedirectTo("/owner-register");
          setLoading(false);
          return;
        }
        const ownerData = ownerDoc.data();
        setOwner({ id: ownerDoc.id, ...ownerData });

        // find the owner's confirmed restaurant
        const rq = query(
          collection(db, "restaurants"),
          where("ownerCode", "==", ownerData.ownerCode),
          where("status", "==", "confirmed"),
          limit(1)
        );
        const rs = await getDocs(rq);
        if (rs.empty) {
          setMessage("Your restaurant is not confirmed yet. Ask admin to verify.");
          setRedirectTo("/owner-login");
          setLoading(false);
          return;
        }
        const rDoc = rs.docs[0];
        setRestaurant({ id: rDoc.id, ...rDoc.data() });

        setCanAccess(true);
      } catch (e) {
        setMessage(e.message || "Failed to verify owner access.");
        setRedirectTo("/owner-login");
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return { user, owner, restaurant, loading, canAccess, redirectTo, message };
}
