// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const RiderDashboard = () => {
// //   const [rider, setRider] = useState(null);
// //   const [orders, setOrders] = useState({
// //     inProgress: [],
// //     completed: []
// //   });
// //   const [activeTab, setActiveTab] = useState('profile');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Check if rider is logged in
// //     const currentRider = localStorage.getItem('currentRider');
// //     if (!currentRider) {
// //       navigate('/rider-login');
// //       return;
// //     }
// //     setRider(JSON.parse(currentRider));

// //     // Load orders
// //     const loadOrders = () => {
// //       const acceptedOrders = JSON.parse(localStorage.getItem('acceptedRideOrders') || '[]');
// //       const completedOrderIds = JSON.parse(localStorage.getItem('completedRideOrders') || '[]');
// //       const allOrders = JSON.parse(localStorage.getItem('rideOrders') || '[]');

// //       // Filter orders for current rider
// //       const riderOrders = acceptedOrders.filter(order => order?.rider.email === rider?.email);
      
// //       // Separate into in-progress and completed
// //       const inProgress = [];
// //       const completed = [];

// //       riderOrders.forEach(accepted => {
// //         const orderDetails = allOrders.find(o => o.id === accepted.orderId);
// //         if (orderDetails) {
// //           const orderWithDetails = {
// //             ...accepted,
// //             pickup: orderDetails.pickup,
// //             dropoff: orderDetails.dropoff,
// //             amount: orderDetails.amount
// //           };

// //           if (completedOrderIds.includes(accepted.orderId)) {
// //             completed.push(orderWithDetails);
// //           } else {
// //             inProgress.push(orderWithDetails);
// //           }
// //         }
// //       });

// //       setOrders({ inProgress, completed });
// //     };

// //     loadOrders();
// //     const interval = setInterval(loadOrders, 10000); // Refresh every 10 seconds

// //     return () => clearInterval(interval);
// //   }, [navigate, rider]);

// //   const handleLogout = () => {
// //     localStorage.removeItem('currentRider');
// //     navigate('/rider-login');
// //   };

// //   if (!rider) return null;

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
// //         {/* Profile header */}
// //         <div className="bg-white shadow rounded-lg p-6 mb-6">
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">{rider.name}</h1>
// //               <p className="text-sm text-gray-500">{rider.email}</p>
// //             </div>
// //             <button
// //               onClick={handleLogout}
// //               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </div>

// //         {/* Navigation Tabs */}
// //         <div className="border-b border-gray-200 mb-6">
// //           <nav className="-mb-px flex space-x-8">
// //             <button
// //               onClick={() => setActiveTab('profile')}
// //               className={`py-4 px-1 border-b-2 font-medium text-sm ${
// //                 activeTab === 'profile'
// //                   ? 'border-blue-500 text-blue-600'
// //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //               }`}
// //             >
// //               Profile
// //             </button>
// //             <button
// //               onClick={() => setActiveTab('inProgress')}
// //               className={`py-4 px-1 border-b-2 font-medium text-sm ${
// //                 activeTab === 'inProgress'
// //                   ? 'border-blue-500 text-blue-600'
// //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //               }`}
// //             >
// //               In Progress
// //             </button>
// //             <button
// //               onClick={() => setActiveTab('completed')}
// //               className={`py-4 px-1 border-b-2 font-medium text-sm ${
// //                 activeTab === 'completed'
// //                   ? 'border-blue-500 text-blue-600'
// //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //               }`}
// //             >
// //               Completed
// //             </button>
// //           </nav>
// //         </div>

