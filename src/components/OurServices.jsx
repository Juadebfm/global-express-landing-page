import React from "react";
import horizontal from "../assets/horizontal.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import store from "../assets/store.png"
import { FaRegFilePdf } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import two from "../assets/two.png"

const OurServices = () => {
  return (
    <div className="mt-16 px-16">
      <div className="flex justify-center flex-col items-center">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p className="text-center">About Us</p>
        </div>
        <h4 className="text-[40px] font-bold leading-tight w-[50%] text-center mt-2 max-md:text-[32px] max-md:w-full max-sm:text-[28px]">
          PROVIDING THE BEST SERVICES FOR OUR CUSTOMERS
        </h4>
        <p className="mt-4 w-[70%] text-center text-sm">
          Global Express is duly registered in Korea as Hazyom Holdings since
          2003. We are one of the leading international freight forwarding and
          Logistics Company with offices in Seoul Korea, Guangzhou China and
          Lagos Nigeria.
        </p>
      </div>
      <div className="flex gap-8 mt-16">
        <div className="bg-blue  w-[30%]">
          <div className="bg-[#2B2A2A] rounded-md px-4 py-8">
            <div className="flex items-center bg-[#262626] rounded-lg hover:bg-[#FF6600] transition-colors duration-300 cursor-pointer">
              <button className="text-[#FFFFFF] px-4 py-3 w-full text-start font-semibold text-sm">
                Track Your Shipment
              </button>
              <MdKeyboardArrowRight className="text-[#FFFFFF] text-2xl mr-4" />
            </div>
            <div className="flex items-center bg-[#262626] rounded-lg mt-2 hover:bg-[#FF6600] transition-colors duration-300 cursor-pointer">
              <button className="text-[#FFFFFF] px-4 py-3 w-full text-start font-semibold text-sm">
                Air cargo door -to- door
              </button>
              <MdKeyboardArrowRight className="text-[#FFFFFF] text-2xl mr-4" />
            </div>
            <div className="flex items-center bg-[#262626] rounded-lg mt-2 hover:bg-[#FF6600] transition-colors duration-300 cursor-pointer">
              <button className="text-[#FFFFFF] px-4 py-3 w-full text-start font-semibold text-sm">
                Worldwide Courier Service
              </button>
              <MdKeyboardArrowRight className="text-[#FFFFFF] text-2xl mr-4" />
            </div>
            <div className="flex items-center bg-[#262626] rounded-lg mt-2 hover:bg-[#FF6600] transition-colors duration-300 cursor-pointer">
              <button className="text-[#FFFFFF] px-4 py-3 w-full text-start font-semibold text-sm">
                Ocean Shipping to Nigeria
              </button>
              <MdKeyboardArrowRight className="text-[#FFFFFF] text-2xl mr-4" />
            </div>
            <div className="flex items-center bg-[#262626] rounded-lg mt-2 hover:bg-[#FF6600] transition-colors duration-300 cursor-pointer">
              <button className="text-[#FFFFFF] px-4 py-3 w-full text-start font-semibold text-sm">
                Packaging
              </button>
              <MdKeyboardArrowRight className="text-[#FFFFFF] text-2xl mr-4" />
            </div>
            <div className="flex items-center bg-[#262626] rounded-lg mt-2 hover:bg-[#FF6600] transition-colors duration-300 cursor-pointer">
              <button className="text-[#FFFFFF] px-4 py-3 w-full text-start font-semibold text-sm">
                Storage services
              </button>
              <MdKeyboardArrowRight className="text-[#FFFFFF] text-2xl mr-4" />
            </div>
            <div className="flex items-center bg-[#262626] rounded-lg mt-2 hover:bg-[#FF6600] transition-colors duration-300 cursor-pointer">
              <button className="text-[#FFFFFF] px-4 py-3 w-full text-start font-semibold text-sm">
                Product sourcing and buying
              </button>
              <MdKeyboardArrowRight className="text-[#FFFFFF] text-2xl mr-4" />
            </div>
            <div className="flex items-center bg-[#262626] rounded-lg mt-2 hover:bg-[#FF6600] transition-colors duration-300 cursor-pointer">
              <button className="text-[#FFFFFF] px-4 py-3 w-full text-start font-semibold text-sm">
                Fund Transfer
              </button>
              <MdKeyboardArrowRight className="text-[#FFFFFF] text-2xl mr-4" />
            </div>
          </div>
          <div className="bg-[#2B2A2A] rounded-md px-4 py-8 mt-8">
            <h4 className="font-bold">Brochures</h4>
            <div className="flex items-center bg-[#686868] rounded-md mt-4">
              <div className="bg-[#FF6600] p-3 rounded-l-md">
                <FaRegFilePdf className="text-2xl text-[#FFFFFF]" />
              </div>
              <button className="text-sm text-[#FFFFFF] py-3 px-4 w-full text-center">
                Download.pdf
              </button>
            </div>
            <div className="flex items-center bg-[#686868] rounded-md mt-4">
              <div className="bg-[#FF6600] p-3 rounded-l-md">
                <IoDocumentTextOutline className="text-2xl text-[#FFFFFF]" />
              </div>
              <button className="text-sm text-[#FFFFFF] py-3 px-4 w-full text-center">
                Download.pdf
              </button>
            </div>
          </div>
          <div className="bg-[#2B2A2A] rounded-md mt-8">
            <div>
                <img src={two} alt="two staff" />
            </div>
            <div>
                <h4>Hello</h4>
            </div>
          </div>
        </div>
        <div className="bg-yellow h-[600px] w-[70%]">
          <div>
            <img src={store} alt="image" />
          </div>
          <div className="mt-8">
            <h4 className="text-2xl font-bold">AIR FREIGHT</h4>
            <p className="mt-4">
              Global Express provides a worldwide network for all of your air
              freight needs, with guaranteed and time-defined services,
              supported by preferred Airline Partners. We offers fixed schedules
              on all main routes. As a market leader, we offer competitive rates
              for all time and cost requirements. All end-to-end logistics
              processes are supported by leading-edge information management
              systems, providing the customer with complete shipment
              information.
            </p>
          </div>
          <div className="mt-6 flex items-start justify-center gap-8">
            <div className="flex gap-3 items-start">
              <img
                className="w-[250px] h-[160px] object-cover"
                src={store}
                alt="image"
              />
              <div className="mt-6">
                <h6 className="font-semibold text-lg mb-2">Best Solution</h6>
                <p className="text-[12px] leading-relaxed">
                  We combine direct IATA airline contracts with market-leading
                  rates to deliver your cargo to any destination, on time and on
                  budget.
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <img
                className="w-[250px] h-[160px] object-cover "
                src={store}
                alt="image"
              />
              <div className="mt-6">
                <h6 className="font-semibold text-lg mb-2">Best Solution</h6>
                <p className="text-[12px] leading-relaxed">
                  We combine direct IATA airline contracts with market-leading
                  rates to deliver your cargo to any destination, on time and on
                  budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
