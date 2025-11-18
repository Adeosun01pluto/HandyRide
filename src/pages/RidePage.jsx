// src/pages/RidePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDirectionsBike,
  MdDirectionsCar,
  MdMusicNote,
  MdChat,
  MdSchedule,
} from "react-icons/md";
import { auth, db } from "../lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

/* ---------------- helpers ---------------- */
function genTracking() {
  const d = new Date();
  const ymd =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HR-${ymd}-${rnd}`;
}
function genClientKey() {
  // >= 16 chars
  return crypto.getRandomValues(new Uint32Array(4)).join("");
}

const ACTIVE_STATUSES = new Set(["pending", "taken", "paid", "in_progress"]); // anything not completed/cancelled counts as active

/** Check if the LOGGED-IN USER already has an active ride via users/{uid}.activeRideId */
async function getActiveRideForUser() {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return null;

    const udata = userSnap.data() || {};
    const activeId = udata.activeRideId;
    if (!activeId) return null;

    const rideRef = doc(db, "rideOrders", activeId);
    const rideSnap = await getDoc(rideRef);
    if (!rideSnap.exists()) return null;

    const ride = { id: rideSnap.id, ...rideSnap.data() };
    const status = String(ride.status || "");
    if (!ACTIVE_STATUSES.has(status)) {
      // no longer active
      return null;
    }

    return {
      id: ride.id,
      status,
      trackingNumber: ride.trackingNumber,
    };
  } catch (err) {
    console.error("getActiveRideForUser error:", err);
    return null;
  }
}

/* ---------------- component ---------------- */
const FARE_PRESETS = [300, 500, 750, 1000, 1500, 3000];

export default function RidePage() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    seats: "1",
    seatsOther: "",
    time: "",
    rideType: "Any",
    vibe: "Any",
    fare: "",
    agree: false,
    phoneNumber: "",
    note: "",
  });

  // ---- Require login + auto-redirect if this user already has an active ride ----
  useEffect(() => {
    (async () => {
      const user = auth.currentUser;
      if (!user) {
        // Not logged in → force to login page
        navigate("/login", { replace: true });
        return;
      }

      // Check active ride by user profile
      const activeByUser = await getActiveRideForUser();
      if (activeByUser) {
        navigate(`/ride-status/${activeByUser.id}`, { replace: true });
      }
    })();
  }, [navigate]);

  const seatsValue = useMemo(
    () => (form.seats === "Other" ? form.seatsOther || "" : form.seats),
    [form.seats, form.seatsOther]
  );
  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("Please login to book a ride.");
      navigate("/login");
      return;
    }

    // Block if this USER already has an active ride
    const existingForUser = await getActiveRideForUser();
    if (existingForUser) {
      alert("You already have an active ride. Finish that ride first.");
      navigate(`/ride-status/${existingForUser.id}`);
      return;
    }

    if (!form.pickup.trim() || !form.destination.trim())
      return alert("Enter pickup and destination.");
    if (!seatsValue) return alert("Select number of seats.");
    if (!form.time) return alert("Set preferred time.");
    if (!form.fare || Number(form.fare) <= 0)
      return alert("Enter a valid fare.");
    if (!form.phoneNumber.trim()) return alert("Enter your phone number.");
    if (!form.agree) return alert("Agree to the Safety Policy.");

    setSubmitting(true);
    try {
      const trackingNumber = genTracking();
      const clientKey = genClientKey(); // still stored on ride doc, but NOT in localStorage

      // Create the ride order, now tied to user
      const docRef = await addDoc(collection(db, "rideOrders"), {
        pickup: form.pickup.trim(),
        destination: form.destination.trim(),
        seats: seatsValue,
        time: form.time,
        rideType: form.rideType,
        vibe: form.vibe,
        originalFare: Number(form.fare),
        note: form.note.trim(),
        phoneNumber: form.phoneNumber.trim(),

        // 🔐 user linkage
        userUid: user.uid,
        userEmail: user.email || null,

        trackingNumber,
        status: "pending",
        clientKey, // saved in doc for customer updates (backend / rules)

        bid: {
          original: Number(form.fare),
          current: Number(form.fare),
          state: "pending",
          counterBy: null,
          history: [
            { by: "user", amount: Number(form.fare), at: Date.now() },
          ],
        },

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 🔄 Update the user doc with pending ride info
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            email: user.email || "",
            activeRideId: docRef.id,
            activeRideTrackingNumber: trackingNumber,
            activeRideStatus: "pending",
            activeRideCreatedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          { merge: true } // don't wipe other profile fields
        );
      } catch (err) {
        console.error("Failed to update user active ride:", err);
        // Not fatal for booking – ride still exists
      }

      navigate(`/ride-status/${docRef.id}`);
    } catch (err) {
      console.error("create ride error:", err);
      alert("Could not create ride. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/40 animate-fadeIn">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-white/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
        </div>

        <div className="relative px-4 md:px-10 lg:px-20 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-5">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MdDirectionsBike className="text-white" />
              </span>
              <span className="text-white font-semibold text-sm">
                HandyRide • Students’ Fastest Way Around
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight leading-tight">
              Catch a Ride in a Flash
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Bike or Car — link up, set your price, and move. Fast. Easy. Fun.
              Verified.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="px-4 md:px-10 lg:px-20 py-8 md:py-12">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={submit}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 space-y-6"
            >
              {/* Locations */}
              <Section
                title="Trip Details"
                subtitle="Tell us where you're going"
              >
                <div className="space-y-4">
                  <Field
                    label="Pickup Location"
                    hint="e.g., Oke Odo Hostel, Maraba, Tanke Junction"
                  >
                    <Input
                      value={form.pickup}
                      onChange={(e) => set("pickup", e.target.value)}
                      placeholder="Type your pickup point"
                    />
                  </Field>
                  <Field
                    label="Destination"
                    hint="e.g., Unilorin Main Campus Gate, Basin Road"
                  >
                    <Input
                      value={form.destination}
                      onChange={(e) => set("destination", e.target.value)}
                      placeholder="Where to?"
                    />
                  </Field>
                </div>
              </Section>

              {/* Seats & Time */}
              <Section title="Seats & Time">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Number of Seats Needed
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["1", "2", "3", "Other"].map((opt) => (
                        <Chip
                          key={opt}
                          active={form.seats === opt}
                          onClick={() => set("seats", opt)}
                        >
                          {opt}
                        </Chip>
                      ))}
                    </div>
                    {form.seats === "Other" && (
                      <Input
                        className="mt-2 w-32"
                        type="number"
                        min="1"
                        placeholder="Seats"
                        value={form.seatsOther}
                        onChange={(e) => set("seatsOther", e.target.value)}
                      />
                    )}
                  </div>
                  <Field
                    label="Preferred Departure Time"
                    icon={<MdSchedule className="text-red-600" />}
                  >
                    <Input
                      type="time"
                      value={form.time}
                      onChange={(e) => set("time", e.target.value)}
                    />
                  </Field>
                </div>
              </Section>

              {/* Ride Type & Vibe */}
              <Section title="Preferences">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Ride Type
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip
                        icon={<MdDirectionsBike />}
                        active={form.rideType === "Bike"}
                        onClick={() => set("rideType", "Bike")}
                      >
                        Bike (Fastest)
                      </Chip>
                      <Chip
                        icon={<MdDirectionsCar />}
                        active={form.rideType === "Car"}
                        onClick={() => set("rideType", "Car")}
                      >
                        Car (Comfort)
                      </Chip>
                      <Chip
                        active={form.rideType === "Any"}
                        onClick={() => set("rideType", "Any")}
                      >
                        Any Available
                      </Chip>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Vibe Preference
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip
                        icon={<span className="text-xs">🤫</span>}
                        active={form.vibe === "Silent"}
                        onClick={() => set("vibe", "Silent")}
                      >
                        Silent Ride
                      </Chip>
                      <Chip
                        icon={<MdMusicNote />}
                        active={form.vibe === "Music"}
                        onClick={() => set("vibe", "Music")}
                      >
                        Music Ride
                      </Chip>
                      <Chip
                        icon={<MdChat />}
                        active={form.vibe === "Chatty"}
                        onClick={() => set("vibe", "Chatty")}
                      >
                        Chatty Ride
                      </Chip>
                      <Chip
                        active={form.vibe === "Any"}
                        onClick={() => set("vibe", "Any")}
                      >
                        Any
                      </Chip>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Fare */}
              <Section title="Proposed Fare (₦)">
                <div className="flex flex-wrap gap-2">
                  {FARE_PRESETS.map((n) => (
                    <Chip
                      key={n}
                      active={Number(form.fare) === n}
                      onClick={() => set("fare", String(n))}
                    >
                      ₦{n.toLocaleString()}
                    </Chip>
                  ))}
                </div>
                <Input
                  type="number"
                  min="100"
                  placeholder="Enter amount"
                  className="mt-2 w-40"
                  value={form.fare}
                  onChange={(e) => set("fare", e.target.value)}
                />
              </Section>

              {/* Contact & Notes */}
              <Section title="Contact">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone Number">
                    <Input
                      type="tel"
                      placeholder="Your phone number"
                      value={form.phoneNumber}
                      onChange={(e) => set("phoneNumber", e.target.value)}
                    />
                  </Field>
                  <Field label="Extra Notes (optional)">
                    <Input
                      placeholder="Any special instructions?"
                      value={form.note}
                      onChange={(e) => set("note", e.target.value)}
                    />
                  </Field>
                </div>
              </Section>

              {/* Safety */}
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-3">
                <input
                  id="agree"
                  type="checkbox"
                  className="mt-1 accent-red-600"
                  checked={form.agree}
                  onChange={(e) => set("agree", e.target.checked)}
                />
                <label htmlFor="agree" className="text-sm">
                  Agree to{" "}
                  <span className="font-semibold">HandyRide Safety Policy</span>{" "}
                  —{" "}
                  <span className="font-medium">
                    Yes, I understand and agree ✅
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Request Ride"}
              </button>
            </form>
          </div>

          {/* Right: Info panel */}
          <aside className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Why HandyRide?
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Verified student riders & optional car rides</li>
                <li>• Choose your vibe: Silent, Music, or Chatty</li>
                <li>• Set your fare and time — transparent & fair</li>
                <li>• Safety-first with in-app verification</li>
              </ul>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-600 to-indigo-600 text-white">
                <div className="font-semibold">Heads up</div>
                <div className="text-sm opacity-90">
                  Peak hours (7–9am, 3–6pm) get busy. Set a fair price and book
                  early for faster matches.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* tiny animations */}
      <style>{`
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        .animate-fadeIn { animation: fadeIn .6s ease-out }
      `}</style>
    </section>
  );
}

/* ---------- small UI helpers ---------- */

function Section({ title, subtitle, children }) {
  return (
    <div>
      <div className="mb-3">
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        {subtitle ? <p className="text-xs text-gray-500">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, icon, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon ? (
          <span className="w-5 h-5 flex items-center justify-center">
            {icon}
          </span>
        ) : null}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      {children}
      {hint ? <p className="text-xs text-gray-500 mt-1">{hint}</p> : null}
    </div>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "w-full px-3 py-2 text-sm rounded-xl border border-gray-300 bg-white outline-none " +
        "focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition " +
        className
      }
      {...props}
    />
  );
}

function Chip({ children, active, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-sm transition-all
        ${
          active
            ? "bg-red-600 text-white border-red-600 shadow"
            : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
        }
      `}
    >
      <span className="inline-flex items-center gap-1">
        {icon ? <span className="text-base">{icon}</span> : null}
        {children}
      </span>
    </button>
  );
}









































