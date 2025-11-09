import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDirectionsBike, MdDirectionsCar, MdLuggage, MdMusicNote, MdChat, MdSchedule, MdVerified } from "react-icons/md";

/* ----- pull approved rider bike pics from localStorage ----- */
function useApprovedBikePics() {
  const [pics, setPics] = useState([]);
  useEffect(() => {
    try {
      const riders = JSON.parse(localStorage.getItem("registeredRiders") || "[]");
      const out = [];
      riders.forEach((r) => {
        (r.vehicles || []).forEach((v) => {
          if (v.status === "approved" && v.bikePic) {
            out.push({
              riderId: r.id,
              riderName: r.name || "Rider",
              bikePic: v.bikePic,
            });
          }
        });
      });
      setPics(out);
    } catch { setPics([]); }
  }, []);
  return pics;
}

const FARE_PRESETS = [300, 500, 750, 1000, 1500, 3000];

export default function RidePage() {
  const navigate = useNavigate();
  const bikePics = useApprovedBikePics();

  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    seats: "1",
    seatsOther: "",
    time: "",
    luggage: { small: false, backpack: false, large: false },
    rideType: "Any",
    vibe: "Any",
    fare: "",
    agree: false,
    phoneNumber: "",
    note: "",
  });

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const setLuggage = (k, v) => setForm((s) => ({ ...s, luggage: { ...s.luggage, [k]: v } }));

  const seatsValue = useMemo(
    () => (form.seats === "Other" ? form.seatsOther || "" : form.seats),
    [form.seats, form.seatsOther]
  );

  const submit = (e) => {
    e.preventDefault();
    if (!form.pickup.trim() || !form.destination.trim()) return alert("Enter pickup and destination.");
    if (!seatsValue) return alert("Select number of seats.");
    if (!form.time) return alert("Set preferred time.");
    if (!form.fare || Number(form.fare) <= 0) return alert("Enter a valid proposed fare.");
    if (!form.phoneNumber.trim()) return alert("Enter your phone number.");
    if (!form.agree) return alert("You must agree to the HandyRide Safety Policy.");

    const order = {
      id: Math.random().toString(36).slice(2, 9),
      pickup: form.pickup.trim(),
      destination: form.destination.trim(),
      seats: seatsValue,
      time: form.time,
      luggage: Object.keys(form.luggage).filter((k) => form.luggage[k]),
      rideType: form.rideType,
      vibe: form.vibe,
      fare: Number(form.fare),
      note: form.note.trim(),
      phoneNumber: form.phoneNumber.trim(),
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("rideOrders") || "[]");
    orders.push(order);
    localStorage.setItem("rideOrders", JSON.stringify(orders));
    navigate(`/ride-status/${order.id}`);
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
              Book a Ride in Seconds
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Bike or Car — pick your vibe, set your fare, and go. Safe. Fast. Verified.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Ribbon */}
      {/* <div className="px-4 md:px-10 lg:px-20 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-3 border border-gray-100">
            <div className="flex items-center justify-between px-1 pb-2">
              <div className="inline-flex items-center gap-2">
                <span className="font-semibold text-gray-900">Their Bike Pics here</span>
                <span className="text-lg">🏍️</span>
              </div>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <MdVerified className="text-red-600" /> Verified riders
              </span>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-3">
                {bikePics.length ? (
                  bikePics.map((p, i) => (
                    <div
                      key={i}
                      className="shrink-0 w-48 h-28 rounded-xl overflow-hidden bg-slate-200 border border-slate-100"
                      title={p.riderName}
                    >
                      <img src={p.bikePic} alt="Rider bike" className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-500 px-2 py-6">
                    Approved rider bike photos will appear here.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Form Card */}
      <div className="px-4 md:px-10 lg:px-20 py-8 md:py-12">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 space-y-6">
              {/* Locations */}
              <Section title="Trip Details" subtitle="Tell us where you're going">
                <div className="space-y-4">
                  <Field label="Pickup Location" hint="e.g., Oke Odo Hostel, Maraba, Tanke Junction">
                    <input
                      className="input"
                      value={form.pickup}
                      onChange={(e) => set("pickup", e.target.value)}
                      placeholder="Type your pickup point"
                    />
                  </Field>
                  <Field label="Destination" hint="e.g., Unilorin Main Campus Gate, Basin Road">
                    <input
                      className="input"
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
                    <div className="text-sm font-medium text-gray-700 mb-2">Number of Seats Needed</div>
                    <div className="flex flex-wrap gap-2">
                      {["1", "2", "3", "Other"].map((opt) => (
                        <Chip key={opt} active={form.seats === opt} onClick={() => set("seats", opt)}>
                          {opt}
                        </Chip>
                      ))}
                    </div>
                    {form.seats === "Other" && (
                      <input
                        className="input mt-2 w-32"
                        type="number"
                        min="1"
                        placeholder="Seats"
                        value={form.seatsOther}
                        onChange={(e) => set("seatsOther", e.target.value)}
                      />
                    )}
                  </div>
                  <Field label="Preferred Departure Time" icon={<MdSchedule className="text-red-600" />}>
                    <input
                      type="time"
                      className="input"
                      value={form.time}
                      onChange={(e) => set("time", e.target.value)}
                    />
                  </Field>
                </div>
              </Section>

              {/* Luggage */}
              <Section title="Luggage (if any)">
                <div className="grid grid-cols-3 gap-2">
                  <Toggle label="Small bag" checked={form.luggage.small} onChange={(v) => setLuggage("small", v)} />
                  <Toggle label="Backpack" checked={form.luggage.backpack} onChange={(v) => setLuggage("backpack", v)} />
                  <Toggle label="Large load" checked={form.luggage.large} onChange={(v) => setLuggage("large", v)} />
                </div>
              </Section>

              {/* Ride Type & Vibe */}
              <Section title="Preferences">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Ride Type</div>
                    <div className="flex flex-wrap gap-2">
                      <Chip icon={<MdDirectionsBike />} active={form.rideType === "Bike"} onClick={() => set("rideType", "Bike")}>
                        Bike (Fastest)
                      </Chip>
                      <Chip icon={<MdDirectionsCar />} active={form.rideType === "Car"} onClick={() => set("rideType", "Car")}>
                        Car (Comfort)
                      </Chip>
                      <Chip active={form.rideType === "Any"} onClick={() => set("rideType", "Any")}>
                        Any Available
                      </Chip>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Vibe Preference</div>
                    <div className="flex flex-wrap gap-2">
                      <Chip icon={<span className="text-xs">🤫</span>} active={form.vibe === "Silent"} onClick={() => set("vibe", "Silent")}>
                        Silent Ride
                      </Chip>
                      <Chip icon={<MdMusicNote />} active={form.vibe === "Music"} onClick={() => set("vibe", "Music")}>
                        Music Ride
                      </Chip>
                      <Chip icon={<MdChat />} active={form.vibe === "Chatty"} onClick={() => set("vibe", "Chatty")}>
                        Chatty Ride
                      </Chip>
                      <Chip active={form.vibe === "Any"} onClick={() => set("vibe", "Any")}>Any</Chip>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Fare */}
              <Section title="Proposed Fare (₦)">
                <div className="flex flex-wrap gap-2">
                  {FARE_PRESETS.map((n) => (
                    <Chip key={n} active={Number(form.fare) === n} onClick={() => set("fare", String(n))}>
                      ₦{n.toLocaleString()}
                    </Chip>
                  ))}
                </div>
                <input
                  type="number"
                  min="100"
                  placeholder="Enter amount"
                  className="input mt-2 w-40"
                  value={form.fare}
                  onChange={(e) => set("fare", e.target.value)}
                />
              </Section>

              {/* Contact & Notes */}
              <Section title="Contact">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone Number">
                    <input
                      type="tel"
                      className="input"
                      placeholder="Your phone number"
                      value={form.phoneNumber}
                      onChange={(e) => set("phoneNumber", e.target.value)}
                    />
                  </Field>
                  <Field label="Luggage/Notes (optional)">
                    <input
                      className="input"
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
                  className="mt-1"
                  checked={form.agree}
                  onChange={(e) => set("agree", e.target.checked)}
                />
                <label htmlFor="agree" className="text-sm">
                  Agree to <span className="font-semibold">HandyRide Safety Policy</span> —{" "}
                  <span className="font-medium">Yes, I understand and agree ✅</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all"
              >
                Request Ride
              </button>
            </form>
          </div>

          {/* Right: Info panel */}
          <aside className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why HandyRide?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Verified student riders & optional car rides</li>
                <li>• Choose your vibe: Silent, Music, or Chatty</li>
                <li>• Set your fare and time — transparent & fair</li>
                <li>• Safety-first with in-app verification</li>
              </ul>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-600 to-indigo-600 text-white">
                <div className="font-semibold">Heads up</div>
                <div className="text-sm opacity-90">
                  Peak hours (7–9am, 3–6pm) get busy. Set a fair price and book early for faster matches.
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
        {icon ? <span className="w-5 h-5 flex items-center justify-center">{icon}</span> : null}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      {children}
      {hint ? <p className="text-xs text-gray-500 mt-1">{hint}</p> : null}
    </div>
  );
}

function Chip({ children, active, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-sm transition-all
        ${active ? "bg-red-600 text-white border-red-600 shadow" : "bg-white text-gray-700 border-gray-300 hover:border-red-400"}
      `}
    >
      <span className="inline-flex items-center gap-1">
        {icon ? <span className="text-base">{icon}</span> : null}
        {children}
      </span>
    </button>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
