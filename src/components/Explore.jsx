import React, { useMemo } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { FaShippingFast } from 'react-icons/fa';
import { MdDeliveryDining, MdLocationOn, MdRestaurant } from 'react-icons/md';
import { useSearch } from '../SearchContext' // Import the search context
const restaurants = [
  {
    name: 'Item 7',
    location: 'Oke Odo',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦800",
    image: 'https://item7.vercel.app/assets/Item7-gupESEli.png',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20item%207,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'BOA',
    location: 'Oke Odo',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦600 to ₦900",
    image: 'https://cdn.pixabay.com/photo/2021/12/29/23/59/pineapple-fried-rice-6902993_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20BOA,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'SUNAJ',
    location: 'Oke Odo',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦800",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD4c38CIJsnLH7ZAKobdJUx3-PncMtSdZ-1Q&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20SUNAJ,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'Unigate Foods',
    location: 'Unilorin School Gate',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦900",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVpEur9-q3QP2sd-owD1R3NIbqxMfSAQMLw&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Unigate%20Foods,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'BQ Cuisine',
    location: 'Playsport Oke Odo',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦600 to ₦1,000",
    image: 'https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20BQ%20Cuisine%20to%20be%20delivered%20to-'
  },
  {
    name: 'Shawarma Central',
    location: 'Oke Odo',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦900",
    image: 'https://cdn.pixabay.com/photo/2021/03/02/17/24/shawarma-6063224_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Sharwarma%20Central,%20to%20be%20delivered%20to-'
  },
  {
    name: 'Amala Place',
    location: 'Fate',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦700 to ₦1,200",
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSgen0Ti78HYpnPP-mrOtSWc8QrG0WhIlqgPODLVQsoNuGGxoXiczMatpl3zhbV1Hq_Yi_Bgy6XncXfJPJfL7Mo8ijmC5NXMBagWwIRKGOX',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Amala%20Place%20to%20be%20delivered%20to-'
  },
  {
    name: 'Iya Yusuf',
    location: 'Tipper Garage',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦700 to ₦900",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMUal01AaJESvCpTL-klt6GxAmIJF8X6au3WtYNPomWcropUMj4HkW7hrhs9vuGjuMuTodsQ&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Iya%20Yusuf%20to%20be%20delivered%20to-'
  },
  {
    name: 'Fruitos Dome',
    location: 'Oke Odo',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦900",
    image: 'https://cdn.pixabay.com/photo/2017/03/30/19/10/fruit-juice-2189463_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Fruitos%20Dome,%20to%20be%20delivered%20to%20-'
  },
  {
    name: 'Chronicles',
    location: 'Fate',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦700 to ₦1,200",
    image: 'https://cdn.pixabay.com/photo/2022/05/17/05/15/chiken-bucket-7201681_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Chronicles%20to%20be%20delivered%20to-'
  },
  {
    name: 'Chops Central',
    location: 'Fate',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦700 to ₦1,200",
    image: 'https://cdn.pixabay.com/photo/2024/02/10/00/53/biryani-8563961_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Chops%20Central%20to%20be%20delivered%20to-'
  },
  {
    name: 'Edibles',
    location: 'Fate',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦700 to ₦1,200",
    image: 'https://cdn.pixabay.com/photo/2025/06/05/04/39/burger-9642130_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Edibles%20to%20be%20delivered%20to-'
  },
  {
    name: 'F & J',
    location: 'Ajanaku',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦600 to ₦900",
    image: 'https://cdn.pixabay.com/photo/2018/08/29/19/01/fig-3640553_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20F%20&%20J%20to%20be%20delivered%20to-'
  },
  {
    name: 'Dope Spag',
    location: 'Stella Maris',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦800",
    image: 'https://cdn.pixabay.com/photo/2024/11/08/09/42/spaghetti-9182962_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Dope%20Spag%20to%20be%20delivered%20to-'
  },
  {
    name: 'Foodster',
    location: 'Fate ShopRite',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦800 to ₦1,300",
    image: 'https://cdn.pixabay.com/photo/2016/12/27/09/26/pork-1933565_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Foodster%20to%20be%20delivered%20to-'
  },
  {
    name: 'Nutri C',
    location: 'Unilorin Campus',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦1,000",
    image: 'https://cdn.pixabay.com/photo/2024/11/08/09/42/spaghetti-9182962_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Nutri%20C%20to%20be%20delivered%20to-'
  },
  {
    name: 'Spag City',
    location: 'Unilorin Campus',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦1,000",
    image: 'https://cdn.pixabay.com/photo/2024/04/13/21/58/spaghetti-and-meatballs-8694542_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Spag%20City%20to%20be%20delivered%20to-'
  },
  {
    name: 'Bookies Kitchen',
    location: 'Unilorin Campus',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦1,000",
    image: 'https://cdn.pixabay.com/photo/2017/09/28/18/13/bread-2796393_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Bookies%20Kitchen%20to%20be%20delivered%20to-'
  },
  {
    name: 'Wooshies',
    location: 'Unilorin Campus',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦500 to ₦1,000",
    image: 'https://cdn.pixabay.com/photo/2023/10/18/07/44/fruit-salad-8323154_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Wooshies%20to%20be%20delivered%20to-'
  },
  {
    name: 'KFC',
    location: 'Fate ShopRite',
    operatingHours: '9am to 10pm',
    deliveryAmount: "₦800 to ₦1,300",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKIqQRuuc98bqOELolmgcz83vVrgyaD7xGqA&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20KFC%20to%20be%20delivered%20to-'
  },
  {
    name: 'Chicken Republic',
    location: '',
    operatingHours: '',
    deliveryAmount: "₦500",
    image: 'https://cdn.pixabay.com/photo/2018/07/29/23/37/barbecue-3571403_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Chicken%20Republic%20to%20be%20delivered%20to-'
  },
  {
    name: 'Kilimanjaro',
    location: '',
    operatingHours: '',
    deliveryAmount: "₦500",
    image: 'https://cdn.pixabay.com/photo/2017/06/21/22/44/paella-2428945_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Kilimanjaro%20to%20be%20delivered%20to-'
  },
  {
    name: 'Rookiesharms',
    location: '',
    operatingHours: '',
    deliveryAmount: "₦500",
    image: 'https://cdn.pixabay.com/photo/2021/03/20/14/31/shawarma-6109976_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Rookiesharms%20to%20be%20delivered%20to-'
  },
  {
    name: 'Obodo Restaurant',
    location: '',
    operatingHours: '',
    deliveryAmount: "₦500",
    image: 'https://cdn.pixabay.com/photo/2022/02/12/15/02/biryani-7009118_1280.jpg',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Obodo%20Restaurant%20to%20be%20delivered%20to-'
  },
  {
    name: 'Xtra Plate',
    location: 'https://cdn.pixabay.com/photo/2023/01/17/07/59/mossel-dish-7724006_1280.jpg',
    operatingHours: '',
    deliveryAmount: "500",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjQ9PNISxcFkqxDjCAGcDDuF7dItNV0iEBNg&s',
    whatsappLink: 'https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20%20I%20Want%20to%20get%20-%20from%20Xtra%20Plate%20to%20be%20delivered%20to-'
  }
];

