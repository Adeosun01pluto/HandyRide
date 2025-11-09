// import React, { useState, useEffect } from 'react';

// const RiderOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [acceptedOrders, setAcceptedOrders] = useState([]);
//   const [currentRider, setCurrentRider] = useState(null);

//   useEffect(() => {
//     const rider = JSON.parse(localStorage.getItem('currentRider'));
//     if (rider) {
//       setCurrentRider(rider);
//     }
//   }, []);

//   useEffect(() => {
//     // Load initial orders
//     const loadOrders = () => {
//       const allOrders = JSON.parse(localStorage.getItem('rideOrders') || '[]');
//       const accepted = JSON.parse(localStorage.getItem('acceptedRideOrders') || '[]');
//       const completedOrders = JSON.parse(localStorage.getItem('completedRideOrders') || '[]');
      
//       // Show all orders that haven't been accepted yet
//       const pendingOrders = allOrders.filter(order => 
//         !accepted.some(acc => acc.orderId === order.id) &&
//         !completedOrders.includes(order.id)
//       );
//       setOrders(pendingOrders);
//       setAcceptedOrders(accepted);
//     };

//     loadOrders();
//     // Refresh orders every 10 seconds
//     const interval = setInterval(loadOrders, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleAcceptOrder = (order) => {
//     if (!currentRider) return;

//     const rider = {
//       name: currentRider.name,
//       phone: currentRider.phone,
//       vehicle: `${currentRider.vehicleType} - ${currentRider.vehicleNumber}`
//     };

//     const acceptedOrder = {
//       orderId: order.id,
//       rider,
//       timestamp: new Date().toISOString()
//     };

//     // Save to localStorage
//     const currentAccepted = JSON.parse(localStorage.getItem('acceptedRideOrders') || '[]');
//     currentAccepted.push(acceptedOrder);
//     localStorage.setItem('acceptedRideOrders', JSON.stringify(currentAccepted));

//     // Update state
//     setAcceptedOrders([...acceptedOrders, acceptedOrder]);
//     setOrders(orders.filter(o => o.id !== order.id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Available Ride Orders</h1>
//           <p className="mt-2 text-sm text-gray-600">Select and manage your ride requests</p>
//         </div>

//         <div className="grid gap-6 mb-12">
//           {orders.map(order => (
//             <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
//               <div className="p-6">
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-3">
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-900">
//                         <span className="inline-flex items-center">
//                           <span className="mr-2">{order.pickup}</span>
//                           <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                           </svg>
//                           <span className="ml-2">{order.dropoff}</span>
//                         </span>
//                       </h2>
//                       <div className="mt-1 flex items-center text-sm text-gray-500">
//                         <svg className="flex-shrink-0 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {new Date(order.timestamp).toLocaleString()}
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                         ₦{order.amount}
//                       </span>
//                       {order.phoneNumber && (
//                         <span className="inline-flex items-center text-sm text-gray-500">
//                           <svg className="flex-shrink-0 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           {order.phoneNumber}
//                         </span>
//                       )}
//                     </div>
//                     {order.note && (
//                       <p className="text-sm text-gray-600 mt-2">
//                         <span className="font-medium">Note:</span> {order.note}
//                       </p>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => handleAcceptOrder(order)}
//                     className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
//                   >
//                     Accept Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {orders.length === 0 && (
//             <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//               <p className="mt-2 text-sm text-gray-500">No pending orders available</p>
//             </div>
//           )}
//         </div>

//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Accepted Orders</h2>
//           <div className="grid gap-6">
//             {acceptedOrders.map(accepted => {
//               const order = JSON.parse(localStorage.getItem('rideOrders') || '[]')
//                 .find(o => o.id === accepted.orderId);
//               const isCompleted = JSON.parse(localStorage.getItem('completedRideOrders') || '[]')
//                 .includes(accepted.orderId);
//               const isPaid = JSON.parse(localStorage.getItem('paidRideOrders') || '[]')
//                 .includes(accepted.orderId);

//               if (!order) return null;

