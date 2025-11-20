// import React from 'react';
// import { FaTruck, FaBoxOpen, FaShippingFast, FaMapMarkerAlt } from 'react-icons/fa';
// import { MdLocalShipping, MdOutbox, MdMoveToInbox, MdDeliveryDining } from 'react-icons/md';
// import { BiPackage } from 'react-icons/bi';
// import { Link } from 'react-router';

// const LogisticsPage = () => {
//   const sendServices = [
//     {
//       title: 'Send Single Package',
//       description: 'Send one package to any location',
//       icon: <BiPackage className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20get%20Send%20a%20Single%20Package%20From-%20to%20be%20delivered%20to-',
//       color: 'bg-blue-500'
//     },
//     {
//       title: 'Park Receive',
//       description: 'Receive packages from park locations',
//       icon: <FaMapMarkerAlt className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20Receive%20a%20Package%20From-%20Park,%20to%20be%20delivered%20to-',
//       color: 'bg-orange-500'
//     }

//   ];

//   const receiveServices = [
//     {
//       title: 'Receive Package',
//       description: 'Receive packages from any location',
//       icon: <MdMoveToInbox className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20Receive%20a%20Single%20Package%20From-%20to%20be%20delivered%20to-',
//       color: 'bg-purple-500'
//     },
//     {
//       title: 'Send Multiple Packages',
//       description: 'Send multiple packages in one go',
//       icon: <FaBoxOpen className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20get%20Send%20Multiple%20Packages%20From-%20to%20be%20delivered%20to-',
//       color: 'bg-red-500'
//     }
//   ];

//   const ServiceCard = ({ service, type, index }) => (
//     <Link
//       to={service.whatsappLink}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="flex flex-col justify-between items-start bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-3 md:p-6 border border-gray-100 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp group"
//       style={{
//         animationDelay: `${index * 0.2}s`,
//         opacity: 0,
//         animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`
//       }}
//     >
//       <div className={`${service.color} text-white p-2 md:p-4 rounded-lg inline-block mb-2 md:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
//         {service.icon}
//       </div>
//       <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">{service.title}</h3>
//       <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4">{service.description}</p>
//       <a
//         href={service.whatsappLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 md:py-3 px-2 md:px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
//       >
//         <MdDeliveryDining className="w-4 h-4 animate-pulse" />
//         {type === 'send' ? 'Send Now' : 'Receive Now'}
//       </a>
//     </Link>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0 animate-fadeIn">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-red-500 to-red-600 text-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-opacity-20"></div>
//         <div className="relative px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-700 animate-slideInDown">
//           <div className="flex items-center gap-3 mb-4">
//             <MdDeliveryDining className="w-8 h-8 animate-bounce" />
//             <h1 className="text-2xl md:text-3xl font-bold">Logistics Services</h1>
//           </div>
//           <p className="text-red-100 text-sm md:text-base opacity-90">
//             Fast, reliable package delivery and pickup services across Ilorin
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-500 animate-slideInUp">
        
//         {/* Send Packages Section */}
//         <div className="mb-12">
//           <div className="flex items-center gap-3 mb-6 animate-fadeInLeft">
//             <MdOutbox className="w-6 h-6 text-red-500 animate-pulse" />
//             <h2 className="text-xl md:text-2xl font-bold text-gray-800">Send Packages</h2>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
//             {sendServices.map((service, index) => (
//               <ServiceCard key={index} service={service} type="send" index={index} />
//             ))}
//           </div>
//         </div>

//         {/* Receive Packages Section */}
//         <div className="mb-12">
//           <div className="flex items-center gap-3 mb-6 animate-fadeInLeft" style={{ animationDelay: '0.4s' }}>
//             <MdMoveToInbox className="w-6 h-6 text-red-500 animate-pulse" />
//             <h2 className="text-xl md:text-2xl font-bold text-gray-800">Receive Packages</h2>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
//             {receiveServices.map((service, index) => (
//               <ServiceCard key={index} service={service} type="receive" index={index + 2} />
//             ))}
//           </div>
//         </div>

//        {/* Contact Info */}
//         <div 
//           className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 md:p-8 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
//           style={{ 
//             animationDelay: '0.8s',
//             opacity: 0,
//             animation: `fadeInUp 0.6s ease-out 0.8s forwards`
//           }}
//         >
//           <h3 className="text-xl font-bold mb-4">Need Help?</h3>
//           <p className="text-red-100 mb-4">
//             Contact us directly for any special logistics requirements
//           </p>
//           <a
//             href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20logistics%20services"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 bg-white text-red-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//           >
//             <FaShippingFast className="w-4 h-4 animate-pulse" />
//             Contact Support
//           </a>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes slideInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out;
//         }

//         .animate-slideInDown {
//           animation: slideInDown 0.7s ease-out;
//         }

//         .animate-slideInUp {
//           animation: slideInUp 0.6s ease-out 0.2s both;
//         }

//         .animate-fadeInLeft {
//           animation: fadeInLeft 0.6s ease-out 0.3s both;
//         }

//         .animate-fadeInUp {
//           opacity: 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LogisticsPage;










































import React from "react";
import {
  FaTruck,
  FaBoxOpen,
  FaShippingFast,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  MdLocalShipping,
  MdOutbox,
  MdMoveToInbox,
  MdDeliveryDining,
} from "react-icons/md";
import { BiPackage } from "react-icons/bi";

const WHATSAPP_BASE = "https://wa.me/+2349118347755?text=";