// // src/pages/RidePage.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   MdDirectionsBike,
//   MdDirectionsCar,
//   MdMusicNote,
//   MdChat,
//   MdSchedule,
// } from "react-icons/md";
// import { auth, db } from "../lib/firebase";
// import {
//   addDoc,
//   collection,
//   serverTimestamp,
//   getDoc,
//   doc,
//   setDoc,
// } from "firebase/firestore";

// /* ---------------- helpers ---------------- */
// function genTracking() {
//   const d = new Date();
//   const ymd =
//     d.getFullYear().toString() +
//     String(d.getMonth() + 1).padStart(2, "0") +
//     String(d.getDate()).padStart(2, "0");
//   const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
//   return `HR-${ymd}-${rnd}`;
// }
// function genClientKey() {
//   // >= 16 chars
//   return crypto.getRandomValues(new Uint32Array(4)).join("");
// }

// const ACTIVE_STATUSES = new Set(["pending", "taken", "paid", "in_progress"]); // anything not completed/cancelled counts as active

// /** Check if the LOGGED-IN USER already has an active ride via users/{uid}.activeRideId */
// async function getActiveRideForUser() {
//   const user = auth.currentUser;
//   if (!user) return null;

//   try {
//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);
//     if (!userSnap.exists()) return null;

//     const udata = userSnap.data() || {};
//     const activeId = udata.activeRideId;
//     if (!activeId) return null;

