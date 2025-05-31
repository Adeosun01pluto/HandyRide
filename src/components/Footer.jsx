import React from 'react';
import handy from '../assets/Handy_logo1.png';
const Footer = () => {
  return (
    <>
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
          <div className="md:max-w-96">
            {/* <h2 className='font-bold text-2xl md:text-3xl text-red-500'>HandyRide</h2> */}
            <img
              className="h-12 w-32 object-cover"
              src={handy}
              alt="handyride"
            />
            <p className="mt-6 text-sm">
              Order Food from Your Favorite restaurants like Item 7, BOA , KFC, The Place, etc. with us & Also Deliver Your Packages as a business Owner here in Ilorin Cheaper, Faster and Reliable
            </p>
          </div>
          <div className="flex-1 flex md:flex-row flex-col items-start md:justify-end gap-5 md:gap-20">
            {/* <div>
              <h2 className="font-semibold mb-5 text-gray-800">Links</h2>
              <ul className="text-sm space-y-2">
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div> */}
            <div>
              <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
              <div className="text-sm space-y-2">
                <p>+234 911 8347 755</p>
                <p>handytech.ng@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2024 © Handyride. All Right Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