const LogisticsPage = () => {
  const sendServices = [
    {
      title: "Send Single Package",
      description: "Send one package to any location in Ilorin",
      icon: <BiPackage className="w-8 h-8" />,
      color: "bg-blue-500",
      template: `Hello Handy Foods & Errands!
I’d like to send a single package.
Pickup Address: —
Delivery Address: —
Package Description: —
Preferred Delivery Time: —
Sender’s Callable Number: —
Receiver’s Callable Number: —
Please assign a rider and confirm availability.`,
    },
    {
      title: "Send Food Package",
      description: "Send cooked food safely to your loved ones or customers",
      icon: <MdDeliveryDining className="w-8 h-8" />,
      color: "bg-green-500",
      template: `Hello Handy Foods & Errands!
I’d like to send a food package for delivery.

Pickup Address: —
Receiver’s Name: —
Receiver’s Address: —
Receiver’s Phone Number: —
Food Description : —
Preferred Pickup/Delivery Time: —
Sender’s Phone Number: —
Additional Notes (If any): —

Kindly assign a rider for pickup.
Thank you!`,
    },
    {
      title: "Park Pick-Up",
      description: "Send a rider to pick up your package from the park",
      icon: <FaMapMarkerAlt className="w-8 h-8" />,
      color: "bg-orange-500",
      template: `Hello Handy Foods & Errands!
I’d like to request a park pick-up.
Park/Terminal Pickup Location: —
Delivery Address: —
Package Description: —
Preferred Delivery Time: —
Driver’s Callable Number: —
Waybill / Pack Number on the Package: —
Receiver’s Callable Number: —
Please assign a rider and confirm availability.`,
    },
    {
      title: "Send to Park (Interstate)",
      description: "Send a package to the park for interstate delivery",
      icon: <FaTruck className="w-8 h-8" />,
      color: "bg-red-500",
      template: `Hello Handy Foods & Errands!
I want to send a package to the park for interstate delivery.
Pickup Address: —
Sending Park/Terminal: —
Destination State & Park: —
Package Description: —
Preferred Delivery Time: —
Sender’s Number: —
Receiver’s Number (Destination State): —
Waybill/Pack Number (If any): —
Please assign a rider.`,
    },
  ];

  const receiveServices = [
    {
      title: "Receive Single Package",
      description: "Let us receive a package on your behalf",
      icon: <MdMoveToInbox className="w-8 h-8" />,
      color: "bg-purple-500",
      template: `Hello Handy Foods & Errands!
I’d like to receive a single package.
Pickup Address (Where the package should be collected): —
Delivery Address (Where it should be delivered to me): —
Package Description: —
Preferred Delivery Time: —
Sender’s Callable Number: —
Receiver’s Callable Number: —
Please assign a rider and confirm availability.`,
    },
    {
      title: "Receive Food Package",
      description: "We’ll collect a food package and deliver it to you",
      icon: <FaBoxOpen className="w-8 h-8" />,
      color: "bg-pink-500",
      template: `Hello Handy Foods & Errands!
I’d like to receive a food package.

Pickup Address (Where the food should be collected): —
Your Name: —
Delivery Address (Where it should be delivered to me): —
Your Phone Number: —
Food Description: —
Preferred Delivery Time: —
Sender’s Phone Number: —
Additional Notes (If any): —

Please assign a rider and confirm availability.`,
    },
  ];

  const ServiceCard = ({ service, type, index }) => {
    const href =
      WHATSAPP_BASE + encodeURIComponent(service.template || service.description);

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col justify-between items-start bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-3 md:p-6 border border-gray-100 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp group"
        style={{
          animationDelay: `${index * 0.2}s`,
          opacity: 0,
          animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`,
        }}
      >
        <div
          className={`${service.color} text-white p-2 md:p-4 rounded-lg inline-block mb-2 md:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
        >
          {service.icon}
        </div>
        <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4">
          {service.description}
        </p>
        <div
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 md:py-3 px-2 md:px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
        >
          <MdDeliveryDining className="w-4 h-4 animate-pulse" />
          {type === "send" ? "Send Now" : "Receive Now"}
        </div>
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20"></div>
        <div className="relative px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-700 animate-slideInDown">
          <div className="flex items-center gap-3 mb-4">
            <MdDeliveryDining className="w-8 h-8 animate-bounce" />
            <h1 className="text-2xl md:text-3xl font-bold">Logistics Services</h1>
          </div>
          <p className="text-red-100 text-sm md:text-base opacity-90">
            Fast, reliable package and food delivery services across Ilorin
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-500 animate-slideInUp">
        {/* Send Packages Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 animate-fadeInLeft">
            <MdOutbox className="w-6 h-6 text-red-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Send Packages & Food
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {sendServices.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                type="send"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Receive Packages Section */}
        <div className="mb-12">
          <div
            className="flex items-center gap-3 mb-6 animate-fadeInLeft"
            style={{ animationDelay: "0.4s" }}
          >
            <MdMoveToInbox className="w-6 h-6 text-red-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Receive Packages & Food
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {receiveServices.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                type="receive"
                index={index + sendServices.length}
              />
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 md:p-8 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
          style={{
            animationDelay: "0.8s",
            opacity: 0,
            animation: `fadeInUp 0.6s ease-out 0.8s forwards`,
          }}
        >
          <h3 className="text-xl font-bold mb-4">Need Help?</h3>
          <p className="text-red-100 mb-4">
            Contact us directly for any special logistics or food delivery
            requirements.
          </p>
          <a
            href={
              WHATSAPP_BASE +
              encodeURIComponent(
                `Hello Handy Foods & Errands!
I need help with logistics/food delivery services.
Please chat me up so I can explain my request in detail.`
              )
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-red-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <FaShippingFast className="w-4 h-4 animate-pulse" />
            Contact Support
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideInDown {
          animation: slideInDown 0.7s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out 0.2s both;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out 0.3s both;
        }

        .animate-fadeInUp {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default LogisticsPage;