const Explore = () => {
    const fallbackImage = 'https://via.placeholder.com/300x200?text=No+Image';
    const { searchQuery } = useSearch() // Use search context
       // Filter restaurants based on search query
    const filteredRestaurants = useMemo(() => {
        if (!searchQuery.trim()) {
            return restaurants
        }
        
        return restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (restaurant.location && restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }, [restaurants, searchQuery])

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
      <div className="wrapper px-4 md:px-10 lg:px-20 pt-3 pb-10 transform transition-all duration-500 animate-slideInUp">
        {/* Search Results Header */}
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 animate-fadeInLeft">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Ilorin Restaurants'}
          </h2>
        {/* Search Results Count */}
        {searchQuery && (
            <p className="text-gray-600 mb-4">
                {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
            </p>
        )}
        {/* No Results Message */}
                {searchQuery && filteredRestaurants.length === 0 && (
                    <div className="text-center py-12">
                        <MdRestaurant className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No restaurants found</h3>
                        <p className="text-gray-500 mb-4">Try searching with different keywords</p>                    </div>
                )}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
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
                  src={restaurant.image || fallbackImage}
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
                <h3 className="text-lg md:text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                  {restaurant.name}
                </h3>
                
                <div className="text-red-500/80 flex items-center justify-start mt-2 text-sm">
                  {restaurant.deliveryAmount && (
                    <div className="flex items-center gap-1 transform group-hover:scale-110 transition-transform duration-300">
                      <span className='flex items-center gap-2'><MdDeliveryDining /> <span>FROM | </span></span>
                      <span className="font-bold">{restaurant.deliveryAmount}</span>
                      {/* <AiFillStar className="animate-pulse" /> */}
                    </div>
                  )}
                </div>
                {/* Location */}
                <div className="text-gray-400 flex items-center justify-start text-sm">
                  {restaurant.location && (
                    <div className="flex items-center gap-1 transform group-hover:scale-110 transition-transform duration-300">
                      <span className='flex items-center gap-2'><MdLocationOn /></span>
                      <span className="">{restaurant.location}</span>
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