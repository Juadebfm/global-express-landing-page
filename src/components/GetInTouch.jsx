import React from "react";
import intouch from "../assets/intouch.png";
import horizontal from "../assets/horizontal.png";
import { IoLocationOutline } from "react-icons/io5";

const GetInTouch = () => {
  return (
    <div className="mt-48 px-16 text-[#FFFFFF] max-md:px-6 max-md:mt-32 max-sm:px-4 max-sm:mt-24">
      <div className="flex items-start justify-between gap-16 max-md:flex-col max-md:gap-8 max-sm:gap-6">
        {/* First Container - Image */}
        <div className="flex-shrink-0 max-md:w-full max-md:flex max-md:justify-center max-sm:justify-start">
          <img
            src={intouch}
            alt="Get in Touch"
            className="w-auto h-auto max-md:max-w-[400px] max-sm:max-w-full"
          />
        </div>

        {/* Second Container - Content */}
        <div className="flex-1 max-w-2xl mt-24 max-md:mt-0 max-md:max-w-full">
          <div className="flex items-center gap-2">
            <img src={horizontal} alt="horizontal line" />
            <p>Get in Touch</p>
          </div>
          <div className="mt-4">
            <h4 className="text-3xl font-bold mb-4 max-w-[80%] max-md:text-2xl max-md:max-w-full max-sm:text-xl">
              WE ARE YOUR RELIABLE PARTNERS FOR THE BEST ENERGY SOLUTIONS
            </h4>
            <p className="mb-6 max-w-[80%] max-md:max-w-full max-sm:text-[15px]">
              Whether you have a specific shipping requirement or need help
              navigating Nigerian Customs, we're here to help. Contact our
              offices in Seoul, Guangzhou, or Lagos to get started.
            </p>
          </div>
          <div className="space-y-4 max-sm:space-y-3">
            <div className="flex items-center gap-3 text-[13px] max-sm:text-[14px] max-sm:items-start">
              <p className="bg-[#FF6600] py-2 p-3 max-sm:py-2.5 max-sm:px-2.5 flex-shrink-0">
                <IoLocationOutline className="text-[18px] max-sm:text-[16px]" />
              </p>
              <div>
                <p>
                  <span className="font-bold">NIGERIA:</span> 6, Akinola
                  Sholanke Str., Ajao Estate Lagos.
                </p>
                <p className="max-sm:mt-1">
                  <span className="font-bold">KOREA:</span> 1977-4, Daehwa-dong,
                  Ilsanseo-gu, Goyang-si
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[13px] max-sm:text-[14px]">
              <p className="bg-[#FF6600] py-2 p-3 max-sm:py-2.5 max-sm:px-2.5 flex-shrink-0">
                <IoLocationOutline className="text-[18px] max-sm:text-[16px]" />
              </p>
              <p>sales@globalexpress.kr</p>
            </div>
            <div className="flex items-center gap-3 text-[13px] max-sm:text-[14px] max-sm:items-start">
              <p className="bg-[#FF6600] py-2 p-3 max-sm:py-2.5 max-sm:px-2.5 flex-shrink-0">
                <IoLocationOutline className="text-[18px] max-sm:text-[16px]" />
              </p>
              <div>
                <p>
                  <span className="font-bold">KR:</span> +82 (0)70 4142 5371
                </p>
                <p className="max-sm:mt-1">
                  <span className="font-bold">NG:</span> +234 (0)906 000 0193
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