//               return (
//                 <div key={accepted.orderId} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div className="p-6">
//                     <div className="border-b pb-4 mb-4">
//                       <div className="flex justify-between items-center mb-4">
//                         <h3 className="text-lg font-semibold text-gray-900">Order #{accepted.orderId.substr(0, 8)}</h3>
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
//                           ${isCompleted ? 'bg-green-100 text-green-800' : 
//                             isPaid ? 'bg-blue-100 text-blue-800' : 
//                             'bg-yellow-100 text-yellow-800'}`}>
//                           {isCompleted ? 'Completed' : isPaid ? 'In Progress' : 'Awaiting Payment'}
//                         </span>
//                       </div>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-sm text-gray-500">Route</p>
//                           <p className="mt-1 font-medium">{order.pickup} → {order.dropoff}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Amount</p>
//                           <p className="mt-1 font-medium">₦{order.amount}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div className="space-y-3">
//                         <div>
//                           <p className="text-sm text-gray-500">Rider Details</p>
//                           <p className="mt-1 font-medium">{accepted.rider.name}</p>
//                           <p className="text-sm text-gray-600">{accepted.rider.phone}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Vehicle</p>
//                           <p className="mt-1 font-medium">{accepted.rider.vehicle}</p>
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Accepted at</p>
//                         <p className="mt-1 text-sm font-medium">
//                           {new Date(accepted.timestamp).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             {acceptedOrders.length === 0 && (
//               <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//                 <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                 </svg>
//                 <p className="mt-2 text-sm text-gray-500">No accepted orders</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RiderOrdersPage;












































import React, { useState, useEffect } from 'react';

const RiderOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [currentRider, setCurrentRider] = useState(null);
  const [bidAmounts, setBidAmounts] = useState({});
  const [activeTab, setActiveTab] = useState('available');

  useEffect(() => {
    // Demo rider data
    const rider = {
      name: 'John Doe',
      phone: '+234 801 234 5678',
      vehicleType: 'Bike',
      vehicleNumber: 'LAG-456-KJ',
      color: '#DC2626',
      photo: null,
      rating: '4.8'
    };
    setCurrentRider(rider);
    localStorage.setItem('currentRider', JSON.stringify(rider));

    // Demo orders
    const demoOrders = [
      {
        id: 'order-001',
        pickup: 'Ikeja City Mall',
        dropoff: 'Victoria Island',
        amount: 3500,
        timestamp: new Date().toISOString(),
        phoneNumber: '+234 801 111 2222',
        note: 'Please call when you arrive',
        seats: 1,
        rideType: 'Bike',
        distance: '12 km'
      },
      {
        id: 'order-002',
        pickup: 'Lekki Phase 1',
        dropoff: 'Ajah',
        amount: 2500,
        timestamp: new Date(Date.now() - 300000).toISOString(),
        phoneNumber: '+234 802 333 4444',
        seats: 2,
        rideType: 'Car',
        distance: '8 km'
      },
      {
        id: 'order-003',
        pickup: 'Maryland Mall',
        dropoff: 'Ikoyi',
        amount: 4000,
        timestamp: new Date(Date.now() - 600000).toISOString(),
        phoneNumber: '+234 803 555 6666',
        note: 'Express ride needed',
        seats: 1,
        rideType: 'Bike',
        distance: '15 km'
      },
      {
        id: 'order-004',
        pickup: 'Surulere',
        dropoff: 'Yaba',
        amount: 1800,
        timestamp: new Date(Date.now() - 900000).toISOString(),
        phoneNumber: '+234 804 777 8888',
        seats: 1,
        rideType: 'Bike',
        distance: '6 km'
      }
    ];
    setOrders(demoOrders);
    localStorage.setItem('rideOrders', JSON.stringify(demoOrders));

    // Initialize bid amounts
    const initialBids = {};
    demoOrders.forEach(order => {
      initialBids[order.id] = order.amount;
    });
    setBidAmounts(initialBids);
  }, []);

  const handleBidChange = (orderId, change) => {
    setBidAmounts(prev => ({
      ...prev,
      [orderId]: Math.max(0, (prev[orderId] || 0) + change)
    }));
  };

  const handleAcceptOrder = (order) => {
    if (!currentRider) return;

    const finalAmount = bidAmounts[order.id] || order.amount;

    const rider = {
      name: currentRider.name,
      phone: currentRider.phone,
      vehicle: `${currentRider.vehicleType} - ${currentRider.vehicleNumber}`,
      vehicleType: currentRider.vehicleType,
      plateNumber: currentRider.vehicleNumber,
      color: currentRider.color,
      photo: currentRider.photo,
      rating: currentRider.rating
    };

    const acceptedOrder = {
      orderId: order.id,
      rider,
      timestamp: new Date().toISOString(),
      bidAmount: finalAmount
    };

    const currentAccepted = JSON.parse(localStorage.getItem('acceptedRideOrders') || '[]');
    currentAccepted.push(acceptedOrder);
    localStorage.setItem('acceptedRideOrders', JSON.stringify(currentAccepted));

    setAcceptedOrders([...acceptedOrders, acceptedOrder]);
    setOrders(orders.filter(o => o.id !== order.id));
    
    alert(`Order accepted! ${finalAmount > order.amount ? `Your bid of ₦${finalAmount.toLocaleString()} has been sent to the customer.` : ''}`);
  };

  const getTimeDifference = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInMinutes = Math.floor((now - then) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const hours = Math.floor(diffInMinutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-orange-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Ride Orders</h1>
              <p className="mt-1 text-red-100 text-sm">Accept orders and start earning</p>
            </div>
            {currentRider && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
                    {currentRider.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{currentRider.name}</div>
                    <div className="text-red-100 text-xs flex items-center gap-1">
                      <span>⭐</span>
                      <span>{currentRider.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{currentRider.vehicleType}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-2">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                activeTab === 'available'
                  ? 'bg-white text-red-600 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Available Orders
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-red-500 text-white">
                {orders.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('accepted')}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                activeTab === 'accepted'
                  ? 'bg-white text-red-600 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              My Orders
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-green-500 text-white">
                {acceptedOrders.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Available Orders Tab */}
        {activeTab === 'available' && (
          <div>
            {orders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {orders.map(order => {
                  const currentBid = bidAmounts[order.id] || order.amount;
                  const hasBidChange = currentBid !== order.amount;

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">
                            #{order.id.slice(-6)}
                          </span>
                          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                            {getTimeDifference(order.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            {order.rideType === 'Bike' ? '🏍️' : '🚗'}
                          </div>
                          <div>
                            <div className="text-white font-bold text-lg">{order.distance}</div>
                            <div className="text-white/80 text-xs">{order.rideType}</div>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 space-y-4">
                        {/* Route */}
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-gray-500 mb-0.5">Pickup</div>
                              <div className="font-semibold text-gray-900 text-sm truncate">
                                {order.pickup}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pl-1">
                            <div className="w-0.5 h-6 bg-gray-200" />
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-gray-500 mb-0.5">Dropoff</div>
                              <div className="font-semibold text-gray-900 text-sm truncate">
                                {order.dropoff}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                          <div className="text-center bg-gray-50 rounded-xl py-2">
                            <div className="text-xs text-gray-500">Passengers</div>
                            <div className="font-bold text-gray-900 mt-0.5">
                              {order.seats} {order.seats > 1 ? 'seats' : 'seat'}
                            </div>
                          </div>
                          <div className="text-center bg-gray-50 rounded-xl py-2">
                            <div className="text-xs text-gray-500">Contact</div>
                            <div className="font-bold text-gray-900 mt-0.5 text-xs">
                              📞
                            </div>
                          </div>
                        </div>

                        {/* Note */}
                        {order.note && (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                            <div className="text-xs text-amber-700 font-medium flex items-center gap-1">
                              <span>💬</span>
                              <span>{order.note}</span>
                            </div>
                          </div>
                        )}

                        {/* Bid Controls */}
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-4">
                          <div className="text-xs text-gray-600 text-center mb-2 font-medium">
                            {hasBidChange ? 'Your Bid' : 'Customer Offer'}
                          </div>
                          <div className="flex items-center justify-center gap-3 mb-3">
                            <button
                              onClick={() => handleBidChange(order.id, -100)}
                              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all active:scale-95"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <div className="text-center">
                              <div className="text-3xl font-bold text-emerald-700">
                                ₦{currentBid.toLocaleString()}
                              </div>
                              {hasBidChange && (
                                <div className="text-xs text-green-600 font-semibold mt-1 flex items-center justify-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                  </svg>
                                  +₦{(currentBid - order.amount).toLocaleString()}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleBidChange(order.id, 100)}
                              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-all active:scale-95"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleBidChange(order.id, -500)}
                              className="flex-1 py-1.5 text-xs font-medium text-gray-600 bg-white rounded-lg hover:bg-gray-50 transition-all"
                            >
                              -₦500
                            </button>
                            <button
                              onClick={() => handleBidChange(order.id, 500)}
                              className="flex-1 py-1.5 text-xs font-medium text-emerald-600 bg-white rounded-lg hover:bg-emerald-50 transition-all"
                            >
                              +₦500
                            </button>
                          </div>
                        </div>

                        {/* Accept Button */}
                        <button
                          onClick={() => handleAcceptOrder(order)}
                          className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
                        >
                          Accept Order
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Available</h3>
                <p className="text-gray-500">New ride requests will appear here</p>
              </div>
            )}
          </div>
        )}

        {/* Accepted Orders Tab */}
        {activeTab === 'accepted' && (
          <div>
            {acceptedOrders.length > 0 ? (
              <div className="space-y-6">
                {acceptedOrders.map(accepted => {
                  const order = orders.find(o => o.id === accepted.orderId) ||
                    JSON.parse(localStorage.getItem('rideOrders') || '[]').find(o => o.id === accepted.orderId);
                  const isCompleted = JSON.parse(localStorage.getItem('completedRideOrders') || '[]')
                    .includes(accepted.orderId);
                  const isPaid = JSON.parse(localStorage.getItem('paidRideOrders') || '[]')
                    .includes(accepted.orderId);

                  if (!order) return null;

                  return (
                    <div
                      key={accepted.orderId}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="text-blue-100 text-sm mb-1">Order ID</div>
                            <div className="text-white font-bold text-xl">
                              #{accepted.orderId.slice(0, 8).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                              isCompleted
                                ? 'bg-green-500 text-white'
                                : isPaid
                                ? 'bg-yellow-400 text-gray-900'
                                : 'bg-white/20 text-white'
                            }`}>
                              {isCompleted ? '✓ Completed' : isPaid ? '🚗 In Progress' : '⏳ Awaiting Payment'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-4">
                            <div className="bg-gray-50 rounded-2xl p-4">
                              <div className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-semibold">
                                Trip Route
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs text-gray-500 mb-1">Pickup</div>
                                    <div className="font-bold text-gray-900">{order.pickup}</div>
                                  </div>
                                </div>
                                <div className="ml-4 border-l-2 border-dashed border-gray-300 h-8" />
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs text-gray-500 mb-1">Destination</div>
                                    <div className="font-bold text-gray-900">{order.dropoff}</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                                <div className="text-xs text-emerald-600 mb-1">Earnings</div>
                                <div className="text-2xl font-bold text-emerald-700">
                                  ₦{(accepted.bidAmount || order.amount).toLocaleString()}
                                </div>
                                {accepted.bidAmount > order.amount && (
                                  <div className="text-xs text-green-600 mt-1">Your bid accepted!</div>
                                )}
                              </div>
                              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                                <div className="text-xs text-blue-600 mb-1">Distance</div>
                                <div className="text-2xl font-bold text-blue-700">{order.distance}</div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-4">
                            <div className="bg-gray-50 rounded-2xl p-4">
                              <div className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-semibold">
                                Customer Info
                              </div>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">Phone</span>
                                  <a
                                    href={`tel:${order.phoneNumber}`}
                                    className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {order.phoneNumber}
                                  </a>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">Seats</span>
                                  <span className="font-semibold text-gray-900">{order.seats}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">Vehicle</span>
                                  <span className="font-semibold text-gray-900">{order.rideType}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4">
                              <div className="text-xs text-purple-600 uppercase tracking-wide mb-2 font-semibold">
                                Accepted At
                              </div>
                              <div className="text-sm font-semibold text-gray-900">
                                {new Date(accepted.timestamp).toLocaleString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>

                            {order.note && (
                              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                                <div className="text-xs text-amber-700 font-semibold mb-2 flex items-center gap-1">
                                  <span>💬</span>
                                  <span>Customer Note</span>
                                </div>
                                <div className="text-sm text-gray-900">{order.note}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-4xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Accepted Orders</h3>
                <p className="text-gray-500">Orders you accept will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderOrdersPage;