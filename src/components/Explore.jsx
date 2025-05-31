// import React from 'react';
// import { AiFillStar } from 'react-icons/ai';
// import { BsClock } from 'react-icons/bs';
// import { MdRestaurant } from 'react-icons/md';

// const restaurants = [
//   {
//     name: 'Item 7',
//     image: 'https://item7.vercel.app/assets/Item7-gupESEli.png',
//     rating: 4.44,
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20item%207,%20to%20be%20delivered%20to%20-'
//   },
//   {
//     name: 'BOA',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVpEur9-q3QP2sd-owD1R3NIbqxMfSAQMLw&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20BOA,%20to%20be%20delivered%20to%20-'
//   },
//   {
//     name: 'SUNAJ',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD4c38CIJsnLH7ZAKobdJUx3-PncMtSdZ-1Q&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20SUNAJ,%20to%20be%20delivered%20to%20-'
//   },
//   {
//     name: 'Unigate Foods',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVpEur9-q3QP2sd-owD1R3NIbqxMfSAQMLw&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Unigate%20Foods,%20to%20be%20delivered%20to%20-'
//   },
//   {
//     name: 'Fruitos Dome',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Lo8ebAv75IQQiPhqUwhPmoC3rRE9NhLzmipTAUlTIniq9rJNEXLxYlXulkep5FSUmdqj&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Fruitos%20Dome,%20to%20be%20delivered%20to%20-'
//   },
//   {
//     name: 'Shawarma Central',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIXfdsgKW-ytZ8qf7cfnNBSruO-E-Gi3b4RlRoC2s9Sx_baoDQHm-7vLNqlA4pjVO-danu_A&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Sharwarma%20Central,%20to%20be%20delivered%20to-'
//   },
//   {
//     name: 'The Place',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKIqQRuuc98bqOELolmgcz83vVrgyaD7xGqA&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20The%20Place,%20to%20be%20delivered%20to-'
//   },
//   {
//     name: 'Iya Yusuf',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMUal01AaJESvCpTL-klt6GxAmIJF8X6au3WtYNPomWcropUMj4HkW7hrhs9vuGjuMuTodsQ&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Iya%20Yusuf%20to%20be%20delivered%20to-'
//   },
//   {
//     name: 'Dope Spag',
//     image: 'https://i.pinimg.com/736x/23/7b/80/237b80be2412c1a95b0a5c20a025c432.jpg',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Dope%20Spag%20to%20be%20delivered%20to-'
//   },
//   {
//     name: 'Xtra Plate',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjQ9PNISxcFkqxDjCAGcDDuF7dItNV0iEBNg&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Xtra%20Plate%20to%20be%20delivered%20to-'
//   },
//   {
//     name: 'T&K',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVpEur9-q3QP2sd-owD1R3NIbqxMfSAQMLw&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20T&K%20to%20be%20delivered%20to-'
//   },
//   {
//     name: 'KFC',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKIqQRuuc98bqOELolmgcz83vVrgyaD7xGqA&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20KFC%20to%20be%20delivered%20to-'
//   },
//   {
//     name: "Domino's Pizza",
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXQk31gDfgpn2GLYYeuCNYd3PHCfrHVje2ei_qxNV3tOnx2VNYoHoHlHU&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Domino%E2%80%99s%20Pizza%20to%20be%20delivered%20to-'
//   },
//   {
//     name: 'Coldstone Creamery',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeiPoZ4SS7CYjjNaKlvdsl-bjiSJ2sxewjgxFYtoQJD-K1oHijJCPijHtAYPcMenYYuxnSQ&s',
//     whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Coldstone%20Creamery%20to%20be%20delivered%20to-'
//   }
// ];