//     const rideRef = doc(db, "rideOrders", activeId);
//     const rideSnap = await getDoc(rideRef);
//     if (!rideSnap.exists()) return null;

//     const ride = { id: rideSnap.id, ...rideSnap.data() };
//     const status = String(ride.status || "");
//     if (!ACTIVE_STATUSES.has(status)) {
//       // no longer active
//       return null;
//     }

//     return {
//       id: ride.id,
//       status,
//       trackingNumber: ride.trackingNumber,
//     };
//   } catch (err) {
//     console.error("getActiveRideForUser error:", err);
//     return null;
//   }
// }

// /* ---------------- component ---------------- */
// const FARE_PRESETS = [300, 500, 750, 1000, 1500, 3000];

// export default function RidePage() {
//   const navigate = useNavigate();

//   const [submitting, setSubmitting] = useState(false);
//   const [form, setForm] = useState({
//     pickup: "",
//     destination: "",
//     seats: "1",
//     seatsOther: "",
//     time: "",
//     luggage: { small: false, backpack: false, large: false },
//     rideType: "Any",
//     vibe: "Any",
//     fare: "",
//     agree: false,
//     phoneNumber: "",
//     note: "",
//   });

//   // ---- Require login + auto-redirect if this user already has an active ride ----
//   useEffect(() => {
//     (async () => {
//       const user = auth.currentUser;
//       if (!user) {
//         // Not logged in → force to login page
//         navigate("/login", { replace: true });
//         return;
//       }

