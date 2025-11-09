// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   MdArrowBack,
//   MdCheckCircle,
//   MdDirectionsBike,
//   MdDirectionsCar,
//   MdPhone,
//   MdPlace,
//   MdSchedule,
//   MdVerifiedUser,
//   MdCancel,
//   MdAttachMoney,
// } from "react-icons/md";

// /* Small card shell */
// function Card({ children, className = "" }) {
//   return (
//     <div className={`bg-white rounded-2xl shadow-md border border-gray-100 ${className}`}>
//       {children}
//     </div>
//   );
// }

// /* Info row */
// function Row({ icon, label, value }) {
//   return (
//     <div className="flex items-start gap-3 py-2">
//       <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
//         {icon}
//       </div>
//       <div className="min-w-0">
//         <div className="text-xs text-gray-500">{label}</div>
//         <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
//       </div>
//     </div>
//   );
// }

// /* Status pill */
// function StatusPill({ color, text }) {
//   return (
//     <span
//       className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${color}`}
//     >
//       <span className="w-2 h-2 rounded-full bg-current opacity-80"></span>
//       {text}
//     </span>
//   );
// }

// /* Step item */
// function Step({ active, done, label }) {
//   return (
//     <div className="flex-1 flex items-center">
//       <div className="flex flex-col items-center w-full">
//         <div
//           className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
//             done ? "bg-green-500" : active ? "bg-blue-600" : "bg-gray-300"
//           }`}
//         >
//           {done ? <MdCheckCircle className="text-white" /> : <span className="text-xs font-bold">•</span>}
//         </div>
//         <div className="text-[11px] mt-1 text-center text-gray-600">{label}</div>
//       </div>
//       {/* connector */}
//       <div className="h-px bg-gray-200 flex-1 mx-2" />
//     </div>
//   );
// }

// export default function RideStatusPage() {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [rider, setRider] = useState(null);
//   const [isPaid, setIsPaid] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   // pull current state from localStorage
//   useEffect(() => {
//     const check = () => {
//       const orders = JSON.parse(localStorage.getItem("rideOrders") || "[]");
//       const current = orders.find((o) => o.id === orderId) || null;
//       setOrder(current);

//       const paidOrders = JSON.parse(localStorage.getItem("paidRideOrders") || "[]");
//       setIsPaid(paidOrders.includes(orderId));

//       const accepted = JSON.parse(localStorage.getItem("acceptedRideOrders") || "[]");
//       const found = accepted.find((o) => o.orderId === orderId);
//       setRider(found?.rider || null);

//       const completed = JSON.parse(localStorage.getItem("completedRideOrders") || "[]");
//       setIsCompleted(completed.includes(orderId));
//     };

//     check();
//     const id = setInterval(check, 5000);
//     return () => clearInterval(id);
//   }, [orderId]);

//   const status = useMemo(() => {
//     if (isCompleted) return { text: "Completed", color: "text-green-700 bg-green-50" };
//     if (isPaid && rider) return { text: "Paid — Ride in Progress", color: "text-blue-700 bg-blue-50" };
//     if (rider && !isPaid) return { text: "Rider Found — Payment Required", color: "text-amber-700 bg-amber-50" };
//     return { text: "Waiting for Rider", color: "text-gray-700 bg-gray-100" };
//   }, [isCompleted, isPaid, rider]);

//   const amount = order ? (order.amount ?? order.fare ?? 0) : 0;

//   const handleCancel = () => {
//     if (!window.confirm("Cancel this ride request?")) return;
//     const orders = JSON.parse(localStorage.getItem("rideOrders") || "[]");
//     localStorage.setItem("rideOrders", JSON.stringify(orders.filter((o) => o.id !== orderId)));
//     const accepted = JSON.parse(localStorage.getItem("acceptedRideOrders") || "[]");
//     localStorage.setItem(
//       "acceptedRideOrders",
//       JSON.stringify(accepted.filter((o) => o.orderId !== orderId))
//     );
//     navigate("/ride");
//   };

//   const handlePayment = () => {
//     if (!window.confirm(`Confirm payment of ₦${amount}?`)) return;
//     const paid = JSON.parse(localStorage.getItem("paidRideOrders") || "[]");
//     if (!paid.includes(orderId)) {
//       paid.push(orderId);
//       localStorage.setItem("paidRideOrders", JSON.stringify(paid));
//     }
//     setIsPaid(true);
//     alert("Payment successful! Rider details unlocked.");
//   };

//   const handleComplete = () => {
//     if (!window.confirm("Mark ride as completed?")) return;
//     const completed = JSON.parse(localStorage.getItem("completedRideOrders") || "[]");
//     if (!completed.includes(orderId)) {
//       completed.push(orderId);
//       localStorage.setItem("completedRideOrders", JSON.stringify(completed));
//     }
//     setIsCompleted(true);
//     alert("Thanks for riding with us!");
//   };