// //         {/* Content */}
// //         {activeTab === 'profile' && (
// //           <div className="bg-white shadow rounded-lg p-6">
// //             <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Full Name</label>
// //                 <p className="mt-1 text-sm text-gray-900">{rider.name}</p>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Email</label>
// //                 <p className="mt-1 text-sm text-gray-900">{rider.email}</p>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Phone</label>
// //                 <p className="mt-1 text-sm text-gray-900">{rider.phone}</p>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
// //                 <p className="mt-1 text-sm text-gray-900">{rider.vehicleType}</p>
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
// //                 <p className="mt-1 text-sm text-gray-900">{rider.vehicleNumber}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeTab === 'inProgress' && (
// //           <div className="space-y-6">
// //             {orders.inProgress.map(order => (
// //               <div key={order.orderId} className="bg-white shadow rounded-lg p-6">
// //                 <div className="space-y-2">
// //                   <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
// //                   <p>Route: {order.pickup} → {order.dropoff}</p>
// //                   <p>Amount: ₦{order.amount}</p>
// //                   <p className="text-sm text-gray-500">
// //                     Accepted at: {new Date(order.timestamp).toLocaleString()}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //             {orders.inProgress.length === 0 && (
// //               <p className="text-center text-gray-500">No rides in progress</p>
// //             )}
// //           </div>
// //         )}

// //         {activeTab === 'completed' && (
// //           <div className="space-y-6">
// //             {orders.completed.map(order => (
// //               <div key={order.orderId} className="bg-white shadow rounded-lg p-6">
// //                 <div className="space-y-2">
// //                   <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
// //                   <p>Route: {order.pickup} → {order.dropoff}</p>
// //                   <p>Amount: ₦{order.amount}</p>
// //                   <p className="text-sm text-gray-500">
// //                     Completed at: {new Date(order.timestamp).toLocaleString()}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //             {orders.completed.length === 0 && (
// //               <p className="text-center text-gray-500">No completed rides</p>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RiderDashboard;
























// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const RiderDashboard = () => {
//   const [rider, setRider] = useState(null);
//   const [orders, setOrders] = useState({
//     inProgress: [],
//     completed: []
//   });
//   const [activeTab, setActiveTab] = useState('profile');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if rider is logged in
//     const currentRider = localStorage.getItem('currentRider');
//     if (!currentRider) {
//       navigate('/rider-login');
//       return;
//     }
//     setRider(JSON.parse(currentRider));

//     // Load orders
//     const loadOrders = () => {
//       const acceptedOrders = JSON.parse(localStorage.getItem('acceptedRideOrders') || '[]');
//       const completedOrderIds = JSON.parse(localStorage.getItem('completedRideOrders') || '[]');
//       const allOrders = JSON.parse(localStorage.getItem('rideOrders') || '[]');

//       // Filter orders for current rider
//       const riderOrders = acceptedOrders.filter(order => order?.rider.email === rider?.email);
      
//       // Separate into in-progress and completed
//       const inProgress = [];
//       const completed = [];

//       riderOrders.forEach(accepted => {
//         const orderDetails = allOrders.find(o => o.id === accepted.orderId);
//         if (orderDetails) {
//           const orderWithDetails = {
//             ...accepted,
//             pickup: orderDetails.pickup,
//             dropoff: orderDetails.dropoff,
//             amount: orderDetails.amount
//           };

//           if (completedOrderIds.includes(accepted.orderId)) {
//             completed.push(orderWithDetails);
//           } else {
//             inProgress.push(orderWithDetails);
//           }
//         }
//       });

//       setOrders({ inProgress, completed });
//     };

//     loadOrders();
//     const interval = setInterval(loadOrders, 10000); // Refresh every 10 seconds

//     return () => clearInterval(interval);
//   }, [navigate, rider]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentRider');
//     navigate('/rider-login');
//   };

//   if (!rider) return null;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {/* Profile header */}
//         <div className="bg-white shadow rounded-lg p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">{rider.name}</h1>
//               <p className="text-sm text-gray-500">{rider.email}</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="border-b border-gray-200 mb-6">
//           <nav className="-mb-px flex space-x-8">
//             <button
//               onClick={() => setActiveTab('profile')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'profile'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               Profile
//             </button>
//             <button
//               onClick={() => setActiveTab('inProgress')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'inProgress'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               In Progress
//             </button>
//             <button
//               onClick={() => setActiveTab('completed')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'completed'
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             >
//               Completed
//             </button>
//           </nav>
//         </div>

