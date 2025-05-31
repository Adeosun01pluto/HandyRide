// // pages/FeedbackPage.js
// import React, { useState } from 'react';
// import { MdFeedback, MdStar, MdStarBorder, MdThumbUp, MdThumbDown } from 'react-icons/md';
// import { FaWhatsapp, FaComments, FaStar } from 'react-icons/fa';
// import { BiHappy, BiSad, BiMeh } from 'react-icons/bi';

// const FeedbackPage = () => {
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [selectedService, setSelectedService] = useState('');
//   const [feedbackType, setFeedbackType] = useState('');

//   const services = [
//     'Food Delivery',
//     'Logistics/Package Delivery',
//     'Errands',
//     'Customer Service',
//     'Overall Experience'
//   ];

//   const feedbackTypes = [
//     { type: 'compliment', label: 'Compliment', icon: <BiHappy className="w-6 h-6" />, color: 'bg-green-500' },
//     { type: 'suggestion', label: 'Suggestion', icon: <BiMeh className="w-6 h-6" />, color: 'bg-blue-500' },
//     { type: 'complaint', label: 'Complaint', icon: <BiSad className="w-6 h-6" />, color: 'bg-red-500' }
//   ];

//   const generateWhatsAppLink = () => {
//     const ratingText = selectedRating > 0 ? `Rating: ${selectedRating}/5 stars` : '';
//     const serviceText = selectedService ? `Service: ${selectedService}` : '';
//     const typeText = feedbackType ? `Feedback Type: ${feedbackType}` : '';
    
//     const message = `Hello Handy Foods and Errands! I would like to provide feedback.\n\n${ratingText}\n${serviceText}\n${typeText}\n\nMy feedback: `;
    
//     return `https://wa.me/+2349118347755?text=${encodeURIComponent(message)}`;
//   };

//   const StarRating = () => {
//     return (
//       <div className="flex gap-1 justify-center mb-4">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             onClick={() => setSelectedRating(star)}
//             className="p-1 hover:scale-110 transition-transform"
//           >
//             {star <= selectedRating ? (
//               <MdStar className="w-8 h-8 text-yellow-400" />
//             ) : (
//               <MdStarBorder className="w-8 h-8 text-gray-300" />
//             )}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
//         <div className="px-4 md:px-10 lg:px-20 py-8">
//           <div className="flex items-center gap-3 mb-4">
//             <MdFeedback className="w-8 h-8" />
//             <h1 className="text-2xl md:text-3xl font-bold">Feedback & Reviews</h1>
//           </div>
//           <p className="text-red-100 text-sm md:text-base">
//             Your feedback helps us serve you better. Share your experience with us!
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-4 md:px-10 lg:px-20 py-8">
        
//         {/* Feedback Form */}
//         <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
//           <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Rate Your Experience</h2>
          
//           {/* Star Rating */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
//               How would you rate our service?
//             </label>
//             <StarRating />
//             {selectedRating > 0 && (
//               <p className="text-center text-sm text-gray-600">
//                 You rated us {selectedRating} out of 5 stars
//               </p>
//             )}
//           </div>

//           {/* Service Selection */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Which service are you reviewing?
//             </label>
//             <select
//               value={selectedService}
//               onChange={(e) => setSelectedService(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//             >
//               <option value="">Select a service</option>
//               {services.map((service, index) => (
//                 <option key={index} value={service}>{service}</option>
//               ))}
//             </select>
//           </div>

//           {/* Feedback Type */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Type of feedback
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {feedbackTypes.map((type) => (
//                 <button
//                   key={type.type}
//                   onClick={() => setFeedbackType(type.label)}
//                   className={`p-4 rounded-lg border-2 transition-all duration-200 ${
//                     feedbackType === type.label
//                       ? `${type.color} text-white border-transparent`
//                       : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     {type.icon}
//                     <span className="font-medium">{type.label}</span>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <a
//               href={generateWhatsAppLink()}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
//             >
//               <FaWhatsapp className="w-5 h-5" />
//               Send Feedback via WhatsApp
//             </a>
//           </div>
//         </div>

//         {/* Quick Feedback Options */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-green-100 text-green-600 p-3 rounded-lg">
//                 <MdThumbUp className="w-6 h-6" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Compliment</h3>
//             </div>
//             <p className="text-gray-600 text-sm mb-4">
//               Share what you loved about our service
//             </p>
//             <a
//               href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20want%20to%20give%20you%20a%20compliment%20about%20your%20service:"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
//             >
//               <FaComments className="w-4 h-4" />
//               Send Compliment
//             </a>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-red-100 text-red-600 p-3 rounded-lg">
//                 <MdThumbDown className="w-6 h-6" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Report Issue</h3>
//             </div>
//             <p className="text-gray-600 text-sm mb-4">
//               Let us know if something went wrong
//             </p>
//             <a
//               href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20want%20to%20report%20an%20issue%20with%20your%20service:"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
//             >
//               <FaComments className="w-4 h-4" />
//               Report Issue
//             </a>
//           </div>
//         </div>

//         {/* Why Feedback Matters */}
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 md:p-8">
//           <h3 className="text-xl font-bold mb-4 text-center">Why Your Feedback Matters</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="text-center">
//               <FaStar className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
//               <h4 className="font-semibold mb-2">Improve Quality</h4>
//               <p className="text-blue-100 text-sm">Your feedback helps us maintain high service standards</p>
//             </div>
//             <div className="text-center">
//               <FaComments className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
//               <h4 className="font-semibold mb-2">Better Communication</h4>
//               <p className="text-blue-100 text-sm">We learn how to serve you better through your insights</p>
//             </div>
//             <div className="text-center">
//               <BiHappy className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
//               <h4 className="font-semibold mb-2">Customer Satisfaction</h4>
//               <p className="text-blue-100 text-sm">Your happiness is our priority and motivation</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedbackPage;


// pages/FeedbackPage.js
import React, { useState } from 'react';
import { MdFeedback, MdStar, MdStarBorder, MdThumbUp, MdThumbDown } from 'react-icons/md';
import { FaWhatsapp, FaComments, FaStar } from 'react-icons/fa';
import { BiHappy, BiSad, BiMeh } from 'react-icons/bi';

const FeedbackPage = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const feedbackTypes = [
    { type: 'compliment', label: 'Compliment', icon: <BiHappy className="w-6 h-6" />, color: 'bg-green-500' },
    { type: 'suggestion', label: 'Suggestion', icon: <BiMeh className="w-6 h-6" />, color: 'bg-blue-500' },
    { type: 'complaint', label: 'Complaint', icon: <BiSad className="w-6 h-6" />, color: 'bg-red-500' }
  ];

  const generateWhatsAppLink = () => {
    const ratingText = selectedRating > 0 ? `Rating: ${selectedRating}/5 stars` : '';
    const serviceText = selectedService ? `Service: ${selectedService}` : '';
    const typeText = feedbackType ? `Feedback Type: ${feedbackType}` : '';
    
    const message = `Hello Handy Foods and Errands! I would like to provide feedback.\n\n${ratingText}\n${serviceText}\n${typeText}\n\nMy feedback: `;
    
    return `https://wa.me/+2349118347755?text=${encodeURIComponent(message)}`;
  };

  const StarRating = () => {
    return (
      <div className="flex gap-1 justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setSelectedRating(star)}
            className="p-1 hover:scale-110 transition-transform duration-300 transform hover:rotate-12"
          >
            {star <= selectedRating ? (
              <MdStar className="w-8 h-8 text-yellow-400 animate-pulse" />
            ) : (
              <MdStarBorder className="w-8 h-8 text-gray-300 hover:text-yellow-200 transition-colors duration-300" />
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20"></div>
        <div className="relative px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-700 animate-slideInDown">
          <div className="flex items-center gap-3 mb-4">
            <MdFeedback className="w-8 h-8 animate-bounce" />
            <h1 className="text-2xl md:text-3xl font-bold">Feedback & Reviews</h1>
          </div>
          <p className="text-red-100 text-sm md:text-base opacity-90">
            Your feedback helps us serve you better. Share your experience with us!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-500 animate-slideInUp">
        
        {/* Feedback Form */}
        <div 
          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 md:p-8 mb-8 transform hover:scale-105 animate-fadeInUp group"
          style={{
            animationDelay: '0.2s',
            opacity: 0,
            animation: `fadeInUp 0.6s ease-out 0.2s forwards`
          }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center group-hover:text-red-600 transition-colors duration-300">Rate Your Experience</h2>
          
          {/* Star Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              How would you rate our service?
            </label>
            <StarRating />
            {selectedRating > 0 && (
              <p className="text-center text-sm text-gray-600 animate-fadeInUp">
                You rated us {selectedRating} out of 5 stars
              </p>
            )}
          </div>


          {/* Submit Button */}
          <div className="text-center">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <FaWhatsapp className="w-5 h-5 animate-pulse" />
              Send Feedback via WhatsApp
            </a>
          </div>
        </div>

        {/* Quick Feedback Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp group"
            style={{
              animationDelay: '0.4s',
              opacity: 0,
              animation: `fadeInUp 0.6s ease-out 0.4s forwards`
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <MdThumbUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">Compliment</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Share what you loved about our service
            </p>
            <a
              href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20want%20to%20give%20you%20a%20compliment%20about%20your%20service:"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
            >
              <FaComments className="w-4 h-4 animate-pulse" />
              Send Compliment
            </a>
          </div>

          <div 
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp group"
            style={{
              animationDelay: '0.6s',
              opacity: 0,
              animation: `fadeInUp 0.6s ease-out 0.6s forwards`
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <MdThumbDown className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">Report Issue</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Let us know if something went wrong
            </p>
            <a
              href="https://wa.me/+2349118347755?text=Hello%20Handy%20Foods%20and%20Errands!%20I%20want%20to%20report%20an%20issue%20with%20your%20service:"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
            >
              <FaComments className="w-4 h-4 animate-pulse" />
              Report Issue
            </a>
          </div>
        </div>

        {/* Why Feedback Matters */}
        <div 
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 md:p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
          style={{ 
            animationDelay: '0.8s',
            opacity: 0,
            animation: `fadeInUp 0.6s ease-out 0.8s forwards`
          }}
        >
          <h3 className="text-xl font-bold mb-4 text-center">Why Your Feedback Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="text-center transform transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: '1s',
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out 1s forwards`
              }}
            >
              <FaStar className="w-8 h-8 mx-auto mb-3 text-yellow-300 animate-pulse" />
              <h4 className="font-semibold mb-2">Improve Quality</h4>
              <p className="text-blue-100 text-sm">Your feedback helps us maintain high service standards</p>
            </div>
            <div 
              className="text-center transform transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: '1.2s',
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out 1.2s forwards`
              }}
            >
              <FaComments className="w-8 h-8 mx-auto mb-3 text-yellow-300 animate-pulse" />
              <h4 className="font-semibold mb-2">Better Communication</h4>
              <p className="text-blue-100 text-sm">We learn how to serve you better through your insights</p>
            </div>
            <div 
              className="text-center transform transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: '1.4s',
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out 1.4s forwards`
              }}
            >
              <BiHappy className="w-8 h-8 mx-auto mb-3 text-yellow-300 animate-pulse" />
              <h4 className="font-semibold mb-2">Customer Satisfaction</h4>
              <p className="text-blue-100 text-sm">Your happiness is our priority and motivation</p>
            </div>
          </div>
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

export default FeedbackPage;