//       // Check active ride by user profile
//       const activeByUser = await getActiveRideForUser();
//       if (activeByUser) {
//         navigate(`/ride-status/${activeByUser.id}`, { replace: true });
//       }
//     })();
//   }, [navigate]);

//   const seatsValue = useMemo(
//     () => (form.seats === "Other" ? form.seatsOther || "" : form.seats),
//     [form.seats, form.seatsOther]
//   );
//   const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));
//   const setLuggage = (k, v) =>
//     setForm((s) => ({ ...s, luggage: { ...s.luggage, [k]: v } }));

//   const submit = async (e) => {
//     e.preventDefault();

//     const user = auth.currentUser;
//     if (!user) {
//       alert("Please login to book a ride.");
//       navigate("/login");
//       return;
//     }

//     // Block if this USER already has an active ride
//     const existingForUser = await getActiveRideForUser();
//     if (existingForUser) {
//       alert("You already have an active ride. Finish that ride first.");
//       navigate(`/ride-status/${existingForUser.id}`);
//       return;
//     }

//     if (!form.pickup.trim() || !form.destination.trim())
//       return alert("Enter pickup and destination.");
//     if (!seatsValue) return alert("Select number of seats.");
//     if (!form.time) return alert("Set preferred time.");
//     if (!form.fare || Number(form.fare) <= 0)
//       return alert("Enter a valid fare.");
//     if (!form.phoneNumber.trim()) return alert("Enter your phone number.");
//     if (!form.agree) return alert("Agree to the Safety Policy.");

