import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';

const restaurants = [
    {
      name: 'Item 7 (Go)',
      image: 'https://item7.vercel.app/assets/Item7-gupESEli.png',
    //   tags: ['RESTAURANT'],
    //   time: '15 - 25 mins',
      rating: 4.44,
    },
    {
      name: 'Iya Yusuf ',
      image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqZSglLyi88Vc40vZJ7zBJL5Dw_SkX77qZU53o9dMdFQFOFaKlSqe-Ip077HyV4MasXctHObh1rnCAaL6ivXSPv-EG7Qw_z9yhlV_G1P8lbPSaIQB2_rDwro0qGN3uITPP82MmD=w138-h138-n-k-no',
    //   tags: ['EXPLORE', 'AMALA', 'EWEDU'],
    //   time: '27 - 37 mins',
    //   rating: 4.22,
    },
  {
    name: 'UniGate\'s Foods',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVpEur9-q3QP2sd-owD1R3NIbqxMfSAQMLw&s',
    // tags: ['AFRICAN', 'CHICKEN', 'EVERY CITIZEN MUST COLLECT'],
    // time: '31 - 41 mins',
    // rating: 4.12,
  },
  {
    name: 'The Place Foods',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKIqQRuuc98bqOELolmgcz83vVrgyaD7xGqA&s',
    // tags: ['CHICKEN', 'FASTFOOD', 'KFC'],
    // time: '18 - 28 mins',
    // rating: 4.19,
  },
  {
    name: 'Dope Spag',
    image: 'https://i.pinimg.com/736x/23/7b/80/237b80be2412c1a95b0a5c20a025c432.jpg',
    // tags: ['CHICKEN', 'FASTFOOD', 'KFC'],
    // time: '18 - 28 mins',
    // rating: 4.19,
  },
  {
    name: 'Xtra Plate',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjQ9PNISxcFkqxDjCAGcDDuF7dItNV0iEBNg&s',
    // tags: ['CHICKEN', 'FASTFOOD', 'KFC'],
    // time: '18 - 28 mins',
    // rating: 4.19,
  },
  {
    name: 'Sunaj Restaurant',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD4c38CIJsnLH7ZAKobdJUx3-PncMtSdZ-1Q&s',
    // tags: ['CHICKEN', 'FASTFOOD', 'KFC'],
    // time: '18 - 28 mins',
    // rating: 4.19,
  },
  {
    name: 'Shawarma Central',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIXfdsgKW-ytZ8qf7cfnNBSruO-E-Gi3b4RlRoC2s9Sx_baoDQHm-7vLNqlA4pjVO-danu_A&s',
    // tags: ['CHICKEN', 'FASTFOOD', 'KFC'],
    // time: '18 - 28 mins',
    // rating: 4.19,
  },
  {
    name: 'Cold Stone Creamery',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeiPoZ4SS7CYjjNaKlvdsl-bjiSJ2sxewjgxFYtoQJD-K1oHijJCPijHtAYPcMenYYuxnSQ&s',
    // tags: ['CHICKEN', 'FASTFOOD', 'KFC'],
    // time: '18 - 28 mins',
    // rating: 4.19,
  },
  {
    name: 'Domino\'s Pizza',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeiPoZ4SS7CYjjNaKlvdsl-bjiSJ2sxewjgxFYtoQJD-K1oHijJCPijHtAYPcMenYYuxnSQ&s',
    // tags: ['CHICKEN', 'FASTFOOD', 'KFC'],
    // time: '18 - 28 mins',
    // rating: 4.19,
  }
];
const Explore = () => {
  return (
    <section className="px-4 md:px-10 lg:px-20 py-10">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Ilorin Restaurants</h2>
      {/* <div className="flex flex-wrap gap-4 justify-between"> */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

        {restaurants.map((restaurant, index) => (
          <a
            key={index}
            href="https://wa.me/message/5QWMCDR63QNVL1"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition w-full sm:w-full"
          >
            <div className="relative h-32 md:h-40 w-full">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              {restaurant.preorder && (
                <span className="absolute bottom-2 right-2 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                  Pre-order
                </span>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {restaurant.name}
              </h3>
              <div className="flex flex-wrap gap-1 mt-2 text-[11px]">
                {/* You can show tags here if needed */}
              </div>
              <div className="flex items-center justify-end mt-2 text-yellow-500 text-sm">
                {/* Optional rating */}
                {/* <span>{restaurant.rating?.toFixed(2)}</span>
                <AiFillStar className="ml-1" /> */}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Explore;




        // {restaurants.map((restaurant, index) => (
        //     <div key={index} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition w-full sm:w-full ">
        //         <div className="relative h-32 md:h-40 w-full">
        //             <img
        //             src={restaurant.image}
        //             alt={restaurant.name}
        //             className="w-full h-full object-cover"
        //             />
        //             {restaurant.preorder && (
        //             <span className="absolute bottom-2 right-2 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
        //                 Pre-order
        //             </span>
        //             )}
        //         </div>
        //         <div className="p-3">
        //             <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
        //             {restaurant.name}
        //             </h3>
        //             {/* <div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
        //             <BsClock /> <span>{restaurant.time}</span>
        //             </div> */}
        //             <div className="flex flex-wrap gap-1 mt-2 text-[11px]">
        //             {/* {restaurant.tags.map((tag, i) => (
        //                 <span
        //                 key={i}
        //                 className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
        //                 >
        //                 {tag}
        //                 </span>
        //             ))} */}
        //             </div>
        //             <div className="flex items-center justify-end mt-2 text-yellow-500 text-sm">
        //             {/* <span>{restaurant.rating.toFixed(2)}</span> */}
        //             {/* <AiFillStar className="ml-1" /> */}
        //             </div>
        //         </div>
        //     </div>
        // ))}