import React from "react";
import horizontal from "../assets/horizontal.png";
import achievement from "../assets/achievement.png";

const Achievements = () => {
  return (
    <div className="px-16 text-[#FFFFFF] mt-32 flex gap-12">
      {/* CONTENT */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p>Our Achievements</p>
        </div>

        <h4 className="text-[40px] font-bold leading-tight mt-5">
          WHY OUR MILESTONES MATTER TO YOU
        </h4>

        <p className="text-[14px] mt-4 max-w-[70%]">
          <span className="font-bold">Two Decades of Reliability</span> We
          didn't just start yesterday. Registered as Hazyom Holdings in 2003, we
          have spent over 20 years perfecting the trade routes between Asia and
          Africa.
        </p>

        <p className="text-[14px] mt-4 max-w-[70%]">
          <span className="font-bold">Expert Customs Integration</span> Our
          long-term relationship with Nigerian Customs isn't just a stat—it’s
          your guarantee. We’ve cleared thousands of shipments without the
          typical delays that halt other businesses.
        </p>

        <p className="text-[14px] mt-4 max-w-[70%]">
          <span className="font-bold">Multimodal Versatility</span> From small
          parcels to heavy machinery, we have successfully managed air, ocean,
          and land freight for over 500+ corporate clients worldwide.
        </p>

        <p className="text-[14px] mt-4">We have:</p>
      </div>

      {/* IMAGE */}
      <div className="flex-1 flex justify-end">
        <img
          src={achievement}
          alt="achievement"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Achievements;
