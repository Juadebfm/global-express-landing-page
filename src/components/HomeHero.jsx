import React from "react";
import HomeHeroImage from "../assets/HomeHero.png";

const HomeHero = () => {
  return (
    <div
      className="
        bg-cover bg-center bg-no-repeat
        min-h-screen
        px-16
        max-md:px-6 max-sm:px-4

        max-sm:flex
        max-sm:flex-col
        max-sm:justify-center
        max-sm:items-center
        max-sm:pt-16
        max-sm:pb-8
        max-sm:min-h-[85vh]
        
        md:min-h-screen
      "
      style={{ backgroundImage: `url(${HomeHeroImage})` }}
    >
      <div
        className="
          pt-[12rem]
          max-md:pt-[6rem]
          max-sm:pt-0
          max-md:max-w-[720px]
          max-sm:w-full
          
          md:max-w-[900px]
        "
      >
        <h1
          className="
            text-[#FFFFFF] text-[60px] font-extrabold w-[90%] leading-tight
            max-md:text-[42px] max-md:w-full
            max-sm:text-[32px] max-sm:text-center
            
            md:text-[48px] md:w-[95%]
          "
        >
          TAILORED FREIGHT SOLUTIONS FOR THE MODERN ENTERPRISE
        </h1>

        <p
          className="
            text-[#FFFFFF] text-[18px] w-[48%] my-6 leading-relaxed
            max-md:w-full max-md:text-[16px]
            max-sm:text-center
            
            md:w-[85%] md:text-[17px]
          "
        >
          Why risk your shipment? Global Express combines 20+ years of freight
          experience with an insider's knowledge of Nigerian Customs to move
          your goods faster and more affordably than ever before.
        </p>

        <button
          className="
            bg-[#FF6600] px-10 py-3 rounded-lg text-[#FFFFFF] font-semibold
            transition hover:bg-[#e65c00]
            max-sm:w-full max-sm:py-4
            
            md:px-12 md:py-3.5
          "
        >
          Ship with Us
        </button>
      </div>
    </div>
  );
};

export default HomeHero;
