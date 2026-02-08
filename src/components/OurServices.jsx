import React from "react";
import horizontal from "../assets/horizontal.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import store from "../assets/store.png";
import { FaRegFilePdf } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import two from "../assets/two.png";
import help from "../assets/help.png";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

const OurServices = () => {
  return (
    <div className="mt-16 px-16 max-md:px-8 max-sm:px-4">
      <div className="flex justify-center flex-col items-center">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p className="text-center">About Us</p>
        </div>
        <h4 className="text-[40px] font-bold leading-tight w-[50%] text-center mt-2 max-md:text-[32px] max-md:w-full max-sm:text-[28px]">
          PROVIDING THE BEST SERVICES FOR OUR CUSTOMERS
        </h4>
        <p className="mt-4 w-[70%] text-center text-sm max-md:w-[90%] max-sm:w-full">
          Global Express is duly registered in Korea as Hazyom Holdings since
          2003. We are one of the leading international freight forwarding and
          Logistics Company with offices in Seoul Korea, Guangzhou China and
          Lagos Nigeria.
        </p>
      </div>
      <div className="flex gap-8 mt-16 max-lg:flex-col max-md:gap-6">
        <div className="bg-blue w-[30%] max-lg:w-full">
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
            <div className="flex flex-col items-center">
              <img src={two} alt="two staff" className="w-full" />
              <img className="-mt-8 max-sm:-mt-6" src={help} alt="image" />
            </div>
            <div className="mt-4 text-xl font-bold flex flex-col items-center justify-center max-sm:text-lg">
              <h4>How Can We Help?</h4>
              <div className="flex items-center justify-center gap-2 mt-4">
                <FaPhoneVolume />
                <div className="text-[12px]">
                  <p>KR: +82 (0)70 4142 5371</p>
                  <p>NG: +234 (0)906 000 0193</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-6 mb-8">
                <CiMail />
                <small className="text-[12px]">sales@globalexpress.kr</small>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto w-[70%] max-lg:w-full">
          <div>
            <img src={store} alt="image" className="w-full h-auto" />
          </div>
          <div className="mt-8">
            <h4 className="text-2xl font-bold max-sm:text-xl">AIR FREIGHT</h4>
            <p className="mt-4 text-sm max-sm:text-[13px]">
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
          <div className="mt-6 flex items-start justify-center gap-8 max-md:flex-col max-md:gap-6">
            <div className="flex gap-3 items-start max-sm:flex-col">
              <img
                className="w-[250px] h-[160px] object-cover max-sm:w-full max-sm:h-auto"
                src={store}
                alt="image"
              />
              <div className="mt-6 max-sm:mt-3">
                <h6 className="font-semibold text-lg mb-2 max-sm:text-base">
                  Best Solution
                </h6>
                <p className="text-[12px] leading-relaxed">
                  We combine direct IATA airline contracts with market-leading
                  rates to deliver your cargo to any destination, on time and on
                  budget.
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-start max-sm:flex-col">
              <img
                className="w-[250px] h-[160px] object-cover max-sm:w-full max-sm:h-auto"
                src={store}
                alt="image"
              />
              <div className="mt-6 max-sm:mt-3">
                <h6 className="font-semibold text-lg mb-2 max-sm:text-base">
                  Planning Strategy
                </h6>
                <p className="text-[12px] leading-relaxed">
                  Leveraging fixed schedules and advanced data management, we
                  engineer the most efficient routes to ensure your complex
                  shipments move without friction.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm max-sm:text-[13px]">
            The main element of our freight management service is the ability to
            move single or complex shipments by air, at any time and to any
            destination. We are one of the Korea leading providers of air
            freight services with direct contracts rates with most IATA and non
            IATA Airlines. We provide a flexible and customer-friendly
            personalized service.
          </p>
          <div className="mt-6">
            <h4 className="text-2xl font-bold max-sm:text-xl">
              Our work benefits
            </h4>
            <p className="mt-4 text-sm max-sm:text-[13px]">
              At Global Express, we pride ourselves on being more than just a
              logistics provider; we are a strategic extension of your business
              operations. Since 2003, we have refined our processes across
              Korea, China, and Nigeria to ensure that every shipment regardless
              of complexity handled with mindful precision and creative
              expertise. We don't just move cargo; we manage the risks, budgets,
              and timelines that define your success in the global marketplace.
              Strategic Customs Integration Direct Global Carrier Rates
              End-to-End Data Management Tailored Multimodal Solutions By
              assessing your specific shipping requirements, our team of experts
              eliminates the "hitches" and delays common in international trade.
              Whether you are a small business or a large-scale enterprise, our
              commitment is to provide a responsive, personalized service that
              exceeds your greatest expectations through constant innovation and
              local expertise.
            </p>
            <ul className="list-disc list-inside mt-4 ml-3 text-sm max-sm:text-[13px]">
              <li className="mt-4">Strategic Customs Integration</li>
              <li className="mt-4">Direct Global Carrier Rates</li>
              <li className="mt-4">End-to-End Data Management</li>
              <li className="mt-4">Tailored Multimodal Solutions</li>
            </ul>
            <p className="mt-6 text-sm max-sm:text-[13px]">
              By assessing your specific shipping requirements, our team of
              experts eliminates the "hitches" and delays common in
              international trade. Whether you are a small business or a
              large-scale enterprise, our commitment is to provide a responsive,
              personalized service that exceeds your greatest expectations
              through constant innovation and local expertise
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
