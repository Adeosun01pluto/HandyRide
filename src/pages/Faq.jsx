import React, { useState, useEffect } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const HandyRideFAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    // Auto-open first accordion after 1 second
    const timer = setTimeout(() => {
      setActiveAccordion(0);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqItems = [
    {
      id: 0,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      iconBg: "bg-red-500",
      question: "How do I Order?",
      answer: (
        <ol className="list-decimal list-inside space-y-2">
          <li>Choose a Restaurant of your Choice</li>
          <li>Describe Your Order</li>
          <li>Make Payments + Delivery Charges to Provided Account</li>
          <li>Drop Your Location, We deliver within 15Mins</li>
        </ol>
      )
    },
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      iconBg: "bg-blue-500",
      question: "Is HandyRide Affiliated With Any Restaurant?",
      answer: "No We Are not Affiliated With Any Restaurants, Our Customers Are Our Primary Focus, And We Safely get you Food from Any Restaurant of Your Choice!"
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
      ),
      iconBg: "bg-green-500",
      question: "Is my Payment Safe?",
      answer: "Yes, Your Payments are totally safe with Us, and We bring You receipts 🧾 for Every Order to show Transparency"
    },
    {
      id: 3,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      ),
      iconBg: "bg-yellow-500",
      question: "What Happens if the Restaurant don't have the food I paid For?",
      answer: "We Notify You about this firstly, And if you do not wish to proceed with a different Meal from the Restaurant; You Shall be Refunded Immediately!"
    },
    {
      id: 4,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
      ),
      iconBg: "bg-purple-500",
      question: "Why Choose HandyRide?",
      answer: (
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Faster Delivery</strong> - Kill Wait Time</li>
          <li><strong>Priority Service</strong> - Most Restaurants Pick up 7 to 8 Orders before delivering Your Food, But We Deliver Your Food Immediately You Order With Us, You First!</li>
          <li><strong>Privacy Protection</strong> - We don't Take User's Information ℹ NO Gmail/Phone Number Needed to Use Our Website, Ask for your Delivery Location time everytime we bring you Food</li>
          <li><strong>Quality Service</strong> - Proper Food Handling and Immediate Response</li>
        </ol>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-gradient-to-r from-red-500 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20"></div>
        <div className="relative px-4 md:px-10 lg:px-20 py-8 transform transition-all duration-700 animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <h1 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h1>
          </div>
          <p className="text-red-100 text-sm md:text-base opacity-90">
            Everything you need to know about HandyRide food delivery service
          </p>
        </div>
      </div> */}

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14 opacity-0 animate-pulse" 
             style={{animation: 'fadeInUp 0.6s ease-out 0.2s forwards'}}>
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-gray-800">
            <FaQuestionCircle />  FAQ
          </h2>
          <p className="mt-2 text-gray-600">Get quick answers to common questions about our service</p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-2 md:space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl opacity-0"
              style={{
                animation: `fadeInUp 0.6s ease-out ${0.3 + (index * 0.1)}s forwards`
              }}
            >
              <div className="p-3 lg:p-6">
                <button 
                  className="w-full flex items-center justify-between text-left"
                  onClick={() => toggleAccordion(item.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${item.iconBg} text-white p-2 rounded-lg`}>
                      {item.icon}
                    </div>
                    <span className="text-sm lg:text-lg font-semibold text-gray-800">{item.question}</span>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      activeAccordion === item.id ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeAccordion === item.id ? 'max-h-96 mt-4' : 'max-h-0'
                  }`}
                >
                  <div className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div 
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 md:p-8 text-center mt-12 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl opacity-0"
          style={{animation: 'fadeInUp 0.6s ease-out 0.8s forwards'}}
        >
          <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-red-100 mb-4">
            Can't find what you're looking for? Contact us directly for personalized assistance!
          </p>
          <a
            href="https://wa.me/+2349118347755?text=Hello%20HandyRide!%20I%20have%20a%20question%20about%20your%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-red-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
            </svg>
            Contact Us on WhatsApp
          </a>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default HandyRideFAQ;