//     setSubmitting(true);
//     try {
//       const trackingNumber = genTracking();
//       const clientKey = genClientKey(); // still stored on ride doc, but NOT in localStorage

//       // Create the ride order, now tied to user
//       const docRef = await addDoc(collection(db, "rideOrders"), {
//         pickup: form.pickup.trim(),
//         destination: form.destination.trim(),
//         seats: seatsValue,
//         time: form.time,
//         luggage: Object.keys(form.luggage).filter((k) => form.luggage[k]),
//         rideType: form.rideType,
//         vibe: form.vibe,
//         originalFare: Number(form.fare),
//         note: form.note.trim(),
//         phoneNumber: form.phoneNumber.trim(),

//         // 🔐 user linkage
//         userUid: user.uid,
//         userEmail: user.email || null,

//         trackingNumber,
//         status: "pending",
//         clientKey, // saved in doc for customer updates (backend / rules)

//         bid: {
//           original: Number(form.fare),
//           current: Number(form.fare),
//           state: "pending",
//           counterBy: null,
//           history: [
//             { by: "user", amount: Number(form.fare), at: Date.now() },
//           ],
//         },

//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       });

//       // 🔄 Update the user doc with pending ride info
//       try {
//         const userRef = doc(db, "users", user.uid);
//         await setDoc(
//           userRef,
//           {
//             email: user.email || "",
//             activeRideId: docRef.id,
//             activeRideTrackingNumber: trackingNumber,
//             activeRideStatus: "pending",
//             activeRideCreatedAt: serverTimestamp(),
//             updatedAt: serverTimestamp(),
//           },
//           { merge: true } // don't wipe other profile fields
//         );
//       } catch (err) {
//         console.error("Failed to update user active ride:", err);
//         // Not fatal for booking – ride still exists
//       }

//       navigate(`/ride-status/${docRef.id}`);
//     } catch (err) {
//       console.error("create ride error:", err);
//       alert("Could not create ride. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/40 animate-fadeIn">
//       {/* Hero */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-indigo-600 to-purple-600">
//         <div className="absolute inset-0 opacity-20 pointer-events-none">
//           <div className="absolute -top-10 -left-10 w-80 h-80 bg-white/40 rounded-full blur-3xl" />
//           <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
//         </div>

//         <div className="relative px-4 md:px-10 lg:px-20 py-12 md:py-16">
//           <div className="max-w-4xl mx-auto text-center">
//             <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-5">
//               <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
//                 <MdDirectionsBike className="text-white" />
//               </span>
//               <span className="text-white font-semibold text-sm">
//                 HandyRide • Students’ Fastest Way Around
//               </span>
//             </div>
//             <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight leading-tight">
//               Catch a Ride in a Flash
//             </h1>
//             <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
//               Bike or Car — link up , set your price, and move. Fast. Easy. Fun.
//               Verified.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Form Card */}
//       <div className="px-4 md:px-10 lg:px-20 py-8 md:py-12">
//         <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-8">
//           {/* Left: Form */}
//           <div className="lg:col-span-3">
//             <form
//               onSubmit={submit}
//               className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 space-y-6"
//             >
//               {/* Locations */}
//               <Section
//                 title="Trip Details"
//                 subtitle="Tell us where you're going"
//               >
//                 <div className="space-y-4">
//                   <Field
//                     label="Pickup Location"
//                     hint="e.g., Oke Odo Hostel, Maraba, Tanke Junction"
//                   >
//                     <Input
//                       value={form.pickup}
//                       onChange={(e) => set("pickup", e.target.value)}
//                       placeholder="Type your pickup point"
//                     />
//                   </Field>
//                   <Field
//                     label="Destination"
//                     hint="e.g., Unilorin Main Campus Gate, Basin Road"
//                   >
//                     <Input
//                       value={form.destination}
//                       onChange={(e) => set("destination", e.target.value)}
//                       placeholder="Where to?"
//                     />
//                   </Field>
//                 </div>
//               </Section>

