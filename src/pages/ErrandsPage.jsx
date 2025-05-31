// // pages/ErrandsPage.js
// import React from 'react';
// import { MdChecklist, MdShoppingCart, MdAccountBalance, MdLocalGasStation } from 'react-icons/md';
// import { FaShoppingBag, FaMoneyBillWave, FaUserTie, FaClipboardList } from 'react-icons/fa';
// import { BiTask } from 'react-icons/bi';

// const ErrandsPage = () => {
//   const errandServices = [
//     {
//       title: 'Shopping Errands',
//       description: 'We shop for groceries, clothes, and other items for you',
//       icon: <MdShoppingCart className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Shopping%20Errands.%20Please%20help%20me%20with-',
//       color: 'bg-blue-500'
//     },
//     {
//       title: 'Bank Errands',
//       description: 'Bank transactions, deposits, withdrawals, and document collection',
//       icon: <MdAccountBalance className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Bank%20Errands.%20Please%20help%20me%20with-',
//       color: 'bg-red-500'
//     },
//     // {
//     //   title: 'Bill Payments',
//     //   description: 'Pay your electricity, water, cable TV, and other utility bills',
//     //   icon: <FaMoneyBillWave className="w-8 h-8" />,
//     //   whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Bill%20Payments.%20Please%20help%20me%20pay-',
//     //   color: 'bg-yellow-500'
//     // },
//     {
//       title: 'Document Collection',
//       description: 'Collect documents, certificates, and important papers for you',
//       icon: <FaClipboardList className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Document%20Collection.%20Please%20help%20me%20collect-',
//       color: 'bg-purple-500'
//     },
//     {
//       title: 'Fuel Purchase',
//       description: 'Buy fuel for your generator, car, or other equipment',
//       icon: <MdLocalGasStation className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Fuel%20Purchase.%20Please%20help%20me%20buy-',
//       color: 'bg-red-500'
//     },
//     {
//       title: 'Personal Errands',
//       description: 'Any other personal tasks or errands you need help with',
//       icon: <FaUserTie className="w-8 h-8" />,
//       whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Personal%20Errands.%20Please%20help%20me%20with-',
//       color: 'bg-indigo-500'
//     }
//   ];

//   const ServiceCard = ({ service }) => (
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
//         <BiTask className="w-4 h-4" />
//         Get Help Now
//       </a>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
//         <div className="px-4 md:px-10 lg:px-20 py-8">
//           <div className="flex items-center gap-3 mb-4">
//             <MdChecklist className="w-8 h-8" />
//             <h1 className="text-2xl md:text-3xl font-bold">Errand Services</h1>
//           </div>
//           <p className="text-red-100 text-sm md:text-base">
//             Let us handle your daily tasks while you focus on what matters most
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-4 md:px-10 lg:px-20 py-8">
        
//         {/* Services Grid */}
//         <div className="mb-12">
//           <div className="flex items-center gap-3 mb-6">
//             <FaShoppingBag className="w-6 h-6 text-red-500" />
//             <h2 className="text-xl md:text-2xl font-bold text-gray-800">Our Errand Services</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {errandServices.map((service, index) => (
//               <ServiceCard key={index} service={service} />
//             ))}
//           </div>
//         </div>


//         {/* Contact Info */}
//         <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 md:p-8 text-center">
//           <h3 className="text-xl font-bold mb-4">Need a Custom Errand?</h3>
//           <p className="text-red-100 mb-4">
//             Don't see what you need? Contact us for any custom errand service!
//           </p>
//           <a
//             href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20a%20custom%20errand%20service"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 bg-white text-red-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <BiTask className="w-4 h-4" />
//             Contact Us
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ErrandsPage;




// pages/ErrandsPage.js
import React from 'react';
import { MdChecklist, MdShoppingCart, MdAccountBalance, MdLocalGasStation } from 'react-icons/md';
import { FaShoppingBag, FaMoneyBillWave, FaUserTie, FaClipboardList } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';

const ErrandsPage = () => {
  const errandServices = [
    {
      title: 'Shopping Errands',
      description: 'We shop for groceries, clothes, and other items for you',
      icon: <MdShoppingCart className="w-8 h-8" />,
      whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Shopping%20Errands.%20Please%20help%20me%20with-',
      color: 'bg-blue-500'
    },
    {
      title: 'Bank Errands',
      description: 'Bank transactions, deposits, withdrawals, and document collection',
      icon: <MdAccountBalance className="w-8 h-8" />,
      whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Bank%20Errands.%20Please%20help%20me%20with-',
      color: 'bg-red-500'
    },
    // {
    //   title: 'Bill Payments',
    //   description: 'Pay your electricity, water, cable TV, and other utility bills',
    //   icon: <FaMoneyBillWave className="w-8 h-8" />,
    //   whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Bill%20Payments.%20Please%20help%20me%20pay-',
    //   color: 'bg-yellow-500'
    // },
    {
      title: 'Document Collection',
      description: 'Collect documents, certificates, and important papers for you',
      icon: <FaClipboardList className="w-8 h-8" />,
      whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Document%20Collection.%20Please%20help%20me%20collect-',
      color: 'bg-purple-500'
    },
    {
      title: 'Fuel Purchase',
      description: 'Buy fuel for your generator, car, or other equipment',
      icon: <MdLocalGasStation className="w-8 h-8" />,
      whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Fuel%20Purchase.%20Please%20help%20me%20buy-',
      color: 'bg-red-500'
    },
    {
      title: 'Personal Errands',
      description: 'Any other personal tasks or errands you need help with',
      icon: <FaUserTie className="w-8 h-8" />,
      whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20Personal%20Errands.%20Please%20help%20me%20with-',
      color: 'bg-indigo-500'
    }
  ];

  const ServiceCard = ({ service, index }) => (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp group"
      style={{
        animationDelay: `${index * 0.15}s`,
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${index * 0.15}s forwards`
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
        <BiTask className="w-4 h-4 animate-pulse" />
        Get Help Now
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
            <MdChecklist className="w-8 h-8 animate-bounce" />
            <h1 className="text-2xl md:text-3xl font-bold">Errand Services</h1>
          </div>
          <p className="text-red-100 text-sm md:text-base opacity-90">
            Let us handle your daily tasks while you focus on what matters most
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-500 animate-slideInUp">
        
        {/* Services Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 animate-fadeInLeft">
            <FaShoppingBag className="w-6 h-6 text-red-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Our Errand Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {errandServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div 
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 md:p-8 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
          style={{ 
            animationDelay: '1s',
            opacity: 0,
            animation: `fadeInUp 0.6s ease-out 1s forwards`
          }}
        >
          <h3 className="text-xl font-bold mb-4">Need a Custom Errand?</h3>
          <p className="text-red-100 mb-4">
            Don't see what you need? Contact us for any custom errand service!
          </p>
          <a
            href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20need%20help%20with%20a%20custom%20errand%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-red-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <BiTask className="w-4 h-4 animate-pulse" />
            Contact Us
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

export default ErrandsPage;