// const Explore = () => {
//   return (
//     <section className="">
//       <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
//         <div className="px-4 md:px-10 lg:px-20 py-8">
//           <div className="flex items-center gap-3 mb-4">
//             <MdRestaurant className="w-8 h-8" />
//             <h1 className="text-2xl md:text-3xl font-bold">Food Delivery</h1>
//           </div>
//           <p className="text-red-100 text-sm md:text-base">
//             Delicious meals from Ilorin's best restaurants, delivered fresh to your doorstep
//           </p>
//         </div>
//       </div>
//       <div className="wrapper px-4 md:px-10 lg:px-20 py-10">
//         <h2 className="text-xl md:text-2xl font-bold mb-6">Ilorin Restaurants</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {restaurants.map((restaurant, index) => (
//             <a
//               key={index}
//               href={restaurant.whatsappLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition w-full sm:w-full"
//             >
//               <div className="relative h-32 md:h-40 w-full">
//                 <img
//                   src={restaurant.image}
//                   alt={restaurant.name}
//                   className="w-full h-full object-cover"
//                 />
//                 {restaurant.preorder && (
//                   <span className="absolute bottom-2 right-2 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
//                     Pre-order
//                   </span>
//                 )}
//               </div>
//               <div className="p-3">
//                 <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
//                   {restaurant.name}
//                 </h3>
//                 <div className="flex flex-wrap gap-1 mt-2 text-[11px]">
//                   {/* You can show tags here if needed */}
//                 </div>
//                 <div className="flex items-center justify-end mt-2 text-yellow-500 text-sm">
//                   {restaurant.rating && (
//                     <>
//                       <span>{restaurant.rating.toFixed(2)}</span>
//                       <AiFillStar className="ml-1" />
//                     </>
//                   )}
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Explore;






import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { FaShippingFast } from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';

const restaurants = [
  {
    name: 'Item 7',
    deliveryAmount:"500",
    image: 'https://item7.vercel.app/assets/Item7-gupESEli.png',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20item%207,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'BOA',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVpEur9-q3QP2sd-owD1R3NIbqxMfSAQMLw&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20BOA,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'SUNAJ',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD4c38CIJsnLH7ZAKobdJUx3-PncMtSdZ-1Q&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20SUNAJ,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'Unigate Foods',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVpEur9-q3QP2sd-owD1R3NIbqxMfSAQMLw&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Unigate%20Foods,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'Fruitos Dome',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Lo8ebAv75IQQiPhqUwhPmoC3rRE9NhLzmipTAUlTIniq9rJNEXLxYlXulkep5FSUmdqj&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Fruitos%20Dome,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'Shawarma Central',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIXfdsgKW-ytZ8qf7cfnNBSruO-E-Gi3b4RlRoC2s9Sx_baoDQHm-7vLNqlA4pjVO-danu_A&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Sharwarma%20Central,%20to%20be%20delivered%20to-'
  },
  {
    name: 'The Place',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKIqQRuuc98bqOELolmgcz83vVrgyaD7xGqA&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20The%20Place,%20to%20be%20delivered%20to-'
  },
  {
    name: 'Iya Yusuf',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMUal01AaJESvCpTL-klt6GxAmIJF8X6au3WtYNPomWcropUMj4HkW7hrhs9vuGjuMuTodsQ&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Iya%20Yusuf%20to%20be%20delivered%20to-'
  },
  {
    name: 'Dope Spag',
    deliveryAmount:"500",
    image: 'https://i.pinimg.com/736x/23/7b/80/237b80be2412c1a95b0a5c20a025c432.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Dope%20Spag%20to%20be%20delivered%20to-'
  },
  {
    name: 'Xtra Plate',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjQ9PNISxcFkqxDjCAGcDDuF7dItNV0iEBNg&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Xtra%20Plate%20to%20be%20delivered%20to-'
  },
  {
    name: 'T&K',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVpEur9-q3QP2sd-owD1R3NIbqxMfSAQMLw&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20T&K%20to%20be%20delivered%20to-'
  },
  {
    name: 'KFC',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKIqQRuuc98bqOELolmgcz83vVrgyaD7xGqA&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20KFC%20to%20be%20delivered%20to-'
  },
  {
    name: "Domino's Pizza",
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXQk31gDfgpn2GLYYeuCNYd3PHCfrHVje2ei_qxNV3tOnx2VNYoHoHlHU&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Domino%E2%80%99s%20Pizza%20to%20be%20delivered%20to-'
  },
  {
    name: 'Coldstone Creamery',
    deliveryAmount:"500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeiPoZ4SS7CYjjNaKlvdsl-bjiSJ2sxewjgxFYtoQJD-K1oHijJCPijHtAYPcMenYYuxnSQ&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Coldstone%20Creamery%20to%20be%20delivered%20to-'
  }
];

