import React from "react";
import HomeHeroImage from "../assets/HomeHero.png";

const HomeHero = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen px-16"
      style={{ backgroundImage: `url(${HomeHeroImage})` }}
    >
      <div className="pt-[12rem]">
        <h1 className="text-[#FFFFFF] text-[60px] font-extrabold w-[80%]">
          TAILORED FREIGHT SOLUTIONS FOR THE MODERN ENTERPRISE
        </h1>
        <p className="text-[#FFFFFF] text-[18px] w-[48%] my-6">
          Why risk your shipment? Global Express combines 20+ years of freight
          experience with an insider’s knowledge of Nigerian Customs to move
          your goods faster and more affordably than ever before.
        </p>
        <button className="bg-[#FF6600] px-10 py-3 rounded-lg text-[#FFFFFF]">
          Ship with Us
        </button>
      </div>
    </div>
  );
};

export default HomeHero;