//   if (!order) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
//         Order not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30">
//       {/* Header */}
//       <div className="sticky top-0 z-20">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//           <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
//             <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-white/10">
//               <MdArrowBack className="text-white" />
//             </button>
//             <div className="flex-1">
//               <div className="text-sm opacity-90">Ride Status</div>
//               <div className="text-lg font-bold leading-tight">#{orderId.slice(0, 6).toUpperCase()}</div>
//             </div>
//             <StatusPill color={`${status.color}`} text={status.text} />
//           </div>
//         </div>
//       </div>

//       <div className="max-w-2xl mx-auto px-4 py-5 pb-28">
//         {/* Stepper */}
//         <Card className="p-4 mb-5">
//           <div className="flex items-center">
//             <Step label="Waiting" active={!rider} done={!!rider} />
//             <Step label="Rider Found" active={!!rider && !isPaid} done={!!rider && isPaid} />
//             <Step label="Paid" active={isPaid && !isCompleted} done={isPaid && isCompleted} />
//             <div className="flex-1 flex items-center">
//               <div className="flex flex-col items-center w-full">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
//                     isCompleted ? "bg-green-500" : "bg-gray-300"
//                   }`}
//                 >
//                   {isCompleted ? <MdCheckCircle /> : <span className="text-xs font-bold">•</span>}
//                 </div>
//                 <div className="text-[11px] mt-1 text-center text-gray-600">Completed</div>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Order Card */}
//         <Card className="p-5 mb-5">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-semibold">Order Details</h2>
//             <StatusPill color={`${status.color}`} text={status.text} />
//           </div>
//           <div className="divide-y divide-gray-100">
//             <div className="py-2">
//               <Row icon={<MdPlace className="text-blue-600" />} label="From" value={order.pickup} />
//               <Row icon={<MdPlace className="text-red-500" />} label="To" value={order.dropoff || order.destination} />
//             </div>
//             <div className="py-2">
//               <Row
//                 icon={<MdAttachMoney className="text-emerald-600" />}
//                 label="Amount"
//                 value={`₦${(amount || 0).toLocaleString()}`}
//               />
//               <Row icon={<MdSchedule className="text-indigo-600" />} label="Requested Time" value={order.time || "ASAP"} />
//             </div>
//             <div className="py-2">
//               <div className="text-xs text-gray-500 mb-1">Preferences</div>
//               <div className="flex flex-wrap gap-2">
//                 <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
//                   Seats: {order.seats}
//                 </span>
//                 {order.rideType ? (
//                   <span className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 inline-flex items-center gap-1">
//                     {order.rideType === "Bike" ? <MdDirectionsBike /> : order.rideType === "Car" ? <MdDirectionsCar /> : null}
//                     {order.rideType}
//                   </span>
//                 ) : null}
//                 {order.vibe ? (
//                   <span className="px-3 py-1 rounded-full text-xs bg-purple-50 text-purple-700">
//                     Vibe: {order.vibe}
//                   </span>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Rider Card (visible when accepted; full details visible after payment) */}
//         <Card className="p-5 mb-5">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-semibold">Rider</h2>
//             {rider ? (
//               <span className="text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
//                 <MdVerifiedUser /> Assigned
//               </span>
//             ) : (
//               <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">Finding…</span>
//             )}
//           </div>

//           {rider ? (
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden">
//                 {rider.photo ? (
//                   <img src={rider.photo} alt="rider" className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>
//                 )}
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="font-semibold text-gray-900 truncate">
//                   {isPaid ? rider.name : "Hidden until payment"}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   {isPaid ? rider.vehicle : "Vehicle details locked"}
//                 </div>
//               </div>

//               <a
//                 href={isPaid && rider.phone ? `tel:${rider.phone}` : undefined}
//                 className={`px-3 py-2 rounded-lg text-sm inline-flex items-center gap-1 ${
//                   isPaid ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 }`}
//                 onClick={(e) => {
//                   if (!isPaid) e.preventDefault();
//                 }}
//               >
//                 <MdPhone />
//                 Call
//               </a>
//             </div>
//           ) : (
//             <div className="text-sm text-gray-600">Waiting for an available rider to accept your trip…</div>
//           )}
//         </Card>

//         {/* Sticky actions (mobile-first) */}
//         <div className="lg:hidden h-3" />
//       </div>

