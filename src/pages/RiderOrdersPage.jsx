// import React, { useEffect, useMemo, useState } from "react";
// import { db } from "../lib/firebase";
// import {
//   collection,
//   onSnapshot,
//   addDoc,
//   query,
//   where,
//   updateDoc,
//   doc,
//   orderBy,
//   serverTimestamp,
//   arrayUnion,
// } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// /* Small helpers */
// function tsToDate(ts) {
//   if (!ts) return null;
//   try { if (typeof ts.toDate === "function") return ts.toDate(); } catch {}
//   if (ts instanceof Date) return ts;
//   const d = new Date(ts);
//   return Number.isNaN(d.getTime()) ? null : d;
// }
// function timeAgo(val) {
//   const then = tsToDate(val);
//   if (!then) return "Now";
//   const now = new Date();
//   const diffMin = Math.max(0, Math.floor((now - then) / 60000));
//   if (diffMin < 1) return "Just now";
//   if (diffMin < 60) return `${diffMin}m ago`;
//   const h = Math.floor(diffMin / 60);
//   if (h < 24) return `${h}h ago`;
//   return `${Math.floor(h / 24)}d ago`;
// }
// function currency(n = 0) {
//   try { return `₦${Number(n).toLocaleString()}`; } catch { return `₦${n}`; }
// }

// /** Find if the user declined THIS rider's most recent counter. */
// function userDeclinedYourLastCounter(bid, riderEmail) {
//   if (!bid || !Array.isArray(bid.history) || !riderEmail) return false;

//   // get last counter by this rider
//   const lastCounterIdx = [...bid.history]
//     .map((h, i) => ({ h, i }))
//     .filter(({ h }) => h?.action === "counter" && h?.by === "rider" && h?.rider?.email === riderEmail)
//     .map(({ i }) => i)
//     .pop();

//   if (lastCounterIdx == null) return false;

//   const lastCounter = bid.history[lastCounterIdx];
//   const lastCounterAt = lastCounter?.at ?? 0;

//   // is there a decline after that?
//   const anyDeclineAfter = bid.history.some(
//     (h, i) =>
//       i > lastCounterIdx &&
//       h?.by === "user" &&
//       h?.action === "decline-counter" &&
//       (h?.at ?? 0) >= lastCounterAt
//   );

//   // We also expect the order to be back to pending (your user writes set this)
//   return anyDeclineAfter && bid.state === "pending";
// }

// export default function RiderOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [acceptedOrders, setAcceptedOrders] = useState([]);
//   const [currentRider, setCurrentRider] = useState(null);
//   const [bidAmounts, setBidAmounts] = useState({});
//   const [activeTab, setActiveTab] = useState("available");
//   const [loading, setLoading] = useState(true);
//   const [authUser, setAuthUser] = useState(null);

//   /* Get rider session (from your login) and Firebase Auth user */
//   useEffect(() => {
//     const rider =
//       JSON.parse(localStorage.getItem("currentRider")) ||
//       JSON.parse(localStorage.getItem("riderSession")) ||
//       null;

//     if (!rider) {
//       alert("Please login as a rider to view orders.");
//       window.location.href = "/rider-login";
//       return;
//     }
//     setCurrentRider(rider);

//     const auth = getAuth();
//     const unsub = onAuthStateChanged(auth, (u) => setAuthUser(u || null));
//     return () => unsub();
//   }, []);

//   /* Available orders = only status "pending" */
//   useEffect(() => {
//     const q = query(collection(db, "rideOrders"), where("status", "==", "pending"));
//     const unsub = onSnapshot(
//       q,
//       (snap) => {
//         const list = [];
//         snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
//         // Client-side sort by createdAt desc
//         list.sort((a, b) => {
//           const ad = (a.createdAt?.toDate?.() ?? new Date(a.createdAt ?? 0)).getTime();
//           const bd = (b.createdAt?.toDate?.() ?? new Date(b.createdAt ?? 0)).getTime();
//           return bd - ad;
//         });
//         setOrders(list);
//         setLoading(false);

