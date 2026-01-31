import React from "react";
import horizontal from "../assets/horizontal.png";
import logostics from "../assets/logostics.png";
import global from "../assets/global.png";
import clearing from "../assets/clearing.png";
import shipment from "../assets/shipment.png";

const HomeAbout = () => {
  return (
    <div className="mt-24 text-[#FFFFFF]">
      <div className="px-16 flex justify-between">
        <div className="w-1/2">
          <div className="flex items-center gap-2">
            <img src={horizontal} alt="horizontal line" />
            <p>About Us</p>
          </div>
          <h4 className="text-[40px] font-bold leading-tight w-[80%]">
            TWO DECADES OF LOGISTICS EXCELLENCE
          </h4>
        </div>

        <div className="w-1/2 flex justify-end gap-4">
          <p className="text-[14px] w-[60%]">
            Global Express is duly registered in Korea as Hazyom Holdings since
            2003. We are one of the leading international freight forwarding and
            Logistics Company with offices in Seoul Korea, Guangzhou China and
            Lagos Nigeria.
          </p>
        </div>
      </div>
      <div className="px-16 mt-16 flex gap-32">
        <div className="flex flex-1 items-center gap-4">
          <img src={logostics} alt="logostics" className="shrink-0" />
          <div className="flex-1">
            <h6 className="text-[14px]">CLIENT</h6>
            <h5 className="font-semibold text-[20px]">Logistics</h5>
            <p className="text-[13px] ">
              We’re helping you move cargo across borders without the stress.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-4">
          <img src={global} alt="global" className="shrink-0" />
          <div className="flex-1">
            <h6 className="text-[14px]">CLIENT</h6>
            <h5 className="font-semibold text-[20px]">Global Trade</h5>
            <p className="text-[13px]">
              We’re helping you connect your business to the world’s biggest
              markets.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-4">
          <img src={clearing} alt="clearing" className="shrink-0" />
          <div className="flex-1">
            <h6 className="text-[14px]">CLIENT</h6>
            <h5 className="font-semibold text-[20px]">Clearing</h5>
            <p className="text-[13px]">
              We’re helping you bypass delays with expert local knowledge.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[800px] mx-auto mt-24">
        <img src={shipment} alt="shipment" className="w-full" />
      </div>
    </div>
  );
};

export default HomeAbout;
