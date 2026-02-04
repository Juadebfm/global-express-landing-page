import React from "react";
import horizontal from "../assets/horizontal.png";
import started from "../assets/started.png";
import logostics from "../assets/logostics.png";
import global from "../assets/global.png";
import clearing from "../assets/clearing.png";

const AboutAbout = () => {
  return (
    <div className="text-[color:var(--text)] px-16 mt-16 max-md:px-8 max-sm:px-4 max-sm:mt-8">
      <div>
        <div className="w-1/2 max-md:w-full">
          <div className="flex items-center gap-2">
            <img src={horizontal} alt="horizontal line" />
            <p>About Us</p>
          </div>
          <h4 className="text-[40px] font-bold leading-tight w-[80%] max-md:text-[32px] max-md:w-full max-sm:text-[28px]">
            TWO DECADES OF LOGISTICS EXCELLENCE
          </h4>
        </div>
      </div>

      <div className="flex mt-12 max-md:flex-col max-md:gap-8 max-sm:mt-8">
        <div className="w-1/2 max-md:w-full">
          <img
            src={started}
            alt="started image"
            className="w-full md:w-[95%] h-auto object-cover"
          />
        </div>
        <div className="w-1/2 mt-16 max-md:w-full max-md:mt-0">
          <p className="text-base max-sm:text-[15px]">
            Global Express is a trading name and a Logistics/Freight forwarding
            division of Hazyom Holdings. Global Express is duly registered in
            Korea as Hazyom Holdings since 2003. We are one of the leading
            international freight forwarding and Logistics Company with offices
            in Seoul Korea, Guangzhou China and Lagos Nigeria.
          </p>
          <p className="mt-6 max-sm:mt-4 text-base max-sm:text-[15px]">
            Global Express is a company of mindful, committed, and responsive
            individuals with diverse backgrounds, ideologies, areas of
            expertise. As diverse as we are, we are unified by the common goal
            to servicing our customers beyond their greatest expectations
            through innovation and creativity. We accomplish this goal daily by
            assessing our customer's time and budgetary constraints and
            providing them with the best real time logistical solution to help
            them achieve their current goal and ever rising expectations. We are
            well connected and in a long term cordial relationship with the
            Nigerian customs services which is one of the reasons why we handle
            and clear any shipment fast and affordable without any hitches or
            delays
          </p>
        </div>
      </div>

      <div className="mt-16 flex gap-8 max-md:flex-col max-md:gap-8 max-sm:mt-12">
        <div className="flex flex-1 items-center gap-4 max-sm:flex-col max-sm:text-center">
          <img src={logostics} alt="logostics" className="shrink-0" />
          <div className="flex-1">
            <h6 className="text-[14px]">CLIENT</h6>
            <h5 className="font-semibold text-[20px]">Logistics</h5>
            <p className="text-[13px] max-sm:text-[14px]">
              We're helping you move cargo across borders without the stress.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-4 max-sm:flex-col max-sm:text-center">
          <img src={global} alt="global" className="shrink-0" />
          <div className="flex-1">
            <h6 className="text-[14px]">CLIENT</h6>
            <h5 className="font-semibold text-[20px]">Global Trade</h5>
            <p className="text-[13px] max-sm:text-[14px]">
              We're helping you connect your business to the world's biggest
              markets.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-4 max-sm:flex-col max-sm:text-center">
          <img src={clearing} alt="clearing" className="shrink-0" />
          <div className="flex-1">
            <h6 className="text-[14px]">CLIENT</h6>
            <h5 className="font-semibold text-[20px]">Clearing</h5>
            <p className="text-[13px] max-sm:text-[14px]">
              We're helping you bypass delays with expert local knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAbout;