//         // Keep rider's typed counter in state while still in "counter" state.
//         // If the order is no longer a counter (user accepted/declined), reset to current base.
//         setBidAmounts((prev) => {
//           const next = { ...prev };
//           list.forEach((o) => {
//             const base = o?.bid?.current ?? o?.originalFare ?? 0;
//             if (o?.bid?.state === "counter") {
//               // keep previous custom amount if present; init if missing
//               if (next[o.id] == null) next[o.id] = base;
//             } else {
//               // reset to base if no longer counter (e.g., user declined -> pending OR accepted -> accepted & then rider claims)
//               next[o.id] = base;
//             }
//           });
//           return next;
//         });
//       },
//       (err) => {
//         console.error("orders snapshot error", err);
//         setLoading(false);
//       }
//     );
//     return () => unsub();
//   }, []);
  
// /* This rider's accepted orders (claimed) */
// useEffect(() => {
//   if (!authUser?.uid) return; // Wait for Firebase Auth user
  
//   // Query by riderUid (as per your security rules)
//   const q = query(
//     collection(db, "riderOrders"),
//     where("riderUid", "==", authUser.uid),
//     orderBy("timestamp", "desc")
//   );
  
//   const unsub = onSnapshot(
//     q,
//     (snap) => {
//       const list = [];
//       snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
//       console.log("Rider orders loaded:", list); // Debug log
//       setAcceptedOrders(list);
//     },
//     (err) => {
//       console.error("riderOrders snapshot error", err);
//       alert("Error loading your orders. Make sure you're logged in as an approved rider.");
//     }
//   );
//   return () => unsub();
// }, [authUser?.uid]); // Depen


//   const handleBidChange = (orderId, delta) => {
//     setBidAmounts((prev) => {
//       const curr = prev[orderId] ?? 0;
//       const next = Math.max(0, curr + delta);
//       return { ...prev, [orderId]: next };
//     });
//   };

//   /* Rider sends a counter offer: DOES NOT claim; user must accept/decline */
//   const handleSendCounter = async (order) => {
//     if (!currentRider?.email) return alert("Rider info not loaded.");
//     const newAmount = bidAmounts[order.id] ?? order?.bid?.current ?? order?.originalFare ?? 0;

//     try {
//       await updateDoc(doc(db, "rideOrders", order.id), {
//         "bid.current": newAmount,
//         "bid.state": "counter",
//         "bid.counterBy": currentRider.email,
//         "bid.history": arrayUnion({
//           by: "rider",
//           action: "counter",
//           amount: newAmount,
//           at: Date.now(),
//           rider: {
//             name: currentRider.name || "",
//             email: currentRider.email || "",
//             phone: currentRider.phone || "",
//             vehicleType: currentRider.vehicleType || "",
//             vehicleNumber: currentRider.vehicleNumber || "",
//           },
//         }),
//         updatedAt: serverTimestamp(),
//       });
//       alert("Counter sent. Waiting for the user to respond.");
//     } catch (e) {
//       console.error("send counter error", e);
//       alert("Could not send counter. Please try again.");
//     }
//   };

//   /* Rider claims the order (requires approved rider per your rules) */
//   const handleAcceptOrder = async (order) => {
//     const user = authUser;
//     if (!user) {
//       alert("Please log in as a rider first.");
//       window.location.href = "/rider-login";
//       return;
//     }
//     if (!currentRider) {
//       alert("Rider profile not loaded.");
//       return;
//     }

//     // if user accepted a counter, use that; else use current/original
//     const finalAmount =
//       bidAmounts[order.id] ??
//       order?.bid?.current ??
//       order?.originalFare ??
//       0;

//     try {
//       // Create riderOrders entry
//       await addDoc(collection(db, "riderOrders"), {
//         orderId: order.id,
//         riderUid: user.uid,
//         rider: {
//           name: currentRider.name || user.displayName || "Rider",
//           email: currentRider.email || user.email || "",
//           phone: currentRider.phone || "",
//           vehicleType: currentRider.vehicleType || "",
//           vehicleNumber: currentRider.vehicleNumber || "",
//         },
//         pickup: order.pickup,
//         dropoff: order.dropoff || order.destination,
//         phoneNumber: order.phoneNumber || "",
//         amount: finalAmount,
//         distance: order.distance || "",
//         status: "accepted",
//         timestamp: serverTimestamp(),
//       });