//       <div className="fixed bottom-0 inset-x-0 z-30 lg:relative lg:bottom-auto">
//         <div className="max-w-2xl mx-auto px-4 pb-5">
//           <div className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-100 shadow-lg rounded-2xl p-3 flex gap-3">
//             {!rider && (
//               <button
//                 onClick={handleCancel}
//                 className="flex-1 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
//               >
//                 <MdCancel /> Cancel
//               </button>
//             )}

//             {rider && !isPaid && (
//               <button
//                 onClick={handlePayment}
//                 className="flex-1 py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700"
//               >
//                 Pay ₦{(amount || 0).toLocaleString()}
//               </button>
//             )}

//             {rider && isPaid && !isCompleted && (
//               <button
//                 onClick={handleComplete}
//                 className="flex-1 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700"
//               >
//                 Mark Completed
//               </button>
//             )}

//             {isCompleted && (
//               <button
//                 onClick={() => navigate("/ride")}
//                 className="flex-1 py-3 rounded-xl font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100"
//               >
//                 Book Another Ride
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Minimal utility styles */}
//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }
















import React, { useEffect, useMemo, useState } from "react";
import { BiCamera, BiCheckCircle, BiChevronLeft, BiKey, BiPhone, BiStar, BiVideo, BiX } from "react-icons/bi";
import { BsCheckCircle, BsShieldCheck } from "react-icons/bs";
import { CgAddR, CgLock } from "react-icons/cg";
import { FaDollarSign } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";

