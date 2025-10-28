// // src/hooks/useRestaurantBySlug.js
// import { collection, getDocs, limit, query, where } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../lib/firebase";

// export function useRestaurantBySlug(slug) {
//   const [restaurant, setRestaurant] = useState(null);
//   const [menu, setMenu] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       // find restaurant by slug
//       const rq = query(
//         collection(db, "restaurants"),
//         where("slug", "==", slug),
//         limit(1)
//       );
//       const rs = await getDocs(rq);
//       if (rs.empty) {
//         setLoading(false);
//         return;
//       }
//       const doc = rs.docs[0];
//       const data = { id: doc.id, ...doc.data() };
//       setRestaurant(data);

//       // load menu
//       const menuSnap = await getDocs(collection(db, "restaurants", doc.id, "menu"));
//       setMenu(menuSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

//       setLoading(false);
//     })();
//   }, [slug]);

//   return { restaurant, menu, loading };
// }








// src/hooks/useRestaurantBySlug.js
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

export function useRestaurantBySlug(slug) {
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // restaurant must be confirmed AND match slug
        const rq = query(
          collection(db, "restaurants"),
          where("slug", "==", slug),
          where("status", "==", "confirmed"),
          limit(1)
        );
        const rs = await getDocs(rq);

        if (rs.empty) {
          setRestaurant(null);
          setMenu([]);
          setLoading(false);
          return;
        }

        const docRef = rs.docs[0];
        const data = { id: docRef.id, ...docRef.data() };
        setRestaurant(data);

        // load menu items (public read)
        const menuSnap = await getDocs(collection(db, "restaurants", docRef.id, "menu"));
        setMenu(menuSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        setError(e.message || "Failed to load restaurant");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return { restaurant, menu, loading, error };
}
