// import React from 'react';
// import { FaTruck, FaBoxOpen, FaShippingFast, FaMapMarkerAlt } from 'react-icons/fa';
// import { MdLocalShipping, MdOutbox, MdMoveToInbox } from 'react-icons/md';
// import { BiPackage } from 'react-icons/bi';

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
//       title: 'Send Multiple Packages',
//       description: 'Send multiple packages in one go',
//       icon: <FaBoxOpen className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20get%20Send%20Multiple%20Packages%20From-%20to%20be%20delivered%20to-',
//       color: 'bg-red-500'
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
//       title: 'Park Receive',
//       description: 'Receive packages from park locations',
//       icon: <FaMapMarkerAlt className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20Receive%20a%20Package%20From-%20Park,%20to%20be%20delivered%20to-',
//       color: 'bg-orange-500'
//     }
//   ];

//   const ServiceCard = ({ service, type }) => (
//     <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
//       <div className={`${service.color} text-white p-4 rounded-lg inline-block mb-4`}>
//         {service.icon}
//       </div>
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
//       <p className="text-gray-600 text-sm mb-4">{service.description}</p>
//       <a
//         href={service.whatsappLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
//       >
//         <FaShippingFast className="w-4 h-4" />
//         {type === 'send' ? 'Send Now' : 'Receive Now'}
//       </a>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
//         <div className="px-4 md:px-10 lg:px-20 py-8">
//           <div className="flex items-center gap-3 mb-4">
//             <FaTruck className="w-8 h-8" />
//             <h1 className="text-2xl md:text-3xl font-bold">Logistics Services</h1>
//           </div>
//           <p className="text-red-100 text-sm md:text-base">
//             Fast, reliable package delivery and pickup services across Ilorin
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-4 md:px-10 lg:px-20 py-8">
        
//         {/* Send Packages Section */}
//         <div className="mb-12">
//           <div className="flex items-center gap-3 mb-6">
//             <MdOutbox className="w-6 h-6 text-red-500" />
//             <h2 className="text-xl md:text-2xl font-bold text-gray-800">Send Packages</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {sendServices.map((service, index) => (
//               <ServiceCard key={index} service={service} type="send" />
//             ))}
//           </div>
//         </div>

//         {/* Receive Packages Section */}
//         <div className="mb-12">
//           <div className="flex items-center gap-3 mb-6">
//             <MdMoveToInbox className="w-6 h-6 text-red-500" />
//             <h2 className="text-xl md:text-2xl font-bold text-gray-800">Receive Packages</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {receiveServices.map((service, index) => (
//               <ServiceCard key={index} service={service} type="receive" />
//             ))}
//           </div>
//         </div>

       

//         {/* Contact Info */}
//         <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 md:p-8 text-center">
//           <h3 className="text-xl font-bold mb-4">Need Help?</h3>
//           <p className="text-red-100 mb-4">
//             Contact us directly for any special logistics requirements
//           </p>
//           <a
//             href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20logistics%20services"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 bg-white text-red-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <FaShippingFast className="w-4 h-4" />
//             Contact Support
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogisticsPage;


import React from 'react';
import { FaTruck, FaBoxOpen, FaShippingFast, FaMapMarkerAlt } from 'react-icons/fa';
import { MdLocalShipping, MdOutbox, MdMoveToInbox } from 'react-icons/md';
import { BiPackage } from 'react-icons/bi';

const LogisticsPage = () => {
  const sendServices = [
    {
      title: 'Send Single Package',
      description: 'Send one package to any location',
      icon: <BiPackage className="w-8 h-8" />,
      whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20get%20Send%20a%20Single%20Package%20From-%20to%20be%20delivered%20to-',
      color: 'bg-blue-500'
    },
    {
      title: 'Send Multiple Packages',
      description: 'Send multiple packages in one go',
      icon: <FaBoxOpen className="w-8 h-8" />,
      whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20get%20Send%20Multiple%20Packages%20From-%20to%20be%20delivered%20to-',
      color: 'bg-red-500'
    }
  ];

  const receiveServices = [
    {
      title: 'Receive Package',
      description: 'Receive packages from any location',
      icon: <MdMoveToInbox className="w-8 h-8" />,
      whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20Receive%20a%20Single%20Package%20From-%20to%20be%20delivered%20to-',
      color: 'bg-purple-500'
    },
    {
      title: 'Park Receive',
      description: 'Receive packages from park locations',
      icon: <FaMapMarkerAlt className="w-8 h-8" />,
      whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20Want%20to%20Receive%20a%20Package%20From-%20Park,%20to%20be%20delivered%20to-',
      color: 'bg-orange-500'
    }
  ];

  const ServiceCard = ({ service, type, index }) => (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp group"
      style={{
        animationDelay: `${index * 0.2}s`,
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`
      }}
    >
      <div className={`${service.color} text-white p-4 rounded-lg inline-block mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        {service.icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">{service.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
      <a
        href={service.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
      >
        <FaShippingFast className="w-4 h-4 animate-pulse" />
        {type === 'send' ? 'Send Now' : 'Receive Now'}
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20"></div>
        <div className="relative px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-700 animate-slideInDown">
          <div className="flex items-center gap-3 mb-4">
            <FaTruck className="w-8 h-8 animate-bounce" />
            <h1 className="text-2xl md:text-3xl font-bold">Logistics Services</h1>
          </div>
          <p className="text-red-100 text-sm md:text-base opacity-90">
            Fast, reliable package delivery and pickup services across Ilorin
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-500 animate-slideInUp">
        
        {/* Send Packages Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 animate-fadeInLeft">
            <MdOutbox className="w-6 h-6 text-red-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Send Packages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sendServices.map((service, index) => (
              <ServiceCard key={index} service={service} type="send" index={index} />
            ))}
          </div>
        </div>

        {/* Receive Packages Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 animate-fadeInLeft" style={{ animationDelay: '0.4s' }}>
            <MdMoveToInbox className="w-6 h-6 text-red-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Receive Packages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {receiveServices.map((service, index) => (
              <ServiceCard key={index} service={service} type="receive" index={index + 2} />
            ))}
          </div>
        </div>

       {/* Contact Info */}
        <div 
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 md:p-8 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
          style={{ 
            animationDelay: '0.8s',
            opacity: 0,
            animation: `fadeInUp 0.6s ease-out 0.8s forwards`
          }}
        >
          <h3 className="text-xl font-bold mb-4">Need Help?</h3>
          <p className="text-red-100 mb-4">
            Contact us directly for any special logistics requirements
          </p>
          <a
            href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20logistics%20services"
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
          from { opacity: 0; }
          to { opacity: 1; }
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