//         {/* Content */}
//         {activeTab === 'profile' && (
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                 <p className="mt-1 text-sm text-gray-900">{rider.name}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <p className="mt-1 text-sm text-gray-900">{rider.email}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Phone</label>
//                 <p className="mt-1 text-sm text-gray-900">{rider.phone}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
//                 <p className="mt-1 text-sm text-gray-900">{rider.vehicleType}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
//                 <p className="mt-1 text-sm text-gray-900">{rider.vehicleNumber}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'inProgress' && (
//           <div className="space-y-6">
//             {orders.inProgress.map(order => (
//               <div key={order.orderId} className="bg-white shadow rounded-lg p-6">
//                 <div className="space-y-2">
//                   <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
//                   <p>Route: {order.pickup} → {order.dropoff}</p>
//                   <p>Amount: ₦{order.amount}</p>
//                   <p className="text-sm text-gray-500">
//                     Accepted at: {new Date(order.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             {orders.inProgress.length === 0 && (
//               <p className="text-center text-gray-500">No rides in progress</p>
//             )}
//           </div>
//         )}

//         {activeTab === 'completed' && (
//           <div className="space-y-6">
//             {orders.completed.map(order => (
//               <div key={order.orderId} className="bg-white shadow rounded-lg p-6">
//                 <div className="space-y-2">
//                   <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
//                   <p>Route: {order.pickup} → {order.dropoff}</p>
//                   <p>Amount: ₦{order.amount}</p>
//                   <p className="text-sm text-gray-500">
//                     Completed at: {new Date(order.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             {orders.completed.length === 0 && (
//               <p className="text-center text-gray-500">No completed rides</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RiderDashboard;


























































import React, { useEffect, useMemo, useState } from "react";

