import React from "react";
import HeroAbout from "../assets/HeroAbout.png";

const AboutHero = () => {
  return (
    <div
      className="
        bg-cover bg-center bg-no-repeat
        min-h-screen
        px-16
        md:px-8
        sm:px-6
        max-sm:px-4
        flex items-center justify-center
      "
      style={{ backgroundImage: `url(${HeroAbout})` }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <h1 
          className="
            text-[#FFFFFF] font-extrabold text-center leading-tight
            text-[75px]
            lg:text-[75px] lg:w-[90%]
            md:text-[55px] md:w-[95%]
            sm:text-[50px] sm:w-full
            max-sm:text-[32px] max-sm:w-full
          "
        >
          YOUR TRUSTED PARTNER IN FRICTIONLESS GLOBAL TRADE
        </h1>
        <p 
          className="
            text-[#FFFFFF] text-center leading-relaxed my-6
            text-[18px] w-[70%]
            lg:text-[18px] lg:w-[70%]
            md:text-[16px] md:w-[85%]
            sm:text-[15px] sm:w-[90%]
            max-sm:text-[14px] max-sm:w-full
          "
        >
          Logistics is complex, but your experience shouldn't be. Global Express
          combines creative expertise with deep-rooted customs relationships to
          provide real-time solutions for your time and budgetary constraints.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;