//               {/* Seats & Time */}
//               <Section title="Seats & Time">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <div className="text-sm font-medium text-gray-700 mb-2">
//                       Number of Seats Needed
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       {["1", "2", "3", "Other"].map((opt) => (
//                         <Chip
//                           key={opt}
//                           active={form.seats === opt}
//                           onClick={() => set("seats", opt)}
//                         >
//                           {opt}
//                         </Chip>
//                       ))}
//                     </div>
//                     {form.seats === "Other" && (
//                       <Input
//                         className="mt-2 w-32"
//                         type="number"
//                         min="1"
//                         placeholder="Seats"
//                         value={form.seatsOther}
//                         onChange={(e) => set("seatsOther", e.target.value)}
//                       />
//                     )}
//                   </div>
//                   <Field
//                     label="Preferred Departure Time"
//                     icon={<MdSchedule className="text-red-600" />}
//                   >
//                     <Input
//                       type="time"
//                       value={form.time}
//                       onChange={(e) => set("time", e.target.value)}
//                     />
//                   </Field>
//                 </div>
//               </Section>

//               {/* Luggage */}
//               <Section title="Luggage (if any)">
//                 <div className="grid grid-cols-3 gap-2">
//                   <Toggle
//                     label="Small bag"
//                     checked={form.luggage.small}
//                     onChange={(v) => setLuggage("small", v)}
//                   />
//                   <Toggle
//                     label="Backpack"
//                     checked={form.luggage.backpack}
//                     onChange={(v) => setLuggage("backpack", v)}
//                   />
//                   <Toggle
//                     label="Large load"
//                     checked={form.luggage.large}
//                     onChange={(v) => setLuggage("large", v)}
//                   />
//                 </div>
//               </Section>

//               {/* Ride Type & Vibe */}
//               <Section title="Preferences">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <div className="text-sm font-medium text-gray-700 mb-2">
//                       Ride Type
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       <Chip
//                         icon={<MdDirectionsBike />}
//                         active={form.rideType === "Bike"}
//                         onClick={() => set("rideType", "Bike")}
//                       >
//                         Bike (Fastest)
//                       </Chip>
//                       <Chip
//                         icon={<MdDirectionsCar />}
//                         active={form.rideType === "Car"}
//                         onClick={() => set("rideType", "Car")}
//                       >
//                         Car (Comfort)
//                       </Chip>
//                       <Chip
//                         active={form.rideType === "Any"}
//                         onClick={() => set("rideType", "Any")}
//                       >
//                         Any Available
//                       </Chip>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-sm font-medium text-gray-700 mb-2">
//                       Vibe Preference
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       <Chip
//                         icon={<span className="text-xs">🤫</span>}
//                         active={form.vibe === "Silent"}
//                         onClick={() => set("vibe", "Silent")}
//                       >
//                         Silent Ride
//                       </Chip>
//                       <Chip
//                         icon={<MdMusicNote />}
//                         active={form.vibe === "Music"}
//                         onClick={() => set("vibe", "Music")}
//                       >
//                         Music Ride
//                       </Chip>
//                       <Chip
//                         icon={<MdChat />}
//                         active={form.vibe === "Chatty"}
//                         onClick={() => set("vibe", "Chatty")}
//                       >
//                         Chatty Ride
//                       </Chip>
//                       <Chip
//                         active={form.vibe === "Any"}
//                         onClick={() => set("vibe", "Any")}
//                       >
//                         Any
//                       </Chip>
//                     </div>
//                   </div>
//                 </div>
//               </Section>

//               {/* Fare */}
//               <Section title="Proposed Fare (₦)">
//                 <div className="flex flex-wrap gap-2">
//                   {FARE_PRESETS.map((n) => (
//                     <Chip
//                       key={n}
//                       active={Number(form.fare) === n}
//                       onClick={() => set("fare", String(n))}
//                     >
//                       ₦{n.toLocaleString()}
//                     </Chip>
//                   ))}
//                 </div>
//                 <Input
//                   type="number"
//                   min="100"
//                   placeholder="Enter amount"
//                   className="mt-2 w-40"
//                   value={form.fare}
//                   onChange={(e) => set("fare", e.target.value)}
//                 />
//               </Section>

//               {/* Contact & Notes */}
//               <Section title="Contact">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <Field label="Phone Number">
//                     <Input
//                       type="tel"
//                       placeholder="Your phone number"
//                       value={form.phoneNumber}
//                       onChange={(e) => set("phoneNumber", e.target.value)}
//                     />
//                   </Field>
//                   <Field label="Luggage/Notes (optional)">
//                     <Input
//                       placeholder="Any special instructions?"
//                       value={form.note}
//                       onChange={(e) => set("note", e.target.value)}
//                     />
//                   </Field>
//                 </div>
//               </Section>

//               {/* Safety */}
//               <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-3">
//                 <input
//                   id="agree"
//                   type="checkbox"
//                   className="mt-1 accent-red-600"
//                   checked={form.agree}
//                   onChange={(e) => set("agree", e.target.checked)}
//                 />
//                 <label htmlFor="agree" className="text-sm">
//                   Agree to{" "}
//                   <span className="font-semibold">HandyRide Safety Policy</span>{" "}
//                   —{" "}
//                   <span className="font-medium">
//                     Yes, I understand and agree ✅
//                   </span>
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
//               >
//                 {submitting ? "Submitting…" : "Request Ride"}
//               </button>
//             </form>
//           </div>

//           {/* Right: Info panel */}
//           <aside className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Why HandyRide?
//               </h3>
//               <ul className="space-y-3 text-sm text-gray-600">
//                 <li>• Verified student riders & optional car rides</li>
//                 <li>• Choose your vibe: Silent, Music, or Chatty</li>
//                 <li>• Set your fare and time — transparent & fair</li>
//                 <li>• Safety-first with in-app verification</li>
//               </ul>

//               <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-600 to-indigo-600 text-white">
//                 <div className="font-semibold">Heads up</div>
//                 <div className="text-sm opacity-90">
//                   Peak hours (7–9am, 3–6pm) get busy. Set a fair price and book
//                   early for faster matches.
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>

//       {/* tiny animations */}
//       <style>{`
//         @keyframes fadeIn { from {opacity:0} to {opacity:1} }
//         .animate-fadeIn { animation: fadeIn .6s ease-out }
//       `}</style>
//     </section>
//   );
// }

// /* ---------- small UI helpers ---------- */

// function Section({ title, subtitle, children }) {
//   return (
//     <div>
//       <div className="mb-3">
//         <h4 className="text-base font-semibold text-gray-900">{title}</h4>
//         {subtitle ? <p className="text-xs text-gray-500">{subtitle}</p> : null}
//       </div>
//       {children}
//     </div>
//   );
// }

// function Field({ label, hint, icon, children }) {
//   return (
//     <div>
//       <div className="flex items-center gap-2 mb-2">
//         {icon ? (
//           <span className="w-5 h-5 flex items-center justify-center">
//             {icon}
//           </span>
//         ) : null}
//         <span className="text-sm font-medium text-gray-700">{label}</span>
//       </div>
//       {children}
//       {hint ? <p className="text-xs text-gray-500 mt-1">{hint}</p> : null}
//     </div>
//   );
// }

// function Input({ className = "", ...props }) {
//   return (
//     <input
//       className={
//         "w-full px-3 py-2 text-sm rounded-xl border border-gray-300 bg-white outline-none " +
//         "focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition " +
//         className
//       }
//       {...props}
//     />
//   );
// }

// function Chip({ children, active, onClick, icon }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`px-3 py-1.5 rounded-full border text-sm transition-all
//         ${
//           active
//             ? "bg-red-600 text-white border-red-600 shadow"
//             : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
//         }
//       `}
//     >
//       <span className="inline-flex items-center gap-1">
//         {icon ? <span className="text-base">{icon}</span> : null}
//         {children}
//       </span>
//     </button>
//   );
// }

// function Toggle({ label, checked, onChange }) {
//   return (
//     <label className="flex items-center gap-2 text-sm">
//       <input
//         className="accent-red-600"
//         type="checkbox"
//         checked={checked}
//         onChange={(e) => onChange(e.target.checked)}
//       />
//       {label}
//     </label>
//   );
// }
