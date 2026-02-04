import React from "react";
import horizontal from "../assets/horizontal.png";
import achievement from "../assets/achievement.png";
import { FaArrowRightLong } from "react-icons/fa6";

const Achievements = () => {
  return (
    <div className="px-16 text-[color:var(--text)] mt-32 flex gap-12 max-md:px-6 max-md:flex-col max-md:gap-8 max-md:mt-20 max-sm:px-4 max-sm:mt-16">
      {/* CONTENT */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p>Our Achievements</p>
        </div>

        <h4 className="text-[40px] font-bold leading-tight mt-5 max-md:text-[32px] max-sm:text-[28px]">
          WHY OUR MILESTONES MATTER TO YOU
        </h4>

        <p className="text-[14px] mt-4 max-w-[70%] max-md:max-w-full max-sm:text-[15px]">
          <span className="font-bold">Two Decades of Reliability</span> We
          didn't just start yesterday. Registered as Hazyom Holdings in 2003, we
          have spent over 20 years perfecting the trade routes between Asia and
          Africa.
        </p>

        <p className="text-[14px] mt-4 max-w-[70%] max-md:max-w-full max-sm:text-[15px]">
          <span className="font-bold">Expert Customs Integration</span> Our
          long-term relationship with Nigerian Customs isn't just a stat—it's
          your guarantee. We've cleared thousands of shipments without the
          typical delays that halt other businesses.
        </p>

        <p className="text-[14px] mt-4 max-w-[70%] max-md:max-w-full max-sm:text-[15px]">
          <span className="font-bold">Multimodal Versatility</span> From small
          parcels to heavy machinery, we have successfully managed air, ocean,
          and land freight for over 500+ corporate clients worldwide.
        </p>

        <p className="text-[14px] mt-4 max-sm:text-[15px]">We have:</p>
        <div className="mt-4">
          <div className="group flex items-center gap-3">
            <FaArrowRightLong className="transition-transform duration-300 group-hover:rotate-90" />
            <div className="relative cursor-pointer inline-block">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, #963113 0%, #FFA78D3D 100%)",
                }}
              />
              <p className="z-10 px-3 py-2">
                20+ Years of Uninterrupted Service Since 2003
              </p>
            </div>
          </div>
          <hr className="w-full border-gray-300 mt-2 md:w-[60%]" />
        </div>
        <div className="mt-4">
          <div className="group flex items-center gap-3">
            <FaArrowRightLong className="transition-transform duration-300 group-hover:rotate-90" />
            <div className="relative cursor-pointer inline-block">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, #963113 0%, #FFA78D3D 100%)",
                }}
              />
              <p className="z-10 px-3 py-2">
                3 Global Hubs: Korea, China, and Nigeria
              </p>
            </div>
          </div>
          <hr className="w-full border-gray-300 mt-2 md:w-[60%]" />
        </div>
        <div className="mt-4">
          <div className="group flex items-center gap-3">
            <FaArrowRightLong className="transition-transform duration-300 group-hover:rotate-90" />
            <div className="relative cursor-pointer inline-block">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, #963113 0%, #FFA78D3D 100%)",
                }}
              />
              <p className="z-10 px-3 py-2">
                98% On-Time Delivery Rate for Global Shipments
              </p>
            </div>
          </div>
          <hr className="w-full border-gray-300 mt-2 md:w-[60%]" />
        </div>
        <div className="mt-4">
          <div className="group flex items-center gap-3">
            <FaArrowRightLong className="transition-transform duration-300 group-hover:rotate-90" />
            <div className="relative cursor-pointer inline-block">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, #963113 0%, #FFA78D3D 100%)",
                }}
              />
              <p className="z-10 px-3 py-2">
                0 Hitches: Seamless Nigerian Customs Clearing
              </p>
            </div>
          </div>
          <hr className="w-full border-gray-300 mt-2 md:w-[60%]" />
        </div>
      </div>

      {/* IMAGE */}
      <div className="flex-1 flex justify-end max-md:justify-center max-md:mt-4">
        <img
          src={achievement}
          alt="achievement"
          className="max-w-full h-auto max-md:max-w-[500px] max-sm:max-w-full"
        />
      </div>
    </div>
  );
};

export default Achievements;
