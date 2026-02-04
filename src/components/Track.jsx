import React from "react";
import horizontal from "../assets/horizontal.png";
import track from "../assets/track.png";

const TrackYourShipments = () => {
  return (
    <div className="px-8 md:px-16 text-[#FFFFFF] pt-32 ">
      <div className="flex items-center justify-between gap-16 max-lg:flex-col max-lg:gap-10">
        <div className="flex-1 max-lg:w-full">
          <div className="max-md:w-full">
            <div className="flex items-center gap-2">
              <img
                src={horizontal}
                alt="horizontal line"
                className="max-sm:w-8"
              />
              <p className="text-sm max-sm:text-xs">About Us</p>
            </div>
            <h4 className="text-[40px] font-bold max-md:text-3xl max-sm:text-2xl">
              WHERE IS YOUR CARGO?
            </h4>
          </div>
          <p className="mt-4 w-[80%] max-lg:w-full max-sm:text-sm">
            Get real-time updates on your shipment's journey from our hubs in
            Seoul and Guangzhou to its destination.
          </p>
          <div className="mt-8 max-sm:mt-6">
            <label className="text-[13px] max-sm:text-xs" htmlFor="">
              Enter your Tracking Number
            </label>
            <div className="mt-2 flex max-sm:flex-col max-sm:gap-2">
              <input
                className="px-4 py-3 w-[60%] border border-[#FFFFFF] bg-transparent rounded-l-lg placeholder:text-gray-400 text-[12px] max-sm:w-full max-sm:rounded-lg max-sm:text-xs"
                type="text"
                placeholder="e.g., GE-123456789"
              />
              <button className="bg-[#FF6600] px-4 py-3 rounded-r-lg max-sm:rounded-lg max-sm:text-sm max-sm:py-3">
                Track Shipment
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 max-lg:w-full">
          <img src={track} alt="Track your shipment" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default TrackYourShipments;
