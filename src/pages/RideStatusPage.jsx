// src/pages/RideStatusPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BiCamera,
  BiCheckCircle,
  BiChevronLeft,
  BiPhone,
  BiStar,
  BiX,
} from "react-icons/bi";
import { BsCheckCircle, BsShieldCheck } from "react-icons/bs";
import { MdDirectionsBike, MdDirectionsCar } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { auth, db } from "../lib/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

/* ---- small helpers ---- */
function currency(n) {
  if (n == null) return "₦0";
  try {
    return `₦${Number(n).toLocaleString()}`;
  } catch {
    return `₦${n}`;
  }
}

const ACTIVE_STATUSES = new Set(["pending", "taken", "paid", "in_progress"]);

export default function RideStatusPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [riderProfile, setRiderProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permError, setPermError] = useState("");

  // ---- Require login + derive orderId from user profile if not in URL ----
  useEffect(() => {
    (async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      // If URL has an orderId, normal flow continues in snapshot effect
      if (orderId) return;

      // No orderId in URL -> try to get it from user profile
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          navigate("/ride", { replace: true });
          return;
        }
        const data = userSnap.data() || {};
        if (data.activeRideId) {
          navigate(`/ride-status/${data.activeRideId}`, { replace: true });
        } else {
          navigate("/ride", { replace: true });
        }
      } catch (err) {
        console.error("Failed to resolve ride from user profile:", err);
        navigate("/ride", { replace: true });
      }
    })();
  }, [orderId, navigate]);

  // ---- Live ride document subscription ----
  useEffect(() => {
    if (!orderId) return; // handled by previous effect

    const ref = doc(db, "rideOrders", orderId);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setOrder(null);
          setLoading(false);
          return;
        }
        const data = { id: snap.id, ...snap.data() };
        setOrder(data);
        setLoading(false);
        setPermError("");
      },
      (err) => {
        console.error("onSnapshot error:", err);
        setPermError("Unable to load ride. Please check your connection.");
        setLoading(false);
      }
    );
    return () => unsub();
  }, [orderId]);

  // 🔄 Sync user profile (activeRide / lastRide) whenever this order changes
  useEffect(() => {
    const syncUserProfile = async () => {
      if (!order) return;
      const user = auth.currentUser;
      if (!user) return;
      // Only sync if this ride belongs to logged-in user
      if (order.userUid && order.userUid !== user.uid) return;

      const userRef = doc(db, "users", user.uid);
      const status = order.status;

      try {
        if (ACTIVE_STATUSES.has(status)) {
          await updateDoc(userRef, {
            activeRideId: order.id,
            activeRideTrackingNumber: order.trackingNumber || null,
            activeRideStatus: status,
            updatedAt: serverTimestamp(),
          });
        } else {
          await updateDoc(userRef, {
            activeRideId: null,
            activeRideTrackingNumber: null,
            activeRideStatus: status,
            lastRideId: order.id,
            lastRideTrackingNumber: order.trackingNumber || null,
            lastRideStatus: status,
            lastRideUpdatedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error("Failed to sync user ride state:", err);
      }
    };

    syncUserProfile();
  }, [order]);

  // 🔄 Load rider profile (from riders/{uid}) once we know who accepted
  useEffect(() => {
    const fetchRider = async () => {
      if (!order) return;

      const riderUid = order.acceptedByUid || order.riderUid;
      if (!riderUid) {
        setRiderProfile(null);
        return;
      }

      try {
        const rRef = doc(db, "riders", riderUid);
        const rSnap = await getDoc(rRef);
        if (!rSnap.exists()) {
          setRiderProfile(null);
          return;
        }
        setRiderProfile({ id: rSnap.id, ...rSnap.data() });
      } catch (err) {
        console.error("Failed to load rider profile:", err);
        setRiderProfile(null);
      }
    };

    fetchRider();
  }, [order]);

  // ---- Firestore updates (user-based, no clientKey / localStorage) ----
  const doUpdate = async (patch) => {
    if (!orderId) throw new Error("No orderId");

    const user = auth.currentUser;
    if (!user) {
      alert("Please login again.");
      navigate("/login");
      throw new Error("Not authenticated");
    }

    // Optional UI guard: ensure this ride belongs to the current user
    if (order?.userUid && order.userUid !== user.uid) {
      alert("You are not allowed to modify this ride.");
      throw new Error("Not owner of ride");
    }

    try {
      await updateDoc(doc(db, "rideOrders", orderId), {
        ...patch,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Update failed:", error);
      if (error.code === "permission-denied") {
        alert("Permission denied. You cannot modify this ride.");
      }
      throw error;
    }
  };

  const isPaid =
    order?.status === "paid" ||
    order?.status === "in_progress" ||
    order?.status === "completed";
  const isCompleted = order?.status === "completed";
  const hasRider =
    Boolean(order?.acceptedByUid || order?.riderUid || riderProfile);

  const amount = useMemo(() => {
    if (!order) return 0;
    if (order.bid?.state === "counter")
      return order.bid?.current ?? order.originalFare ?? 0;
    return order.bid?.current ?? order.originalFare ?? 0;
  }, [order]);

  /* ---- actions ---- */
  const handleCancel = async () => {
    if (!window.confirm("Cancel this ride request?")) return;
    await doUpdate({ status: "cancelled" });
    navigate("/ride", { replace: true });
  };

  const handlePayment = async () => {
    if (!window.confirm(`Confirm payment of ${currency(amount)}?`)) return;
    await doUpdate({
      status: "paid",
      "bid.state": "accepted",
      "bid.history": arrayUnion({
        by: "user",
        action: "paid",
        amount: amount,
        at: Date.now(),
      }),
    });
    // user profile & UI will update via snapshot
  };

  const handleComplete = async () => {
    if (!window.confirm("Mark ride as completed?")) return;
    await doUpdate({
      status: "completed",
      "bid.history": arrayUnion({
        by: "user",
        action: "completed",
        at: Date.now(),
      }),
    });
    navigate("/ride", { replace: true });
  };

  const acceptCounter = async () => {
    if (!order?.bid?.current) return;
    if (
      !window.confirm(
        `Accept rider's bid of ${currency(order.bid.current)}?`
      )
    )
      return;
    await doUpdate({
      "bid.state": "accepted",
      "bid.history": arrayUnion({
        by: "user",
        action: "accept-counter",
        amount: order.bid.current,
        at: Date.now(),
      }),
    });
  };

  const declineCounter = async () => {
    if (!window.confirm("Decline rider's bid?")) return;
    const resetTo = order.bid?.original ?? order.originalFare ?? 0;
    await doUpdate({
      "bid.state": "pending",
      "bid.current": resetTo,
      "bid.counterBy": null,
      "bid.history": arrayUnion({
        by: "user",
        action: "decline-counter",
        amount: order.bid?.current ?? 0,
        at: Date.now(),
      }),
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Ride not found</p>
      </div>
    );

  const statusColor =
    (isCompleted && "bg-green-500") ||
    (isPaid && "bg-blue-500") ||
    (hasRider && !isPaid && "bg-amber-500") ||
    "bg-gray-400";
  const statusText = isCompleted
    ? "Completed"
    : isPaid
    ? "In Progress"
    : hasRider
    ? "Payment Required"
    : "Finding Rider";

  // Prefer riderProfile (loaded from riders collection), fallback to order.rider
  const rider = riderProfile || order.rider || {};
  const riderName = rider.name || rider.fullName || "Rider";
  const riderRating = rider.rating || "5.0";
  const riderPhoto = rider.photo || rider.profile || null;
  const riderVehicle =
    rider.vehicle ||
    rider.vehicleType ||
    (order.rideType === "Bike" ? "Bike" : "Car");
  const riderPlate = rider.plateNumber || rider.vehicleNumber || "ABC-123-XY";
  const riderColor = rider.color || "#000";
  const riderPhone = rider.phone || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-orange-50/30">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <BiChevronLeft size={20} />
            </button>
            <div className="flex-1 text-center">
              <div className="text-white/80 text-xs font-medium uppercase tracking-wide">
                Ride Status
              </div>
              <div className="text-white font-bold text-lg">
                #
                {String(order.trackingNumber || order.id)
                  .slice(0, 12)
                  .toUpperCase()}
              </div>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Permission banner */}
        {permError ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-sm">
            {permError}
          </div>
        ) : null}

        {/* Status Banner */}
        <div className={`${statusColor} rounded-3xl p-6 text-white shadow-lg`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              <span className="font-bold text-lg">{statusText}</span>
            </div>
            {isCompleted && <BiCheckCircle size={28} />}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div
              className={`flex-1 h-1.5 rounded-full ${
                order?.status ? "bg-white" : "bg-white/30"
              }`}
            />
            <div
              className={`flex-1 h-1.5 rounded-full ${
                isPaid ? "bg-white" : "bg-white/30"
              }`}
            />
            <div
              className={`flex-1 h-1.5 rounded-full ${
                isCompleted ? "bg-white" : "bg-white/30"
              }`}
            />
          </div>
          <div className="flex justify-between text-xs mt-2 text-white/80">
            <span>Waiting</span>
            <span>Paid</span>
            <span>Done</span>
          </div>
        </div>

        {/* Counter banner */}
        {order?.bid?.state === "counter" && !isPaid && (
          <div className="bg-white rounded-3xl shadow-xl p-4 border border-amber-200">
            <div className="text-sm font-semibold mb-2 text-amber-700">
              Rider proposed a new fare
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-600">
                Your offer:{" "}
                <span className="font-semibold">
                  {currency(order.bid?.original)}
                </span>
              </div>
              <div className="text-gray-900">
                Rider offer:{" "}
                <span className="font-bold">
                  {currency(order.bid?.current)}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={acceptCounter}
                className="flex-1 py-3 rounded-2xl font-bold text-white bg-green-600 hover:bg-green-700 shadow"
              >
                Accept & Pay
              </button>
              <button
                onClick={declineCounter}
                className="flex-1 py-3 rounded-2xl font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200"
              >
                Decline
              </button>
            </div>
          </div>
        )}

        {/* Rider card */}
        {hasRider ? (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 text-center text-white">
              <div className="text-sm font-semibold uppercase tracking-wider mb-1">
                {isPaid ? "Your Rider's Vehicle" : "🔒 Locked Until Payment"}
              </div>
              <div className="text-2xl">
                {order.rideType === "Bike" ? "🏍️" : "🚗"}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-orange-400 p-1">
                    <div className="w-full h-full rounded-full bg-white overflow-hidden">
                      {isPaid && riderPhoto ? (
                        <img
                          src={riderPhoto}
                          alt="rider"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">
                          👤
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                </div>

                <div>
                  <div className="font-bold text-xl text-gray-900 flex items-center gap-2">
                    {isPaid ? riderName : "Hidden"}
                    {isPaid && (
                      <BsShieldCheck className="text-blue-500" size={18} />
                    )}
                  </div>
                  <div className="text-gray-500 text-sm flex items-center gap-1">
                    <BiStar
                      className="text-amber-400 fill-amber-400"
                      size={16}
                    />
                    {isPaid ? riderRating : "★★★★★"}
                  </div>
                </div>
              </div>

              {isPaid ? (
                <div className="flex gap-3 mb-6">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-2xl py-4 flex flex-col items-center gap-1 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                      <BiCamera className="text-gray-700" size={24} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 mt-1">
                      Photo
                    </span>
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-2xl py-4 flex flex-col items-center gap-1 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                      💬
                    </div>
                    <span className="text-xs font-medium text-gray-700 mt-1">
                      Chat
                    </span>
                  </button>
                  <a
                    href={isPaid && riderPhone ? `tel:${riderPhone}` : undefined}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-2xl py-4 flex flex-col items-center gap-1 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                      <BiPhone className="text-gray-700" size={24} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 mt-1">
                      Call
                    </span>
                  </a>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="text-center text-amber-700 text-sm font-medium">
                    A rider has accepted. Complete payment to unlock full rider
                    details.
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-semibold">
                    Vehicle Details
                  </div>
                  <div className="space-y-3">
                    <Row label="Type">
                      <span className="font-semibold text-gray-900 flex items-center gap-1">
                        {order.rideType === "Bike" ? (
                          <MdDirectionsBike
                            className="text-red-500"
                            size={18}
                          />
                        ) : (
                          <MdDirectionsCar
                            className="text-red-500"
                            size={18}
                          />
                        )}
                        {isPaid ? riderVehicle : "Hidden"}
                      </span>
                    </Row>
                    <Row label="Plate Number">
                      <span className="font-semibold text-gray-900 font-mono">
                        {isPaid ? riderPlate : "•••-•••-••"}
                      </span>
                    </Row>
                    <Row label="Color">
                      <span className="font-semibold text-gray-900 flex items-center gap-2">
                        {isPaid && (
                          <span
                            className="w-4 h-4 rounded-full border-2 border-gray-300"
                            style={{
                              backgroundColor: riderColor,
                            }}
                          />
                        )}
                        {isPaid ? riderColor : "Hidden"}
                      </span>
                    </Row>
                    <Row label="Phone">
                      <span className="font-semibold text-gray-900">
                        {isPaid
                          ? riderPhone || "+234 ••• ••••"
                          : "•••• •••• ••••"}
                      </span>
                    </Row>
                  </div>
                </div>

                {isPaid && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <GoShieldCheck size={20} />
                      <span className="text-sm font-semibold">
                        Verified Rider - ID Confirmed
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* No rider yet */
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
              <div className="text-4xl animate-pulse">🔍</div>
            </div>
            <div className="font-bold text-lg text-gray-900 mb-2">
              Finding Your Rider
            </div>
            <div className="text-gray-500 text-sm">
              Please wait while we match you with an available rider…
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <Dot delay="0s" />
              <Dot delay="0.2s" />
              <Dot delay="0.4s" />
            </div>
          </div>
        )}

        {/* Trip Details */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
            <div className="text-white font-bold text-lg">Trip Details</div>
          </div>

          <div className="p-6 space-y-4">
            {/* Route */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div
                    className="w-0.5 flex-1 bg-gray-200 my-1"
                    style={{ minHeight: "20px" }}
                  />
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Pickup</div>
                    <div className="font-semibold text-gray-900">
                      {order.pickup}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Destination
                    </div>
                    <div className="font-semibold text-gray-900">
                      {order.dropoff || order.destination}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="border-t pt-4 space-y-3">
              <Row label="Time">
                <span className="font-semibold text-gray-900">
                  {order.time || "ASAP"}
                </span>
              </Row>
              <Row label="Passengers">
                <span className="font-semibold text-gray-900">
                  {order.seats} seat
                  {Number(order.seats) > 1 ? "s" : ""}
                </span>
              </Row>
              {order.vibe ? (
                <Row label="Vibe">
                  <span className="font-semibold text-gray-900">
                    {order.vibe}
                  </span>
                </Row>
              ) : null}
            </div>

            {/* Amount */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200">
              <div className="flex justify-between items-center">
                <span className="text-emerald-700 font-medium">Amount</span>
                <span className="text-2xl font-bold text-emerald-700">
                  {currency(amount)}
                </span>
              </div>
              {order?.bid?.state === "counter" && !isPaid && (
                <div className="text-xs text-amber-700 mt-1">
                  Rider sent a counter offer. Accept to pay or decline to wait
                  for another rider.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-0 z-40 bg-white border-top border-gray-100">
        <div className="max-w-md mx-auto p-4">
          {!hasRider && order.status !== "cancelled" && (
            <button
              onClick={handleCancel}
              className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <BiX size={20} />
              Cancel Ride
            </button>
          )}

          {hasRider && !isPaid && order.status !== "cancelled" && (
            <button
              onClick={handlePayment}
              className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Pay {currency(amount)}
            </button>
          )}

          {hasRider &&
            isPaid &&
            !isCompleted &&
            order.status !== "cancelled" && (
              <button
                onClick={handleComplete}
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <BsCheckCircle size={20} />
                Complete Ride
              </button>
            )}

          {(order.status === "cancelled" || isCompleted) && (
            <button
              onClick={() => navigate("/ride")}
              className="w-full mt-2 py-4 rounded-2xl font-bold text-red-600 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 border-2 border-red-200 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Book Another Ride
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600 text-sm">{label}</span>
      {children}
    </div>
  );
}

function Dot({ delay }) {
  return (
    <div
      className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
}
