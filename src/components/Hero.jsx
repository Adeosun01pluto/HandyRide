import React from 'react';

const Hero = () => {
  return (
    <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 md:mt-14 pb-10">
      <div className="max-md:mt-7">
        <h1 className="text-5xl md:text-[74px] text-red-500 max-w-96">
          Drive sales to{' '}
          <span className="underline font-bold">the sky</span>
        </h1>
        <p className="mt-8 text-gray-500 text-sm sm:text-base max-w-lg">
          Unlock potential with tailored strategies designed for success.
          Simplify challenges, maximize results.
        </p>
        <div className="flex items-center mt-6">
          <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2.5 rounded-md transition">
            Stream Now
          </button>
          <button className="flex items-center gap-1.5 px-6 py-2.5 text-red-500 underline">
            Watch how it works
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5h13.09M8.948 1l5.143 4.5L8.948 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* <div className="flex items-center max-md:justify-center text-gray-600 text-xs md:text-sm mt-8">
          <div className="flex flex-row text-center items-center gap-2 py-3 pr-6 border-r border-gray-300">
            <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18.5" cy="18.5" r="18" stroke="currentColor" />
            </svg>
            <span>High Conversion</span>
          </div>
        </div> */}
      </div>

      {/* Add image or illustration on the right */}
      <div className="w-full md:w-1/2 flex justify-center">
        {/* Replace with actual image */}
        <img src="/hero-image.png" alt="Hero visual" className="max-w-full h-auto" />
      </div>
    </main>
  );
};

export default Hero;
