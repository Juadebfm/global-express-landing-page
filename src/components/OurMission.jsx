import React from "react";
import achievement from "../assets/achievement.png";
import horizontal from "../assets/horizontal.png";

const OurMission = () => {
  return (
    <div className="px-16 text-[#FFFFFF] flex justify-center items-center gap-8 mt-36 max-md:px-8 max-md:flex-col-reverse max-md:mt-16 max-sm:px-4 max-sm:mt-12 md:mb-48">
      <div className="flex-1 flex justify-center max-md:w-full">
        <img
          src={achievement}
          alt="achievement"
          className="w-[75%] h-auto max-md:w-full"
        />
      </div>
      <div className="flex-1 max-md:w-full">
        <div className="max-md:w-full">
          <div className="flex items-center gap-2">
            <img src={horizontal} alt="horizontal line" />
            <p className="text-sm max-sm:text-[13px]">About Us</p>
          </div>
          <h4 className="text-[40px] font-bold leading-tight max-md:text-[32px] max-sm:text-[28px]">
            TWO DECADES OF LOGISTICS EXCELLENCE
          </h4>
          <p className="mt-4 text-base max-sm:text-[15px] leading-relaxed">
            Our mission is to tailor our business to the requirements of our
            clients -large and small- by providing accurate data management,
            administrative support, and creative expertise to meet
            transportation needs of all kinds.
          </p>
          <p className="mt-6 max-sm:mt-4 text-base max-sm:text-[15px] leading-relaxed">
            Global Express provides a unique blend of experience with air,
            ocean, barge, rail, and truck transportation for the execution of
            the most demanding shipping requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