const RiderDashboard = () => {
  const [rider, setRider] = useState(null);
  const [orders, setOrders] = useState({ inProgress: [], completed: [] });
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalRides: 0,
    completionRate: 0,
    averageRating: 4.8,
  });
  const [activeTab, setActiveTab] = useState("overview");

  // ---------- Helpers (storage) ----------
  const saveAll = (next) => {
    setOrders(next);
    localStorage.setItem("rider_inProgress", JSON.stringify(next.inProgress));
    localStorage.setItem("rider_completed", JSON.stringify(next.completed));
  };

  const writeAccepted = (order) => {
    const accepted = JSON.parse(localStorage.getItem("acceptedRideOrders") || "[]");
    const mine = {
      orderId: order.orderId,
      rider: {
        name: rider?.name,
        phone: rider?.phone,
        vehicle: rider?.vehicleType,
        photo: rider?.photo || null,
      },
    };
    const exists = accepted.some((o) => o.orderId === order.orderId);
    if (!exists) {
      accepted.unshift(mine);
      localStorage.setItem("acceptedRideOrders", JSON.stringify(accepted));
    }
  };

  const writeCompleted = (order) => {
    const done = JSON.parse(localStorage.getItem("completedRideOrders") || "[]");
    if (!done.includes(order.orderId)) {
      done.push(order.orderId);
      localStorage.setItem("completedRideOrders", JSON.stringify(done));
    }
  };

  const writePaid = (order) => {
    const paid = JSON.parse(localStorage.getItem("paidRideOrders") || "[]");
    if (!paid.includes(order.orderId)) {
      paid.push(order.orderId);
      localStorage.setItem("paidRideOrders", JSON.stringify(paid));
    }
  };

  // ---------- Bootstrap demo data ----------
  useEffect(() => {
    // Rider
    const demoRider = {
      name: "Adebayo Williams",
      email: "adebayo@rider.com",
      phone: "+234 801 234 5678",
      vehicleType: "Honda CB500X",
      vehicleNumber: "LAG-456-KJ",
      vehicleColor: "#DC2626",
      photo: null,
      rating: 4.8,
      joinDate: "2024-01-15",
      totalRides: 247,
      verified: true,
    };
    setRider(demoRider);
    localStorage.setItem("currentRider", JSON.stringify(demoRider));

    // Try load lists from storage first
    const storedInProgress = JSON.parse(localStorage.getItem("rider_inProgress") || "null");
    const storedCompleted = JSON.parse(localStorage.getItem("rider_completed") || "null");

    if (storedInProgress && storedCompleted) {
      setOrders({ inProgress: storedInProgress, completed: storedCompleted });
      return;
    }

    // Seed demo orders
    const demoInProgress = [
      {
        orderId: "order-001",
        pickup: "Ikeja City Mall",
        dropoff: "Victoria Island",
        amount: 3500,
        customerName: "John Doe",
        customerPhone: "+234 801 111 2222",
        timestamp: new Date().toISOString(),
        distance: "12 km",
        status: "paid", // paid | accepted
      },
      {
        orderId: "order-002",
        pickup: "Lekki Phase 1",
        dropoff: "Ajah",
        amount: 2500,
        customerName: "Jane Smith",
        customerPhone: "+234 802 333 4444",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        distance: "8 km",
        status: "accepted",
      },
    ];

    const demoCompleted = [
      {
        orderId: "order-003",
        pickup: "Maryland Mall",
        dropoff: "Ikoyi",
        amount: 4000,
        customerName: "Mike Johnson",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        distance: "15 km",
        rating: 5,
      },
      {
        orderId: "order-004",
        pickup: "Surulere",
        dropoff: "Yaba",
        amount: 1800,
        customerName: "Sarah Williams",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        distance: "6 km",
        rating: 5,
      },
      {
        orderId: "order-005",
        pickup: "Allen Avenue",
        dropoff: "Obalende",
        amount: 3200,
        customerName: "David Chen",
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        distance: "10 km",
        rating: 4,
      },
    ];

    const next = { inProgress: demoInProgress, completed: demoCompleted };
    saveAll(next);
  }, []); // eslint-disable-line

  // ---------- Recompute stats when orders change ----------
  useEffect(() => {
    const totalEarnings = orders.completed.reduce((s, o) => s + (o.amount || 0), 0);
    const totalRides = orders.completed.length + orders.inProgress.length;
    const completionRate = totalRides > 0 ? Math.round((orders.completed.length / totalRides) * 100) : 0;
    setStats((s) => ({
      ...s,
      totalEarnings,
      totalRides,
      completionRate,
    }));
  }, [orders]);

  // ---------- Actions ----------
  const acceptOrder = (orderId) => {
    const next = { ...orders };
    next.inProgress = next.inProgress.map((o) =>
      o.orderId === orderId ? { ...o, status: "accepted" } : o
    );
    saveAll(next);
    const order = next.inProgress.find((o) => o.orderId === orderId);
    if (order) writeAccepted(order);
  };

  const startRide = (orderId) => {
    // mark as paid/started
    const next = { ...orders };
    next.inProgress = next.inProgress.map((o) =>
      o.orderId === orderId ? { ...o, status: "paid" } : o
    );
    saveAll(next);
    const order = next.inProgress.find((o) => o.orderId === orderId);
    if (order) writePaid(order);
  };

  const completeRide = (orderId) => {
    const next = { ...orders };
    const order = next.inProgress.find((o) => o.orderId === orderId);
    if (!order) return;

    // move to completed
    next.inProgress = next.inProgress.filter((o) => o.orderId !== orderId);
    next.completed = [
      {
        ...order,
        rating: order.rating || 5,
        timestamp: new Date().toISOString(),
      },
      ...next.completed,
    ];
    saveAll(next);
    writeCompleted(order);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentRider");
    alert("Logged out successfully");
  };

  // ---------- UI helpers ----------
  const money = (n) => `₦${(n || 0).toLocaleString()}`;
  const formatDT = (ts) =>
    new Date(ts).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const navigateTo = (from, to) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      from
    )}&destination=${encodeURIComponent(to)}&travelmode=driving`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!rider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-orange-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
                  {rider.photo ? (
                    <img src={rider.photo} alt={rider.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-white">{rider.name.charAt(0)}</span>
                  )}
                </div>
                {rider.verified && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{rider.name}</h1>
                  {rider.verified && (
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-semibold">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-red-100 text-sm">{rider.email}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-yellow-300">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white font-bold">{rider.rating}</span>
                  </div>
                  <span className="text-red-100 text-sm">•</span>
                  <span className="text-red-100 text-sm">{rider.totalRides} rides</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-red-100 text-xs mb-1">Active</div>
                <div className="text-white text-xl font-bold">{orders.inProgress.length}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-red-100 text-xs mb-1">Earnings</div>
                <div className="text-white text-xl font-bold">{money(stats.totalEarnings)}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-red-100 text-xs mb-1">Rating</div>
                <div className="text-white text-xl font-bold flex items-center gap-1">
                  <span>{stats.averageRating}</span>
                  <svg className="w-4 h-4 fill-yellow-300" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-3 border border-white/20 transition-all flex items-center justify-center gap-2 text-white font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {["overview", "profile", "active", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab ? "bg-white text-red-600 shadow-lg" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tab === "overview" && "📊 Overview"}
                {tab === "profile" && "👤 Profile"}
                {tab === "active" && `🚗 Active (${orders.inProgress.length})`}
                {tab === "completed" && `✅ Completed (${orders.completed.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard color="blue" title="Total Rides" value={stats.totalRides} />
              <StatCard color="green" title="Total Earnings" value={money(stats.totalEarnings)} />
              <StatCard color="purple" title="Average Rating" value={stats.averageRating} icon="star" />
              <StatCard color="orange" title="Completion Rate" value={`${stats.completionRate}%`} icon="check" />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[...orders.inProgress, ...orders.completed.slice(0, 3)].map((order, index) => (
                  <div
                    key={order.orderId}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                      {index < orders.inProgress.length ? "🚗" : "✅"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {order.pickup} → {order.dropoff}
                      </div>
                      <div className="text-sm text-gray-500">{formatDT(order.timestamp)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{money(order.amount)}</div>
                      <div className="text-xs text-gray-500">{order.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <ProfileSection rider={rider} stats={stats} />
        )}

        {/* Active Orders */}
        {activeTab === "active" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.inProgress.length === 0 ? (
              <EmptyState text="No active rides at the moment." />
            ) : (
              orders.inProgress.map((o) => (
                <OrderCard
                  key={o.orderId}
                  order={o}
                  onAccept={() => acceptOrder(o.orderId)}
                  onStart={() => startRide(o.orderId)}
                  onComplete={() => completeRide(o.orderId)}
                  onCall={() => window.open(`tel:${o.customerPhone}`, "_self")}
                  onNavigate={() => navigateTo(o.pickup, o.dropoff)}
                />
              ))
            )}
          </div>
        )}

        {/* Completed Orders */}
        {activeTab === "completed" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.completed.length === 0 ? (
              <EmptyState text="No completed rides yet." />
            ) : (
              orders.completed.map((o) => (
                <CompletedCard key={o.orderId} order={o} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------- Small Components ---------- */

function StatCard({ color = "blue", title, value, icon }) {
  const colorMap = {
    blue: "border-blue-500 bg-blue-100 text-blue-600",
    green: "border-green-500 bg-green-100 text-green-600",
    purple: "border-purple-500 bg-purple-100 text-purple-600",
    orange: "border-orange-500 bg-orange-100 text-orange-600",
  };
  return (
    <div className={`bg-white rounded-3xl shadow-lg p-6 border-l-4 ${colorMap[color] || colorMap.blue}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colorMap[color].split(" ").slice(1, 2)} flex items-center justify-center`}>
          {icon === "star" ? (
            <svg className={`w-6 h-6 ${colorMap[color].split(" ").slice(-1)}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ) : icon === "check" ? (
            <svg className={`w-6 h-6 ${colorMap[color].split(" ").slice(-1)}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className={`w-6 h-6 ${colorMap[color].split(" ").slice(-1)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="bg-white rounded-3xl shadow p-8 text-center text-gray-600">
      {text}
    </div>
  );
}

function OrderCard({ order, onAccept, onStart, onComplete, onCall, onNavigate }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-500">{order.orderId}</div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            order.status === "paid"
              ? "bg-blue-50 text-blue-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {order.status === "paid" ? "Paid / In progress" : "Accepted"}
        </span>
      </div>

      <div className="font-semibold text-gray-900 mb-1">
        {order.pickup} → {order.dropoff}
      </div>
      <div className="text-sm text-gray-500 mb-4">
        {new Date(order.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • {order.distance}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold"
          onClick={onNavigate}
        >
          Navigate
        </button>
        <button
          className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold"
          onClick={onCall}
        >
          Call
        </button>
        {order.status === "accepted" ? (
          <button
            className="col-span-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            onClick={onStart}
          >
            Start Ride
          </button>
        ) : (
          <button
            className="col-span-2 w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
            onClick={onComplete}
          >
            Complete & Collect {new Intl.NumberFormat().format(order.amount)}
          </button>
        )}
      </div>

      {order.status !== "accepted" && (
        <div className="text-xs text-gray-500 mt-3">Payment confirmed by rider.</div>
      )}

      {/* Optionally allow accept explicitly (for future "new" status) */}
      {order.status === "new" && (
        <button
          className="mt-3 w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold"
          onClick={onAccept}
        >
          Accept Order
        </button>
      )}
    </div>
  );
}

function CompletedCard({ order }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-gray-500">{order.orderId}</div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
          Completed
        </span>
      </div>
      <div className="font-semibold text-gray-900 mb-1">
        {order.pickup} → {order.dropoff}
      </div>
      <div className="text-sm text-gray-500 mb-4">
        {new Date(order.timestamp).toLocaleDateString()} • {order.distance}
      </div>
      <div className="flex items-center justify-between">
        <div className="font-bold text-green-600">₦{order.amount.toLocaleString()}</div>
        <div className="text-xs text-yellow-600 flex items-center gap-1">
          <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {order.rating}/5
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ rider, stats }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
          <div className="space-y-4">
            <InfoRow iconBg="bg-blue-100" iconColor="text-blue-600" label="Full Name" value={rider.name} />
            <InfoRow iconBg="bg-purple-100" iconColor="text-purple-600" label="Email Address" value={rider.email} mail />
            <InfoRow iconBg="bg-green-100" iconColor="text-green-600" label="Phone Number" value={rider.phone} phone />
            <InfoRow
              iconBg="bg-orange-100"
              iconColor="text-orange-600"
              label="Member Since"
              value={new Date(rider.joinDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Vehicle Information</h2>
          <div className="space-y-4">
            <InfoRow iconBg="bg-red-100" iconColor="text-red-600" label="Vehicle Type" value={rider.vehicleType} moto />
            <InfoRow
              iconBg="bg-indigo-100"
              iconColor="text-indigo-600"
              label="Plate Number"
              value={rider.vehicleNumber}
              mono
            />
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-pink-600" style={{ backgroundColor: rider.vehicleColor }} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">Vehicle Color</div>
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-mono">{rider.vehicleColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side card */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl shadow-xl p-6 text-white">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🏆</div>
            <div className="text-2xl font-bold mb-2">Top Performer</div>
            <div className="text-red-100 text-sm">Keep up the great work!</div>
          </div>
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-red-100 text-xs mb-1">Total Rides</div>
              <div className="text-2xl font-bold">{stats.totalRides}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-red-100 text-xs mb-1">Earnings</div>
              <div className="text-2xl font-bold">₦{stats.totalEarnings.toLocaleString()}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-red-100 text-xs mb-1">Completion</div>
              <div className="text-2xl font-bold">{stats.completionRate}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ iconBg, iconColor, label, value, mono, moto, phone, mail }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
        {/* quick glyphs */}
        {moto ? (
          <svg className={`w-6 h-6 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 18a3 3 0 100-6 3 3 0 000 6zm14 3a3 3 0 100-6 3 3 0 000 6zM5 15h6l4-8 4 5h-5" />
          </svg>
        ) : phone ? (
          <svg className={`w-6 h-6 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        ) : mail ? (
          <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ) : (
          <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{label}</div>
        <div className={`font-semibold text-gray-900 ${mono ? "font-mono" : ""}`}>{value}</div>
      </div>
    </div>
  );
}

export default RiderDashboard;
