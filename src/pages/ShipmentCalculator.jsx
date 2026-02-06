import React from "react";
import Header from "../components/Header";
import calculator from "../assets/calculator.png";
import Footer from "../components/Footer";

const ShipmentCalculator = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-32 lg:pt-28 px-4 sm:px-8 lg:px-16 pb-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Form Section - Comes first in HTML */}
          <div className="w-full lg:w-1/2 lg:order-2">
            <div>
              <h4 className="text-[#FF6600] text-[30px] font-bold max-md:text-3xl max-sm:text-2xl">
                Volumetric Weight Calculator
              </h4>
              <p className="max-lg:w-full">
                If your parcel is bulky, most couriers will charge based on
                volumetric weight, calculated from the size of your parcel,
                rather than weight.
              </p>
            </div>

            {/* Form */}
            <form className="mt-16 space-y-4 max-sm:mt-8">
              {/* Weight and Length - Two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-sm:gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Quantity (kg)<span className="text-red-700">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your weight"
                    className="w-full md:w-[90%] px-4 py-3 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Weight (kg)<span className="text-red-700">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your length"
                    className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                  />
                </div>
              </div>

              {/* Width and Height - Two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 max-sm:gap-4 max-sm:pt-2">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Length (cm)<span className="text-red-700">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your Width"
                    className="w-full md:w-[90%] px-4 py-3 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Width (cm)<span className="text-red-700">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your Width"
                    className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                  />
                </div>
              </div>

              {/* Height - Full Width */}
              <div className="pt-8 max-sm:pt-2">
                <label className="block text-sm font-medium mb-2">
                  Height (cm)<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your city"
                  className="w-full px-4 py-3 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                />
              </div>

              {/* Calculate Button - Centered */}
              <div className="flex justify-center pt-12 max-sm:pt-6">
                <button
                  type="submit"
                  className="w-[60%] max-sm:w-[80%] bg-[#FF6600] text-white font-semibold py-3 rounded-md hover:bg-[#e55a00] transition-colors"
                >
                  Calculate Weight
                </button>
              </div>
            </form>
          </div>

          {/* Image Section - Comes second in HTML but shows first on desktop */}
          <div className="max-h-screen w-full lg:w-1/2 lg:order-1">
            <img src={calculator} alt="Calculator" className="w-full h-auto" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShipmentCalculator;
