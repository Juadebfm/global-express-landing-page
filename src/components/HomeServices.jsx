import React from "react";
import horizontal from "../assets/horizontal.png";
import HoverCards from "./HoverCards";

const HomeServices = () => {
  return (
    <div className="text-[#FFFFFF] mt-28 px-16">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p>Our Services</p>
        </div>
        <h4 className="text-[40px] font-bold leading-tight max-w-[60%] text-center mt-5">
          PROVIDING THE BEST SERVICES FOR OUR CUSTOMERS
        </h4>
        <p className="mt-2">
          From the factory floor to your warehouse door, we provide a seamless
          link between global markets and your business.
        </p>
      </div>
      <div>
        <HoverCards />
      </div>
      <div className="flex justify-center items-center">
        <button className="px-8 rounded-lg py-2 bg-[#FF6600] mt-12">Explore All</button>
      </div>
    </div>
  );
};

export default HomeServices;