const Explore = () => {
  return (
    <section className="animate-fadeIn">
      {/* Animated Header */}
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0  bg-opacity-20"></div>
        <div className="relative px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-700 animate-slideInDown">
          <div className="flex items-center gap-3 mb-4">
            <MdRestaurant className="w-8 h-8 animate-bounce" />
            <h1 className="text-2xl md:text-3xl font-bold">Food Delivery</h1>
          </div>
          <p className="text-red-100 text-sm md:text-base opacity-90">
            Delicious meals from Ilorin's best restaurants, delivered fresh to your doorstep
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="wrapper px-4 md:px-10 lg:px-20 py-10 transform transition-all duration-500 animate-slideInUp">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 animate-fadeInLeft">
          Ilorin Restaurants
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {restaurants.map((restaurant, index) => (
            <a
              key={index}
              href={restaurant.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 w-full animate-fadeInUp group"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
              }}
            >
              <div className="relative h-32 md:h-40 w-full overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {restaurant.preorder && (
                  <span className="absolute bottom-2 right-2 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full animate-pulse">
                    Pre-order
                  </span>
                )}
              </div>
              
              <div className="p-3 relative">
                <h3 className="text-md md:text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                  {restaurant.name}
                </h3>
                
                <div className="text-red-500 flex items-center justify-start mt-2 text-sm">
                  {restaurant.deliveryAmount && (
                    <div className="flex items-center gap-1 transform group-hover:scale-110 transition-transform duration-300">
                      <span>Delivery From</span>
                      <span className="font-bold">₦{restaurant.deliveryAmount}</span>
                      {/* <AiFillStar className="animate-pulse" /> */}
                    </div>
                  )}
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-lg"></div>
              </div>
            </a>
          ))}
        </div>
        {/* Contact Info */}
        <div 
          className="mt-7 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 md:p-8 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
          style={{ 
            animationDelay: '0.8s',
            opacity: 0,
            animation: `fadeInUp 0.6s ease-out 0.8s forwards`
          }}
        >
          <MdRestaurant className="w-12 h-12 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl md:text-2xl font-bold mb-2">Don't See Your Favorite Restaurant?</h3>
          <p className="text-red-100 mb-2 text-sm md:text-base leading-relaxed">
            No worries, We got you!
          </p>
          {/* 
          <div className="space-y-3 mb-6">
            <p className="text-red-100 text-sm flex items-center justify-center gap-2">
              <BsClock className="w-4 h-4" />
              Same delivery fee applies (₦500)
            </p>
            <p className="text-red-100 text-sm flex items-center justify-center gap-2">
              <FaShippingFast className="w-4 h-4 animate-pulse" />
              Fast delivery across Ilorin
            </p>
          </div> */}
          <a
            href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20want%20to%20order%20from%20a%20restaurant%20not%20listed.%20Restaurant%20name:%20[Please%20specify]%20-%20Food%20items:%20[Please%20specify]%20-%20Delivery%20address:%20[Please%20specify]"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-red-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:shadow-xl group"
          >
            <MdRestaurant className="w-5 h-5 group-hover:animate-spin" />
            Order from Any Restaurant
            <FaShippingFast className="w-5 h-5 group-hover:animate-pulse" />
          </a>
          
          <p className="text-red-100 text-xs mt-4 opacity-80">
            Just tell us the restaurant name and what you want to order!
          </p>
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
    </section>
  );
};

export default Explore;