//       // Mark rideOrders as taken by this rider (rules: approved rider + pending -> taken)
//       await updateDoc(doc(db, "rideOrders", order.id), {
//         status: "taken",
//         acceptedByUid: user.uid,
//         acceptedByEmail: user.email || currentRider.email || "",
//         acceptedAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       });

//       alert(
//         `Order accepted! ${
//           finalAmount > (order?.originalFare ?? 0)
//             ? `Your offer of ${currency(finalAmount)} is set.`
//             : ""
//         }`
//       );
//     } catch (err) {
//       console.error("accept order error", err);
//       alert("Missing permissions or network error. Check that this rider is approved.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-orange-50/30">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-xl">
//         <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-white">Ride Orders</h1>
//             <p className="mt-1 text-red-100 text-sm">
//               Accept orders and start earning
//             </p>
//           </div>

//           {currentRider && (
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
//                   {currentRider.name?.charAt(0) || "R"}
//                 </div>
//                 <div>
//                   <div className="text-white font-semibold">{currentRider.name}</div>
//                   <div className="text-red-100 text-xs flex items-center gap-1">
//                     <span>⭐</span>
//                     <span>4.8</span>
//                     <span className="mx-1">•</span>
//                     <span>{currentRider.vehicleType || "Bike"}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Tabs */}
//         <div className="max-w-7xl mx-auto px-4 pb-4 flex gap-2">
//           <button
//             onClick={() => setActiveTab("available")}
//             className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
//               activeTab === "available"
//                 ? "bg-white text-red-600 shadow-lg"
//                 : "bg-white/10 text-white hover:bg-white/20"
//             }`}
//           >
//             Available Orders
//             <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-red-500 text-white">
//               {orders.length}
//             </span>
//           </button>
//           <button
//             onClick={() => setActiveTab("accepted")}
//             className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
//               activeTab === "accepted"
//                 ? "bg-white text-red-600 shadow-lg"
//                 : "bg-white/10 text-white hover:bg-white/20"
//             }`}
//           >
//             My Orders
//             <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-green-500 text-white">
//               {acceptedOrders.length}
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {loading ? (
//           <div className="text-center text-gray-500 py-20 animate-pulse">Loading ride orders…</div>
//         ) : activeTab === "available" ? (
//           orders.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {orders.map((o) => {
//                 const base = o?.bid?.current ?? o?.originalFare ?? 0;
//                 const currentBid = bidAmounts[o.id] ?? base;
//                 const hasBidChange = currentBid !== base;

//                 const waitingForUser =
//                   o?.bid?.state === "counter" &&
//                   o?.bid?.counterBy &&
//                   currentRider?.email &&
//                   o.bid.counterBy === currentRider.email;

//                 const userAcceptedYourCounter =
//                   o?.bid?.state === "accepted" &&
//                   o?.bid?.counterBy &&
//                   currentRider?.email &&
//                   o.bid.counterBy === currentRider.email;

//                 const userDeclinedYourCounter =
//                   userDeclinedYourLastCounter(o?.bid, currentRider?.email);

//                 return (
//                   <div
//                     key={o.id}
//                     className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
//                   >
//                     {/* Header */}
//                     <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">
//                           #{(o.trackingNumber || o.id).toString().slice(-6)}
//                         </span>
//                         <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium">
//                           {timeAgo(o.createdAt)}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
//                           {o.rideType === "Car" ? "🚗" : "🏍️"}
//                         </div>
//                         <div>
//                           <div className="text-white font-bold text-lg">{o.distance || "—"}</div>
//                           <div className="text-white/80 text-xs">{o.rideType || "Any"}</div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Body */}
//                     <div className="p-4 space-y-4">
//                       {/* Route */}
//                       <div className="space-y-2">
//                         <div className="flex items-start gap-2">
//                           <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />
//                           <div className="text-sm font-semibold text-gray-900">{o.pickup}</div>
//                         </div>
//                         <div className="flex items-start gap-2">
//                           <div className="w-3 h-3 rounded-full bg-red-500 mt-1" />
//                           <div className="text-sm font-semibold text-gray-900">{o.dropoff || o.destination}</div>
//                         </div>
//                       </div>

//                       {/* Bid box */}
//                       <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
//                         <div className="text-xs text-gray-600 text-center mb-2 font-medium">
//                           {hasBidChange ? "Your Counter" : "Customer Offer"}
//                         </div>
//                         <div className="text-center mb-3">
//                           <div className="text-3xl font-bold text-green-700">{currency(currentBid)}</div>
//                           {hasBidChange && (
//                             <div className="text-xs text-green-600 mt-1">(+{currency(currentBid - base)})</div>
//                           )}
//                         </div>
//                         <div className="flex justify-center gap-2">
//                           <button
//                             onClick={() => handleBidChange(o.id, -100)}
//                             className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-gray-700"
//                           >
//                             −
//                           </button>
//                           <button
//                             onClick={() => handleBidChange(o.id, 100)}
//                             className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-green-600"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>

//                       {/* Status tags about the counter */}
//                       {waitingForUser && (
//                         <div className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
//                           Counter sent — waiting for user response
//                         </div>
//                       )}
//                       {userAcceptedYourCounter && (
//                         <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
//                           ✅ User accepted your counter — claim it now
//                         </div>
//                       )}
//                       {userDeclinedYourCounter && (
//                         <div className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
//                           ❌ User declined your counter — price reset
//                         </div>
//                       )}

//                       {/* Actions */}
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                         <button
//                           onClick={() => handleSendCounter(o)}
//                           className="w-full py-3 rounded-xl font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 shadow-sm transition-all"
//                         >
//                           Send Counter
//                         </button>

//                         <button
//                           onClick={() => handleAcceptOrder(o)}
//                           className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg transition-all"
//                         >
//                           {userAcceptedYourCounter ? "Accept at Counter" : "Accept Now"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-20 text-gray-500">
//               No available orders at the moment.
//             </div>
//           )
//         ) : (
//           // Accepted tab
//           <div>
//             {acceptedOrders.length > 0 ? (
//               <div className="space-y-6">
//                 {acceptedOrders.map((r) => (
//                   <div key={r.id} className="bg-white rounded-3xl shadow-xl p-6">
//                     <h3 className="font-bold text-lg text-red-600">
//                       #{(r.orderId || r.id).toString().slice(0, 8).toUpperCase()}
//                     </h3>
//                     <p className="text-gray-600">
//                       {r.pickup} → {r.dropoff}
//                     </p>
//                     <p className="text-green-700 font-semibold mt-2">
//                       {currency(r.amount || 0)}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Accepted:{" "}
//                       {r.timestamp?.toDate
//                         ? r.timestamp.toDate().toLocaleString()
//                         : "Pending"}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20 text-gray-500">
//                 You haven’t accepted any orders yet.
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
































































































// src/pages/RiderOrdersPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* ---------- helpers ---------- */
function tsToDate(ts) {
  if (!ts) return null;
  try { if (typeof ts.toDate === "function") return ts.toDate(); } catch {}
  if (ts instanceof Date) return ts;
  const d = new Date(ts);
  return Number.isNaN(d.getTime()) ? null : d;
}
function timeAgo(val) {
  const then = tsToDate(val);
  if (!then) return "Now";
  const now = new Date();
  const diffMin = Math.max(0, Math.floor((now - then) / 60000));
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const h = Math.floor(diffMin / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function currency(n = 0) {
  try { return `₦${Number(n).toLocaleString()}`; } catch { return `₦${n}`; }
}
/** Did the user decline THIS rider's most recent counter? */
function userDeclinedYourLastCounter(bid, riderEmail) {
  if (!bid || !Array.isArray(bid.history) || !riderEmail) return false;
  const lastCounterIdx = [...bid.history]
    .map((h, i) => ({ h, i }))
    .filter(({ h }) => h?.action === "counter" && h?.by === "rider" && h?.rider?.email === riderEmail)
    .map(({ i }) => i)
    .pop();
  if (lastCounterIdx == null) return false;
  const lastCounterAt = bid.history[lastCounterIdx]?.at ?? 0;
  const anyDeclineAfter = bid.history.some(
    (h, i) => i > lastCounterIdx && h?.by === "user" && h?.action === "decline-counter" && (h?.at ?? 0) >= lastCounterAt
  );
  return anyDeclineAfter && bid.state === "pending";
}

/* ---------- component ---------- */
export default function RiderOrdersPage() {
  const [available, setAvailable] = useState([]);      // pending orders
  const [mine, setMine] = useState([]);               // taken (not paid)
  const [paid, setPaid] = useState([]);               // paid / in_progress
  const [completed, setCompleted] = useState([]);     // completed (you can add cancelled if desired)
  const [currentRider, setCurrentRider] = useState(null);
  const [bidAmounts, setBidAmounts] = useState({});
  const [activeTab, setActiveTab] = useState("available");
  const [loadingAvail, setLoadingAvail] = useState(true);
  const [loadingMine, setLoadingMine] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  // login / rider profile
  useEffect(() => {
    const rider =
      JSON.parse(localStorage.getItem("currentRider")) ||
      JSON.parse(localStorage.getItem("riderSession")) ||
      null;

    if (!rider) {
      alert("Please login as a rider to view orders.");
      window.location.href = "/rider-login";
      return;
    }
    setCurrentRider(rider);

    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => setAuthUser(u || null));
    return () => unsub();
  }, []);

  // ---- Available orders (pending) ----
  useEffect(() => {
    const q = query(collection(db, "rideOrders"), where("status", "==", "pending"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
        // sort newest first
        list.sort((a, b) => {
          const ad = tsToDate(a.createdAt)?.getTime?.() ?? 0;
          const bd = tsToDate(b.createdAt)?.getTime?.() ?? 0;
          return bd - ad;
        });
        setAvailable(list);
        setLoadingAvail(false);

        // keep per-card bid inputs
        setBidAmounts((prev) => {
          const next = { ...prev };
          list.forEach((o) => {
            const base = o?.bid?.current ?? o?.originalFare ?? 0;
            if (o?.bid?.state === "counter") {
              if (next[o.id] == null) next[o.id] = base;
            } else {
              next[o.id] = base;
            }
          });
          return next;
        });
      },
      (err) => {
        console.error("available snapshot error", err);
        setLoadingAvail(false);
      }
    );
    return () => unsub();
  }, []);

  // ---- My jobs (orders accepted by THIS rider, any status) ----
  useEffect(() => {
    if (!authUser?.uid) return;
    const q = query(collection(db, "rideOrders"), where("acceptedByUid", "==", authUser.uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const all = [];
        snap.forEach((d) => all.push({ id: d.id, ...d.data() }));

        // categorize
        const mineArr = [];
        const paidArr = [];
        const completedArr = [];

        all.forEach((o) => {
          const st = String(o.status || "");
          if (st === "taken") mineArr.push(o);
          else if (st === "paid" || st === "in_progress") paidArr.push(o);
          else if (st === "completed") completedArr.push(o);
        });

        // sort each bucket by most recent update
        const sortByUpdated = (arr) =>
          arr.sort((a, b) => {
            const ad = tsToDate(a.updatedAt || a.acceptedAt || a.createdAt)?.getTime?.() ?? 0;
            const bd = tsToDate(b.updatedAt || b.acceptedAt || b.createdAt)?.getTime?.() ?? 0;
            return bd - ad;
          });

        setMine(sortByUpdated(mineArr));
        setPaid(sortByUpdated(paidArr));
        setCompleted(sortByUpdated(completedArr));
        setLoadingMine(false);
      },
      (err) => {
        console.error("accepted-by-me snapshot error", err);
        setLoadingMine(false);
      }
    );
    return () => unsub();
  }, [authUser?.uid]);

  const handleBidChange = (orderId, delta) => {
    setBidAmounts((prev) => {
      const curr = prev[orderId] ?? 0;
      const next = Math.max(0, curr + delta);
      return { ...prev, [orderId]: next };
    });
  };

  /* Rider sends a counter (doesn't claim) */
  const handleSendCounter = async (order) => {
    if (!currentRider?.email) return alert("Rider info not loaded.");
    const newAmount =
      bidAmounts[order.id] ?? order?.bid?.current ?? order?.originalFare ?? 0;

    try {
      await updateDoc(doc(db, "rideOrders", order.id), {
        "bid.current": newAmount,
        "bid.state": "counter",
        "bid.counterBy": currentRider.email,
        "bid.history": arrayUnion({
          by: "rider",
          action: "counter",
          amount: newAmount,
          at: Date.now(),
          rider: {
            name: currentRider.name || "",
            email: currentRider.email || "",
            phone: currentRider.phone || "",
            vehicleType: currentRider.vehicleType || "",
            vehicleNumber: currentRider.vehicleNumber || "",
          },
        }),
        updatedAt: serverTimestamp(),
      });
      alert("Counter sent. Waiting for the user to respond.");
    } catch (e) {
      console.error("send counter error", e);
      alert("Could not send counter. Please try again.");
    }
  };

  /* Rider claims the order (pending -> taken) */
  const handleAcceptOrder = async (order) => {
    const user = authUser;
    if (!user) {
      alert("Please log in as a rider first.");
      window.location.href = "/rider-login";
      return;
    }
    if (!currentRider) {
      alert("Rider profile not loaded.");
      return;
    }

    const finalAmount =
      bidAmounts[order.id] ?? order?.bid?.current ?? order?.originalFare ?? 0;

    try {
      // optional: mirror in riderOrders if you still want that ledger
      await addDoc(collection(db, "riderOrders"), {
        orderId: order.id,
        riderUid: user.uid,
        rider: {
          name: currentRider.name || user.displayName || "Rider",
          email: currentRider.email || user.email || "",
          phone: currentRider.phone || "",
          vehicleType: currentRider.vehicleType || "",
          vehicleNumber: currentRider.vehicleNumber || "",
        },
        pickup: order.pickup,
        dropoff: order.dropoff || order.destination,
        phoneNumber: order.phoneNumber || "",
        amount: finalAmount,
        distance: order.distance || "",
        status: "accepted",
        timestamp: serverTimestamp(),
      });

      // claim the job
      await updateDoc(doc(db, "rideOrders", order.id), {
        status: "taken",
        acceptedByUid: user.uid,
        acceptedByEmail: user.email || currentRider.email || "",
        acceptedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("Order accepted!");
      // The live snapshot will automatically move it to the “My Orders” tab.
    } catch (err) {
      console.error("accept order error", err);
      alert("Missing permissions or network error. Check that this rider is approved.");
    }
  };

  const Loading = ({ text }) => (
    <div className="text-center text-gray-500 py-20 animate-pulse">{text}</div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-orange-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Ride Orders</h1>
            <p className="mt-1 text-red-100 text-sm">Accept orders and start earning</p>
          </div>

          {currentRider && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
                  {currentRider.name?.charAt(0) || "R"}
                </div>
                <div>
                  <div className="text-white font-semibold">{currentRider.name}</div>
                  <div className="text-red-100 text-xs flex items-center gap-1">
                    <span>⭐</span>
                    <span>4.8</span>
                    <span className="mx-1">•</span>
                    <span>{currentRider.vehicleType || "Bike"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-4 flex gap-2 flex-wrap">
          {[
            { key: "available", label: "Available", count: available.length, pill: "bg-red-500" },
            { key: "mine", label: "My Orders", count: mine.length, pill: "bg-amber-500" },
            { key: "paid", label: "Paid", count: paid.length, pill: "bg-green-600" },
            { key: "completed", label: "Completed", count: completed.length, pill: "bg-blue-600" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                activeTab === t.key
                  ? "bg-white text-red-600 shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {t.label}
              <span className={`ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full ${t.pill} text-white`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "available" && (
          loadingAvail ? (
            <Loading text="Loading ride orders…" />
          ) : available.length ? (
            <CardsAvailable
              orders={available}
              bidAmounts={bidAmounts}
              onBidChange={handleBidChange}
              onSendCounter={handleSendCounter}
              onAccept={handleAcceptOrder}
              currentRider={currentRider}
            />
          ) : (
            <div className="text-center py-20 text-gray-500">No available orders at the moment.</div>
          )
        )}

        {activeTab === "mine" && (
          loadingMine ? (
            <Loading text="Loading your orders…" />
          ) : mine.length ? (
            <CardsSimple orders={mine} accent="amber" title="Awaiting user payment" />
          ) : (
            <div className="text-center py-20 text-gray-500">You have no unpaid accepted orders.</div>
          )
        )}

        {activeTab === "paid" && (
          loadingMine ? (
            <Loading text="Loading paid orders…" />
          ) : paid.length ? (
            <CardsSimple orders={paid} accent="green" title="Paid / In progress" />
          ) : (
            <div className="text-center py-20 text-gray-500">No paid rides yet.</div>
          )
        )}

        {activeTab === "completed" && (
          loadingMine ? (
            <Loading text="Loading completed orders…" />
          ) : completed.length ? (
            <CardsSimple orders={completed} accent="blue" title="Completed rides" />
          ) : (
            <div className="text-center py-20 text-gray-500">No completed rides yet.</div>
          )
        )}
      </div>
    </div>
  );
}

/* ---------- Presentational sub-components ---------- */

function CardsAvailable({ orders, bidAmounts, onBidChange, onSendCounter, onAccept, currentRider }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((o) => {
        const base = o?.bid?.current ?? o?.originalFare ?? 0;
        const currentBid = bidAmounts[o.id] ?? base;
        const hasBidChange = currentBid !== base;
        const waitingForUser =
          o?.bid?.state === "counter" && o?.bid?.counterBy && currentRider?.email && o.bid.counterBy === currentRider.email;
        const userAcceptedYourCounter =
          o?.bid?.state === "accepted" && o?.bid?.counterBy && currentRider?.email && o.bid.counterBy === currentRider.email;
        const userDeclinedYourCounterFlag =
          userDeclinedYourLastCounter(o?.bid, currentRider?.email);

        return (
          <div key={o.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">
                  #{(o.trackingNumber || o.id).toString().slice(-6)}
                </span>
                <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  {timeAgo(o.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  {o.rideType === "Car" ? "🚗" : "🏍️"}
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{o.distance || "—"}</div>
                  <div className="text-white/80 text-xs">{o.rideType || "Any"}</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
              {/* Route */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />
                  <div className="text-sm font-semibold text-gray-900">{o.pickup}</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-1" />
                  <div className="text-sm font-semibold text-gray-900">{o.dropoff || o.destination}</div>
                </div>
              </div>

              {/* Bid box */}
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
                <div className="text-xs text-gray-600 text-center mb-2 font-medium">
                  {hasBidChange ? "Your Counter" : "Customer Offer"}
                </div>
                <div className="text-center mb-3">
                  <div className="text-3xl font-bold text-green-700">{currency(currentBid)}</div>
                  {hasBidChange && (
                    <div className="text-xs text-green-600 mt-1">(+{currency(currentBid - base)})</div>
                  )}
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onBidChange(o.id, -100)}
                    className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-gray-700"
                  >
                    −
                  </button>
                  <button
                    onClick={() => onBidChange(o.id, 100)}
                    className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-green-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Status tags about the counter */}
              {waitingForUser && (
                <div className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                  Counter sent — waiting for user response
                </div>
              )}
              {userAcceptedYourCounter && (
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                  ✅ User accepted your counter — claim it now
                </div>
              )}
              {userDeclinedYourCounterFlag && (
                <div className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  ❌ User declined your counter — price reset
                </div>
              )}

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => onSendCounter(o)}
                  className="w-full py-3 rounded-xl font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 shadow-sm transition-all"
                >
                  Send Counter
                </button>

                <button
                  onClick={() => onAccept(o)}
                  className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg transition-all"
                >
                  {userAcceptedYourCounter ? "Accept at Counter" : "Accept Now"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CardsSimple({ orders, accent = "amber", title }) {
  const accentBg = {
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    green: "bg-green-50 border-green-200 text-green-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
  }[accent];

  return (
    <div className="space-y-6">
      {orders.map((r) => (
        <div key={r.id} className="bg-white rounded-3xl shadow-xl p-6">
          <div className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${accentBg}`}>
            {title}
          </div>
          <h3 className="font-bold text-lg text-red-600 mt-3">
            #{(r.trackingNumber || r.id).toString().slice(0, 8).toUpperCase()}
          </h3>
          <p className="text-gray-600 mt-1">
            {r.pickup} → {r.dropoff || r.destination}
          </p>
          <p className="text-green-700 font-semibold mt-2">
            {currency(r?.bid?.current ?? r?.originalFare ?? 0)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Updated: {tsToDate(r.updatedAt || r.acceptedAt || r.createdAt)?.toLocaleString?.() || "—"}
          </p>
        </div>
      ))}
    </div>
  );
}