function RideStatusPage() {
  // Demo data
  const orderId = "demo-ride-001";

  const [order, setOrder] = useState({
    id: orderId,
    pickup: "Ikeja City Mall, Lagos",
    dropoff: "Victoria Island, Lagos",
    destination: "Victoria Island, Lagos",
    amount: 3500,
    fare: 3500,
    time: "10:30 AM",
    seats: 1,
    rideType: "Bike",
    vibe: "Quiet"
  });
  
  const [rider, setRider] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Simulate finding a rider after 2 seconds
    const timer = setTimeout(() => {
      setRider({
        name: "Adebayo Williams",
        phone: "+234 801 234 5678",
        vehicle: "Honda CB500X",
        plateNumber: "LAG-456-KJ",
        color: "#DC2626",
        rating: "4.9",
        photo: null,
        verified: true
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const status = useMemo(() => {
    if (isCompleted) return { text: "Completed", color: "bg-green-500" };
    if (isPaid && rider) return { text: "In Progress", color: "bg-blue-500" };
    if (rider && !isPaid) return { text: "Payment Required", color: "bg-amber-500" };
    return { text: "Finding Rider", color: "bg-gray-400" };
  }, [isCompleted, isPaid, rider]);

  const amount = order ? (order.amount ?? order.fare ?? 0) : 0;

  const handleCancel = () => {
    if (!window.confirm("Cancel this ride request?")) return;
    alert("Ride cancelled");
  };

  const handlePayment = () => {
    if (!window.confirm(`Confirm payment of ₦${amount.toLocaleString()}?`)) return;
    setIsPaid(true);
  };

  const handleComplete = () => {
    if (!window.confirm("Mark ride as completed?")) return;
    setIsCompleted(true);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <div className="text-gray-600 font-medium">Order not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-orange-50/30">
      {/* Header with gradient */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => alert("Navigate back")}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <BiChevronLeft size={20} />
            </button>
            <div className="flex-1 text-center">
              <div className="text-white/80 text-xs font-medium uppercase tracking-wide">Ride Status</div>
              <div className="text-white font-bold text-lg">#{orderId.slice(0, 8).toUpperCase()}</div>
            </div>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4 pb-32">
        {/* Status Banner */}
        <div className={`${status.color} rounded-3xl p-6 text-white shadow-lg`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              <span className="font-bold text-lg">{status.text}</span>
            </div>
            {isCompleted && <BiCheckCircle size={28} />}
          </div>
          
          {/* Progress steps */}
          <div className="flex items-center gap-2 mt-4">
            <div className={`flex-1 h-1.5 rounded-full ${rider ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`flex-1 h-1.5 rounded-full ${isPaid ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`flex-1 h-1.5 rounded-full ${isCompleted ? 'bg-white' : 'bg-white/30'}`} />
          </div>
          <div className="flex justify-between text-xs mt-2 text-white/80">
            <span>Waiting</span>
            <span>Paid</span>
            <span>Done</span>
          </div>
        </div>

        {/* Rider Card - Snapchat Inspired */}
        {rider && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Bike/Vehicle Header Banner */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 text-center text-white">
              <div className="text-sm font-semibold uppercase tracking-wider mb-1">
                {isPaid ? "Your Rider's Vehicle" : "🔒 Locked Until Payment"}
              </div>
              <div className="text-2xl">
                {order.rideType === "Bike" ? "🏍️" : "🚗"}
              </div>
            </div>

            {/* Rider Profile Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-orange-400 p-1">
                      <div className="w-full h-full rounded-full bg-white overflow-hidden">
                        {rider.photo ? (
                          <img src={rider.photo} alt="rider" className="w-full h-full object-cover" />
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
                      {isPaid ? rider.name : "Hidden"}
                      {isPaid && <BsShieldCheck className="text-blue-500" size={18} />}
                    </div>
                    <div className="text-gray-500 text-sm flex items-center gap-1">
                      <BiStar className="text-amber-400 fill-amber-400" size={16} />
                      {isPaid ? (rider.rating || "4.9") : "★★★★★"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isPaid && (
                <div className="flex gap-3 mb-6">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-2xl py-4 flex flex-col items-center gap-1 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                      <BiCamera className="text-gray-700" size={24} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 mt-1">Photo</span>
                  </button>
                  
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-2xl py-4 flex flex-col items-center gap-1 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                      <FiMessageCircle className="text-gray-700" size={24} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 mt-1">Chat</span>
                  </button>
                  
                  <a
                    href={`tel:${rider.phone}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-2xl py-4 flex flex-col items-center gap-1 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                      <BiPhone className="text-gray-700" size={24} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 mt-1">Call</span>
                  </a>
                  
                </div>
              )}

              {!isPaid && (
                <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="text-center text-amber-700 text-sm font-medium">
                    🔒 Complete payment to unlock full rider details
                  </div>
                </div>
              )}

              {/* Rider Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-semibold">Vehicle Details</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Type</span>
                      <span className="font-semibold text-gray-900 flex items-center gap-1">
                        {order.rideType === "Bike" ? <BiKey className="text-red-500" size={18} /> : <CgAddR className="text-red-500" size={18} />}
                        {isPaid ? (rider.vehicle || order.rideType) : "Hidden"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Plate Number</span>
                      <span className="font-semibold text-gray-900 font-mono">
                        {isPaid ? (rider.plateNumber || "ABC-123-XY") : "•••-•••-••"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Color</span>
                      <div className="flex items-center gap-2">
                        {isPaid && (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" style={{backgroundColor: rider.color || "#000"}} />
                        )}
                        <span className="font-semibold text-gray-900">
                          {isPaid ? (rider.color || "Black") : "Hidden"}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Phone</span>
                      <span className="font-semibold text-gray-900">
                        {isPaid ? (rider.phone || "+234 xxx xxxx") : "•••• •••• ••••"}
                      </span>
                    </div>
                  </div>
                </div>

                {isPaid && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <GoShieldCheck size={20} />
                      <span className="text-sm font-semibold">Verified Rider - ID Confirmed</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!rider && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
              <div className="text-4xl animate-pulse">🔍</div>
            </div>
            <div className="font-bold text-lg text-gray-900 mb-2">Finding Your Rider</div>
            <div className="text-gray-500 text-sm">Please wait while we match you with an available rider...</div>
            <div className="mt-6 flex justify-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}} />
            </div>
          </div>
        )}

        {/* Trip Details Card */}
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
                  <div className="w-0.5 flex-1 bg-gray-200 my-1" style={{minHeight: '20px'}} />
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Pickup</div>
                    <div className="font-semibold text-gray-900">{order.pickup}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Destination</div>
                    <div className="font-semibold text-gray-900">{order.dropoff || order.destination}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Time</span>
                <span className="font-semibold text-gray-900 flex items-center gap-1">
                  <CgLock className="text-red-500" size={16} />
                  {order.time || "ASAP"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Passengers</span>
                <span className="font-semibold text-gray-900">{order.seats} seat{order.seats > 1 ? 's' : ''}</span>
              </div>
              {order.vibe && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Vibe</span>
                  <span className="font-semibold text-gray-900">{order.vibe}</span>
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200">
              <div className="flex justify-between items-center">
                <span className="text-emerald-700 font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-emerald-700">₦{amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-md mx-auto p-4">
          {!rider && (
            <button
              onClick={handleCancel}
              className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <BiX size={20} />
              Cancel Ride
            </button>
          )}

          {rider && !isPaid && (
            <button
              onClick={handlePayment}
              className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <FaDollarSign size={24} />
              Pay ₦{amount.toLocaleString()}
            </button>
          )}

          {rider && isPaid && !isCompleted && (
            <button
              onClick={handleComplete}
              className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <BsCheckCircle size={20} />
              Complete Ride
            </button>
          )}

          {isCompleted && (
            <button
              onClick={() => alert("Navigate to ride booking")}
              className="w-full py-4 rounded-2xl font-bold text-red-600 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 border-2 border-red-200 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              Book Another Ride
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RideStatusPage;